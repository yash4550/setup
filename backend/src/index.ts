import { Server } from "./server";
import * as cron from "node-cron";
const server: any = require("http").Server(new Server().app);
let port = process.env.PORT || 9211;
server.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

cron.schedule("* * * * *", async function () {});
