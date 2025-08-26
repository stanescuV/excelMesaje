const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const filePath = path.join(__dirname, '14');
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const get = (ws, addr) => (ws[addr] ? ws[addr].v : undefined);

function toPercentNumber(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return Math.round(v * 10000) / 100; 
  const m = String(v).match(/-?\d+(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(',', '.')) : null;
}

const ref = sheet['!ref'] || 'A1:A1';
const range = XLSX.utils.decode_range(ref);

const out = [];
for (let r = 4; r <= range.e.r + 1; r++) {
  const prenom = get(sheet, `A${r}`);
  const nom = get(sheet, `B${r}`);
  const phone = get(sheet, `C${r}`);
  const hrRaw = get(sheet, `HR${r}`);

  const pourcentagePresence = toPercentNumber(hrRaw);

  // ✅ Skip rows where ALL fields are empty OR pourcentagePresence is null
  if (
    (!prenom || String(prenom).trim() === '') ||
    (!nom || String(nom).trim() === '') ||
    (!phone || String(phone).trim() === '') ||
    //ASTA E ZONA DE FILTRARE, AIA CARE AU MAI MULT DE 50% SUNT EXCLUSE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

console.log(out);
module.exports = out;
