import { beforeEach, describe, expect, it } from "vitest";
import { validatePostcode } from "./validatePostcode";
import { Property } from "../../types";

describe("validatePostcodes", () => {
  let mockProperties: Property[] = [];
  beforeEach(() => {
    mockProperties = [
      {
        id: "prop-1",
        capacity: 2,
        tenancyEndDate: "2023-12-31",
        address: "123 Test St",
        postcode: "SW1A 1AA",
        region: "London",
        monthlyRentPence: 200000,
      },
    ];
  });

  it("successfully validates postcode with single character area", async () => {
    const validPostcode = "M1 1AE";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });

  it("successfully validates postcode with two character area", async () => {
    const validPostcode = "SW6 1AA";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });
  it("successfully validates postcode with two character area and character sub-district", async () => {
    const validPostcode = "SW1A 1AA";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });
  it("successfully validates postcode with two character area and digit sub-district", async () => {
    const validPostcode = "SW15 2AA";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });
  it("successfully validates postcode with lowercase letters", async () => {
    const validPostcode = "sw1a 1aa";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });
  it("successfully validates postcode with no space", async () => {
    const validPostcode = "SW1A1AA";
    const validProperties = [{ ...mockProperties[0], postcode: validPostcode }];
    expect(await validatePostcode(validProperties as Property[])).toEqual([]);
  });

  it("fails validation for postcode with invalid postcode shape", async () => {
    const invalidPostcode = "ZZZ1A 1AA";
    const invalidProperties = [
      { ...mockProperties[0], postcode: invalidPostcode },
    ];
    expect(await validatePostcode(invalidProperties as Property[])).toEqual([
      invalidProperties[0]?.id,
    ]);
  });
  it("fails validation for postcode with invalid district", async () => {
    const invalidPostcode = "SW1Z 1ZZ";
    const invalidProperties = [
      { ...mockProperties[0], postcode: invalidPostcode },
    ];
    expect(await validatePostcode(invalidProperties as Property[])).toEqual([
      invalidProperties[0]?.id,
    ]);
  });
});
