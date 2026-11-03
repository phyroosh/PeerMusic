#!/usr/bin/env bash
set -e

# ===================================================================
# 🎵 PeerMusic YouTube Studio Launcher
# ===================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PATH="$HOME/.local/bin:$PATH"

if ! command -v node >/dev/null 2>&1; then
    echo -e "${RED}[ERROR] Node.js is not found in PATH!${NC}"
    exit 1
fi

PORT="${PORT:-4001}"
export PORT

echo -e "${CYAN}===================================================================${NC}"
echo -e "${BOLD}🎵 PeerMusic YouTube Studio & Localhost Uploader${NC}"
echo -e "${CYAN}===================================================================${NC}"
echo -e "Local URL:  ${CYAN}${BOLD}http://localhost:${PORT}${NC}"
echo -e "Press ${BOLD}Ctrl+C${NC} at any time to stop the server."
echo ""

# Auto open browser in background
if command -v xdg-open >/dev/null 2>&1; then
    (sleep 1.2 && xdg-open "http://localhost:${PORT}" >/dev/null 2>&1) &
fi

exec node studio/server.js
