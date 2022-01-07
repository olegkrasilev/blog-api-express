import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    username: process.env.USER || 'user',
    password: process.env.PASSWORD || 'password',
    database: process.env.DATABASE || 'name',
    type: process.env.DBTYPE || 'db',
    host: process.env.DBHOST || 'host',
    port: process.env.DBPORT || 'port',
  },
  jwt: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'secret',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || 'expires',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'secret',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || 'expires',
    jwtCookieAccessExpiresIn: process.env.JWT_COOKIE_ACCESS_EXPIRES_IN || 'expires',
    jwtCookieRefreshExpiresIn: process.env.JWT_COOKIE_REFRESH_EXPIRES_IN || 'expires',
  },
  mailTrap: {
    username: process.env.MT_USERNAME || 'user',
    password: process.env.MT_PASSWORD || 'password',
    host: process.env.MT_HOST || 'host',
    port: process.env.MT_PORT || 'port',
  },
};
