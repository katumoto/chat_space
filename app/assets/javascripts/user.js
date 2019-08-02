$(function() {
  var serch_list = $('#user-search-result');
  var members_list = $("#chat-group-users");

  function appendSearchList(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    serch_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    serch_list.append(html);
  }
  
  function appendChatMembersList(user_name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    members_list.append(html);
  }


  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendSearchList(user);
        });
      } else {
        appendErrMsgToHTML("一致するユーザーがありません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })

  $(serch_list).on('click', ".user-search-add", function(){
    var user_name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    // ①「追加」ボタンがクリックされたユーザーが、検索結果一覧から消える
    $(this).parent().remove();
    // ②「追加」ボタンがクリックされたユーザーが、チャットメンバーの方に追加される
    appendChatMembersList(user_name, user_id);
  })

  $(members_list).on('click', ".user-search-remove", function(){
    // ③ 削除を押すと、チャットメンバーから削除する
    $(this).parent().remove();
  })
});