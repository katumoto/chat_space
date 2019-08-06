$(function() {
  
  function buildHTML(data){
    var image = data.image ? `<img class="lower-message__image" src=${data.image}>` : "";
    var html = `<div class="Wrapper--chat-contents--main-message" data-message-id=${data.id}>
                  <div class="Wrapper--chat-contents--main-message__info">
                    <div class="Wrapper--chat-contents--main-message__info-user-name">
                      ${data.user_name}
                    </div>
                    <div class="Wrapper--chat-contents--main-message__info-date">
                      ${data.time}
                    </div>
                  </div>
                  <div class="Wrapper--chat-contents--main-message__text">
                    <p class="lower-message__content">
                      ${data.body}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }

  function buildMessageHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=`+ message.image + `>` : "" ;
    var html = `<div class="Wrapper--chat-contents--main-message" data-message-id=`+ message.id + `>
                  <div class="Wrapper--chat-contents--main-message__info">
                    <div class="Wrapper--chat-contents--main-message__info-user-name">`
                      + message.user_name + `\n
                  </div>
                    <div class="Wrapper--chat-contents--main-message__info-date">`
                      + message.time + `\n
                  </div>
                  </div>
                  <div class="Wrapper--chat-contents--main-message__text">
                    <p class="lower-message__content">`
                      + message.body + `\n
                    </p>`
                    + image + `\n
                  </div>
                </div>`
    return html;
  }

  function scrollDown(){
    $('.Wrapper--chat-contents--main').animate({ 
      scrollTop: $('.Wrapper--chat-contents--main')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){ 
      var html = buildHTML(data);
      $('.Wrapper--chat-contents--main').append(html);
      scrollDown();
      $('#new_message')[0].reset();
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(){
      alert('error');
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.Wrapper--chat-contents--main-message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) { 
        var insertHTML = ''; 
        messages.forEach(function(message){ 
          insertHTML = buildMessageHTML(message);
          $('.Wrapper--chat-contents--main').append(insertHTML);
          scrollDown();
        });
      })
      .fail(function() {
        alert('error');
      })
    }}
    $(function(){
      setInterval(reloadMessages, 5000);
    });
});