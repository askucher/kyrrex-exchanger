import express from "express";
import bodyParser from "body-parser";
import mockRoutes from "./routes/exchange";

const app = express();
app.use(bodyParser.json());

app.use("/api", mockRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});