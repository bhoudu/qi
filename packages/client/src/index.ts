#!/usr/bin/env -S npx tsx
import chalk from "chalk";
import { Command } from "commander";
//import { runInvoke } from "./client.js";
import fs from "fs";

const program = new Command();

program
  .name("qi")
  .description("Quick Invoker of cloud resources")
  .requiredOption("-c, --command <command>", "Command to execute like lambdaInvoke")
  .option("-p, --profile <profile>", "Profile to use for executing the command")
  .option("-e, --env <env>", "Path to env config (e.g., ./envs/production.json)")
  .option("-cp, --cloud-provider <cloud_provider>", "Cloud provider (e.g., aws), default is aws")
  .option("-r, --request <path>", "Path to payload JSON, default is no payload")
  .action(async (options) => {
		const envValue = fs.readFileSync(options.env, "utf-8");
		const requestValue = fs.readFileSync(options.request, "utf-8");
    const payload = JSON.parse(requestValue);
    const env = JSON.parse(envValue);

    console.log(`Triggering ${chalk.blue(env.sfnName)}...`);
    // const result = await runInvoke(env.sfnArn, payload);
    // if (result) {
    //   console.log(JSON.stringify(result, null, 2));
    // }
  });

program.parse();
