// Optional static server. Node built-ins only.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.md':'text/plain; charset=utf-8','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});}catch{res.writeHead(400);res.end('Bad request');}});
let port=8033;server.on('error',e=>{if(e.code==='EADDRINUSE'&&port<8053)server.listen(++port,'127.0.0.1');else{console.error(e.message);process.exitCode=1;}});server.on('listening',()=>console.log(`AI Error Explorer: http://127.0.0.1:${port}/index.html\nKeep this terminal open. Ctrl+C to stop.`));server.listen(port,'127.0.0.1');
