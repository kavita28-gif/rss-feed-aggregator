module.exports = {
  development: {
    jwtPrivateKey: "url_jwtPrivateKey",
    database: 'rss_aggregator',
    username: 'root',
    password: 'Mysql@2023',
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