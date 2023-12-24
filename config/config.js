module.exports = {
  development: {
    jwtPrivateKey: 'your_jwtPrivateKey',
    database: 'your_database_name',
    username: 'your_database_username',
    password: 'your_database_password',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}