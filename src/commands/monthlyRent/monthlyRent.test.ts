import dayjs from "dayjs";
import { beforeEach, describe, expect, it } from "vitest";
import { Property, Tenant } from "../../types";
import { getMonthlyRent } from "./monthlyRent";

describe("getMonthlyRent", () => {
  let mockProperty: Property;
  let mockTenants: Tenant[];

  beforeEach(() => {
    // Reset mock data before each test
    mockProperty = {
      id: "prop-1",
      capacity: 2,
      tenancyEndDate: dayjs().format("YYYY-MM-DD"),
      address: "123 Test St",
      postcode: "SW1A 1AA",
      region: "London",
      monthlyRentPence: 200000,
    };

    mockTenants = [
      {
        id: "tenant-1",
        propertyId: "prop-1",
        name: "John Doe",
      },
      {
        id: "tenant-2",
        propertyId: "prop-1",
        name: "Jane Smith",
      },
    ];
  });
  it("should throw an error when no tenants exist for the property", () => {
    const invalidTenants = mockTenants.map((tenant, index) => ({
      ...tenant,
      propertyId: `invalid-id-${index}`,
    }));
    expect(() => getMonthlyRent(mockProperty, invalidTenants, true)).toThrow(
      "No tenants found for the property."
    );
  });

  it("should return the correct value in pence when pence is passed", () => {
    expect(getMonthlyRent(mockProperty, mockTenants, true)).toBe(100000);
  });
  it("should return the correct value in pounds when pounds is passed", () => {
    expect(getMonthlyRent(mockProperty, mockTenants, false)).toBe(1000);
  });
});
