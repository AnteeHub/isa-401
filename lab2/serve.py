#!/usr/bin/env python3
"""Serve only this reference folder on loopback, with video range support."""
from __future__ import annotations
import argparse
import functools
import http.server
from pathlib import Path
import re
import threading
import webbrowser

ROOT = Path(__file__).resolve().parent

class ReferenceHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".js":"text/javascript", ".mjs":"text/javascript", ".json":"application/json", ".mp4":"video/mp4", ".svg":"image/svg+xml"}
    def log_message(self, format, *args):
        if args and str(args[1] if len(args)>1 else '').startswith(('4','5')):
            super().log_message(format, *args)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        self.remaining = None
        path = Path(self.translate_path(self.path))
        if path.is_dir() or not path.is_file():
            return super().send_head()
        size = path.stat().st_size
        raw = self.headers.get('Range')
        start, end = 0, size-1
        if raw:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', raw.strip())
            try:
                if not match or not any(match.groups()):
                    raise ValueError()
                a,b=match.groups()
                if a:
                    start=int(a);end=min(int(b),size-1) if b else size-1
                else:
                    count=int(b)
                    if count<=0:raise ValueError()
                    start=max(0,size-count)
                if start>=size or start>end:raise ValueError()
            except ValueError:
                self.send_response(416)
                self.send_header('Content-Range',f'bytes */{size}')
                self.send_header('Content-Length','0')
                self.end_headers()
                return None
        try:
            stream=path.open('rb')
        except OSError:
            self.send_error(404,'File unavailable')
            return None
        self.send_response(206 if raw else 200)
        self.send_header('Content-Type',self.guess_type(str(path)))
        self.send_header('Accept-Ranges','bytes')
        self.send_header('Content-Length',str(end-start+1))
        if raw:self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
        self.end_headers()
        stream.seek(start)
        self.remaining=end-start+1
        return stream

    def copyfile(self, source, outputfile):
        if self.remaining is None:
            return super().copyfile(source,outputfile)
        try:
            remaining=self.remaining
            while remaining>0:
                block=source.read(min(65536,remaining))
                if not block:break
                outputfile.write(block);remaining-=len(block)
        except (BrokenPipeError,ConnectionResetError):
            pass  # Normal when the viewer seeks and abandons an earlier request.

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port',type=int,default=8000)
    parser.add_argument('--no-browser',action='store_true')
    args=parser.parse_args()
    if not (ROOT/'TASK3/video and data-api/index.html').is_file():
        parser.exit(1,'Missing classroom files. Extract the complete materials ZIP.\n')
    handler=functools.partial(ReferenceHandler,directory=str(ROOT))
    try:
        server=http.server.ThreadingHTTPServer(('127.0.0.1',args.port),handler)
    except OSError:
        if args.port!=8000:raise
        server=http.server.ThreadingHTTPServer(('127.0.0.1',0),handler)
    url=f'http://127.0.0.1:{server.server_port}/'
    print(f'\nClassroom materials: {url}',flush=True)
    for label,path in [('TASK2 optional starter','TASK2/optional-starter/'),('TASK2 optional reference','TASK2/optional-reference/'),('TASK3 video and data API','TASK3/video%20and%20data-api/'),('TASK3 reference','TASK3/reference/'),('SwimComposer source','SwimComposer-reference-source/swimcomposer/')]:
        print(f'{label}: {url}{path}',flush=True)
    print('Keep this terminal open. Ctrl+C stops the server.\n',flush=True)
    if not args.no_browser:
        timer=threading.Timer(.4,lambda:webbrowser.open(url,new=2));timer.daemon=True;timer.start()
    try:server.serve_forever()
    except KeyboardInterrupt:print('\nStopped.')
    finally:server.server_close()

if __name__=='__main__':main()
