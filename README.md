# Property Management CLI

A command-line interface application for managing properties and tenants data. This CLI provides interactive commands to analyze rental properties, calculate rents, validate postcodes, and check property statuses.

## Features

- **Average Rent Calculation**: Calculate average rent by region
- **Monthly Rent Per Tenant**: Calculate monthly rent per tenant for a specific property
- **Postcode Validation**: Validate UK postcodes using the postcodes.io API
- **Property Status Check**: Determine property occupancy status

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Data Files

This application requires two CSV data files to function properly:

### Required Files

- `technical-challenge-properties-september-2024.csv` - Contains property information
- `technical-challenge-tenants-september-2024.csv` - Contains tenant information

### File Placement

Place both CSV files in the **root directory** of the project (same level as `package.json`):

```
project-root/
├── package.json
├── README.md
├── technical-challenge-properties-september-2024.csv  ← Place here
├── technical-challenge-tenants-september-2024.csv     ← Place here
├── tsconfig.json
├── vitest.config.ts
└── src/
    ├── main.ts
    └── ...
```

**Note**: The application will look for these files in the root directory when you run the CLI commands. Make sure both files are present before starting the application.

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## Interactive Commands

The CLI provides an interactive mode with the following commands:

### Average Rent

Calculate the average rent for properties in a specific region.

```
average-rent --region <region_name>
# or
ar --region <region_name>
```

**Example:**

```
average-rent --region ENGLAND
```

### Monthly Rent Per Tenant

Calculate the monthly rent per tenant for a specific property.

```
monthly-rent <-pence|-pound> <property_id>
# or
mr <-pence|-pound> <property_id>
```

**Examples:**

```
monthly-rent -pence p_1002
monthly-rent -pound p_1002
```

### Validate Postcodes

Validate all postcodes in the properties dataset against the UK postcodes API.

```
validate-postcodes
# or
vp
```

### Property Status

Check the occupancy status of a specific property.

```
property-status <property_id>
# or
ps <property_id>
```

**Example:**

```
property-status p_1002
```

**Possible statuses:**

- `PROPERTY_VACANT`: No tenants in the property
- `PARTIALLY_VACANT`: Some tenants but below capacity (tenancy not ended)
- `PROPERTY_ACTIVE`: At capacity and tenancy active
- `PROPERTY_OVERDUE`: Tenancy end date has passed

### Help & Exit

- Type `help` for available commands
- Type `exit`, `quit`, or `q` to exit the application

## Data Structure

The application uses two CSV files:

### Properties CSV

- `id`: Property identifier
- `address`: Property address
- `postcode`: UK postcode
- `monthlyRentPence`: Monthly rent in pence
- `region`: Region (ENGLAND, WALES, SCOTLAND, N.IRELAND)
- `capacity`: Maximum number of tenants
- `tenancyEndDate`: End date of tenancy (YYYY-MM-DD)

### Tenants CSV

- `id`: Tenant identifier
- `propertyId`: Associated property ID
- `name`: Tenant name

## Testing

Run the test suite:

```bash
npx vitest
```

Run tests in watch mode:

```bash
npx vitest --watch
```

## Technologies Used

- **TypeScript**: Type-safe JavaScript
- **Node.js**: Runtime environment
- **csv-parser**: CSV file parsing
- **dayjs**: Date manipulation
- **vitest**: Testing framework
- **postcodes.io API**: UK postcode validation

## API Dependencies

This application uses the [postcodes.io](https://postcodes.io) API for UK postcode validation. No API key is required for this free service.
