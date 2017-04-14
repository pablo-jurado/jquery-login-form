// DOM elements
var $ = window.jQuery
var btn = $('#loginBtn')
var spinner = $('.spinner')
var feedback = $('.feedback')

// global variables
var timer
var apiCall

function response (data) {
  window.location.assign('http://localhost:7979/index.html')
}

function responseFail (err) {
  clearInterval(timer)
  spinner.hide()
  btn.attr('disabled', false)
  if (err.status === 500) {
    feedback.html('Sorry we are having some difficulties...<br>Please try again later')
  } else if (err.status === 400) {
    feedback.html('Check your username or password')
  }
}

function waitingForResponse () {
  btn.attr('disabled', true)
  spinner.show()
}

function timerCount () {
  timer = setInterval(add1, 1000)
  var num = 0
  function add1 () {
    console.log(num++)
    if (num === 15) {
      clearInterval(timer)
      apiCall.abort()
      feedback.html('Sorry we are having some difficulties...<br>Please try again later')
    }
  }
}

function loginHandler (e) {
  e.preventDefault()
  waitingForResponse()
  var $login = $('#loginInput').val()
  var $pass = $('#passwordInput').val()
  var url = 'http://localhost:7979/api/login'
  var data = { username: $login, password: $pass }
  apiCall = $.post(url, data).done(response).fail(responseFail)
  timerCount()
}

spinner.hide()

btn.click(loginHandler)

// -----------------------
// user names for testing
//  -----------------------
console.log('testuser1 : ilovebananas')
console.log('testadmin5 : always_name_your_functions')
console.log('qauser3 : luv2manage5tate')
