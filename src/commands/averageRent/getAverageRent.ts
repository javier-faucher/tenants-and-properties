import { Property } from "../../types";

export const getAverageRent = (region: string, properties: Property[]) => {
  const matchingProperties = properties.filter(
    (p) => p.region.toLowerCase() === region.toLowerCase()
  );
  if (matchingProperties.length === 0) {
    throw new Error("no matching properties for region" + region);
  }

  const totalRent = matchingProperties.reduce(
    (sum, p) => sum + p.monthlyRentPence,
    0
  );
  const average = totalRent / matchingProperties.length / 100;
  const roundedAverage = Math.round(average * 100) / 100;
  return roundedAverage;
};
