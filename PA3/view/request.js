fetch('http://localhost/isp/pa3/controller/Controller.php', {
  method: 'POST',
  body: JSON.stringify({
    action: "getBooks",
    options: {}
  }),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}).then(response => response.json()).then(json => {
  console.log(json)
})

// this is the request style we need to do for js