document.querySelector("#browser").innerHTML = navigator.appVersion;

setInterval(function () {
  var date = new Date(Date.now())
  document.querySelector("#current-Time").innerHTML = date.toLocaleString();
}, 1000)

function movePic(e) {
  var elem = document.querySelector("#move-me");
  var finalX = e.clientX, finalY = e.clientY

}

$(function () {
  $('#result').hide()
  $('#fact-form').submit(calculateFact);
  $('#fact-close').click(closeFact)

  function closeFact(e) {
    e.preventDefault()
    $('#result').hide(500)
  }

  function calculateFact(e) {
    e.preventDefault()
    var elem = $("#factorial-input").val()
    var output = $("#result-header")
    output.text("")
    $('#result').hide()
    $('#result').show(500)
    if (elem === null || elem === "" || isNaN(elem)) {
      alert("Field Empty Or NaN. Using 8")
      output.text(fact(8, output))
    } else if (parseInt(elem) < 0) {
      output.text("Invalid Data Entry")
      alert("Please enter a positive number")
    } else {
      output.text(fact(parseInt(elem)))
    }
  }

  function fact(num) {
    var total = 1
    var returnString = ""
    for (var i = num; i > 1; --i) {
      returnString = returnString.concat(" " + i + " * ")
      total *= i
    }
    returnString = returnString.concat(" 1 = " + total)
    return returnString
  }
})