import fs from 'fs';

function fix(path) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const s = data.modules.find((m) => m.id === 9).slides.find((x) => x.id === 93);
  for (const sec of s.content.sections) {
    if (typeof sec.body === 'string') {
      // literal backslash-n → real newline
      sec.body = sec.body.split('\\n').join('\n');
    }
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  const sample = s.content.sections[1].body;
  console.log(path, [...sample].filter((c) => c === '\n').length, 'newlines');
}

fix('src/data/modules.json');
fix('src/data/modules-en-m7-m9.json');
