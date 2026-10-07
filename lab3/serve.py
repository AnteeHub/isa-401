"""Optional local static server. Python standard library only."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
root=Path(__file__).resolve().parent
for port in range(8033,8054):
    try:
        server=ThreadingHTTPServer(('127.0.0.1',port),partial(SimpleHTTPRequestHandler,directory=str(root)))
        break
    except OSError: pass
else: raise SystemExit('No free port between 8033 and 8053. Stop an old lab server or use another allowed port.')
print(f'AI Error Explorer: http://127.0.0.1:{port}/index.html\nKeep this terminal open. Ctrl+C to stop.',flush=True)
try: server.serve_forever()
except KeyboardInterrupt: server.server_close()
