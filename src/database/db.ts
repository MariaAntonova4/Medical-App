import  sqlite3  from "sqlite3";
const db = new sqlite3.Database('medicApp.sql');

const createSpecTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS specialization (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,specName TEXT)");
}
const createClinicTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS clinic (idClinic INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, nameOfClinic TEXT, addressOfClinic TEXT)");
}
const createDocTable=()=>{
   // db.run("CREATE TABLE IF NOT EXISTS doctor (idDoc INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,firstName TEXT, middleName TEXT, lastName TEXT, doctorSpecialization INTEGER,cabinet TEXT, doctorClinic INTEGER, CONSTRAINT FK_SpecializationDoctor FOREIGN KEY (doctorSpecialization) REFERENCES specialization(id))");
}

export function setSpec(specName:string) {
    createSpecTable();
    db.run("INSERT OR REPLACE INTO specialization(specName) VALUES (?)",[specName]);
}

export function insertClinic(clinicName:string,clinicAddress:string){
    createClinicTable();
    db.run("INSERT OR REPLACE INTO clinic (nameOfClinic, addressOfClinic)VALUES(?,?)",[clinicName],[clinicAddress]);
}

export function updateSpec(idSpec:number,specName:string) {
    db.run("UPDATE specialization SET specName=(?) WHERE id=(?)",[specName],[idSpec]);
}

export function updateClinic(idClinic:number,updateClinicName:string,updateClinicAddress:string) {
    const up=db.prepare("UPDATE clinic SET nameOfClinic=?,addressOfClinic=? WHERE idClinic=?");
    const result=up.run(updateClinicName,updateClinicAddress,idClinic);
    console.log(`Updated clinic`);
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

export function getAllClinics():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM clinic",[],(err,data)=>{
            if (err) {
                reject(err);              
            } else {
                resolve(data);
            }
        })
    });
}
// db.serialize(() => {
    
//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();