/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import fetch from "isomorphic-unfetch";
import path from "path/posix";

const baseURL = "http://127.0.0.1:8801";

// 用于代理 jest 环境的请求
export const proxyFetch = (url: string, init?: any) => {
  if (/^\/v1/.test(url)) {
    url = baseURL + url;
  } else {
    // 模拟请求本地文件
    const text = String(fs.readFileSync(path.resolve(__dirname, "public") + url));
    return new Promise((res) => {
      res({
        text: () => new Promise((res) => res(text)),
        json: () => new Promise((res) => res(JSON.parse(text))),
      });
    });
  }

  return fetch(url, init);
};

if (global) {
  (global as any).fetch = proxyFetch;
}
