#!/usr/bin/env node

import readline from "readline";
import { loadProperties, loadTenants } from "./dataLoader.js";
import { Property, Tenant } from "./types.js";
import { getAverageRent } from "./commands/averageRent/getAverageRent.js";
import { getMonthlyRent } from "./commands/monthlyRent/monthlyRent.js";
import { validatePostcode } from "./commands/validatePostcode/validatePostcode.js";
import { getPropertyStatus } from "./commands/propertyStatus/propertyStatus.js";

class InteractiveCLI {
  private readonly rl: readline.Interface;
  private readonly properties: Property[];
  private readonly tenants: Tenant[];
  private running: boolean = true;

  constructor(properties: Property[], tenants: Tenant[]) {
    this.properties = properties;
    this.tenants = tenants;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async start(): Promise<void> {
    this.rl.prompt();

    this.rl.on("line", async (input: string) => {
      const trimmedInput = input.trim();

      if (!trimmedInput) {
        this.rl.prompt();
        return;
      }

      try {
        await this.handleCommand(trimmedInput);
      } catch (error) {
        console.error("Error executing command:", error);
      }

      if (this.running) {
        this.rl.prompt();
      }
    });

    this.rl.on("close", () => {
      console.log("\nExiting...");
      process.exit(0);
    });
  }

  private async handleCommand(input: string): Promise<void> {
    const args = input.split(" ").filter((arg) => arg.length > 0);
    const command = args[0]?.toLowerCase();

    if (!command) return;

    switch (command) {
      case "exit":
      case "quit":
      case "q":
        this.running = false;
        this.rl.close();
        break;

      case "average-rent":
      case "ar":
        await this.handleAverageRent(args.slice(1));
        break;

      case "monthly-rent":
      case "mr":
        this.handleMonthlyRent(args.slice(1));
        break;
      case "validate-postcodes":
      case "vp":
        await this.handleValidatePostcodes();
        break;
      case "property-status":
      case "ps":
        await this.handlePropertyStatus(args.slice(1));
        break;
      default:
        console.error(`Unknown command: ${command}`);
        break;
    }
  }

  private async handlePropertyStatus(args: string[]) {
    const [propertyId] = args;
    const property = this.properties.find((p) => p.id === propertyId);
    if (!property) {
      console.error("Property not found with the given ID.", propertyId);
      return;
    }
    if (!property) {
      console.error("Property not found with the given ID.", propertyId);
      return;
    }
    const status = getPropertyStatus(property, this.tenants);
    console.log(`Status for property ${property.id} is ${status}`);
  }
  private async handleValidatePostcodes() {
    try {
      const invalidProperties = await validatePostcode(this.properties);
      console.log("invalidProperties", invalidProperties);
    } catch (error) {
      console.error("Error validating postcodes:", error);
      return;
    }
  }
  private handleMonthlyRent(args: string[]) {
    const [penceOrPound, propertyId] = args;
    if (penceOrPound !== "-pence" && penceOrPound !== "-pound") {
      console.error(
        'First argument must be "-pence" or "-pound" to indicate if the output should be in pence.'
      );
      return;
    }

    const property = this.properties.find((p) => p.id === propertyId);
    if (!property) {
      console.error("Property not found with the given ID.", propertyId);
      return;
    }

    const monthlyRent = getMonthlyRent(
      property,
      this.tenants,
      penceOrPound === "-pence"
    );

    if (monthlyRent === undefined) {
      console.error("Could not calculate monthly rent.");
      return;
    }
    console.log(
      `Monthly rent for ${property.id} is ${
        penceOrPound === "-pence" ? monthlyRent + " pence" : "£" + monthlyRent
      }`
    );
  }
  private async handleAverageRent(args: string[]) {
    const [_, region] = args;
    if (!region) {
      console.error("Please specify a region using --region <region>");
      return;
    }

    try {
      const averageRent = getAverageRent(region, this.properties);
      console.log("Average rent in region", region, "is £" + averageRent);
    } catch (error) {
      console.error("Error calculating average rent:", error);
      return;
    }
  }
}

async function main() {
  // Load data once at startup
  console.log("Loading data...");

  try {
    let properties = await loadProperties(
      "technical-challenge-properties-september-2024.csv"
    );
    let tenants = await loadTenants(
      "technical-challenge-tenants-september-2024.csv"
    );
    const cli = new InteractiveCLI(properties, tenants);
    await cli.start();
  } catch (error) {
    console.error("Error starting CLI:", error);
    process.exit(1);
  }
}

main();
