import  sqlite3  from "sqlite3";
const db = new sqlite3.Database('medicApp.sql');

const createSpecTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS specialization (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,specName TEXT)");
}
const createClinicTable=()=>{
    db.run("CREATE TABLE IF NOT EXISTS clinic (idClinic INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, nameOfClinic TEXT, addressOfClinic TEXT)");
}
const createDocTable=()=>{
   db.run("CREATE TABLE IF NOT EXISTS doctor (idDoc INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,firstName TEXT, middleName TEXT, lastName TEXT, doctorSpecialization INTEGER, docTelephone TEXT, docUser INTEGER, CONSTRAINT FK_SpecializationDoctor FOREIGN KEY (doctorSpecialization) REFERENCES specialization(id),CONSTRAINT FK_UserDoctor FOREIGN KEY (docUser) REFERENCES user(idUser))");
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

export function insertDoctor(firstName:string,middleName:string,lastName:string,docSpecialization:number,docTelephone:string,docUser:number) {
    db.run("CREATE TABLE IF NOT EXISTS doctor(idDoc INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,firstName TEXT, middleName TEXT, lastName TEXT, doctorSpecialization INTEGER, docTelephone TEXT, docUser INTEGER, CONSTRAINT FK_SpecializationDoctor FOREIGN KEY (doctorSpecialization) REFERENCES specialization(id),CONSTRAINT FK_UserDoctor FOREIGN KEY (docUser) REFERENCES user(idUser))");
    const inDoctor=db.prepare("INSERT OR REPLACE INTO doctor(firstName,middleName,lastName,doctorSpecialization, docTelephone, docUser)VALUES(?,?,?,?,?,?)") ;
    const result=inDoctor.run(firstName,middleName,lastName,docSpecialization,docTelephone,docUser);
    console.log("Doctor added");  
}

export function insertType(typeName:string) {
    db.run("CREATE TABLE IF NOT EXISTS type(idType INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,typeName TEXT)");
    db.run("INSERT OR REPLACE INTO type(typeName)VALUES(?)",[typeName]) ;
    console.log("Type added");  
}

export function insertPurpose(firstName:string,duration:string) {
    db.run("CREATE TABLE IF NOT EXISTS purpose(idPurpose INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,firstName TEXT, middleName TEXT, lastName TEXT, doctorSpecialization INTEGER, docTelephone TEXT, docUser INTEGER, CONSTRAINT FK_SpecializationDoctor FOREIGN KEY (doctorSpecialization) REFERENCES specialization(id),CONSTRAINT FK_UserDoctor FOREIGN KEY (docUser) REFERENCES user(idUser))");
    const inDoctor=db.prepare("INSERT OR REPLACE INTO doctor(firstName,middleName,lastName,doctorSpecialization, docTelephone, docUser)VALUES(?,?,?,?,?,?)") ;
    const result=inDoctor.run(firstName,middleName,lastName,docSpecialization,docTelephone,docUser);
    console.log("Doctor added");  
}

export function insertStage(stageName:string) {
    db.run("CREATE TABLE IF NOT EXISTS stage(idStage INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,stageName TEXT)");
    db.run("INSERT OR REPLACE INTO stage(stageName)VALUES(?)",[stageName]) ;
    console.log("Stage added");  
}

export function insertType_Purpose(idType:number,idPurpose:number,idStage:number) {
    db.run("CREATE TABLE IF NOT EXISTS type_purpose(idType_Purpose INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,idType INTEGER, idPurpose INTEGER, idStage INTEGER, CONSTRAINT FK_Type_T_P FOREIGN KEY (idType) REFERENCES type(idType),CONSTRAINT FK_Purpose_T_P FOREIGN KEY (idPurpose) REFERENCES purpose(idPurpose),CONSTRAINT FK_Stage_T_P FOREIGN KEY (idStage) REFERENCES stage(idStage))");
    const inType_Purpose=db.prepare("INSERT OR REPLACE INTO type_purpose(idType,idPurpose,idStage)VALUES(?,?,?)") ;
    const result=inType_Purpose.run(idType,idPurpose,idStage);
    console.log("Type_Purpose added");  
}

function createTypeOfUser(){
    db.run("CREATE TABLE IF NOT EXISTS typeOfUser(idTypeUser INTEGER INIQUE PRIMARY KEY AUTOINCREMENT, typeUserName TEXT )");
}
export function insertTypeOfUser(typeUserName:string){
    createTypeOfUser()
    db.run("INSERT OR REPLACE INTO typeOfUser(typeUserName)VALUES(?)",[typeUserName]);
}

export function insertDoc_Spec(idDoc_D_S:number,idSpec_D_S:number) {
    db.run("CREATE TABLE IF NOT EXISTS Doc_Spec(idDoc_Spec INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,idDoc_D_S INTEGER,idSpec_D_S INTEGER,CONSTRAINT FK_Doc_Spec FOREIGN KEY (idDoc_D_S) REFERENCES doctor(idDoc),CONSTRAINT FK_Spec_Doc FOREIGN KEY (idSpec_D_S) REFERENCES specialization(id))");
    const inDoc_Spec=db.prepare("INSERT OR REPLACE INTO Doc_Spec(idDoc_D_S,idSpec_D_S) VALUES(?,?)");
    const result=inDoc_Spec.run(idDoc_D_S,idSpec_D_S);
    console.log("Inserted Doctor's Specialization");
}

export function insertDoc_Clinic(idDoc_D_C:number,idClinic_D_C:number,cabinet:string) {
    db.run("CREATE TABLE IF NOT EXISTS Doc_Clinic(idDoc_Clinic INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,idDoc_D_C INTEGER,idClinic_D_C INTEGER,cabinet TEXT,CONSTRAINT FK_Doc_Clinic FOREIGN KEY (idDoc_D_C) REFERENCES doctor(idDoc),CONSTRAINT FK_Clinic_Doc FOREIGN KEY (idClinic_D_C) REFERENCES clinic(idClinic))");
    const inDoc_Clinic=db.prepare("INSERT OR REPLACE INTO Doc_Clinic(idDoc_D_C, idClinic_D_C, cabinet) VALUES(?,?,?)");
    const result=inDoc_Clinic.run(idDoc_D_C,idClinic_D_C,cabinet);
    console.log("Inserted the Clinic in which is the Doctor");
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

export function updateDoctor(idDoc:number,firstName:string,middleName:string,lastName:string,docSpecialization:number,docTelephone:string,docUser:number) {
    const inDoctor=db.prepare("UPDATE doctor SET firstName=?,middleName=?,lastName=?,doctorSpecialization=?,docTelephone=?,docUser=? WHERE idDoc=?") ;
    const result=inDoctor.run(firstName,middleName,lastName,docSpecialization,docTelephone,docUser,idDoc);
    console.log("Doctor updated");  
}

export function updateDoc_Spec(idD_S:number,idDoc_D_S:number,idSpec_D_S:number) {
    const inDoc_Spec=db.prepare("UPDATE Doc_Spec SET idDoc_D_S=?,idSpec_D_S=? WHERE idDoc_Spec=?");
    const result=inDoc_Spec.run(idDoc_D_S,idSpec_D_S,idD_S);
    console.log("Updated Doctor's Specialization");
}

export function updateDoc_Clinic(idD_C:number,idDoc_D_C:number,idClinic_D_C:number,cabinet:string) {
    const inDoc_Clinic=db.prepare("UPDATE Doc_Clinic SET idDoc_D_C=?, idClinic_D_C=?, cabinet=? WHERE idD_C=?");
    const result=inDoc_Clinic.run(idDoc_D_C,idClinic_D_C,cabinet,idD_C);
    console.log("Updated the Clinic in which is the Doctor");
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

export function getAllDoctors():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM doctor",[],(err,data)=>{
            if (err) {
                reject(err);              
            } else {
                resolve(data);
            }
        })
    });
}

export function getAllDoc_Clinic():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM Doc_Clinic",[],(err,data)=>{
            if (err) {
                reject(err);
            } else {
              resolve(data);  
            }
        })
    });
}

export function getAllDoc_Spec():Promise<any[]>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM Doc_Spec",[],(err,data)=>{
            if (err) {
                reject(err);
            } else {
              resolve(data);  
            }
        })
    });
}