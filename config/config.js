module.exports = {
  development: {
    username: "root",
    password: null,
    database: "cou_reservation_system",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00", 
    dialectOptions: { charset : "utf8mb4", dateStrings: true, typeCast: true }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
