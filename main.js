const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const excelData = require('./traitementExcel'); // Use the correct filename without `.js` if it's in same folder

// const client = new Client();

// client.on('ready', async () => {
//   console.log('Client is ready!');
//   const phoneNumber = '3354545454'; //exemple

//   const chatId = `${phoneNumber}@c.us`;

//   const chat = await client.getChatById(chatId);

//   chat.sendMessage("Bonjour")
  
// });

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.initialize();


excelData.forEach(entry => {
  const name = entry.nom;
  const percent = entry.prenom;
  const phone = entry.telephone;
  const pourcentagePresence = entry.pourcentagePresence;


  console.log(`📞 Sending ${percent}% offer to ${name} at ${phone}`);
});

