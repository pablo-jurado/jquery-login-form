var $ = window.jQuery
var btn = $('#loginBtn')
var spinner = $('.spinner')

spinner.hide()

function response (data) {
  spinner.hide()
  btn.attr('disabled', false)
  console.log('done!', data)
}

function responseFail (err) {
  spinner.hide()
  btn.attr('disabled', false)
  console.log('error :(', err)
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

//
// user names for testing
//
console.log('testuser1 : ilovebananas')
console.log('testadmin5 : always_name_your_functions')
console.log('qauser3 : luv2manage5tate')
