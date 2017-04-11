var $ = window.jQuery

$('#loginBtn').click(loginHandler)

function loginHandler (e) {
  e.preventDefault()
  // var $login = $('#loginInput').val()
  // var $pass = $('#passwordInput').val()
  // console.log($login, $pass)
  var url = 'http://127.0.0.1:7979/api/login'
  var data = { username: 'qauser3', password: 'luv2manage5tate' }
  $.post(url, data).done(response).fail(responseFail)
}

function response (data) {
  console.log('done!', data)
}

function responseFail (err) {
  console.log('error :(', err)
}
