const pippo = require('dotenv').config({path: '../../.env'});
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

let destinatario = 'f.boschetti@me.com';
let emailOggetto = "Questa è una mail di test";
let emailTxt = fs.readFileSync (`../../data/transEmail/moduloContatti/Admin.txt`, 'utf8');
let emailHtml = fs.readFileSync (`../../data/transEmail/moduloContatti/Admin.html`, 'utf8');


/* invio mail all'utente */
sendEmailAws (destinatario, emailHtml, emailTxt, emailOggetto)
.then ((data) => {} )
.catch ( (err) => { console.log(err) } );
