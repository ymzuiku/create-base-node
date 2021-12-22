/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FastifyInstance } from "fastify";
import fs from "fs-extra";
import { resolve } from "path";
import middle from "middie";
const isProd = process.env.NODE_ENV === "production";

export const Cwd = (...args: string[]) => resolve(process.cwd(), ...args);

export const useClient = async (app: FastifyInstance) => {
  if (isProd) {
    return;
  }

  await app.register(middle);
  const vite = await (require as any)("vite").createServer({
    root: process.cwd(),
    logLevel: "error",
    server: {
      middlewareMode: "ssr",
      watch: {},
    },
  });

  (app as any).use(vite.middlewares);

  const htmls = fs.readdirSync(process.cwd()).filter((f) => /\.html/.test(f));

  htmls.forEach((html) => {
    const url = "/" + html.split(".html")[0];

    app.get(url === "/index" ? "/" : url, async (req, reply) => {
      try {
        const template = await vite.transformIndexHtml(html, fs.readFileSync(Cwd(html), "utf-8"));
        const context: { url?: string } = {};

        if (isProd && context.url) {
          return reply.redirect(301, context.url);
        }
        reply.status(200).headers({ "Content-Type": "text/html" }).send(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        console.log(e.stack);
        reply.status(500).send(e.stack);
      }
    });
  });
};
