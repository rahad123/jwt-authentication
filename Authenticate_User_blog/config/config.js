module.exports = {
    app: {
        platform: 'JWT',
        name: process.env.APP_NAME ?? 'JWT-Authentication',
        port: process.env.PORT ?? 3000,
        secret: process.env.JWT_SECRET,
        environment: process.env.NODE_ENV ?? 'dev'
    },
    db: {
        uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/Authenticate_User' 
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    }
}