const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const excelData = require('./traitementExcel'); // Use the correct filename without `.js` if it's in same folder

const client = new Client();

client.on('ready', async () => {
  console.log('Client is ready!');

  for (const entry of excelData) {
    const name = entry.nom;
    const prenom = entry.prenom;
    const phone = entry.phone;
    const pourcentagePresence = entry.pourcentagePresence;

    const chatId = `${phone}@c.us`;

    try {
      await client.sendMessage(
        chatId,
        `Bonjour ${name} ${prenom}, votre pourcentage de présence est inférieur à 50%(${pourcentagePresence}%). Si vous ne l'améliorez pas vous risquez d'être exlus du cours. Merci de votre compréhension. Mircea STANESCU`
      );
      console.log(`Message envoyé à ${phone}`);
    } catch (err) {
      console.error(`Erreur avec ${phone}:`, err.message);
    }
  }
});


client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();


