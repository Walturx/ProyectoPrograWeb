import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",      
  user: "root",           
  password: "mukushirokumanga1",           
  database: "usuariospw"  
});

connection.connect(err => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }else{
  console.log("✅ Conexión exitosa a MySQL");}
});

export default connection;
