import { describe, it, expect, beforeEach } from "vitest";
import { getPropertyStatus } from "./propertyStatus";
import { Property, Tenant } from "../../types";
import dayjs from "dayjs";

describe("getPropertyStatus", () => {
  let mockProperty: Property;
  let mockTenants: Tenant[];
  const today = dayjs();
  const futureDate = today.add(1, "year");

  beforeEach(() => {
    // Reset mock data before each test
    mockProperty = {
      id: "prop-1",
      capacity: 2,
      tenancyEndDate: futureDate.format("YYYY-MM-DD"),
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

  describe("PROPERTY_VACANT", () => {
    it("should return PROPERTY_VACANT when no tenants are in the property", () => {
      const result = getPropertyStatus(mockProperty, []);
      expect(result).toBe("PROPERTY_VACANT");
    });

    it("should return PROPERTY_VACANT when tenants exist but none match the property ID", () => {
      const otherTenants = [
        { ...(mockTenants[0] as Tenant), propertyId: "invalid-id1" },
        { ...(mockTenants[1] as Tenant), propertyId: "invalid-id2" },
      ];

      const result = getPropertyStatus(mockProperty, otherTenants);
      expect(result).toBe("PROPERTY_VACANT");
    });
    it("should return PROPERTY_VACANT when tenancy end date is in the past and no tenants", () => {
      mockProperty.tenancyEndDate = "2022-12-31"; // Past date

      const result = getPropertyStatus(mockProperty, []);
      expect(result).toBe("PROPERTY_VACANT");
    });
  });

  describe("PARTIALLY_VACANT", () => {
    it("should return PARTIALLY_VACANT when tenants < capacity and tenancy has not ended", () => {
      mockProperty.capacity = 3;

      const result = getPropertyStatus(mockProperty, mockTenants); // 2 tenants, capacity 3
      expect(result).toBe("PARTIALLY_VACANT");
    });
  });

  describe("PROPERTY_ACTIVE", () => {
    it("should return PROPERTY_ACTIVE when tenants equals capacity and tenancy has not  ended", () => {
      mockProperty.capacity = 2;

      const result = getPropertyStatus(mockProperty, mockTenants); // 2 tenants, capacity 2
      expect(result).toBe("PROPERTY_ACTIVE");
    });
  });

  describe("PROPERTY_OVERDUE", () => {
    it("should return PROPERTY_OVERDUE when tenancy end date is in the past ", () => {
      mockProperty.tenancyEndDate = "2022-12-31"; // Past date

      const result = getPropertyStatus(mockProperty, mockTenants);
      expect(result).toBe("PROPERTY_OVERDUE");
    });
  });

  
});
