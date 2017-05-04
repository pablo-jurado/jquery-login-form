;(function () {
  /* global $ */
  var spinner = $('.spinner-wrapper')
  var feedback = $('.feedback')
  var btnLogin = $('#loginBtn')

  // global variables
  var timer
  var apiCall

  function response (data) {
    window.location.assign('http://127.0.0.1:7979/index.html')
  }

  function responseFail (err) {
    clearInterval(timer)
    spinner.hide()
    btnLogin.attr('disabled', false)
    if (err.status === 500) {
      feedback.html('Sorry we are having some difficulties...<br>Please try again later')
    } else if (err.status === 400) {
      feedback.html('Check your username and password')
    }
  }

  function waitingForResponse () {
    btnLogin.attr('disabled', true)
    spinner.show()
  }

  function timerCount () {
    timer = setInterval(add1, 1000)
    var num = 0
    function add1 () {
      num++
      console.info('timer: ' + num + ' sec.')
      if (num === 15) {
        clearInterval(timer)
        apiCall.abort()
        feedback.html('Sorry we are having some difficulties...<br>Please try again later')
      }
    }
  }

  function loginHandler (e) {
    e.preventDefault()
    var $login = $('#loginInput').val()
    var $pass = $('#passwordInput').val()
    if ($login !== '' && $pass !== '') {
      waitingForResponse()
      var url = 'http://127.0.0.1:7979/api/login'
      var data = { username: $login, password: $pass }
      apiCall = $.post(url, data).done(response).fail(responseFail)
      timerCount()
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
