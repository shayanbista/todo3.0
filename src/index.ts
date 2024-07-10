import express from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { RequestLogger } from "./middleware/logger";

const app = express();

app.use(express.json());
app.use(RequestLogger)
app.use(router);

app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`app is listening on ${config.port}`);
});
