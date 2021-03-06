import { fastify } from "fastify";
import { useClient } from "../scripts/useClient";
import { getIPAddress } from "../scripts/getIPAddress";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 3000;

const app = fastify({});
app.get("/ping", async (res) => {
  return { name: "pong", data: res.body };
});

async function start() {
  await useClient(app);
  try {
    console.log(`http://localhost:${PORT} or http://${getIPAddress()}:${PORT}`);
    // 若你工作的网络环境不安全，请移除 public address
    await app.listen(PORT, "0.0.0.0");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
