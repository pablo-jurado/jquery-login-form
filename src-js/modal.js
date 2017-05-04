;(function () {
  /* global marked, $ */
  function toggleModal () {
    if (!$('body').hasClass('modal-open')) {
      getHelpFile()
    }
    $('body').toggleClass('modal-open')
  }

  function randomNumBetween (min, max) {
    return Math.floor(Math.random() * max + min)
  }

  function getHelpFile () {
    var fileName = 'login-help-' + randomNumBetween(1, 4) + '.md'
    console.info('open file:', fileName)
    $.ajax({
      url: 'http://127.0.0.1:7979/md/' + fileName,
      dataType: 'text',
      success: function (data) {
        $('.modal-body').html(marked(data))
      }
    })
  }

  $('#helpBtn, #modalBack, .modal button').click(toggleModal)
})()
