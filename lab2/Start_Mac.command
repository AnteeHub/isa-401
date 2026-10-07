#!/bin/sh
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 serve.py
else
  echo 'Python 3.10+ is required. Read README.md.'
fi
printf '\nPress Enter to close.'
read lab_reply
