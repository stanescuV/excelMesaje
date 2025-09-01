const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const filePath = path.join(__dirname, '14.xlsx');
const workbook = XLSX.readFile(filePath);

const get = (ws, addr) => (ws[addr] ? ws[addr].v : undefined);

function toPercentNumber(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return Math.round(v * 10000) / 100;
  const m = String(v).match(/-?\d+(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(',', '.')) : null;
}

// ✅ List of sheets you want to process
const sheetNames = [
  'ALPHA',
  'TGD',
  'HUDA',
  'CADA',
  'GD',
  'A1',
  'A2',
  'B1-B2',
  'RECYCLERIE',
];

const out = [];

for (const sheetName of sheetNames) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    console.warn(`⚠️ Sheet "${sheetName}" not found in workbook!`);
    continue;
  }

  const ref = sheet['!ref'] || 'A1:A1';
  const range = XLSX.utils.decode_range(ref);

  for (let r = 4; r <= range.e.r + 1; r++) {
    const prenom = get(sheet, `A${r}`);
    const nom = get(sheet, `B${r}`);
    const phone = get(sheet, `C${r}`);
    const hrRaw = get(sheet, `HR${r}`);

    const pourcentagePresence = toPercentNumber(hrRaw);

    if (
      (!prenom || String(prenom).trim() === '') ||
      (!nom || String(nom).trim() === '') ||
      (!phone || String(phone).trim() === '') ||
      (pourcentagePresence == null || pourcentagePresence > 50)
    ) {
      continue;
    }

    out.push({
      nom: nom ?? '',
      prenom: prenom ?? '',
      phone: phone == null ? '' : String(phone).trim().replace('+', ''),
      pourcentagePresence,
    });
  }
}

// console.log(out);
module.exports = out;
