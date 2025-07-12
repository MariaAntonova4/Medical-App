import  sqlite3  from "sqlite3";
import { specialization } from "../../types";
const db = new sqlite3.Database('medicApp.sql');

const createSpecTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS specialization (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,specName TEXT)");
}

export const setSpec=(data:specialization,callback:Function)=>{
    db.serialize(()=>{
      createSpecTable();
    const stmt = db.prepare("INSERT OR REPLACE INTO specialization(specName) VALUES (?)");
    stmt.run(data.id,data.specName);
    stmt.finalize();  
    });
    
}
export const getAllSpec=(callback:Function)=>{
    db.serialize(()=>{
        createSpecTable();
        db.all("SELECT * FROM specialization ",(err,data)=>{
            if (err) {
                return null;
            }
            callback(data)
        });
    });
}
// db.serialize(() => {
    
//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();