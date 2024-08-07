# Benchmark Frontend

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=allansolutions_benchmark-frontend&metric=sqale_rating&token=5c95e86cbde58d68fee198db31b0c7309f585457)](https://sonarcloud.io/summary/new_code?id=allansolutions_benchmark-frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=allansolutions_benchmark-frontend&metric=security_rating&token=5c95e86cbde58d68fee198db31b0c7309f585457)](https://sonarcloud.io/summary/new_code?id=allansolutions_benchmark-frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=allansolutions_benchmark-frontend&metric=vulnerabilities&token=5c95e86cbde58d68fee198db31b0c7309f585457)](https://sonarcloud.io/summary/new_code?id=allansolutions_benchmark-frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=allansolutions_benchmark-frontend&metric=bugs&token=5c95e86cbde58d68fee198db31b0c7309f585457)](https://sonarcloud.io/summary/new_code?id=allansolutions_benchmark-frontend)

## 📙 Introduction

Depending on how we build it, we can have 2 versions of the site: **Preview** and **Production**. The first one is an SPA in which editors can preview content drafts (not visible in production); the latter is the static site that final users will see.

They both share most of the code, with little additional logic for the **Preview** version. In order to enable that extra logic, you need set the env variable `IS_PREVIEW_SITE` to `true` on both development (`yarn dev`) and production environments (`yarn generate`).

## 📙 Development

Clone the repository and install dependencies

```bash
yarn install
```

Setup your `.env` file with the proper values:

```bash
cp .env.example .env
```

Start the development server on http://localhost:3000.

```bash
yarn dev
# or add the "preview" suffix to run enable the Preview Site mode:
yarn dev:preview
```

## 📙 Testing

In order to run Playwright tests, you need to have a `.env` file. Ask your team for the proper credentials.

```env

"TESTING_ADMIN__USER": "",
"TESTING_ADMIN__PASS": "",

"TESTING_RCP_ALL__USER": "",
"TESTING_RCP_ALL__PASS": "",

"TESTING_ACF_ALL__USER": "",
"TESTING_ACF_ALL__PASS": "",

"TESTING_NONE__USER": "",
"TESTING_NONE__PASS": "",

"TESTING_RCP_LITHIUM__USER": "",
"TESTING_RCP_LITHIUM__PASS": "",

```

### Test with Playwright

To execute Playwright tests, before you must run the installation of browsers.

```bash
npx playwright install
```

```bash
yarn test
```

## 📙 Deployment

For the **Production** site, you want to setup this environment variables:

```toml
GRAPHCDN_ENDPOINT=''
CYPRESS_ENVIRONMENT='production_site'
USE_STATIC_SITE_GENERATION=true
```

In the case of **Preview**:

```toml
GRAPHCDN_ENDPOINT=''
IS_PREVIEW_SITE=true
USE_STATIC_SITE_GENERATION=false
```

In both cases, you need to add the ones specified in the `cypress.env.json` file and prefix them with "**CYPRESS\_**" (e. g., `CYPRESS_TESTING_ADMIN__USER`)
