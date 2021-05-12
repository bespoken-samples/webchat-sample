const DOM = require('../src/dom')
const fs = require('fs')
const test = require('ava')

test('parses xml correctly', async t => {
  const xmlString = fs.readFileSync('filter/test/dom.xml', 'utf-8')
  const dom = new DOM(xmlString).parse()
  const value = dom.value('$..span.*.innerText')
  // const value = dom.value('$..span.innerText')
  console.info('value: ' + JSON.stringify(value))
  t.is(value, 'Can I earn points anywhere?')
})

test.only('parses text and xml correctly', async t => {
  const xmlString = fs.readFileSync('filter/test/display.txt', 'utf-8')
  const dom = new DOM(xmlString)
  const value = dom.value('$..span.*.innerText')

  console.info('value: ' + JSON.stringify(value))
  t.is(value, 'Can I earn points anywhere?')
})
