// содежимое index.js
const http = require('http');
const url = require('url');
const port = 3001

const requestHandler = (request, response) => {
  const params = url.parse(request.url,true).query;
  if (request.method === 'GET' && request.url.match('candles_by_year') !== null) {

    if (!params || !params.year) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('Year not set or set incorrect!');
    }
    else {
      const body = {
        status: params.year,
        ohlc: generateRandomData(),
      };
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(body));
    }
  }
  response.end('Year not set or set incorrect!');
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})

function generateRandomData() {
  // const amount = Math.ceil(Math.random() * 100);
  const amount = 10;
  let counter = 1;
  const arr = [];
  while (counter <= amount) {
    const candle = {
      o: Math.random() * 10,
      h: Math.random() * 10,
      l: Math.random() * 10,
      c: Math.random() * 10,
    };
    arr.push(candle);
    counter++;
  }
  return arr;
}
