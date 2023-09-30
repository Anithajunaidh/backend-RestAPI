export default () => ({
    database: {
        mongodbUri: process.env.MONGODB_URI,
    },
    port: parseInt(process.env.PORT!, 10) || 3000,
    token: {
        jwtSecret: process.env.JWT_SECRET,
        accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
        refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
    },
});
