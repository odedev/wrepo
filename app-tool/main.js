import { AppDataSource } from "./src/core/datasource.js";
import serve from "./src/serve.js";

AppDataSource.initialize()
.then(() => {
  serve()
})
.catch(err => {
  console.warn(err)
  process.exit(2);
})
