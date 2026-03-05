#!/usr/bin/env -S npx tsx
import { Command } from "commander";
import { runInvoke } from "./client.js";
import fs from "fs";

const program = new Command();

program
  .name("qi")
  .description("Postman-like CLI for Cloud Resources")
  .requiredOption("-p, --provider <provider>", "Cloud provider (e.g., aws), default is aws")
  .requiredOption("-e, --env <path>", "Path to env config (e.g., ./envs/uat.json)")
  .requiredOption("-r, --request <path>", "Path to payload JSON")
  .action(async (options) => {
    const env = JSON.parse(fs.readFileSync(options.env, "utf-8"));
    const payload = JSON.parse(fs.readFileSync(options.request, "utf-8"));

    console.log(`Triggering ${chalk.blue(env.sfnName)}...`);
    const result = await runInvoke(env.sfnArn, payload);

    if (result) {
      console.log(JSON.stringify(result, null, 2));
    }
  });

program.parse();
