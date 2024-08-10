const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUlsa3AxZnFrbmhRR296S244NHNMNTVHMmprU2pWeS8yeThSanlPd2VWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSGJSdkZGUVdLK09IYmFuczJFbzYzVkJPN0NUL08wRlNDbFM4Z3BZWmoxTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTi9OV1k3SllPTmUwaE82aWlFelZWdWVIQVBJWTc1WGRwVDU0cjhnUkhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQdCsva0FhM0dTRXY3Rm5kZTZaUjJCa1FteHBQV0lvbzB3MXZNaDMyRFhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRMd1VGaW9IbkdjWVJDeG51UDVOSjlDalZFbUZORURaMzhEZHBRdkxLa0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRDQjdTUHk3TWRiSzVtN0d1VXQ5MGl3UFk5UlJVaXR1WmN6Q3dTWUtQblk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVU42M3JGS2orVkFickdQQ2VIdjJhSWVGbTZlVzh3UnJrUXR2QUVsRnNXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHNVQm1JcFY0NXAyTFp5TFZ1eFFhTGpKOVhaSkdIalVJSUJzWTlxVVgyYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNhN1ZiakRxbUtCaEY5YnpiSWF2akRYbnltWmR1dUtNbFphb2xiUzNMajRZYkFtdHdtZ2dJSW90cEZYY2thSUpBdVhESjVJYjBIaTlQSm40RVNHUENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA1LCJhZHZTZWNyZXRLZXkiOiJDdm9pRXRDSVhGSi9oTzU5cXp3cG1iai8wSUM4OGQ0R1BjeHo0ZFByZU5vPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHUXFVLU81WVNwZWlLcmNrLVE3cGVBIiwicGhvbmVJZCI6ImJmMTliOTIxLTY1ZTItNDdiMC05MTkxLWVhNzExNzJhNjA2YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXR1lEeGlNNG1WWTR4MHlPU2ZoNytZWlFTd0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblJKdnJOMk9xS2RkUEFENzdnNjNVVTY1Z0tBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllaOTE2NDVDIiwibWUiOnsiaWQiOiIyNTQ3MTQxODQxNTI6NzZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQW5pdGFhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLaVNqRWtRL2ZMY3RRWVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJob0NjNUhMMWtxRzVEYnFQdExvWGh4NzFTVkNCMjUrbU5KaUVNaUNBWjJVPSIsImFjY291bnRTaWduYXR1cmUiOiJlbVE4TmU4ME0xREVVZVFBUHRjVWxhSDh0NWtuaDhtVnF3N1h5QkRmcm52WHYvTi9Ha25LRVJlUmpPYnRXVHI4UkZpODRsZEkrUGlzelAzamxKc1JBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiKzJvSGhxUG8rQ2hTWE1Tc0d0ZmlwZ05BT3ljblpQNlIzS0k2SGNIWGd3cVQzMGNCV1hPc3Jka3RldmxsMVFoZDJCYXJYOFR5VDJBM1lFR0FnOHM4Q3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTQxODQxNTI6NzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWWFBbk9SeTlaS2h1UTI2ajdTNkY0Y2U5VWxRZ2R1ZnBqU1loRElnZ0dkbCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzI4Mzg1MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPdWoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Alviin21💀💀",
    NUMERO_OWNER : process.env.OWNER_NUM || "254702351657",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
