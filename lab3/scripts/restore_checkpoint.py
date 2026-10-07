"""Restore completed modules only, backing up student work first."""
import argparse, shutil
from pathlib import Path
from datetime import datetime
parser=argparse.ArgumentParser();parser.add_argument('--after',type=int,choices=[1,2],required=True);args=parser.parse_args()
root=Path(__file__).resolve().parents[1];backup=root/'backups'/datetime.now().strftime('%Y%m%d-%H%M%S-%f');backup.mkdir(parents=True)
for name in ['views.js','progress.js'][:args.after]:
    p=root/'student'/name
    if p.exists():shutil.copy2(p,backup/name)
    shutil.copy2(root/'reference'/name,p)
print(f'Restored modules through Task {args.after}. Backup: {backup}\nRefresh student.html.')
