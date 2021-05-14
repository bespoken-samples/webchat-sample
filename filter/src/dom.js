
// const jsonpath = require('jsonpath')
const _ = require('lodash')
const JSDOM = require('jsdom').JSDOM
const jsonpath = require('jsonpath')

class DOM {
  constructor (xml) {
    this.xml = xml
    this.clean()
    this.dom = new JSDOM(this.xml)
  }

  clean () {
    if (!this.xml.startsWith('<')) {
      this.xml = this.xml.substr(this.xml.indexOf('<'))
    }

    this.xml = this.xml.split('\\"').join('"')
    // console.info('xml: ' + this.xml)
    return this
  }

  jquery (jqueryExpression) {
    const match = jqueryExpression.match(/\$\(['"](.*)['"]\)(.*)/)
    if (match) {
      const selector = match[1]

      const expression = match[2].trim()
      let result = this.dom.window.document.querySelector(selector)

      if (result) {
        if (expression) {
          result = eval(`result${expression}`)
        }
      }

      return result
    }
  }

  /**
   *
   * @param {*} selector
   * @returns
   */
  select (selector) {
    return this.dom.window.document.querySelector(selector)
  }

  text (selector) {
    return this._select(this.json, selector)
  }

  value (path) {
    const o = this._parse(this.xml)
    // console.info('DOM: ' + JSON.stringify(o, null, 2))
    // console.info('')
    return jsonpath.value(o, path)
  }

  _parse (xml) {
    const parser = require('fast-xml-parser')
    // let he = require('he')

    const options = {
      attributeNamePrefix: '',
      textNodeName: 'innerText',
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: true,
      parseAttributeValue: true,
      trimValues: true,
      cdataTagName: '__cdata', // default is 'false'
      cdataPositionChar: '\\c',
      parseTrueNumberOnly: false,
      arrayMode: true, // "strict"
      stopNodes: ['parse-me-as-string']
    }

    // console.info('xml: ' + this.xml)
    const o = parser.parse(this.xml, options)
    // console.info(JSON.stringify(o, null, 2))
    return o
  }

  _select (o, selector) {
    let matches = []
    if (o.$ && o.$.class && selector.startsWith('.')) {
      const classes = o.$.class.split(' ')
      classes.includes(selector)
      matches.push(o)
    }

    for (const key of Object.keys(o)) {
      // console.info('O: ' + JSON.stringify(o, null, 2))
      const value = o[key]
      if (!value) {
        continue
      }

      if (_.isString(value)) {
        continue
      }
      const childMatches = this._select(value, selector)
      if (childMatches) {
        matches = matches.concat(childMatches)
      }
    }

    return matches
  }
}

module.exports = DOM
