const NodeGeocoder = require('node-geocoder')

const options = {
  provider: process.env.GEO_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEO_API_KEY,
  formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder 