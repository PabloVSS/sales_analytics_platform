import "dotenv/config"; // Carrega .env antes de tudo
import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});