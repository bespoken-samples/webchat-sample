const DatadogPlugin = require('bespoken-datadog-plugin')
const DOM = require('./dom')

module.exports = {

}

module.exports = {
  onRequest: (test, response) => {
    // console.info('on request')
  },

  onResponse: (test, response) => {
    // response.responseFiltered = true
  },

  onTestStart (test) {
    // console.info('on requesttest' + JSON.stringify(test, null, 2))
    const interactions = test.interactions
    for (const interaction of interactions) {
      for (const assertion of interaction.assertions) {
        if (assertion.path.startsWith('$')) {
          const newAssertion = new JSDOMAssertion(assertion)
          assertion.evaluate = newAssertion.evaluate.bind(newAssertion)
        }
      }
    }
  },

  onTestEnd: async (test, testResult) => {
    await DatadogPlugin.sendToDataDog(test, testResult)
  },

  onTestSuiteEnd: async (testResults) => {
    await DatadogPlugin.sendSuiteResultsToDataDog(testResults)
  }
}

class JSDOMAssertion {
  constructor (assertion) {
    this.assertion = assertion
  }

  evaluate (response) {
    console.info('display: ' + response.json.display)
    console.info('assertion: ' + this.assertion)
    if (!response.json.display) {
      return false
    }
    const dom = new DOM(response.json.display)
    const result = dom.value(this.assertion.path)
    const value = this.assertion.value
    return result === value
  }
}
