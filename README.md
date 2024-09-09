# jobtestprep-test-task
Test assignment

# Installing locally
1. `npm i` - to install Playwright and dependencies
2. `npx playwright install` - to install browsers for Playwright
3. In the root directory create .env file with the following values:
    LOGIN=student
    PASSWORD=Password123
    API_KEY=special-key

# Running tests locally
1. `npm run test:api` - to run api tests in headless mode
2. `npm run test:ui` - to run ui tests in headless mode
3. `npm run test:uiMode` - to run all tests in UI mode

# Test report
Test report will be available in the playwright-report folder. 
You will need to open the index.html file in browser