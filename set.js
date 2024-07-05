const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtNclpJRThqQ29BaFhvQXlaSlNaekFqRUdCUS9Wc2U2L2FBcFJDNncwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieEk5NW8vN2o1Q2pnSTNId0o5N0haU0NESVR5MVVXREVVUHA2T21OMmsyYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFUDh2dC9UN3p5T3J6TFRoMXM1cGZtWGFxMWhHS0hscUhVVGFibVpkaGt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaYnVUZlBxZUEwNmtSYjdqaldCZnluVGhzMGdvSzJUUVhxZUdwSmQ1ZkI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCK0I1NUNMN0xRN3MvRlg4bjNsVVdteEpTTDdhYS90Nm43eFhUYktHVms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKRVdBRitMZHhDVUxIbFhHbFpodTB1ZndCSnpJaDArRTk3TU42RDZzMW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU44c0F4d0JteWVmWUdLVmp6SC9GKy9TS0N5UTRaUUtXVlJEdUM0c09sYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3VReE4vd1BPMTArZDk2TVhPdTIySkJDd1BCUS80a2k5TXl1cmVZVWhRTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9PZHVSS0FRc1k4V0Zxc2tTemZYYUFhMzBLWVVHNStGeVZkcmtrRjlJenFLS2Z3bEJneGlDaU5sNjZldUVORGlaT0RPYWZ6K2pyR0pzOXFQSDVQSWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiI1TlV2T2NIOEZNQUk3d0tSdWd5aSswdmlWNWczOFk0VFBlalNXUG94Y1FJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1Njc1MTYxNzc4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQTU0NzFGQkU5RTNCNDYzMTFEQjBGQ0JFOEQwNzJCOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwMTU5MzUxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTY3NTE2MTc3ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0M5NjM5NDVGNkJEQTEzRUQ2OEY2MzM5QkE1MzFCQTcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMDE1OTM1MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSGFVcVlYNUVSOE9Gcm10NkRjQ1Y2USIsInBob25lSWQiOiJmNjNkZmFiYy1hMjgzLTRiZjYtYjI1Yy02MzE1ODE1NGY3NzkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3NJQlJIeG5nZjJPQUxtcmpRK0lSMmdlNTJNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1xQkxmK3RGbGpZcWlJaldZcHVOTzRvZFUxdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDR0M5SkU1WCIsIm1lIjp7ImlkIjoiMjU2NzUxNjE3Nzg4OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4bSiyarhtIsg4bSb4bSH4bSEypwg4bScyaIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lQi94NFE2SmlldEFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlpQMDIvbUR1V2RtVHp6MTRXUnV1STczYzhYR1dkQzZIYVVKMjNCcE1YbWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6InZ1NThiaVRtQkdzZFcrSi9FdWR4QkJ0Z0t6bU9TQVdKZEVWb3dGdkdoVEZoSGR3ZUNjTFJwblNXUW5NQllqU29VSlJWWWlINjVKM2NnS3gzWVJkUkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXK01VVHlFdnRaMS9iMWhWd1J1TmtNZm1ybS9wVTFZdUVpVGdqdE9MZ2loL0xHNXN4c3EyMlVLbnZsRXNBU254TThYNlpzRkdDNDY1ckdkRGdmYzNpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc1MTYxNzc4ODo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldUOU52NWc3bG5aazg4OWVGa2JyaU85M1BGeGxuUXVoMmxDZHR3YVRGNW8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAxNTkzNDgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRXNuIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

