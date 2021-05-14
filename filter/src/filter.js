const DatadogPlugin = require('bespoken-datadog-plugin')
const DOM = require('./dom')

module.exports = {
  onRequest: (test, response) => {
    // console.info('on request')
  },

  onResponse: (test, response) => {
    // response.responseFiltered = true
  },

  onTestEnd: async (test, testResult) => {
    await DatadogPlugin.sendToDataDog(test, testResult)
  },

  onTestSuiteEnd: async (testResults) => {
    await DatadogPlugin.sendSuiteResultsToDataDog(testResults)
  },

  onValidate: (assertion) => {
    if (assertion.path.startsWith('$')) {
      return true
    }
    return undefined
  },

  onValue: (assertion, json) => {
    if (!json) {
      return undefined
    }

    if (assertion.path.startsWith('$')) {
      return new DOM(json.display).jquery(assertion.path)
    }
    return json[assertion.path]
  }
}
