const http = require('http')
const fs = require('fs')
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // On Render, make sure `npm install` is your build command.
const mime = require('mime')
const dir = 'public/'
const port = 3000

var votes = []

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/api') {
    response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(tallyVotes()))
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    try {
      const data = JSON.parse(dataString);

      votes = votes.filter(entry => entry.id !== data.id);

      if (data.vote === "honey") {
        votes.push({
          id: data.id,
          vote: "honey",
          timestamp: Date.now()
        })
      } else if (data.vote === "dirt") {
        votes.push({
          id: data.id,
          vote: "dirt",
          timestamp: Date.now()
        })
      }

      response.writeHead(200, "OK", { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(tallyVotes()))
    } catch {
      response.writeHead(400, "Server Error", { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({
        error: "Invalid submission"
      }))
    }
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

function tallyVotes () {
  var honey = 0;
  var dirt = 0;
  
  for (const vote of votes) {
    if (vote.vote === "honey") {
      honey++;
    } else if (vote.vote === "dirt") {
      dirt++;
    }
  }

  return {
    honey,
    dirt,
    votes: votes.map(vote => ({vote: vote.vote, timestamp: vote.timestamp}))
  }
}

server.listen(process.env.PORT || port)
