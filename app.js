var flatiron = require('flatiron'),
    path = require('path'),
    app = flatiron.app;

app.config.file({ file: path.join(__dirname, 'config', 'config.json') });

app.use(flatiron.plugins.http);

var Feedr = require("feedr").Feedr;
var feedr = new Feedr();

app.router.get('/', function () {
  this.res.json({ 'status': '200 OK' })
});

app.router.get('/feeds', function () {
  var feedUrl = "https://github.com/debloper/aggresieve/commits/master.atom";
  var that = this;
  feedr.readFeed(feedUrl, {}, function (error, data, headers) {
    that.res.json(data);
  });
});

app.start(3000);
