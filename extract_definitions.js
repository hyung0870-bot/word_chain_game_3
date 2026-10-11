const https = require('https');
const fs = require('fs');

const commonTarget = new Set(JSON.parse(fs.readFileSync('common_target.json', 'utf8')));
['고민', '민소', '소상', '기러기', '토마토', '스위스', '오디오', '수수', '지뢰', '하늘', '바다', '과자', '기차', '사과', '바나나'].forEach(w => commonTarget.add(w));

console.log('Target words count:', commonTarget.size);
const results = {};

function processUrl(url) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let buf = '';
      res.on('data', chunk => {
        buf += chunk;
        let idx;
        while ((idx = buf.indexOf('\n')) !== -1) {
          const line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.includes("'word':")) {
            for (const word of commonTarget) {
              const needle = "'word': '" + word + "'";
              if (!results[word] && line.includes(needle)) {
                try {
                  const obj = eval('(' + line + ')');
                  if (obj && obj.word === word && obj.raw) {
                    let text = obj.raw.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
                    let def = text.replace(/^[^\［]+/, '')
                      .replace(/［명사］/g, '')
                      .replace(/［[^］]+］/g, '')
                      .replace(/【[^】]+】/g, '')
                      .replace(/▮[^▮]+▮/g, '')
                      .replace(/《[^》]+》/g, '')
                      .trim();
                    def = def.replace(/❖예문.*$/, '').trim();
                    const firstSent = def.split('❖')[0].split('. ')[0].trim();
                    if (firstSent.length > 2) {
                      results[word] = firstSent.endsWith('.') ? firstSent : firstSent + '.';
                    }
                  }
                } catch(e) {}
              }
            }
          }
        }
      });
      res.on('end', () => resolve());
    }).on('error', () => resolve());
  });
}

async function run() {
  console.log('Scanning dictionary 1...');
  await processUrl('https://raw.githubusercontent.com/acidsound/korean_wordlist/master/korean_dictionary1.json');
  console.log('Found so far:', Object.keys(results).length);
  console.log('Scanning dictionary 2...');
  await processUrl('https://raw.githubusercontent.com/acidsound/korean_wordlist/master/korean_dictionary2.json');
  console.log('Total found:', Object.keys(results).length);
  console.log('고민:', results['고민']);
  console.log('소상:', results['소상']);
  console.log('사과:', results['사과']);
  fs.writeFileSync('korean_definitions.json', JSON.stringify(results), 'utf8');
  console.log('Done.');
}

run();
