import { Property, Tenant } from "../../types";

export const getPropertyStatus = (
  property: Property,
  tenants: Tenant[]
): string => {
  const propertyTenants = tenants.filter((t) => t.propertyId === property.id);

  if (propertyTenants.length === 0) {
    return "PROPERTY_VACANT";
  }
  if (
    propertyTenants.length < property.capacity &&
    new Date(property.tenancyEndDate) > new Date()
  ) {
    return "PARTIALLY_VACANT";
  }
  if (
    propertyTenants.length === property.capacity &&
    new Date(property.tenancyEndDate) > new Date()
  ) {
    return "PROPERTY_ACTIVE";
  }

  if (new Date(property.tenancyEndDate) < new Date()) {
    return "PROPERTY_OVERDUE";
  }
  return "";
};
