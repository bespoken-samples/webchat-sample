# Webchat Testing for Bespoken
This project demonstrates a set of tests setup to run against an Chatbot-embedded in a web browser.

We use the webchat-bot embedded with [Chipotle for this test](https://www.chipotle.com/contact-us):  
![docs/TestResultsSummary.png](docs/Chipotle.png)

## How It Works

## Setup
* Clone the project `git clone https://github.com/bespoken-samples/webchat-sample`
* Run `npm install`

## Running The Tests
To run the tests manually:
* Go to the [e2e workflow page](https://github.com/bespoken-samples/webchat-samples/actions/workflows/test.yml)
* Click "Run Workflow"

That's all there is to it!

## Viewing The Results
The main output from the tests is an HTML report. It can be found as a part of each Github workflow that has been run:  
https://github.com/bespoken-samples/webchat-sample/actions/runs/706573143

The report summarizes the results of each test:
![docs/TestResultsSummary.png](docs/TestResultsSummary.png)
 
For each individual test, we can review each step that occurred:
![docs/TestResultsDetail.png](docs/TestResultsDetail.png)

Additionally, we have integrated with DataDog, where we can view our test results over time:  
![docs/DataDog.png](docs/DataDog.png)

## Learn More
Check out our blog post on the AWS Developer site to learn more about this project:
COMING SOON!
