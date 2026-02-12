# Polaris SDET Automation Suite

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm run test:cucumber
```

### Headed Mode

```bash
HEADLESS=false npm run test:cucumber
```

### HTML Report

```bash
npm run test:cucumber:report
```

Reports are generated at `reports/cucumber.html`.

### API Tests

```bash
npm run test:cucumber:api
```

API tests live under `tests/api/`.

Optional override for API base URL:

```bash
API_URL=https://api.practicesoftwaretesting.com npm run test:cucumber:api
```

### API HTML Report

```bash
npm run test:cucumber:api:report
```

Report is generated at `reports/cucumber-api.html`.

### Bug-only HTML Report

```bash
BASE_URL=https://with-bugs.practicesoftwaretesting.com npm run test:cucumber:bug:report
```

Report is generated at `reports/bugs-only.html`.

Added a separate FE-only script in package.json.
You can now run:
UI only: npm run test:cucumber:ui
API only: npm run test:cucumber:api

## Frameworks and Libraries

- Playwright
- Cucumber (cucumber-js)
- TypeScript
- cucumber-html-reporter

## Environment Switching

The suite uses `BASE_URL` to control the target environment.

Main site:

```bash
BASE_URL=https://practicesoftwaretesting.com npm run test:cucumber
```

Buggy site:

```bash
BASE_URL=https://with-bugs.practicesoftwaretesting.com npm run test:cucumber
```

## Known Issues / Limitations

- The buggy site is expected to fail on multiple scenarios; see `BUGS.md` for details.
- Tests rely on the demo data seeded in the public environment; product availability can vary over time.
