import re
from pathlib import Path

path = Path('src/app/size-guide.jsx')
text = path.read_text(encoding='utf-8')
text = re.sub(r'(?<!Name)class="', 'className="', text)
text = re.sub(r'(?<!\w)colspan="', 'colSpan="', text)
text = text.replace(' style={{ overflowX: "auto", }}', ' className="overflow-x-auto"')
text = text.replace(' style={{ overflowX: "auto" }}', ' className="overflow-x-auto"')
text = text.replace(' node="[object Object]"', '')
text = re.sub(r'<table(?![^>]*className)', '<table className="min-w-full divide-y divide-slate-200 bg-white text-sm shadow-sm ring-1 ring-slate-200 rounded-xl"', text)
text = re.sub(r'<thead(?![^>]*className)', '<thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500"', text)
text = re.sub(r'<tbody(?![^>]*className)', '<tbody className="divide-y divide-slate-200 bg-white"', text)
text = re.sub(r'<th(?![^>]*className)', '<th className="px-3 py-2 font-semibold text-left border-b border-slate-200"', text)
text = re.sub(r'<td(?![^>]*className)', '<td className="px-3 py-2 border-b border-slate-200"', text)
text = re.sub(r'(className="[^"]+")\s+className="[^"]+"', lambda m: m.group(1), text)
if 'className="space-y-8 bg-slate-50 py-8"' not in text:
    text = text.replace('<div>', '<div className="space-y-8 bg-slate-50 py-8">', 1)
path.write_text(text, encoding='utf-8')
print('updated')
