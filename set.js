const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FKVGliZjUrVnZmUkZORndRa0ptMm9ZRWYrZGFuT05NQ0JKUzZMSXUwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVdqRTBLdmFFc3p1cG9adEhMR2V0WVJ3OStZQlBDbk02Y2RaczBIaW1IRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RjZzMDJoM3pqdFBPS25RR3dBWXBKSHVzbkk0aG5URlpTeEpiaVU0UDFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1TnFWNjBZR0paKy9ZVGVQbnIrZ29Cc3prOEJpK3VYVFYyNlFORTZ5VEYwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllORE9RaHFZQmtVbCtDUEpjVHJ5VDFnc0FyelRLVllMNW9vclZTZjZxVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InExbUdIdWFxTGE4YVQ0KzdscjZJSE5OKzUrT2ZZZjhsbHdNU0x6S1hLSGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNTeXBjTFhJdlQ3R21ERzF1V01MR2lSWTh1YUNUMWVLZVFkc0RwMi9Wdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDl0Q2dxZjE1alZMWjdpQUxQY1NMK0JGWnQ2UjVzbmlvaWpQNnNCaGhSOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlJS3NkdUFEKzl2RXdmdUlnWVc3dVlzMXVBK1BiRkcwMjdnMTFrUmV2SXJaTmM4MXdBdnNnbjRmRjg0UjVFVVFnK09MbmxlSThsU00xS29acUNtNER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJKZ0JqeUFIT0NQbjZ5a2RBaU9DZkJMTWpUS25YQXRYd0J3c3JDTnkyb1ZnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NjcwNzUyMTg2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyNzlGRTEyMERBNzgwQTQ2QzAyNDJDMTY5QUI1MDQwQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyOTYwMjA4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMNHprYXhCMlNRS3BsNHJOQTdmZTRRIiwicGhvbmVJZCI6IjJhMDBiN2RkLTA4NTQtNDEyOC1hNmU5LWZjYjc3YWY4NjM5MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGejlFV3dGVy8vV1J5NnBNWndlOWNiV1JJc0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTFLZklMTDF2Rk5UY09rWEJLV0RXOUZYdHZrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjE4UlM0M0ZNIiwibWUiOnsiaWQiOiIyNTY3MDc1MjE4NjM6NzlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTU9SSUNFIERFU0lHTloifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09hejFyTUZFTDYvcTdvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ijc1TWdVM3dLaG1MUjlmVW4yaWxHeWdpK0s3cnNEcVRrRmRUWkowb3ZLR1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1TajhQMlFTOVRxS3BWWncxL2FaTVVIK0hpdVdmZm1oL0paK283d0ovdThQUWZQbHU1MklrWlRBaGdPSHhCVnErRXZOSEt0NDBLVjNkV3R5Z2FXRENRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJJNmlnMWttMFY2QnpySUJKL3VMdHAvM1BKa2p1b1hkdThFbnRwQnV4cFE3V1JUVDMvSXNzMmdMNDRvOHo2b0xMSEhjdVlLQ21temlRU1ZzTmJ3R3lEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcwNzUyMTg2Mzo3OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlK1RJRk44Q29aaTBmWDFKOW9wUnNvSXZpdTY3QTZrNUJYVTJTZEtMeWhsIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyOTYwMjA0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9PeiJ9',
    PREFIXE: process.env.PREFIX || ",",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Morice",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256707521863",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'no',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "MORICE-MD",
    BOT : process.env.BOT_NAME || 'MORICE_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Kampala", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'online',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
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
