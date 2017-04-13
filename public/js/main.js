var $ = window.jQuery
var btn = $('#loginBtn')
var spinner = $('.spinner')
var feedback = $('.feedback')

spinner.hide()

function response (data) {
  window.location.assign('http://localhost:7979/index.html')
}

function responseFail (err) {
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

function loginHandler (e) {
  e.preventDefault()
  waitingForResponse()
  var $login = $('#loginInput').val()
  var $pass = $('#passwordInput').val()
  var url = 'http://localhost:7979/api/login'
  var data = { username: $login, password: $pass }
  $.post(url, data).done(response).fail(responseFail)
}

btn.click(loginHandler)

// var user = $('#userName')
// user.html('hahhhahsdhahd!')

// -----------------------
// user names for testing
//  -----------------------
console.log('testuser1 : ilovebananas')
console.log('testadmin5 : always_name_your_functions')
console.log('qauser3 : luv2manage5tate')
