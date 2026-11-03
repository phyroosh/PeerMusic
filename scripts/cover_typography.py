#!/usr/bin/env python3
"""
PeerMusic - AI Cover Art & Thumbnail Typography Engine
=====================================================
Stage B renderer: Transforms clean, text-free cinematic artwork into
editorial, typography-rich song covers and YouTube thumbnails.

Key capabilities:
1. Editorial Serif Typography: High-contrast Roman/Didone serif main titles
   and warm gold italic subtitles inspired by classic music single releases.
2. Bilingual Script Support: Automatically detects and renders Latin / English,
   Romanized Hindi, and Devanagari Hindi using system Noto Serif fonts.
3. Dual-Pass Atmospheric Shadows: Restrained Gaussian drop shadows and subtle
   feathered scrim for crisp legibility over bright or complex backgrounds
   without ugly cards, boxes, or capsules.
4. Intelligent Composition & Negative-Space Detection: Analyzes quadrant edge
   density and luminance to place typography in dedicated negative space
   opposite the main subject (UPPER-RIGHT, UPPER-LEFT, AUTO, etc.).
5. Vintage Indie Record Label Emblem: Vector-composited circular vinyl record
   badge with grooved concentric rings and clean micro-typography.
"""

import os
import re
import math
from typing import Dict, Any, Optional, Tuple, List
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

# System font search paths
FONT_SEARCH_PATHS = [
    # Latin / Roman Serif
    ("/usr/share/fonts/google-noto/NotoSerif-Bold.ttf", "latin_bold"),
    ("/usr/share/fonts/google-noto/NotoSerif-SemiBold.ttf", "latin_semibold"),
    ("/usr/share/fonts/google-noto/NotoSerif-Regular.ttf", "latin_regular"),
    ("/usr/share/fonts/liberation-serif-fonts/LiberationSerif-Bold.ttf", "latin_bold"),
    ("/usr/share/fonts/liberation-serif-fonts/LiberationSerif-Regular.ttf", "latin_regular"),
    # Latin Italic
    ("/usr/share/fonts/google-noto/NotoSerif-Italic.ttf", "latin_italic"),
    ("/usr/share/fonts/google-noto/NotoSerif-BoldItalic.ttf", "latin_bold_italic"),
    ("/usr/share/fonts/liberation-serif-fonts/LiberationSerif-Italic.ttf", "latin_italic"),
    ("/usr/share/fonts/liberation-serif-fonts/LiberationSerif-BoldItalic.ttf", "latin_bold_italic"),
    # Devanagari Serif
    ("/usr/share/fonts/google-noto-vf/NotoSerifDevanagari[wght].ttf", "deva_bold"),
    ("/usr/share/fonts/google-noto-vf/NotoSansDevanagari[wght].ttf", "deva_bold"),
    ("/usr/share/fonts/google-droid-sans-fonts/DroidSansDevanagari-Regular.ttf", "deva_bold"),
]

# Color Palette inspired by Reference Image 2
COLOR_TITLE = (250, 243, 221)        # Warm Ivory / Cream (#FAF3DD)
COLOR_SUBTITLE = (203, 162, 106)     # Warm Amber / Honey Gold (#CBA26A)
COLOR_SHADOW_WIDE = (12, 10, 8, 175) # Warm dark ambient tone
COLOR_SHADOW_SHARP = (8, 6, 4, 215)  # Direct directional shadow
COLOR_BADGE = (235, 225, 205)        # Muted ivory/gold for emblem


def has_devanagari(text: str) -> bool:
    """Checks if text contains Devanagari Unicode characters."""
    return bool(re.search(r"[\u0900-\u097F]", text))


def resolve_fonts(is_devanagari: bool = False) -> Dict[str, str]:
    """Finds best available fonts on the system."""
    fonts = {
        "title": None,
        "subtitle": None,
        "badge": None,
    }

    if is_devanagari:
        for path, tag in FONT_SEARCH_PATHS:
            if tag == "deva_bold" and os.path.exists(path):
                fonts["title"] = path
                fonts["subtitle"] = path
                break

    # Latin fallback or default
    if not fonts["title"]:
        for path, tag in FONT_SEARCH_PATHS:
            if tag == "latin_bold" and os.path.exists(path):
                fonts["title"] = path
                break

    if not fonts["subtitle"]:
        for path, tag in FONT_SEARCH_PATHS:
            if tag == "latin_italic" and os.path.exists(path):
                fonts["subtitle"] = path
                break

    # Badge font (clean small sans or serif)
    for path, tag in FONT_SEARCH_PATHS:
        if os.path.exists(path):
            fonts["badge"] = path
            break

    return fonts


def detect_negative_space(image: Image.Image) -> str:
    """
    Intelligently inspects the image composition using edge density and luminance variance
    to find the quadrant with the cleanest, open negative space (away from the subject).
    Returns: 'UPPER-RIGHT', 'UPPER-LEFT', 'LOWER-RIGHT', or 'LOWER-LEFT'.
    """
    img_gray = image.convert("L").resize((256, 144))
    arr = np.array(img_gray, dtype=float)

    h, w = arr.shape
    mid_y, mid_x = h // 2, w // 2

    # Quadrants: UL, UR, LL, LR
    quadrants = {
        "UPPER-LEFT": arr[0:mid_y, 0:mid_x],
        "UPPER-RIGHT": arr[0:mid_y, mid_x:w],
        "LOWER-LEFT": arr[mid_y:h, 0:mid_x],
        "LOWER-RIGHT": arr[mid_y:h, mid_x:w],
    }

    # Calculate edge complexity in each quadrant using Sobel-like gradients
    scores = {}
    for name, q in quadrants.items():
        gy, gx = np.gradient(q)
        edge_energy = np.mean(np.sqrt(gx**2 + gy**2))
        std_energy = np.std(q)
        # Lowest score = cleanest out-of-focus negative space
        scores[name] = edge_energy + 0.3 * std_energy

    # For cover art, upper quadrants are almost universally preferred unless impossible
    if scores["UPPER-RIGHT"] <= scores["UPPER-LEFT"] * 1.25:
        return "UPPER-RIGHT"
    elif scores["UPPER-LEFT"] < scores["UPPER-RIGHT"] * 0.8:
        return "UPPER-LEFT"

    return min(scores, key=scores.get)


def draw_text_with_tracking(
    draw: ImageDraw.ImageDraw,
    xy: Tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: Tuple[int, ...],
    tracking: int = 3,
) -> int:
    """
    Draws text character by character with refined letter spacing (tracking).
    Returns the total advance width.
    """
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        bbox = font.getbbox(char)
        char_w = bbox[2] - bbox[0]
        x += char_w + tracking
    return x - xy[0] - tracking if text else 0


def measure_text_with_tracking(
    font: ImageFont.FreeTypeFont,
    text: str,
    tracking: int = 3,
) -> Tuple[int, int]:
    """Measures rendered width and height of a line including tracking."""
    if not text:
        return 0, 0
    total_w = 0
    max_h = 0
    for char in text:
        bbox = font.getbbox(char)
        char_w = bbox[2] - bbox[0]
        char_h = bbox[3] - bbox[1]
        total_w += char_w + tracking
        if char_h > max_h:
            max_h = char_h
    return total_w - tracking, max_h


def wrap_title_intelligently(
    title: str,
    font: ImageFont.FreeTypeFont,
    max_width: int,
    tracking: int = 3,
    max_lines: int = 3,
) -> List[str]:
    """
    Wraps title text into 1 to 3 aesthetically balanced lines without orphaned words.
    """
    words = title.strip().split()
    if not words:
        return []

    # If fits on one line, return immediately
    full_w, _ = measure_text_with_tracking(font, title, tracking)
    if full_w <= max_width:
        return [title]

    # If two words, break into two lines
    if len(words) == 2:
        return words

    # If three words, try 2 lines: [word1 + word2, word3] or [word1, word2 + word3]
    if len(words) == 3:
        opt1 = [f"{words[0]} {words[1]}", words[2]]
        opt2 = [words[0], f"{words[1]} {words[2]}"]
        w1_1, _ = measure_text_with_tracking(font, opt1[0], tracking)
        w1_2, _ = measure_text_with_tracking(font, opt1[1], tracking)
        w2_1, _ = measure_text_with_tracking(font, opt2[0], tracking)
        w2_2, _ = measure_text_with_tracking(font, opt2[1], tracking)

        score1 = max(w1_1, w1_2) + abs(w1_1 - w1_2) * 0.4 if max(w1_1, w1_2) <= max_width else 99999
        score2 = max(w2_1, w2_2) + abs(w2_1 - w2_2) * 0.4 if max(w2_1, w2_2) <= max_width else 99999

        if score1 < score2 and score1 < 99999:
            return opt1
        if score2 < 99999:
            return opt2

    # If four words, try 2 lines of 2 words each
    if len(words) == 4:
        opt = [f"{words[0]} {words[1]}", f"{words[2]} {words[3]}"]
        w_1, _ = measure_text_with_tracking(font, opt[0], tracking)
        w_2, _ = measure_text_with_tracking(font, opt[1], tracking)
        if max(w_1, w_2) <= max_width:
            return opt

    # General greedy wrap with balanced line lengths
    lines = []
    current_line = []
    for word in words:
        test_line = " ".join(current_line + [word])
        w, _ = measure_text_with_tracking(font, test_line, tracking)
        if w <= max_width or not current_line:
            current_line.append(word)
        else:
            lines.append(" ".join(current_line))
            current_line = [word]
            if len(lines) >= max_lines - 1:
                break

    if current_line:
        lines.append(" ".join(current_line))

    # If any remaining words overflowed max_lines, append to last line
    idx = sum(len(l.split()) for l in lines)
    if idx < len(words):
        lines[-1] = f"{lines[-1]} {' '.join(words[idx:])}"

    return lines


def draw_vintage_record_badge(
    draw: ImageDraw.ImageDraw,
    shadow_draw: ImageDraw.ImageDraw,
    cx: int,
    cy: int,
    radius: int = 24,
    font_path: Optional[str] = None,
    color: Tuple[int, int, int] = COLOR_BADGE,
) -> None:
    """
    Renders an authentic, miniature vintage indie record label emblem in the corner
    featuring a circular vinyl record with grooved concentric rings and micro-typography.
    """
    # 1. Outer vinyl disc edge
    shadow_draw.ellipse(
        [cx - radius, cy - radius + 2, cx + radius, cy + radius + 2],
        fill=(5, 4, 3, 190),
    )
    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=(18, 16, 15),
        outline=color,
        width=2,
    )

    # 2. Vinyl sound groove rings
    for r in [radius - 4, radius - 7, radius - 10]:
        if r > 4:
            draw.ellipse(
                [cx - r, cy - r, cx + r, cy + r],
                outline=(70, 65, 60),
                width=1,
            )

    # 3. Center record label circle
    label_r = int(radius * 0.42)
    draw.ellipse(
        [cx - label_r, cy - label_r, cx + label_r, cy + label_r],
        fill=color,
        outline=color,
        width=1,
    )

    # 4. Center spindle hole
    hole_r = 3
    draw.ellipse(
        [cx - hole_r, cy - hole_r, cx + hole_r, cy + hole_r],
        fill=(18, 16, 15),
    )

    # 5. Micro-typography below vinyl: "INDIE" / "RECORD LABEL"
    if font_path and os.path.exists(font_path):
        try:
            f_badge = ImageFont.truetype(font_path, 11)
            f_sub = ImageFont.truetype(font_path, 9)

            t1 = "INDIE"
            t2 = "RECORD LABEL"

            w1 = f_badge.getbbox(t1)[2] - f_badge.getbbox(t1)[0]
            w2 = f_sub.getbbox(t2)[2] - f_sub.getbbox(t2)[0]

            y1 = cy + radius + 5
            y2 = y1 + 12

            shadow_draw.text((cx - w1 // 2, y1 + 1), t1, font=f_badge, fill=(5, 4, 3, 200))
            draw.text((cx - w1 // 2, y1), t1, font=f_badge, fill=color)

            shadow_draw.text((cx - w2 // 2, y2 + 1), t2, font=f_sub, fill=(5, 4, 3, 200))
            draw.text((cx - w2 // 2, y2), t2, font=f_sub, fill=(185, 175, 155))
        except Exception:
            pass


def render_cover_typography(
    base_image: Image.Image,
    title: str,
    subtitle: Optional[str] = None,
    negative_space: str = "AUTO",
    aspect_ratio: str = "16x9",
    include_badge: bool = True,
    badge_corner: str = "BOTTOM-RIGHT",
) -> Image.Image:
    """
    Master Stage B compositor.
    Applies elegant editorial serif typography onto a clean, text-free image.
    """
    img = base_image.convert("RGB")
    w, h = img.size

    # Check script
    is_deva = has_devanagari(title) or (subtitle and has_devanagari(subtitle))
    fonts = resolve_fonts(is_devanagari=is_deva)

    # Resolve negative space placement
    pos = negative_space.upper().strip()
    if pos == "AUTO" or not pos:
        pos = detect_negative_space(img)

    # Base typography sizing based on aspect ratio and canvas width
    if aspect_ratio == "16x9":
        # 1920x1080 canvas
        base_title_size = 120
        max_box_width = int(w * 0.48)  # Up to ~920px
        margin_x = int(w * 0.055)      # ~105px
        margin_y = int(h * 0.08)       # ~86px
        tracking = 5 if not is_deva else 1
    else:
        # 1:1 square canvas (1500x1500)
        base_title_size = 110
        max_box_width = int(w * 0.65)  # Up to ~975px
        margin_x = int(w * 0.065)      # ~98px
        margin_y = int(h * 0.08)       # ~120px
        tracking = 4 if not is_deva else 1

    # Format text: uppercase for Latin titles (matching Reference Image 2)
    formatted_title = title.strip().upper() if not is_deva else title.strip()
    formatted_sub = subtitle.strip().upper() if (subtitle and not is_deva) else (subtitle.strip() if subtitle else None)

    # Dynamic font scaling to guarantee elegant proportion
    char_count = len(formatted_title)
    if char_count > 30:
        base_title_size = int(base_title_size * 0.72)
    elif char_count > 20:
        base_title_size = int(base_title_size * 0.82)
    elif char_count > 14:
        base_title_size = int(base_title_size * 0.92)

    # Load fonts
    font_title = ImageFont.truetype(fonts["title"], base_title_size)
    sub_font_size = max(26, int(base_title_size * 0.34))
    font_sub = ImageFont.truetype(fonts["subtitle"], sub_font_size)

    # Wrap title into 1-3 lines
    lines = wrap_title_intelligently(formatted_title, font_title, max_box_width, tracking=tracking)

    # Recalculate if still overflowing
    line_metrics = [measure_text_with_tracking(font_title, l, tracking) for l in lines]
    max_line_w = max(m[0] for m in line_metrics) if line_metrics else 0
    if max_line_w > max_box_width:
        scale_factor = max_box_width / max_line_w
        base_title_size = int(base_title_size * scale_factor)
        font_title = ImageFont.truetype(fonts["title"], base_title_size)
        sub_font_size = max(24, int(base_title_size * 0.34))
        font_sub = ImageFont.truetype(fonts["subtitle"], sub_font_size)
        line_metrics = [measure_text_with_tracking(font_title, l, tracking) for l in lines]
        max_line_w = max(m[0] for m in line_metrics)

    line_spacing = int(base_title_size * 1.16)
    total_title_h = (len(lines) - 1) * line_spacing + (line_metrics[0][1] if line_metrics else base_title_size)

    # Calculate subtitle metrics
    sub_w, sub_h = 0, 0
    sub_gap = int(base_title_size * 0.22)
    if formatted_sub:
        sub_w, sub_h = measure_text_with_tracking(font_sub, formatted_sub, tracking=int(tracking * 0.8))

    total_block_h = total_title_h + (sub_gap + sub_h if formatted_sub else 0)

    # Calculate X, Y origin based on negative space quadrant
    if "RIGHT" in pos:
        x_origin = w - margin_x - max_line_w
    elif "LEFT" in pos:
        x_origin = margin_x
    else:  # CENTER, TOP-MASTHEAD, or MASTHEAD
        x_origin = (w - max_line_w) // 2

    # Vertical positioning: Strictly enforce dedicated negative space (Top Masthead or Lower)
    # NEVER place text across the middle where the subject's face/chest sits
    if "LOWER" in pos:
        y_origin = h - margin_y - total_block_h
    else:  # UPPER default, TOP-MASTHEAD, or fallback
        y_origin = margin_y

    # Transparent render layers
    shadow_wide = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shadow_wide_draw = ImageDraw.Draw(shadow_wide)

    shadow_sharp = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shadow_sharp_draw = ImageDraw.Draw(shadow_sharp)

    text_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    text_draw = ImageDraw.Draw(text_layer)

    # Draw Title Lines
    for i, line in enumerate(lines):
        ly = y_origin + i * line_spacing
        lx = x_origin

        # Wide ambient shadow (soft halo)
        draw_text_with_tracking(shadow_wide_draw, (lx, ly), line, font_title, COLOR_SHADOW_WIDE, tracking=tracking)
        # Sharp directional shadow (crisp depth)
        draw_text_with_tracking(shadow_sharp_draw, (lx, ly + 3), line, font_title, COLOR_SHADOW_SHARP, tracking=tracking)
        # Main lettering in warm ivory/cream
        draw_text_with_tracking(text_draw, (lx, ly), line, font_title, (*COLOR_TITLE, 255), tracking=tracking)

    # Draw Subtitle (if present)
    if formatted_sub:
        sub_y = y_origin + len(lines) * line_spacing + sub_gap
        sub_x = x_origin

        sub_tracking = max(2, int(tracking * 0.75))
        draw_text_with_tracking(shadow_wide_draw, (sub_x, sub_y), formatted_sub, font_sub, COLOR_SHADOW_WIDE, tracking=sub_tracking)
        draw_text_with_tracking(shadow_sharp_draw, (sub_x, sub_y + 2), formatted_sub, font_sub, COLOR_SHADOW_SHARP, tracking=sub_tracking)
        draw_text_with_tracking(text_draw, (sub_x, sub_y), formatted_sub, font_sub, (*COLOR_SUBTITLE, 255), tracking=sub_tracking)

    # Draw Vintage Indie Record Label Badge
    if include_badge:
        badge_r = 22 if aspect_ratio == "16x9" else 20
        badge_margin = 85
        if badge_corner == "BOTTOM-RIGHT":
            badge_cx = w - badge_margin
            badge_cy = h - badge_margin - 10
        elif badge_corner == "BOTTOM-LEFT":
            badge_cx = badge_margin
            badge_cy = h - badge_margin - 10
        else:
            badge_cx = w - badge_margin
            badge_cy = h - badge_margin - 10

        draw_vintage_record_badge(
            draw=text_draw,
            shadow_draw=shadow_sharp_draw,
            cx=badge_cx,
            cy=badge_cy,
            radius=badge_r,
            font_path=fonts["badge"],
            color=COLOR_BADGE,
        )

    # Blur shadows
    blurred_wide = shadow_wide.filter(ImageFilter.GaussianBlur(16))
    blurred_sharp = shadow_sharp.filter(ImageFilter.GaussianBlur(5))

    # Alpha composite: base -> wide shadow -> sharp shadow -> text layer
    comp = Image.alpha_composite(img.convert("RGBA"), blurred_wide)
    comp = Image.alpha_composite(comp, blurred_sharp)
    comp = Image.alpha_composite(comp, text_layer)

    return comp.convert("RGB")
