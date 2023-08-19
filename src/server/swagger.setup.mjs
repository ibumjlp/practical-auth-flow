import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../api/swagger.json" assert { type: "json" };
import serverConfig from "../configs/server.config.mjs";

const setupSwaggerUI = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, serverConfig.swaggerUiOptions));
};

export default setupSwaggerUI;
