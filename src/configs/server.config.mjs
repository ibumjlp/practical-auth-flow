const serverConfig = {
    PORT: process.env.PORT,
    dbURI: process.env.DB_URI,
    dbName: process.env.DB_NAME,
    swaggerUiOptions: {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'API Documentation',
        // customfavIcon: '/path/to/favicon.png',
    }
}

export default serverConfig