import { Property } from "../../types";

export const validatePostcode = async (properties: Property[]) => {
  const { invalid, valid } = validatePostcodeShape(properties);
  const result = await fetch(
    `https://api.postcodes.io/postcodes?filter=postcode`,
    {
      method: "POST",
      body: JSON.stringify({ postcodes: valid }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await result.json();
  const invalidPostcodes = data.result
    ?.filter((r: any) => r.result === null)
    .map((r: any) => r.query);

  const allInvalids = [...invalid, ...(invalidPostcodes || [])];
  return allInvalids.map(
    (inv) => properties.find((p) => p.postcode === inv)?.id
  );
};

export const validatePostcodeShape = (properties: Property[]) => {
  // UK postcode regex pattern
  // Source: https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
  const seperated = properties.reduce(
    (acc, p) => {
      if (!postcodeRegex.test(p.postcode)) {
        return { ...acc, invalid: [...acc.invalid, p.postcode] };
      }
      return { ...acc, valid: [...acc.valid, p.postcode] };
    },
    { invalid: [], valid: [] } as { invalid: string[]; valid: string[] }
  );

  return seperated;
};
