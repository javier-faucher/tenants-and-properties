import { Property, Tenant } from "../../types";

export const getMonthlyRent = (
  property: Property,
  tenants: Tenant[],
  inPence: boolean
): number | void => {
  const matchingTenants = tenants.filter((t) => t.propertyId === property?.id);
  if (matchingTenants.length === 0) {
    throw new Error("No tenants found for the property.");
  }
  const monthlyRent =
    (property?.monthlyRentPence ?? 0) / matchingTenants.length;
  return inPence
    ? Math.round(monthlyRent)
    : Math.round((monthlyRent / 100) * 100) / 100;
};
