const tools42 = require('../library/tools42')
const dbEsterno = require('better-sqlite3')('./data/datiEsterni.db');
const fs = require('fs');

/* AWS Config */
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const { log } = require('console');
const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};
/* Create SES service object & declare function 4 send email */
const sesClient = new SESClient(SES_CONFIG);

const sendEmailAws = async (destinatario, htmlData, txtData, oggetto) => {
  let params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [
        destinatario
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlData
        },
        Text: {
          Charset: "UTF-8",
          Data: txtData
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: oggetto,
      }
    },
  };
  const sendEmailCommand = new SendEmailCommand(params);
  try {
    const data = await sesClient.send(sendEmailCommand);
    return data;
  }
  catch (err) {
    throw new Error (err);
  }
}

/* funzioni di validazione */
function validateEmail(inputText) {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(inputText.match(mailformat)) { return true }
  else { return false }
} 


function validateFields(azienda, nome, telefono) {
  if (azienda =="" || nome=="" || telefono=="" ) {return false }
  else { return true }
}

const homeIndex = (req, res) => { 
  const metaJson = require (`../data/Meta/index-${lang}.json`);
  const meta = tools42.generateMeta(metaJson);
  const testimonianze = require (`../data/Testimonianze/Testimonianze-${lang}.json`);
  const clienti = require (`../data/Clienti/Clienti-${lang}.json`);
  res.render(`index-${lang}`, {meta, testimonianze, clienti});
}

const chiSono = (req, res) => {
  const metaJson = require (`../data/Meta/chiSono-${lang}.json`);
  const meta = tools42.generateMeta(metaJson);
  const titolo = "Più di 20 anni trascorsi in un lampo"
  const chiSono = require (`../data/ChiSono/ChiSono-${lang}.json`);
  res.render(`chiSono-${lang}`, {meta, titolo, chiSono});
}

const lavoriamoInsieme = (req, res) => {
  const metaJson = require (`../data/Meta/lavoriamoInsieme-${lang}.json`);
  const meta = tools42.generateMeta(metaJson);
  const titolo = "Come possiamo collaborare";
  const FaqSx = require (`../data/LavoriamoInsieme/FaqSx-${lang}.json`);
  const FaqDx = require (`../data/LavoriamoInsieme/FaqDx-${lang}.json`);
  res.render(`lavoriamoInsieme-${lang}`, {meta, titolo, FaqDx, FaqSx});
}

const contattami = (req, res) => {
  let motivo = "Motivo per il quale mi contatti";
  if (req.query.motivo) { motivo = req.query.motivo; }
  const metaJson = require (`../data/Meta/contattami-${lang}.json`);
  const meta = tools42.generateMeta(metaJson);
  const titolo = "Se ti va, entriamo in contatto!";
  res.render(`contattami-${lang}`, {meta, titolo, motivo});
}

const matchbrand = (req, res) => {
  const metaJson = require (`../data/Meta/matchbrand-${lang}.json`);
  const meta = tools42.generateMeta(metaJson);
  const titolo = ""
  res.render(`matchbrand-${lang}`, {meta, titolo});
}

const cookiePolicy = (req, res) => {
  const titolo = "Cookie Policy";
  res.render(`cookiePolicy-${lang}`, {titolo});
}


const invioModuloContatti = (req, res) => {  

  const email = req.body.email; 
  // DEBUG email errore
  //const email = "mailsbagliata"; 
  const azienda = req.body.azienda;
  const nome = req.body.nome;
  const motivo = req.body.motivo;
  const telefono = req.body.telefono;
  const messaggio = req.body.messaggio;

  // traduzioni errori easy easy
  var mailKo = {it: "Purtroppo si è verificato un errore con l'email :( Potresti segnarcelo a info@fboschetti.it? Grazie!", en :"Unfortunately there was an error with the email :( Could you please send email at info@fboschetti.it? Thanks!"}
  var fileldsKo = {it: "Purtroppo si è verificato un errore nei campi obbligatori. Potresti segnarcelo a info@fboschetti.it? Grazie!", en :"Unfortunately there was an error with the mandatory fields :( Could you please send email at info@fboschetti.it? Thanks!!"}
  var sendOk = {it: "Messaggio inviato correttamente", en :"Message sent successfully"}


   // Template Admin
   var emailOggetto = "Nuova richiesta di contatto";
   var emailTxt = fs.readFileSync (`data/transEmail/moduloContatti/Admin.txt`, 'utf8');
   var emailHtml = fs.readFileSync (`data/transEmail/moduloContatti/Admin.html`, 'utf8');
 
   // inserisci dati nei template
   emailHtml = emailHtml.replace(/\|\*azienda\*\|/g, azienda);
   emailHtml = emailHtml.replace(/\|\*nome\*\|/g, nome);
   emailHtml = emailHtml.replace(/\|\*telefono\*\|/g, telefono);
   emailHtml = emailHtml.replace(/\|\*email\*\|/g, email);
   emailHtml = emailHtml.replace(/\|\*motivo\*\|/g, motivo);
   emailHtml = emailHtml.replace(/\|\*messaggio\*\|/g, messaggio);
   emailHtml = emailHtml.replace(/\|\*data\*\|/g,  tools42.getDateTime());
 
   emailTxt = emailTxt.replace(/\|\*azienda\*\|/g, azienda);
   emailTxt = emailTxt.replace(/\|\*nome\*\|/g, nome);
   emailTxt = emailTxt.replace(/\|\*telefono\*\|/g, telefono);
   emailTxt = emailTxt.replace(/\|\*email\*\|/g, email);
   emailTxt = emailTxt.replace(/\|\*motivo\*\|/g, motivo);
   emailTxt = emailTxt.replace(/\|\*messaggio\*\|/g, messaggio);
   emailTxt = emailTxt.replace(/\|\*data\*\|/g,  tools42.getDateTime());

   // Template Utente
   var emailOggettoUtente = {it: "FRANCESCO BOSCHETTI: Richiesta da modulo contatti", en: "FRANCESCO BOSCHETTI: Request from contact form"};
   var emailTxtUtente = fs.readFileSync (`data/transEmail/moduloContatti/Utente-${lang}.txt`, 'utf8');
   var emailHtmlUtente = fs.readFileSync (`data/transEmail/moduloContatti/Utente-${lang}.html`, 'utf8');
 
   // inserisci dati nei template
   emailHtmlUtente = emailHtmlUtente.replace(/\|\*azienda\*\|/g, azienda);
   emailHtmlUtente = emailHtmlUtente.replace(/\|\*nome\*\|/g, nome);
   emailHtmlUtente = emailHtmlUtente.replace(/\|\*telefono\*\|/g, telefono);
   emailHtmlUtente = emailHtmlUtente.replace(/\|\*data\*\|/g,  tools42.getDateTime());
 
   emailTxtUtente = emailTxtUtente.replace(/\|\*azienda\*\|/g, azienda);
   emailTxtUtente = emailTxtUtente.replace(/\|\*nome\*\|/g, nome);
   emailTxtUtente = emailTxtUtente.replace(/\|\*telefono\*\|/g, telefono);
   emailTxtUtente = emailTxtUtente.replace(/\|\*data\*\|/g,  tools42.getDateTime());
 
   if (!validateFields(azienda, nome, telefono)) {
      const messaggio = fileldsKo[lang];
      return res.json({"success":false, "messaggio": messaggio});
   } 
   if (!validateEmail(email)){
      const messaggio = mailKo[lang];
      return res.json({"success":false, "messaggio": messaggio});
   }

    // per test senza registrazione e mail commenta dalla riga qui sotto
    
    data=new Date();
    const stmt = dbEsterno.prepare('INSERT INTO moduloContatti (azienda, nome, telefono, motivo, email, messaggio, data) VALUES (@azienda, @nome, @telefono, @motivo, @email, @messaggio, @data)');

    stmt.run({
      azienda: azienda,
      nome: nome,
      telefono: telefono,
      email: email,
      motivo: motivo,
      messaggio: messaggio,
      data: data.toISOString()
    });

    /* invio mail al commerciale */
    sendEmailAws (process.env.EMAIL_COMMERCIALE, emailHtml, emailTxt, emailOggetto)
    .then ((data) => { 
      return res.json({"success":true, "messaggio": sendOk[lang]});
    } )
    .catch ( (err) => { return res.json({"success":false, "messaggio": fileldsKo[lang]}); } );
    
    /* invio mail all'utente */
    sendEmailAws (email, emailHtmlUtente, emailTxtUtente, emailOggettoUtente[lang])
    .then ((data) => {} )
    .catch ( (err) => { console.log(err) } );

}

module.exports = { 
    homeIndex,
    chiSono,
    lavoriamoInsieme,
    contattami,
    cookiePolicy,
    matchbrand,
    invioModuloContatti
}