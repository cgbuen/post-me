let request = require("request")

let csrfToken = process.argv[2]
let sessionId = process.argv[3]

let cookie = [
  `csrftoken=${csrfToken}`, // required, changes per session
  `sessionid=${sessionId}` // required, changes per session
]

let options = {
  method: "POST",
  body: "comment_text=%40cgbuen",
  url: "https://www.instagram.com/web/comments/1775702115170110573/add/",
  headers: {
    'cookie': cookie.join(";"), // required
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36', // probably should have
    'x-csrftoken': csrfToken, // required
    'content-type': 'application/x-www-form-urlencoded', // required
    'referer': 'https://www.instagram.com/p/Bikj6ppn8xt/' // required
  }
}

function callback(err, res, body) {
  console.log(body)
  console.log((new Date()).toUTCString())
  try {
    if (JSON.parse(body).status === "fail") {
      clearInterval(loop);
      console.log("Response failure. Finishing.")
    }
  } catch (e) {
    clearInterval(loop);
    console.log("Caught response error. Terminating.")
  }
}

let loop = setInterval(function() {
  request(options, callback)
}, (Math.random() * 55 + 60)*1000)
