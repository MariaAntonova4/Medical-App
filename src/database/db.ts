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
    const inClinic=db.prepare("INSERT OR REPLACE INTO clinic (nameOfClinic, addressOfClinic)VALUES(?,?)");
    const result=inClinic.run(clinicName,clinicAddress);
    console.log("Clinic added");
}


function createTypeOfUser(){
    db.run("CREATE TABLE IF NOT EXISTS typeOfUser(idTypeUser INTEGER INIQUE PRIMARY KEY AUTOINCREMENT, typeUserName TEXT )");
}
export function insertTypeOfUser(typeUserName:string){
    createTypeOfUser()
    db.run("INSERT OR REPLACE INTO typeOfUser(typeUserName)VALUES(?)",[typeUserName]);
}
function createUser(){
    db.run("CREATE TABLE IF NOT EXISTS user(idUser INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, username TEXT,pass Text,userType INTEGER, CONSTRAINT FK_TypeUser FOREIGN KEY (userType) REFERENCES typeOfUser(idTypeUser))");
}
export function insert_User(userName:string,password:string,userType:number){
    db.run("CREATE TABLE IF NOT EXISTS user(idUser INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, username TEXT,pass Text,userType INTEGER, CONSTRAINT FK_TypeUser FOREIGN KEY (userType) REFERENCES typeOfUser(idTypeUser))");
    const inUser=db.prepare("INSERT OR REPLACE INTO user (username,pass,userType)VALUES(?,?,?)");
    const result=inUser.run(userName,password,userType);
    console.log("Clinic added");
}

export function updateSpec(idSpec:number,specName:string) {
    db.run("UPDATE specialization SET specName=(?) WHERE id=(?)",[specName],[idSpec]);
}

export function updateClinic(idClinic:number,updateClinicName:string,updateClinicAddress:string) {
    const up=db.prepare("UPDATE clinic SET nameOfClinic=?,addressOfClinic=? WHERE idClinic=?");
    const result=up.run(updateClinicName,updateClinicAddress,idClinic);
    console.log(`Updated clinic`);
}

export function update_User(upIdUser:number,upUsername:string,upPass:string,upTypeOfUser:number) {
    const up=db.prepare("UPDATE user SET username=?, pass=?, userType=? WHERE idUser=?");
    const result=up.run(upUsername,upPass,upTypeOfUser,upIdUser);
    console.log(`Updated user`);
}

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

export function getAllTypesOfUsers():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM typeOfUser",[],(err,data)=>{
            if (err) {
                reject(err);
            } else {
              resolve(data);  
            }
        })
    });
}

export function getAllUsers():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM user",[],(err,data)=>{
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