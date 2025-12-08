const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;

// CORS proxy pro Google Sheets CSV - s podporou redirectů
function fetchSheetsCsv(sheetId, callback) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const options = {
    maxRedirects: 5,
  };

  https.get(url, options, (res) => {
    // Pokud je redirect (301, 302, 307, 308)
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('📍 Redirect na:', res.headers.location);
      https.get(res.headers.location, (redirectRes) => {
        let data = '';
        redirectRes.on('data', chunk => data += chunk);
        redirectRes.on('end', () => callback(null, data));
      }).on('error', (err) => callback(err));
      return;
    }

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, data));
  }).on('error', (err) => callback(err));
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // CSV API endpoint
  if (req.url === '/api/sheets-data') {
    const sheetId = '1DWC_T3KfRb1HPZCMeQRtzz-iKh9mo-90ZYR9Ji51pRs';
    fetchSheetsCsv(sheetId, (err, data) => {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Chyba při načítání dat' }));
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
    return;
  }

  // Serve HTML
  if (req.url === '/' || req.url === '/dashboard.html') {
    fs.readFile(path.join(__dirname, 'dashboard.html'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Dashboard nenalezen');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n✨ Glowee Dashboard spuštěn!\n`);
  console.log(`📱 Otevři v prohlížeči: http://localhost:${PORT}`);
  console.log(`\n(Stiskni Ctrl+C pro zastavení serveru)\n`);
});
