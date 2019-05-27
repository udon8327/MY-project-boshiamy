$(document).ready(function() {


  //預設總字庫
  if(localStorage.getItem('myArr')==null){
    localStorage.setItem('myArr', '[{"name":"字庫1","word":[]},{"name":"字庫2","word":[]},{"name":"字庫3","word":[]},{"name":"字庫4","word":[]},{"name":"字庫5","word":[]}]');
  }

  //抓取總字庫
  questionAll = JSON.parse(localStorage.getItem('myArr'));

  //預設字庫
  var question = questionAll[$('.database.actived').attr('data')].word;
  if(question.length==0){
    $('#question').text('空字庫');
    $('#questionList').text('空字庫，請加入文字');
  }else{
    $('#questionList').text(question);
  }

  //測試區
  $('#test1').text(JSON.stringify(questionAll));
  //$('#test2').text(question);
  //localStorage.getItem('key');
  //localStorage.setItem('key', 'value');
  //var myString = JSON.stringify(myJSON);
  //var superHeroes = JSON.parse(superHeroesText);

  //更換字庫
  $('.database').on('click',function(){
    $('#question').text('');
    $(this).addClass('actived').siblings().removeClass('actived');
    question = questionAll[$(this).attr('data')].word;
    $('#questionList').text(question);
    createQuestion();
    if(question.length==0){
      $('#question').text('空字庫');
      $('#questionList').text('空字庫，請加入文字');
    }
  })

  //自訂字庫
    //加入
  $('#myWordAddBtn').on('click',function(){
    var MyWordKeyIn = $('#myWordAdd').val()
    var MyWordCheck = [];
    for(i=0;i<arr.word.length;i++){
      if(arr.word[i]==MyWordKeyIn){
        MyWordCheck.push(i);
      }
    }
    if(MyWordCheck.length>0){
      questionAll[$('.database.actived').attr('data')].word.push($('#myWordAdd').val());
    }else{
      alert('您輸入的項目不存在嘸蝦米字根!');
    }
    var questionString = JSON.stringify(questionAll);
    localStorage.setItem('myArr', questionString);
    $('#questionList').text(questionAll[$('.database.actived').attr('data')].word);
    createQuestion();
    $('#myWordAdd').val('');
  })
    //刪除
  $('#myWordDelBtn').on('click',function(){
    var MyWordDelVal = $('#myWordDel').val();
    for(i=0;i<question.length;i++){
      if(question[i]==MyWordDelVal){
        question.splice(i,1);
      }
    }
    $('#questionList').text(question);
    if(question.length==0){
      $('#question').text('空字庫');
      $('#questionList').text('空字庫，請加入文字');
    }
    createQuestion();
    $('#myWordDel').val('');
  })
    //全部刪除
  $('#myWordDelAllBtn').on('click',function(){
    if(confirm("確定要全部刪除嗎?")){
      question.length = 0;
      $('#questionList').text(question);
      $('#question').text('空字庫');
      $('#questionList').text('空字庫，請加入文字');
    }
  });

  //出字函式
  function createQuestion() {
    questionNumber = Math.floor(Math.random() * question.length);
    $('#key').val('');
    $('#question').text(question[questionNumber]);
  }
  createQuestion();

  //輸入判斷
  $(window).keydown(function(event) {
    if (event.which == 32) {
      var keyIn = $('#key').val().trim();
      var val = $('#question').text();
      var arrword = [];
      var arrroot = [];

      for(i=0;i<arr.word.length;i++){
        if(arr.word[i]==val){
          arrword.push(i);
        }
      }
      for(i=0;i<arrword.length;i++){
        arrroot.push(arr.root[arrword[i]]);
      }
      function checkRoot(){
        for(i = 0; i < arrroot.length; i++) {
          if(keyIn==arrroot[i]){
            return true;
          }
        }
      }

      if(checkRoot()){
        $('#answer').show();
        $('#answer').html('<p style="color: green;">正確！</p>');
        createQuestion();
        setTimeout("$('#answer').fadeOut(300);", 500);
        $('#chiratxt').text('');
      }else{
        $('#answer').show();
        $('#answer').text('錯誤！');
        $('#key').val('');
        setTimeout("$('#answer').fadeOut(300);", 500);
      };

    };
  });

  //下一字
  $('#next').click(function(){
    createQuestion();
    $('#chiratxt').text('');
  });
  $(window).keydown(function(event) {
    if (event.which == 112) {
      createQuestion();
      $('#chiratxt').text('');
    };
  });

  //看解答
  function chira(){
    var chiraval = $('#question').text();
    var chiraword = [];
    var chiraroot = [];

    for(i=0;i<arr.word.length;i++){
      if(arr.word[i]==chiraval){
        chiraword.push(i);
      }
    }
    for(i=0;i<chiraword.length;i++){
      chiraroot.push(arr.root[chiraword[i]]);
    }
    $('#chiratxt').text(chiraroot.join(' , '));
  }
  $('#chira').click(function(){
    chira();
  });
  $(window).keydown(function(event) {
    if (event.which == 113) {
      chira();
    };
  });

});
