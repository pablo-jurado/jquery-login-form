;(function () {
  /* global marked, $ */
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
    console.info('open file:', fileName)
    $.ajax({
      url: 'http://127.0.0.1:7979/md/' + fileName,
      dataType: 'text',
      success: function (data) {
        $('.modal-body').html(marked(data))
      }
    })
  }

  $('#helpBtn').click(toggleModal)
  $('.modal button').click(toggleModal)
  $('#modalBack').click(closeModal)
})()
