const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbConfig = require("./dbConfig/dbConfig");
const dotenv = require("dotenv");
const routes = require("./Routes/routes");
const cors = require("cors");
// app.use(express.json());
dotenv.config();
dbConfig.connect(process.env.DATABASE_URL);
app.use(bodyParser.json());
app.use(cors());
routes.userRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server has been started at PORT:${PORT}`);
});