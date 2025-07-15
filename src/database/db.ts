import  sqlite3  from "sqlite3";
//import { Specialization } from '../../types.js';
const db = new sqlite3.Database('medicApp.sql');

const createSpecTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS specialization (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,specName TEXT)");
}

export function setSpec(specName:string) {
    createSpecTable();
    db.run("INSERT OR REPLACE INTO specialization(specName) VALUES (?)",[specName]);
}

// export const setSpec=(data:Specialization,callback:Function)=>{
//     db.serialize(()=>{
//       createSpecTable();
//     const stmt = db.prepare("INSERT OR REPLACE INTO specialization(specName) VALUES (?)");
//     stmt.run(data.id,data.specName);
//     stmt.finalize();  
//     });
    
// }
export function getAllSpec():Promise<any[]>{
    return new Promise((resolve,reject)=>{
      db.all("SELECT * FROM specialization ",[],(err,data)=>{
            if (err) {
                reject(err);
            }  else resolve(data);
    })
    });
}
// db.serialize(() => {
    
//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();