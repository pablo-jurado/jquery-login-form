;(function () {
  /* global $ */
  var spinner = $('.spinner-wrapper')
  var feedback = $('.feedback')
  var btnLogin = $('#loginBtn')

  function response (data) {
    window.location.assign('http://127.0.0.1:7979/index.html')
  }

  function responseFail (err, textStatus) {
    spinner.hide()
    btnLogin.attr('disabled', false)
    console.info(textStatus)
    if (err.status === 500 || err.status === 0) {
      feedback.html('Sorry we are having some difficulties...<br>Please try again later')
    } else if (err.status === 400) {
      feedback.html('Check your username and password')
    }
  }

  function waitingForResponse () {
    btnLogin.attr('disabled', true)
    spinner.show()
  }

  function loginHandler (e) {
    e.preventDefault()
    var $login = $('#loginInput').val()
    var $pass = $('#passwordInput').val()

    if ($login !== '' && $pass !== '') {
      waitingForResponse()
      var indexUrl = 'http://127.0.0.1:7979/api/login'
      var userInfo = { username: $login, password: $pass }

      $.ajax({
        type: 'POST',
        url: indexUrl,
        data: userInfo,
        success: response,
        timeout: 15000,
        error: responseFail
      })
    } else {
      feedback.html('Please enter username and password')
    }
  }

  spinner.hide()

  btnLogin.click(loginHandler)

  // ---------------------------------------------------------------------------
  //  user names for testing
  // ---------------------------------------------------------------------------
  console.log('testuser1 : ilovebananas')
  console.log('testadmin5 : always_name_your_functions')
  console.log('qauser3 : luv2manage5tate')
})()
