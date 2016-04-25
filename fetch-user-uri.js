var request = require('request')
var cheerio = require('cheerio')

module.exports = function (id, cb) {
  var url = 'https://www.urionlinejudge.com.br/judge/en/users/profile/' + id

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(body)
      var name = $('.pb-username').text().trim();
      var text = $('.pb-information').text().split('\n')

      text = text.map(function (it) {
        return it.trim()
      })
      .filter(function (it) {
        return it.length > 0
      })

      var myJSON = {}
      myJSON['name'] = name;
      for (var i = 0; i < text.length; i += 2) {
        var key = text[i].split(':')[0]
        var value = text[i + 1]

        myJSON[key] = value
      }

      cb(myJSON)
    }
  })
}
