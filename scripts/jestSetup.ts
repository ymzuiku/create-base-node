/* eslint-disable @typescript-eslint/no-explicit-any */
// Defind some thing before all test
import { config } from "dotenv";
import "./proxyFetch";

(window as any).isTest = true;
config();
