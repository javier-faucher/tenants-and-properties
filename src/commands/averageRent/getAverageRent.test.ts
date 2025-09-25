import { beforeEach, describe, expect, it } from "vitest";
import { Property } from "../../types";
import dayjs from "dayjs";
import { getAverageRent } from "./getAverageRent";

describe("getAverageRent", () => {
  let mockProperties: Property[];

  beforeEach(() => {
    // Reset mock data before each test
    mockProperties = [
      {
        id: "prop-1",
        capacity: 2,
        tenancyEndDate: dayjs().format("YYYY-MM-DD"),
        address: "123 Test St",
        postcode: "SW1A 1AA",
        region: "London",
        monthlyRentPence: 200000,
      },
      {
        id: "prop-2",
        capacity: 3,
        tenancyEndDate: dayjs().format("YYYY-MM-DD"),
        address: "456 Another Road",
        postcode: "M1 1AA",
        region: "Manchester",
        monthlyRentPence: 150000,
      },
      {
        id: "prop-3",
        capacity: 1,
        tenancyEndDate: dayjs().format("YYYY-MM-DD"),
        address: "789 Third Avenue",
        postcode: "SW2 2BB",
        region: "London",
        monthlyRentPence: 300000,
      },
      {
        id: "prop-4",
        capacity: 4,
        tenancyEndDate: dayjs().format("YYYY-MM-DD"),
        address: "101 Fourth Street",
        postcode: "B1 1AA",
        region: "Birmingham",
        monthlyRentPence: 120000,
      },
      {
        id: "prop-5",
        capacity: 2,
        tenancyEndDate: dayjs().format("YYYY-MM-DD"),
        address: "202 Fifth Lane",
        postcode: "M2 2BB",
        region: "Manchester",
        monthlyRentPence: 150000,
      },
    ];
  });
  it("throws error if no property matches region", () => {
    expect(() =>
      getAverageRent("Nonexistent Region", mockProperties)
    ).toThrow();
  });
  it("returns the correct average rent - London", () => {
    const result = getAverageRent("London", mockProperties);
    expect(result).toBe(2500);
  });
  it("returns the correct average rent - Manchester", () => {
    expect(getAverageRent("Manchester", mockProperties)).toBe(1500);
  });
});
