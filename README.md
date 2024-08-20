Moralis QA Engineer Assessment - Solution


This repository contains my solution for the Moralis QA Engineer Assessment. It includes three core testing approaches:


UI Testing – Using Playwright (Typescript)
API Testing – Using Playwright (Typescript)
Load Testing – Using K6 (Javascript)


Prerequisites

To run this project, ensure the following are installed on your local machine:

Node.js (version 14.x or higher)

Download from: https://nodejs.org/
pnpm (version 6.x or higher)

Install globally by running: npm install -g pnpm
Documentation: https://pnpm.io/installation
K6 – for load testing

Mac: brew install k6
Windows: winget install k6 --source winget
Documentation: https://k6.io/docs/getting-started/installation/


Installation & Setup

Step 1: Clone the Repository
Clone the repository by running:


git clone https://github.com/PelumiBenjamin/MoralisQaAssestment.git

Step 2: Install Dependencies
Install all the necessary project dependencies using pnpm:

pnpm install

Step 3: Setup env
Pass in values for apikey, username and password (This was shared in assestment submission)


Step 3: Install Playwright Browsers
If this is your first time setting up Playwright, you need to install the Playwright browsers:

pnpm exec playwright install


Running the Tests


Run API Tests
To execute all API test cases, run the following command:


pnpm run test:api

Run UI Tests
To run the full suite of UI tests, use:

pnpm run test:e2e


Run All Tests
To execute all tests (API and UI), use this command:

pnpm run test

Run Load Tests
To execute load tests using K6, run:

pnpm run test:load




Assessment Summary

1. UI Testing
Objective: The UI tests cover user login functionality, navigation to the "Nodes" page, and verification of the presence of nodes.

Test Framework: Playwright with Typescript.

Design Pattern: I used the Page Object Model (POM) pattern to structure the tests for better maintainability and readability. Each web page interaction is encapsulated in separate page classes, while the test cases reside in their respective test files.

Challenge: While attempting to automate the login process on the platform (https://admin.moralis.io/login), I encountered CAPTCHAs that made the tests flaky.

Solution: 

I implemented a workaround where the script pauses upon detecting the CAPTCHA, allowing for manual CAPTCHA solving. Afterward, the script continues and verifies successful login via URL change.

Due to the CAPTCHA i also make use of just one worker by configuring this in my playwright config 

Also i set a unique timeout to cater for solving the captcha

In the absence of the CAPTCHA, the tests run smoothly without manual intervention.


2. API Testing

Objective: The API tests validate both positive and negative scenarios .

Test Framework:  Playwright Typescript.



3. Load Testing
Objective: I conducted load testing to simulate high traffic on the API endpoint using K6.

Test Framework: K6 (JavaScript).

Load Test Scenario:
Ramp-up from 0 to 10 virtual users within the first 5 seconds.
Gradually increase to 200 virtual users over the next 35 seconds.
Then ramp down to 50 virtual users over the final 20 seconds.
This setup helps assess the system’s scalability under load and identifies bottlenecks in performance.


4. Centralized Configuration

The project utilizes a centralized configuration file (config.js) located in the src directory, which stores essential URLs, payloads, credentials, headers, and more. This file simplifies test maintenance and allows for easy updates to configurations across tests. Each test imports necessary configurations from this file.

Areas for Further Enhancement

CI/CD Integration: In a real-world scenario, I would integrate this test suite with a CI/CD pipeline using services like GitHub Actions, Jenkins, or CircleCI to ensure continuous test automation and reporting.

Test Reporting: Adding detailed reporting (e.g., Allure or Playwright Test Reporter) for better insights into test outcomes and historical data analysis.

Parallel Execution: For larger test suites, I would leverage parallel test execution, especially for API and UI tests, to optimize execution time.

Conclusion
The project demonstrates my proficiency in automating both UI and API test cases, along with conducting load testing to ensure system resilience. The Page Object Model (POM) and centralized configurations enhance the test maintainability and scalability for long-term test automation.

Thank you for reviewing my submission!