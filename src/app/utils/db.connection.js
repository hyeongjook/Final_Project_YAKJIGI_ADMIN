import mysql from 'mysql2/promise';

// MySQL 연결 설정
const dbConfig = {
  host: 'localhost', 
  user: 'proj',      
  password: '0000', 
  database: 'user_db', 
};

export async function connect() {
  return await mysql.createConnection(dbConfig); 
}