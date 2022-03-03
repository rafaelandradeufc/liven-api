export default {
    jwtSecret: process.env.KEY_SECRET || 'QEGTUI',
    expireIn: process.env.EXPIRE_SECRET || '6h',
  };
  