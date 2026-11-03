const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { google } = require('googleapis');

const STUDIO_DIR = __dirname;
const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const COVERS_DIR = path.join(ROOT_DIR, 'public', 'covers');

const CREDENTIALS_DIR = path.join(STUDIO_DIR, 'credentials');
const CREDENTIALS_FILE = path.join(STUDIO_DIR, 'credentials.json');
const TOKENS_DIR = path.join(STUDIO_DIR, 'tokens');
const CHANNELS_FILE = path.join(STUDIO_DIR, 'channels.json');
const UPLOADS_FILE = path.join(STUDIO_DIR, 'uploads.json');
const METADATA_FILE = path.join(STUDIO_DIR, 'metadata.json');

const RIGHTCLIPS_STUDIO_DIR = '/home/phyroosh/TopProducts/RightClips/studio';

function ensureDirs() {
  if (!fs.existsSync(CREDENTIALS_DIR)) {
    try { fs.mkdirSync(CREDENTIALS_DIR, { recursive: true }); } catch (e) {}
  }
  if (!fs.existsSync(TOKENS_DIR)) {
    try { fs.mkdirSync(TOKENS_DIR, { recursive: true }); } catch (e) {}
  }
  if (!fs.existsSync(COVERS_DIR)) {
    try { fs.mkdirSync(COVERS_DIR, { recursive: true }); } catch (e) {}
  }
}

// -------------------------------------------------------------------
// 1. Credentials Registry (client_secrets.json files)
// -------------------------------------------------------------------

function getCredentialsRegistry() {
  ensureDirs();
  if (fs.existsSync(CREDENTIALS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));
      if (data && Array.isArray(data.projects)) return data;
    } catch (e) {
      console.error('Error reading credentials.json:', e);
    }
  }
  return { projects: [], activeProjectId: null };
}

function saveCredentialsRegistry(registry) {
  try {
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(registry, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving credentials.json:', e);
  }
}

function getCredentialData(credentialId = null) {
  ensureDirs();
  const registry = getCredentialsRegistry();
  const targetId = credentialId || registry.activeProjectId || (registry.projects[0] ? registry.projects[0].id : null);

  if (targetId) {
    const proj = registry.projects.find((p) => p.id === targetId);
    if (proj) {
      const filePath = path.join(STUDIO_DIR, proj.filename);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          return { credentialId: proj.id, name: proj.name, credentials: parsed };
        } catch (e) {
          console.error(`Failed to parse credential file ${filePath}:`, e);
        }
      }
    }
  }
  return null;
}

function addCredential({ name, jsonContent }) {
  ensureDirs();
  let parsed;
  if (typeof jsonContent === 'string') {
    try {
      parsed = JSON.parse(jsonContent);
    } catch (e) {
      throw new Error('Invalid JSON: ' + e.message);
    }
  } else {
    parsed = jsonContent;
  }

  const installed = parsed.installed || parsed.web;
  if (!installed || !installed.client_id || !installed.client_secret) {
    throw new Error('Invalid Google credentials format! Missing "installed" or "web" block with client_id and client_secret.');
  }

  const registry = getCredentialsRegistry();
  const id = 'gcp_' + Date.now().toString(36);
  const safeName = (name || installed.project_id || `Google Cloud Project (${registry.projects.length + 1})`).trim();
  const fileName = `credentials/${id}.json`;
  const destPath = path.join(STUDIO_DIR, fileName);

  fs.writeFileSync(destPath, JSON.stringify(parsed, null, 2), 'utf-8');

  const projectInfo = {
    id,
    name: safeName,
    clientId: installed.client_id,
    projectId: installed.project_id || id,
    filename: fileName,
    createdAt: new Date().toISOString(),
  };

  registry.projects.push(projectInfo);
  if (!registry.activeProjectId) {
    registry.activeProjectId = id;
  }
  saveCredentialsRegistry(registry);

  return projectInfo;
}

function deleteCredential(credentialId) {
  const registry = getCredentialsRegistry();
  const proj = registry.projects.find((p) => p.id === credentialId);
  if (!proj) return { success: false, error: 'Credential not found' };

  registry.projects = registry.projects.filter((p) => p.id !== credentialId);
  const filePath = path.join(STUDIO_DIR, proj.filename);
  if (fs.existsSync(filePath)) {
    try { fs.unlinkSync(filePath); } catch (e) {}
  }

  if (registry.activeProjectId === credentialId) {
    registry.activeProjectId = registry.projects.length > 0 ? registry.projects[0].id : null;
  }
  saveCredentialsRegistry(registry);

  return { success: true, activeProjectId: registry.activeProjectId };
}

// -------------------------------------------------------------------
// 2. Channels Registry & Tokens
// -------------------------------------------------------------------

function getChannelsRegistry() {
  ensureDirs();
  if (fs.existsSync(CHANNELS_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CHANNELS_FILE, 'utf-8'));
      if (data && Array.isArray(data.channels)) return data;
    } catch (e) {
      console.error('Error reading channels.json:', e);
    }
  }
  return { channels: [], activeChannelId: null };
}

function saveChannelsRegistry(registry) {
  try {
    fs.writeFileSync(CHANNELS_FILE, JSON.stringify(registry, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving channels.json:', e);
  }
}

function getOAuth2ClientForCredential(credentialId = null, port = 4001) {
  const credObj = getCredentialData(credentialId);
  if (!credObj) {
    throw new Error('No Google Cloud credentials found. Please add client_secrets.json in Settings.');
  }

  const installed = credObj.credentials.installed || credObj.credentials.web;
  const redirectUri = `http://localhost:${port}/oauth2callback`;
  return {
    oauth2Client: new google.auth.OAuth2(installed.client_id, installed.client_secret, redirectUri),
    credentialId: credObj.credentialId,
    credentialName: credObj.name,
  };
}

function getOAuth2ClientForChannel(channelId = null, port = 4001) {
  ensureDirs();
  const registry = getChannelsRegistry();
  const targetId = channelId || registry.activeChannelId;

  if (!targetId || registry.channels.length === 0) {
    return null;
  }

  const channel = registry.channels.find((c) => c.channelId === targetId);
  if (!channel) {
    return null;
  }

  const credObj = getCredentialData(channel.credentialId);
  if (!credObj) {
    throw new Error(`Google Cloud Project credentials not found for channel ${channel.title}.`);
  }

  const installed = credObj.credentials.installed || credObj.credentials.web;
  const redirectUri = `http://localhost:${port}/oauth2callback`;
  const oauth2Client = new google.auth.OAuth2(installed.client_id, installed.client_secret, redirectUri);

  const tokenPath = path.join(STUDIO_DIR, channel.tokenFile);
  if (!fs.existsSync(tokenPath)) {
    return null;
  }

  try {
    const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    oauth2Client.setCredentials(tokens);

    // Save refreshed tokens automatically
    oauth2Client.on('tokens', (newTokens) => {
      const merged = { ...tokens, ...newTokens };
      try {
        fs.writeFileSync(tokenPath, JSON.stringify(merged, null, 2), 'utf-8');
      } catch (e) {}
    });

    return { oauth2Client, channel };
  } catch (e) {
    console.error(`Error loading tokens for channel ${channel.title}:`, e);
    return null;
  }
}

async function registerChannelFromOAuth({ code, credentialId = null, port = 4001 }) {
  ensureDirs();
  const { oauth2Client, credentialId: resolvedCredId } = getOAuth2ClientForCredential(credentialId, port);

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Fetch YouTube channel details
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const response = await youtube.channels.list({
    part: ['snippet', 'statistics', 'contentDetails'],
    mine: true,
  });

  if (!response.data.items || response.data.items.length === 0) {
    throw new Error('No YouTube channel found associated with this Google account.');
  }

  const item = response.data.items[0];
  const channelId = item.id;
  const title = item.snippet.title;
  const customUrl = item.snippet.customUrl || `@${title.replace(/\s+/g, '').toLowerCase()}`;
  const avatar =
    item.snippet.thumbnails?.high?.url ||
    item.snippet.thumbnails?.medium?.url ||
    item.snippet.thumbnails?.default?.url ||
    null;

  const tokenFileName = `tokens/yt_${channelId}.json`;
  const tokenFilePath = path.join(STUDIO_DIR, tokenFileName);
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens, null, 2), 'utf-8');

  const registry = getChannelsRegistry();
  const idx = registry.channels.findIndex((c) => c.channelId === channelId);

  const channelRecord = {
    channelId,
    title,
    customUrl,
    avatar,
    subscriberCount: item.statistics?.subscriberCount || '0',
    videoCount: item.statistics?.videoCount || '0',
    uploadsPlaylistId: item.contentDetails?.relatedPlaylists?.uploads || null,
    credentialId: resolvedCredId,
    tokenFile: tokenFileName,
    connectedAt: new Date().toISOString(),
  };

  if (idx >= 0) {
    registry.channels[idx] = channelRecord;
  } else {
    registry.channels.push(channelRecord);
  }

  registry.activeChannelId = channelId;
  saveChannelsRegistry(registry);

  return channelRecord;
}

function switchActiveChannel(channelId) {
  const registry = getChannelsRegistry();
  const found = registry.channels.find((c) => c.channelId === channelId);
  if (!found) {
    return { success: false, error: 'Channel not found in registry' };
  }

  registry.activeChannelId = found.channelId;
  saveChannelsRegistry(registry);
  return { success: true, activeChannel: found };
}

function disconnectChannel(channelId) {
  const registry = getChannelsRegistry();
  const found = registry.channels.find((c) => c.channelId === channelId);
  if (!found) return { success: true };

  registry.channels = registry.channels.filter((c) => c.channelId !== channelId);
  const tokPath = path.join(STUDIO_DIR, found.tokenFile);
  if (fs.existsSync(tokPath)) {
    try { fs.unlinkSync(tokPath); } catch (e) {}
  }

  if (registry.activeChannelId === channelId) {
    registry.activeChannelId = registry.channels.length > 0 ? registry.channels[0].channelId : null;
  }

  saveChannelsRegistry(registry);
  return { success: true, activeChannelId: registry.activeChannelId };
}

async function refreshChannelDetails(channelId = null) {
  const clientObj = getOAuth2ClientForChannel(channelId);
  if (!clientObj) return null;

  try {
    const youtube = google.youtube({ version: 'v3', auth: clientObj.oauth2Client });
    const response = await youtube.channels.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      mine: true,
    });

    if (response.data.items && response.data.items.length > 0) {
      const item = response.data.items[0];
      const registry = getChannelsRegistry();
      const idx = registry.channels.findIndex((c) => c.channelId === item.id);
      if (idx >= 0) {
        registry.channels[idx].title = item.snippet.title;
        registry.channels[idx].customUrl = item.snippet.customUrl || registry.channels[idx].customUrl;
        registry.channels[idx].avatar =
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          registry.channels[idx].avatar;
        registry.channels[idx].subscriberCount = item.statistics?.subscriberCount || '0';
        registry.channels[idx].videoCount = item.statistics?.videoCount || '0';
        registry.channels[idx].uploadsPlaylistId = item.contentDetails?.relatedPlaylists?.uploads || null;
        saveChannelsRegistry(registry);
        return registry.channels[idx];
      }
    }
  } catch (e) {
    console.error(`Failed to refresh channel ${channelId}:`, e.message);
  }
  return clientObj.channel;
}

// -------------------------------------------------------------------
// 3. RightClips One-Click Importer
// -------------------------------------------------------------------

function importFromRightClips() {
  ensureDirs();
  const rcCredsFile = path.join(RIGHTCLIPS_STUDIO_DIR, 'credentials.json');
  const rcChannelsFile = path.join(RIGHTCLIPS_STUDIO_DIR, 'channels.json');

  if (!fs.existsSync(RIGHTCLIPS_STUDIO_DIR)) {
    return { success: false, error: 'RightClips directory not found at ' + RIGHTCLIPS_STUDIO_DIR };
  }

  let importedCredsCount = 0;
  let importedChannelsCount = 0;

  // 1. Copy credentials
  if (fs.existsSync(rcCredsFile)) {
    try {
      const rcCredsData = JSON.parse(fs.readFileSync(rcCredsFile, 'utf-8'));
      const localCreds = getCredentialsRegistry();

      for (const proj of rcCredsData.projects || []) {
        const rcProjPath = path.join(RIGHTCLIPS_STUDIO_DIR, proj.filename);
        if (fs.existsSync(rcProjPath)) {
          const content = fs.readFileSync(rcProjPath, 'utf-8');
          const destPath = path.join(STUDIO_DIR, proj.filename);
          fs.writeFileSync(destPath, content, 'utf-8');

          if (!localCreds.projects.some(p => p.id === proj.id)) {
            localCreds.projects.push(proj);
            importedCredsCount++;
          }
        }
      }
      if (!localCreds.activeProjectId && rcCredsData.activeProjectId) {
        localCreds.activeProjectId = rcCredsData.activeProjectId;
      }
      saveCredentialsRegistry(localCreds);
    } catch (e) {
      console.error('Error importing RightClips credentials:', e);
    }
  }

  // 2. Copy channels & tokens
  if (fs.existsSync(rcChannelsFile)) {
    try {
      const rcChannelsData = JSON.parse(fs.readFileSync(rcChannelsFile, 'utf-8'));
      const localChannels = getChannelsRegistry();

      for (const ch of rcChannelsData.channels || []) {
        const rcTokenPath = path.join(RIGHTCLIPS_STUDIO_DIR, ch.tokenFile);
        if (fs.existsSync(rcTokenPath)) {
          const tokContent = fs.readFileSync(rcTokenPath, 'utf-8');
          const destTokPath = path.join(STUDIO_DIR, ch.tokenFile);
          fs.writeFileSync(destTokPath, tokContent, 'utf-8');

          const existingIdx = localChannels.channels.findIndex(c => c.channelId === ch.channelId);
          if (existingIdx >= 0) {
            localChannels.channels[existingIdx] = ch;
          } else {
            localChannels.channels.push(ch);
            importedChannelsCount++;
          }
        }
      }

      if (!localChannels.activeChannelId && rcChannelsData.activeChannelId) {
        localChannels.activeChannelId = rcChannelsData.activeChannelId;
      } else if (!localChannels.activeChannelId && localChannels.channels.length > 0) {
        localChannels.activeChannelId = localChannels.channels[0].channelId;
      }

      saveChannelsRegistry(localChannels);
    } catch (e) {
      console.error('Error importing RightClips channels:', e);
    }
  }

  return {
    success: true,
    importedCredsCount,
    importedChannelsCount,
    channels: getChannelsRegistry().channels,
    activeChannelId: getChannelsRegistry().activeChannelId,
  };
}

// -------------------------------------------------------------------
// 4. Video & Thumbnail Resolution
// -------------------------------------------------------------------

const SLUG_ALIASES = {
  'kal_tak': ['kal_tak', 'kal_tak_jo_roz_ka_tha'],
  'kal_tak_jo_roz_ka_tha': ['kal_tak', 'kal_tak_jo_roz_ka_tha'],
  'rough_copy': ['rough_copy'],
  'window_seat': ['window_seat'],
  'kacchi_neendein': ['kacchi_neendein', 'kachi_neendein', 'master'],
  'kachi_neendein': ['kacchi_neendein', 'kachi_neendein', 'master'],
  'master': ['kacchi_neendein', 'kachi_neendein', 'master'],
  'dil_reh_gaya': ['dil_reh_gaya', 'dil_reh_gaya_classroom_mein'],
  'dil_reh_gaya_classroom_mein': ['dil_reh_gaya', 'dil_reh_gaya_classroom_mein'],
  'pencil_ke_nishaan': ['pencil_ke_nishaan'],
  'students_life': ['students_life', 'class_ke_baad'],
  'class_ke_baad': ['students_life', 'class_ke_baad'],
  'aakhri_bench': ['aakhri_bench'],
};

function getAliases(slug) {
  const norm = slug.toLowerCase().replace(/-/g, '_');
  const baseNorm = norm.replace(/(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$/i, '');
  const list = SLUG_ALIASES[norm] || SLUG_ALIASES[baseNorm] || [norm, baseNorm];
  return Array.from(new Set(list));
}

function resolveThumbnailPath(filename) {
  if (!filename) return null;

  const rawBase = filename.replace(/\.mp4$/i, '');
  const cleanBase = rawBase.replace(/(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$/i, '').toLowerCase();
  const aliases = getAliases(cleanBase);

  // 1. Primary: Check public/covers/<alias>_thumb.jpg (Standardized canonical storage)
  for (const alias of aliases) {
    for (const name of [`${alias}_thumb.jpg`, `${alias}_thumb.jpeg`, `${alias}_thumb.png`]) {
      const p = path.join(COVERS_DIR, name);
      if (fs.existsSync(p)) return p;
    }
  }

  // 2. Check direct metadata.json thumbnail assignment
  try {
    const meta = getSavedMetadata();
    if (meta[filename] && meta[filename].thumbnail) {
      const declared = meta[filename].thumbnail;
      const directCandidates = [
        path.join(COVERS_DIR, declared),
        path.join(OUT_DIR, declared),
        path.join(ROOT_DIR, declared),
        path.join(STUDIO_DIR, 'public', 'assets', declared),
      ];
      for (const dc of directCandidates) {
        if (fs.existsSync(dc)) return dc;
      }
    }
  } catch (e) {}

  // 3. Check out/ cover files
  for (const alias of aliases) {
    for (const name of [
      `${alias}_cover_16x9.png`,
      `${alias}_cover_16x9.jpg`,
      `${alias}_cover.png`,
      `${alias}_still_landscape.png`,
      `still_${alias}.png`
    ]) {
      const p = path.join(OUT_DIR, name);
      if (fs.existsSync(p)) return p;
    }
  }

  // 4. Fallback default asset
  const defaultAsset = path.join(STUDIO_DIR, 'public', 'assets', 'default_thumb.png');
  if (fs.existsSync(defaultAsset)) return defaultAsset;

  return null;
}

function resolveCoverPaths(filename) {
  if (!filename) {
    return { thumbPath: null, coverSqPath: null, hasThumb: false, hasCoverSq: false, isCustomCover: false };
  }

  const thumbPath = resolveThumbnailPath(filename);
  const rawBase = filename.replace(/\.mp4$/i, '');
  const cleanBase = rawBase.replace(/(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$/i, '').toLowerCase();
  const aliases = getAliases(cleanBase);

  let coverSqPath = null;
  // 1. Check public/covers/<alias>_cover_sq.jpg
  for (const alias of aliases) {
    for (const name of [`${alias}_cover_sq.jpg`, `${alias}_cover_sq.jpeg`, `${alias}_cover_sq.png`]) {
      const p = path.join(COVERS_DIR, name);
      if (fs.existsSync(p)) {
        coverSqPath = p;
        break;
      }
    }
    if (coverSqPath) break;
  }

  // 2. Fallback check out/ cover 1x1
  if (!coverSqPath) {
    for (const alias of aliases) {
      for (const name of [`${alias}_cover_1x1.png`, `${alias}_cover_1x1.jpg`]) {
        const p = path.join(OUT_DIR, name);
        if (fs.existsSync(p)) {
          coverSqPath = p;
          break;
        }
      }
      if (coverSqPath) break;
    }
  }

  const defaultAsset = path.join(STUDIO_DIR, 'public', 'assets', 'default_thumb.png');
  const hasThumb = !!(thumbPath && fs.existsSync(thumbPath) && thumbPath !== defaultAsset);
  const hasCoverSq = !!(coverSqPath && fs.existsSync(coverSqPath));
  const isCustomCover = hasThumb && (thumbPath.includes('public/covers') || thumbPath.includes('_cover_16x9') || thumbPath.includes('_thumb'));

  return {
    thumbPath,
    coverSqPath,
    hasThumb,
    hasCoverSq,
    isCustomCover,
  };
}

function ensureThumbnailWithinLimit(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  // YouTube hard limit is 2,000,000 bytes. Target strictly < 1.85 MB (1,850,000 bytes)
  if ((ext === '.jpg' || ext === '.jpeg') && stat.size <= 1850000) {
    return filePath;
  }

  const tempDir = TOKENS_DIR;
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  const tempCompressed = path.join(tempDir, `comp_${Date.now()}_thumb.jpg`);

  try {
    const pyScript = `
from PIL import Image, ImageOps
import os

img = Image.open(r'''${filePath}''').convert('RGB')
w, h = img.size
if w > 1920 or h > 1080 or (w != 1920 and h != 1080):
    img = ImageOps.fit(img, (1920, 1080), method=Image.Resampling.LANCZOS)

for q in [88, 85, 82, 78, 72]:
    img.save(r'''${tempCompressed}''', format='JPEG', quality=q, optimize=True)
    if os.path.getsize(r'''${tempCompressed}''') <= 1850000:
        break
`;
    execSync(`python3 -c "${pyScript.replace(/\n/g, ' ')}"`);
    if (fs.existsSync(tempCompressed)) {
      const newSize = fs.statSync(tempCompressed).size;
      if (newSize <= 1900000) {
        console.log(`[✓] Compressed thumbnail from ${stat.size} bytes down to ${newSize} bytes: ${tempCompressed}`);
        return tempCompressed;
      }
    }
  } catch (err) {
    console.warn('[!] Thumbnail compression warning:', err.message);
  }

  return filePath;
}

// Helper to get persistent uploads record
function getUploadsRecord() {
  if (fs.existsSync(UPLOADS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(UPLOADS_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading uploads.json:', e);
    }
  }
  return {};
}

function saveUploadsRecord(record) {
  try {
    fs.writeFileSync(UPLOADS_FILE, JSON.stringify(record, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving uploads.json:', e);
  }
}

// Helper to get metadata record
function getSavedMetadata() {
  if (fs.existsSync(METADATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading metadata.json:', e);
    }
  }
  return {};
}

function saveMetadataRecord(record) {
  try {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(record, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving metadata.json:', e);
  }
}

module.exports = {
  STUDIO_DIR,
  ROOT_DIR,
  OUT_DIR,
  CREDENTIALS_DIR,
  CREDENTIALS_FILE,
  TOKENS_DIR,
  CHANNELS_FILE,
  UPLOADS_FILE,
  METADATA_FILE,

  // Credentials
  getCredentialsRegistry,
  saveCredentialsRegistry,
  getCredentialData,
  addCredential,
  deleteCredential,

  // Channels
  getChannelsRegistry,
  saveChannelsRegistry,
  getOAuth2ClientForCredential,
  getOAuth2ClientForChannel,
  registerChannelFromOAuth,
  switchActiveChannel,
  disconnectChannel,
  refreshChannelDetails,

  // Importer
  importFromRightClips,

  COVERS_DIR,

  // Video & Metadata
  resolveThumbnailPath,
  resolveCoverPaths,
  ensureThumbnailWithinLimit,
  getAliases,
  getUploadsRecord,
  saveUploadsRecord,
  getSavedMetadata,
  saveMetadataRecord,
};
