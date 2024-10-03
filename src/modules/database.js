import { Sequelize } from 'sequelize';

class Database {
    constructor() {
        this.db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
            host: process.env.MYSQL_HOST,
            dialect: 'mariadb',
            port: 3306,
            pool: {
                max: 5,
                min: 0,
                idle: 10000 // Ferme les connexions inactives après 10 secondes
              }
        });
    }

    async connect() {
        try {
            await this.db.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async sync() {
        try {
            await this.db.sync();
        } catch (error) {
            console.error('Unable to sync the database:', error);
        }
    }
}

export default Database;
