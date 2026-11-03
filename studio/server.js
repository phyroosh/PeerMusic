const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { google } = require('googleapis');
const ytManager = require('./youtube_manager');

const app = express();
const PORT = process.env.PORT || 4001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve Static Frontend UI
app.use(express.static(path.join(__dirname, 'public')));
app.use('/out', express.static(ytManager.OUT_DIR));
app.use('/covers', express.static(ytManager.COVERS_DIR));

// Upload State Tracker
let activeUpload = {
  inProgress: false,
  progress: 0,
  stage: 'Idle',
  filename: null,
  result: null,
  error: null,
};

// Suffix stripper and intelligent song name resolution
const SUFFIX_REGEX = /(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$/i;

const SONG_NAME_MAP = {
  'dil_reh_gaya': 'Dil Reh Gaya Classroom Mein',
  'kal_tak': 'Kal Tak Jo Roz Ka Tha',
  'master': 'Kacchi Neendein, Pakke Khwaab',
  'kacchi': 'Kacchi Neendein, Pakke Khwaab',
  'kacchi_neendein': 'Kacchi Neendein, Pakke Khwaab',
  'pencil_ke_nishaan': 'Pencil Ke Nishaan',
  'rough_copy': 'Rough Copy',
  'students_life': 'Class Ke Baad',
  'class_ke_baad': 'Class Ke Baad',
  'window_seat': 'Window Seat',
  'aakhri_bench': 'Aakhri Bench',
};

function getCleanSongName(filename) {
  const rawBase = filename.replace(/\.mp4$/i, '');
  const stripped = rawBase.replace(SUFFIX_REGEX, '').toLowerCase();
  if (SONG_NAME_MAP[stripped]) {
    return SONG_NAME_MAP[stripped];
  }
  const songsDir = path.join(ytManager.ROOT_DIR, 'src', 'songs');
  const norm = stripped.replace(/_/g, '-');
  const directPath = path.join(songsDir, norm, 'timeline.json');
  if (fs.existsSync(directPath)) {
    try {
      const t = JSON.parse(fs.readFileSync(directPath, 'utf8'));
      const tTitle = t.songTitle || t.title;
      if (tTitle) {
        return tTitle.replace(/\s*\([^)]*\)/, '').trim();
      }
    } catch (_) {}
  }
  return stripped.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// -------------------------------------------------------------------
// 1. System & Authentication Endpoints
// -------------------------------------------------------------------

app.get('/api/status', (req, res) => {
  res.json({
    name: 'PeerMusic YouTube Studio',
    version: '1.0.0',
    port: PORT,
    activeUpload: { inProgress: activeUpload.inProgress, filename: activeUpload.filename },
  });
});

app.get('/api/auth-status', async (req, res) => {
  try {
    const reg = ytManager.getChannelsRegistry();
    const credReg = ytManager.getCredentialsRegistry();
    const activeChannel = reg.channels.find((c) => c.channelId === reg.activeChannelId) || reg.channels[0] || null;

    if (activeChannel) {
      // Refresh stats in background
      ytManager.refreshChannelDetails(activeChannel.channelId).catch(() => {});

      return res.json({
        authenticated: true,
        channel: {
          channelId: activeChannel.channelId,
          title: activeChannel.title,
          customUrl: activeChannel.customUrl,
          avatar: `/api/channel-avatar/${activeChannel.channelId}`,
          subscriberCount: activeChannel.subscriberCount || '0',
          videoCount: activeChannel.videoCount || '0',
        },
        channels: reg.channels.map((c) => ({
          channelId: c.channelId,
          title: c.title,
          customUrl: c.customUrl,
          avatar: `/api/channel-avatar/${c.channelId}`,
          subscriberCount: c.subscriberCount || '0',
          videoCount: c.videoCount || '0',
          isActive: c.channelId === reg.activeChannelId,
        })),
        activeChannelId: reg.activeChannelId,
        credentials: credReg.projects,
        activeProjectId: credReg.activeProjectId,
      });
    }

    res.json({
      authenticated: false,
      channel: null,
      channels: [],
      credentials: credReg.projects,
      activeProjectId: credReg.activeProjectId,
    });
  } catch (err) {
    console.error('Error in /api/auth-status:', err.message);
    res.json({ authenticated: false, error: err.message, channels: [] });
  }
});

app.get('/api/channel-avatar/:channelId', async (req, res) => {
  const { channelId } = req.params;
  const reg = ytManager.getChannelsRegistry();
  const channel = reg.channels.find((c) => c.channelId === channelId) || reg.channels[0];

  const cachePath = path.join(ytManager.TOKENS_DIR, `avatar_${channelId}.jpg`);
  if (fs.existsSync(cachePath)) {
    res.setHeader('Content-Type', 'image/jpeg');
    return fs.createReadStream(cachePath).pipe(res);
  }

  if (channel && channel.avatar && channel.avatar.startsWith('http')) {
    try {
      const response = await fetch(channel.avatar);
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        try { fs.writeFileSync(cachePath, buffer); } catch (e) {}
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        return res.send(buffer);
      }
    } catch (e) {
      console.warn('Could not fetch external avatar, falling back to SVG monogram:', e.message);
    }
  }

  // Fallback monogram SVG
  const title = channel && channel.title ? channel.title : 'YT';
  const initial = title.trim().charAt(0).toUpperCase() || 'Y';
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="avGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8A2434" />
          <stop offset="100%" stop-color="#B45309" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#avGrad)" />
      <text x="50" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-weight="900" font-size="44" fill="#FFFFFF" text-anchor="middle">${initial}</text>
    </svg>
  `);
});


app.get('/api/auth-url', (req, res) => {
  try {
    const { credentialId } = req.query;
    const { oauth2Client, credentialId: resolvedCredId } = ytManager.getOAuth2ClientForCredential(
      credentialId,
      PORT
    );

    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    const statePayload = Buffer.from(JSON.stringify({ credentialId: resolvedCredId })).toString('base64');

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
      state: statePayload,
    });

    res.json({ url, credentialId: resolvedCredId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Authorization code missing from Google redirect.');
  }

  let credentialId = null;
  if (req.query.state) {
    try {
      const decoded = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));
      credentialId = decoded.credentialId;
    } catch (e) {}
  }

  try {
    const channel = await ytManager.registerChannelFromOAuth({
      code,
      credentialId,
      port: PORT,
    });

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.title)}&background=8A2434&color=fff`;

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>YouTube Channel Connected - PeerMusic Studio</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: #14120e;
              color: #f5efe6;
            }
            .card {
              background: #1e1b16;
              padding: 40px 48px;
              border-radius: 20px;
              text-align: center;
              box-shadow: 0 20px 50px rgba(0,0,0,0.6);
              border: 1px solid rgba(220,195,150,0.15);
              max-width: 440px;
              width: 90%;
            }
            .avatar {
              width: 76px;
              height: 76px;
              border-radius: 50%;
              margin: 0 auto 16px;
              overflow: hidden;
              border: 3px solid #8A2434;
              box-shadow: 0 0 20px rgba(138,36,52,0.4);
            }
            .avatar img { width: 100%; height: 100%; object-fit: cover; }
            h1 { color: #fdf8e1; margin-bottom: 8px; font-size: 22px; }
            .btn {
              background: #8A2434;
              color: #fff;
              padding: 12px 28px;
              border-radius: 12px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              margin-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="avatar">
              <img src="${channel.avatar || fallbackAvatar}" alt="${channel.title}" />
            </div>
            <h1>🎉 Channel Connected!</h1>
            <p style="font-size: 18px; font-weight: bold; margin: 4px 0;">${channel.title}</p>
            <p style="color: #c9a875; font-family: monospace; font-size: 14px;">${channel.customUrl}</p>
            <p style="color: #9d9487; font-size: 13px;">Returning to PeerMusic YouTube Studio...</p>
            <a href="/" class="btn">Return to Studio</a>
          </div>
          <script>
            setTimeout(() => { window.location.href = '/'; }, 1800);
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send(`<h2>Authentication Failed</h2><p>${err.message}</p><a href="/">Back to Studio</a>`);
  }
});

app.post('/api/channels/switch', (req, res) => {
  const { channelId } = req.body;
  if (!channelId) return res.status(400).json({ error: 'channelId is required' });
  const result = ytManager.switchActiveChannel(channelId);
  res.json(result);
});

app.delete('/api/channels/:channelId', (req, res) => {
  const { channelId } = req.params;
  const result = ytManager.disconnectChannel(channelId);
  res.json(result);
});

app.post('/api/settings/save-secrets', (req, res) => {
  const { jsonContent, name } = req.body;
  if (!jsonContent) {
    return res.status(400).json({ error: 'Please paste client_secrets.json content' });
  }

  try {
    const project = ytManager.addCredential({ name, jsonContent });
    const { oauth2Client, credentialId } = ytManager.getOAuth2ClientForCredential(project.id, PORT);
    const statePayload = Buffer.from(JSON.stringify({ credentialId })).toString('base64');

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      state: statePayload,
    });

    res.json({
      success: true,
      message: `Google credentials "${project.name}" saved!`,
      project,
      authUrl,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/settings/import-rightclips', (req, res) => {
  try {
    const result = ytManager.importFromRightClips();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------------
// 2. Video Catalog & Metadata Endpoints
// -------------------------------------------------------------------

app.get('/api/videos', (req, res) => {
  try {
    const outDir = ytManager.OUT_DIR;
    if (!fs.existsSync(outDir)) {
      return res.json({ videos: [], totalCount: 0, uploadedCount: 0 });
    }

    const savedMetadata = ytManager.getSavedMetadata();
    const uploads = ytManager.getUploadsRecord();
    const files = fs.readdirSync(outDir);
    const videoFiles = files.filter((f) => {
      if (!f.toLowerCase().endsWith('.mp4')) return false;
      const lower = f.toLowerCase();
      // Keep only main release renders; exclude tests, previews, benchmarks
      if (lower.startsWith('test_') || lower.startsWith('verify_') || lower.startsWith('benchmark_') || lower.startsWith('temp_')) {
        return false;
      }
      if (lower.includes('preview') || lower.includes('_test') || lower.includes('test.')) {
        return false;
      }
      if (lower === 'landscape_full.mp4') {
        return false;
      }
      return true;
    });


    const videos = videoFiles.map((filename) => {
      const filePath = path.join(outDir, filename);
      const stats = fs.statSync(filePath);
      const rawBase = filename.replace(/\.mp4$/i, '');
      const cleanName = getCleanSongName(filename);
      const isVertical = filename.toLowerCase().includes('vert') || filename.toLowerCase().includes('short');
      const hook = isVertical ? 'Nostalgic School Memories #Shorts 🎒🎧' : 'Nostalgic School & Student Life Indie';
      const defaultTitle = isVertical
        ? `${cleanName} | ${hook}`
        : `${cleanName} (Official Lyrical Video) | ${hook}`;

      const meta = savedMetadata[filename] || {
        topic: rawBase.replace(SUFFIX_REGEX, ''),
        title: defaultTitle,
        description: `🎵 ${cleanName} — Official Lyrical Video | Student's Studio (@studentstudioseries)\n\n` +
          `A nostalgic tribute to classroom benches, rough copy pages, late-night study sessions, and the friends who became family.\n\n` +
          `────────────────────────────────────────\n` +
          `🎙️ Credits & Archive Notes\n` +
          `• Project: Student's Studio (@studentstudioseries)\n` +
          `• Genre: Hindi Indie / Acoustic Nostalgia / Student Life\n` +
          `• Visuals & Direction: Student's Studio Archive\n\n` +
          `☕ For everyone chasing big dreams with small pockets and late-night cutting chai.\n` +
          `────────────────────────────────────────\n\n` +
          `#HindiIndie #StudentLife #AspirantLife #SchoolMemories #IndianIndieMusic #NostalgicHindiSong #StudentsStudio`,
        tags: [
          cleanName,
          `${cleanName} lyrics`,
          `${cleanName} song`,
          "student's studio",
          'hindi indie song',
          'nostalgic school life song',
          'student life song hindi',
          'aspirant motivation song',
          'jee neet aspirant song',
          'hostel life song hindi',
          'classroom memories song',
          'late night study songs hindi',
          'indian indie music',
          'acoustic hindi song',
          'anuv jain vibe song',
          'college farewell song hindi',
          'hindi lyrical video',
        ],
        categoryId: '10',
        privacyStatus: 'public',
        pinnedComment: `☕ For everyone chasing big dreams with small pockets and late-night cutting chai... Which line from "${cleanName}" hit closest to home for you? ✨`,
      };

      const uploadInfo = uploads[filename] || {};
      const uploaded = !!uploadInfo.uploaded;
      const coverInfo = ytManager.resolveCoverPaths(filename);

      return {
        filename,
        cleanName,
        sizeBytes: stats.size,
        sizeMb: (stats.size / (1024 * 1024)).toFixed(1),
        mtime: stats.mtime,
        isVertical,
        hasThumbnail: coverInfo.hasThumb,
        hasCoverSq: coverInfo.hasCoverSq,
        isCustomCover: coverInfo.isCustomCover,
        thumbnailUrl: coverInfo.hasThumb ? `/api/thumbnail/${encodeURIComponent(filename)}` : null,
        coverSqUrl: coverInfo.hasCoverSq ? `/api/cover-sq/${encodeURIComponent(filename)}` : null,
        metadata: meta,
        uploadInfo: {
          uploaded,
          videoId: uploadInfo.videoId || null,
          youtubeUrl: uploadInfo.youtubeUrl || null,
          publishedAt: uploadInfo.publishedAt || null,
          privacyStatus: uploadInfo.privacyStatus || null,
          isScheduled: !!uploadInfo.isScheduled,
          publishAt: uploadInfo.publishAt || null,
        },
      };
    });

    // Sort: most recently modified first
    videos.sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime());

    const uploadedCount = videos.filter((v) => v.uploadInfo.uploaded).length;

    res.json({
      videos,
      totalCount: videos.length,
      uploadedCount,
    });
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cover-sq/:filename', (req, res) => {
  const { filename } = req.params;
  const coverInfo = ytManager.resolveCoverPaths(filename);

  if (coverInfo.coverSqPath && fs.existsSync(coverInfo.coverSqPath)) {
    const ext = path.extname(coverInfo.coverSqPath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    return fs.createReadStream(coverInfo.coverSqPath).pipe(res);
  }

  res.status(404).send('1:1 square cover not found');
});

app.get('/api/thumbnail/:filename', (req, res) => {
  const { filename } = req.params;
  const thumbPath = ytManager.resolveThumbnailPath(filename);

  if (thumbPath && fs.existsSync(thumbPath)) {
    const ext = path.extname(thumbPath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    res.setHeader('Content-Type', contentType);
    return fs.createReadStream(thumbPath).pipe(res);
  }

  const defaultAsset = path.join(__dirname, 'public', 'assets', 'default_thumb.png');
  if (fs.existsSync(defaultAsset)) {
    res.setHeader('Content-Type', 'image/png');
    return fs.createReadStream(defaultAsset).pipe(res);
  }

  // Fallback SVG
  const isVertical = filename.toLowerCase().includes('vert') || filename.toLowerCase().includes('short');
  const w = isVertical ? 720 : 1280;
  const h = isVertical ? 1280 : 720;
  const rawBase = filename.replace(/\.mp4$/i, '').replace(/_/g, ' ');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B15" />
          <stop offset="50%" stop-color="#8A2434" />
          <stop offset="100%" stop-color="#14120E" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <circle cx="${w / 2}" cy="${h / 2 - 40}" r="60" fill="rgba(201,168,117,0.2)" stroke="#C9A875" stroke-width="3" />
      <polygon points="${w / 2 - 15},${h / 2 - 65} ${w / 2 + 25},${h / 2 - 40} ${w / 2 - 15},${h / 2 - 15}" fill="#EFE8DC" />
      <text x="${w / 2}" y="${h / 2 + 60}" font-family="-apple-system, sans-serif" font-weight="bold" font-size="28" fill="#FAF6EE" text-anchor="middle">${rawBase}</text>
      <text x="${w / 2}" y="${h / 2 + 95}" font-family="-apple-system, sans-serif" font-weight="bold" font-size="14" fill="#C9A875" text-anchor="middle">OFFICIAL LYRICAL VIDEO</text>
    </svg>
  `);
});

// Stream video with HTTP 206 range request support for smooth browser playback
app.get('/api/video-stream/:filename', (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  const filePath = path.join(ytManager.OUT_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Video not found in out/');
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Trigger standalone Python metadata generator to enrich all files
app.post('/api/generate-metadata-auto', (req, res) => {
  const pyScript = path.join(ytManager.ROOT_DIR, 'scripts', 'generate_metadata.py');
  if (!fs.existsSync(pyScript)) {
    return res.status(404).json({ error: 'generate_metadata.py script not found' });
  }

  exec(`python3 "${pyScript}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error executing metadata generator:', stderr || err.message);
      return res.status(500).json({ error: stderr || err.message });
    }
    const freshMetadata = ytManager.getSavedMetadata();
    res.json({
      success: true,
      message: 'Metadata successfully regenerated!',
      metadata: freshMetadata,
    });
  });
});


app.post('/api/save-metadata', (req, res) => {
  const { filename, metadata } = req.body;
  if (!filename || !metadata) {
    return res.status(400).json({ error: 'filename and metadata are required' });
  }

  try {
    const allMeta = ytManager.getSavedMetadata();
    allMeta[filename] = { ...allMeta[filename], ...metadata };
    ytManager.saveMetadataRecord(allMeta);
    res.json({ success: true, metadata: allMeta[filename] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------------
// 3. YouTube Upload Execution & Status
// -------------------------------------------------------------------

app.get('/api/upload-status', (req, res) => {
  res.json(activeUpload);
});

app.post('/api/upload', async (req, res) => {
  const {
    filename,
    title,
    description,
    tags,
    categoryId = '10',
    privacyStatus = 'public',
    publishAt,
    pinnedComment,
    autoPostComment = true,
  } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }

  const safeFilename = path.basename(filename);
  const filePath = path.join(ytManager.OUT_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `Video file ${safeFilename} not found in out/` });
  }

  if (activeUpload.inProgress) {
    return res.status(409).json({ error: 'Another upload is already in progress' });
  }

  const clientObj = ytManager.getOAuth2ClientForChannel();
  if (!clientObj) {
    return res.status(401).json({ error: 'Not authenticated with YouTube. Please connect a channel first.' });
  }

  // Scheduling validation
  const isScheduling = privacyStatus === 'scheduled' || !!publishAt;
  let isoPublishAt = null;
  if (isScheduling) {
    if (!publishAt) {
      return res.status(400).json({ error: 'Future date/time is required for scheduled release.' });
    }
    const schedDate = new Date(publishAt);
    if (isNaN(schedDate.getTime()) || schedDate.getTime() <= Date.now() + 60 * 1000) {
      return res.status(400).json({ error: 'Scheduled time must be at least 2 minutes in the future.' });
    }
    isoPublishAt = schedDate.toISOString();
  }

  // Set active upload state and respond immediately
  activeUpload = {
    inProgress: true,
    progress: 0,
    stage: 'Initializing YouTube API session...',
    filename: safeFilename,
    result: null,
    error: null,
  };

  res.json({ message: 'Upload started', filename: safeFilename });

  // Execute upload asynchronously in background
  (async () => {
    try {
      const youtube = google.youtube({ version: 'v3', auth: clientObj.oauth2Client });
      const fileSize = fs.statSync(filePath).size;

      const statusPayload = { selfDeclaredMadeForKids: false };
      if (isScheduling) {
        statusPayload.privacyStatus = 'private'; // YouTube requirement for scheduled release
        statusPayload.publishAt = isoPublishAt;
      } else {
        statusPayload.privacyStatus = privacyStatus;
      }

      activeUpload.stage = 'Uploading video chunks to YouTube...';

      const tagArray = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Hindi Indie', 'Music Video', 'Lyrical Video'];

      const response = await youtube.videos.insert(
        {
          part: ['snippet', 'status'],
          notifySubscribers: true,
          requestBody: {
            snippet: {
              title: title || safeFilename,
              description: description || '',
              tags: tagArray,
              categoryId: categoryId || '10',
              defaultLanguage: 'hi',
              defaultAudioLanguage: 'hi',
            },
            status: statusPayload,
          },
          media: {
            body: fs.createReadStream(filePath),
          },
        },
        {
          onUploadProgress: (evt) => {
            const pct = Math.min(99, Math.round((evt.bytesRead / fileSize) * 100));
            activeUpload.progress = pct;
            activeUpload.stage = `Uploading: ${pct}% (${(evt.bytesRead / (1024 * 1024)).toFixed(1)}MB / ${(fileSize / (1024 * 1024)).toFixed(1)}MB)`;
          },
        }
      );

      const videoId = response.data.id;
      let thumbnailAttached = false;

      // 2. Attach Custom Thumbnail (< 1.85MB JPEG compliant)
      const thumbPath = ytManager.resolveThumbnailPath(safeFilename);
      if (thumbPath && fs.existsSync(thumbPath)) {
        try {
          activeUpload.stage = 'Validating & attaching compliant thumbnail (< 1.8MB)...';
          const compliantThumb = ytManager.ensureThumbnailWithinLimit(thumbPath);
          console.log(`🖼️ Attaching thumbnail for video ${videoId} from ${compliantThumb}`);
          const thumbExt = path.extname(compliantThumb).toLowerCase();
          const mimeType = thumbExt === '.png' ? 'image/png' : 'image/jpeg';
          await youtube.thumbnails.set({
            videoId,
            media: {
              mimeType,
              body: fs.createReadStream(compliantThumb),
            },
          });
          thumbnailAttached = true;
          console.log('✅ Custom thumbnail attached successfully!');
        } catch (thumbErr) {
          console.warn('⚠️ Thumbnail attachment warning:', thumbErr.message);
        }
      }

      // 3. Post Pinned Discussion Comment
      let commentPosted = false;
      let commentId = null;
      if (autoPostComment && pinnedComment && pinnedComment.trim()) {
        try {
          activeUpload.stage = 'Posting creator discussion comment...';
          const commentRes = await youtube.commentThreads.insert({
            part: ['snippet'],
            requestBody: {
              snippet: {
                videoId,
                topLevelComment: {
                  snippet: {
                    textOriginal: pinnedComment.trim(),
                  },
                },
              },
            },
          });
          commentId = commentRes.data?.id || null;
          commentPosted = true;
          console.log('✅ Creator discussion comment posted successfully! ID:', commentId);
        } catch (comErr) {
          console.warn('⚠️ Comment post warning:', comErr.message);
        }
      }

      // 4. Save upload record
      const youtubeUrl = `https://youtu.be/${videoId}`;
      const isVertical = safeFilename.toLowerCase().includes('vert') || safeFilename.toLowerCase().includes('short');
      const shortsUrl = isVertical ? `https://youtube.com/shorts/${videoId}` : youtubeUrl;

      const uploadRecord = {
        uploaded: true,
        videoId,
        youtubeUrl: isVertical ? shortsUrl : youtubeUrl,
        shortsUrl,
        title: response.data.snippet.title,
        privacyStatus: isScheduling ? 'scheduled' : response.data.status.privacyStatus,
        publishAt: isoPublishAt,
        isScheduled: isScheduling,
        publishedAt: response.data.snippet.publishedAt || new Date().toISOString(),
        thumbnailAttached,
        commentPosted,
        commentId,
      };

      const uploads = ytManager.getUploadsRecord();
      uploads[safeFilename] = uploadRecord;
      ytManager.saveUploadsRecord(uploads);

      activeUpload.inProgress = false;
      activeUpload.progress = 100;
      activeUpload.stage = `🎉 Upload Complete! Live at ${uploadRecord.youtubeUrl}`;
      activeUpload.result = uploadRecord;
      console.log('✅ Video upload completed successfully:', uploadRecord);
    } catch (uploadErr) {
      console.error('❌ Upload execution error:', uploadErr);
      activeUpload.inProgress = false;
      let msg = uploadErr.message || 'Upload failed';
      if (msg.toLowerCase().includes('invalid_grant')) {
        msg = 'YouTube OAuth token expired. Please reconnect your channel in Settings.';
      }
      activeUpload.error = msg;
    }
  })();
});

// Standalone Push Thumbnail to Live Video Endpoint
app.post('/api/youtube/thumbnail', async (req, res) => {
  try {
    const { videoId, filename } = req.body;
    if (!videoId && !filename) {
      return res.status(400).json({ error: 'videoId or filename is required' });
    }

    const uploads = ytManager.getUploadsRecord();
    let targetVideoId = videoId;
    let targetFilename = filename;

    if (!targetFilename && targetVideoId) {
      const foundKey = Object.keys(uploads).find((k) => uploads[k].videoId === targetVideoId);
      if (foundKey) targetFilename = foundKey;
    }

    if (!targetVideoId && targetFilename) {
      if (uploads[targetFilename] && uploads[targetFilename].videoId) {
        targetVideoId = uploads[targetFilename].videoId;
      }
    }

    if (!targetVideoId) {
      return res.status(400).json({ error: 'Video is not yet published on YouTube (missing videoId)' });
    }

    const clientObj = ytManager.getOAuth2ClientForChannel();
    if (!clientObj) {
      return res.status(401).json({ error: 'Not authenticated with YouTube. Please connect your channel in Settings.' });
    }

    const thumbPath = ytManager.resolveThumbnailPath(targetFilename || targetVideoId);
    if (!thumbPath || !fs.existsSync(thumbPath)) {
      return res.status(404).json({ error: 'No thumbnail found for this video' });
    }

    const compliantThumb = ytManager.ensureThumbnailWithinLimit(thumbPath);
    const thumbExt = path.extname(compliantThumb).toLowerCase();
    const mimeType = thumbExt === '.png' ? 'image/png' : 'image/jpeg';

    const youtube = google.youtube({ version: 'v3', auth: clientObj.oauth2Client });
    console.log(`📡 Pushing thumbnail for video ${targetVideoId} from ${compliantThumb}...`);

    await youtube.thumbnails.set({
      videoId: targetVideoId,
      media: {
        mimeType,
        body: fs.createReadStream(compliantThumb),
      },
    });

    if (targetFilename && uploads[targetFilename]) {
      uploads[targetFilename].thumbnailAttached = true;
      ytManager.saveUploadsRecord(uploads);
    }

    console.log(`✅ Thumbnail updated successfully for live video ${targetVideoId}`);
    res.json({
      success: true,
      videoId: targetVideoId,
      filename: targetFilename,
      thumbnailAttached: true,
      message: 'Thumbnail successfully updated on YouTube!',
    });
  } catch (err) {
    console.error('Error updating live thumbnail:', err);
    res.status(500).json({ error: err.message });
  }
});

// Upload or Swap Thumbnail directly from Studio UI
app.post('/api/upload-thumbnail', (req, res) => {
  try {
    const { filename, imageBase64 } = req.body;
    if (!filename || !imageBase64) {
      return res.status(400).json({ error: 'filename and imageBase64 are required' });
    }

    const cleanData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanData, 'base64');
    const rawBase = filename.replace(/\.mp4$/i, '');
    const cleanBase = rawBase.replace(/(_(master|landscape|vertical|short|shorts|fast|slowed|final|render|v\d+|preview|test))+$/i, '').toLowerCase();

    const destPath = path.join(ytManager.COVERS_DIR, `${cleanBase}_thumb.jpg`);
    fs.writeFileSync(destPath, buffer);

    const compliantPath = ytManager.ensureThumbnailWithinLimit(destPath);
    if (compliantPath !== destPath && fs.existsSync(compliantPath)) {
      fs.copyFileSync(compliantPath, destPath);
      try { fs.unlinkSync(compliantPath); } catch (e) {}
    }

    res.json({
      success: true,
      message: 'Thumbnail uploaded and optimized successfully!',
      thumbnailUrl: `/api/thumbnail/${encodeURIComponent(filename)}?t=${Date.now()}`,
    });
  } catch (err) {
    console.error('Error uploading thumbnail:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🎵 PeerMusic YouTube Studio Server Running!`);
  console.log(`📡 Localhost UI: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
