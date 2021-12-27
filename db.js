const { Sequelize } = require("sequelize");
const {
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
  DATABASE_URL,
  ACCESS_SECRET_KEY,
  REFRESH_SECRET_KEY,
} = process.env;

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "postgres",
    host: DB_HOST,
    port: DB_PORT,
  });
}

module.exports = sequelize;
