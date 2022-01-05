export const config = {
  db: {
    user: process.env.USER || 'user',
    password: process.env.PASSWORD || 'password',
    name: process.env.DATABASE || 'name',
    type: process.env.DBTYPE || 'db',
    host: process.env.DBHOST || 'host',
    port: process.env.DBHOST || 'port',
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || 'expires',
    jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 'expires',
  },
  mailTrap: {
    username: process.env.MT_USERNAME || 'user',
    password: process.env.MT_PASSWORD || 'password',
    host: process.env.MT_HOST || 'host',
    port: process.env.MT_PORT || 'port',
  },
};
