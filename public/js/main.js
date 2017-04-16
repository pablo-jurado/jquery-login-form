// load mardown library
// var marked = require('marked')

// DOM elements
var $ = window.jQuery
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

function toggleModal () {
  if (!$('body').hasClass('modal-open')) {
    getHelpFile()
  }
  $('body').toggleClass('modal-open')
}

function closeModal (e) {
  if (e.target.id === 'modalBack') {
    $('body').toggleClass('modal-open')
  }
}

function randomNum () {
  return Math.floor(Math.random() * 4 + 1)
}

function getHelpFile () {
  var fileName = 'login-help-' + randomNum() + '.md'
  console.log(fileName)
  $.ajax({
    url: 'http://127.0.0.1:7979/md/' + fileName,
    dataType: 'text',
    success: function (data) {
      $('.modal-body').html(marked(data))
    }
  })
}

spinner.hide()

btnLogin.click(loginHandler)

$('#helpBtn').click(toggleModal)
$('.modal button').click(toggleModal)
$('#modalBack').click(closeModal)

// -----------------------
// user names for testing
//  -----------------------
console.log('testuser1 : ilovebananas')
console.log('testadmin5 : always_name_your_functions')
console.log('qauser3 : luv2manage5tate')
