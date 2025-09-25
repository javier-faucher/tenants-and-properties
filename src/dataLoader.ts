import fs from "fs";
import csv from "csv-parser";
import { Property, Tenant } from "./types.js";

export const loadTenants = async (tenantsPath: string): Promise<Tenant[]> => {
  return new Promise((resolve, reject) => {
    const tenants: Tenant[] = [];

    fs.createReadStream(tenantsPath)
      .pipe(csv())
      .on("data", (data: any) => {
        tenants.push({
          id: data.id,
          propertyId: data.propertyId,
          name: data.name,
        });
      })
      .on("end", () => resolve(tenants))
      .on("error", reject);
  });
};

export const loadProperties = async (
  propertiesPath: string
): Promise<Property[]> => {
  return new Promise((resolve, reject) => {
    const properties: Property[] = [];

    fs.createReadStream(propertiesPath)
      .pipe(csv())
      .on("data", (data: any) => {
        properties.push({
          id: data.id,
          address: data.address,
          postcode: data.postcode,
          monthlyRentPence: parseInt(data.monthlyRentPence),
          region: data.region,
          capacity: parseInt(data.capacity),
          tenancyEndDate: data.tenancyEndDate,
        });
      })
      .on("end", () => resolve(properties))
      .on("error", reject);
  });
};
