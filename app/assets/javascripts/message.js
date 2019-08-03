$(function() {
  
  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : "";
    var html = `<div class="Wrapper--chat-contents--main-message">
                  <div class="Wrapper--chat-contents--main-message__info">
                    <div class="Wrapper--chat-contents--main-message__info-user-name">
                      ${message.user_name}
                    </div>
                    <div class="Wrapper--chat-contents--main-message__info-date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="Wrapper--chat-contents--main-message__text">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html
  }

  function scrollDown(){
    $('.Wrapper--chat-contents--main').animate({ 
      scrollTop: $('.Wrapper--chat-contents--main')[0].scrollHeight
    });
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.Wrapper--chat-contents--main-message:last').data('message_id');
    url_array = location.href.split('/')
    current_group_id = url_array[url_array.length - 2];  
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: '/groups/' + current_group_id +'/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  }; 
});