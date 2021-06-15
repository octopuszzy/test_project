$(function(){
    //为按钮添加点击事件
    $('#btnSend').on('click',function(){
        var text = $('#ipt').val().trim()
        if(text.length<=0){
            return $('#ipt').val('')
        }
        else{
            $('.talk_list').append('<li class="right_word clearfix"><img src="img/zzy.png" alt=""><div><div class="sanjiao_right"></div>'
            +text+'</div></li>');
            $('#ipt').val('')
            getMsg(text)
        }
    })

    
    //绑定键盘回车键
    $('#ipt').on('keyup',function(e){
        // console.log(e.keyCode);
        if(e.keyCode === 13){
            $('#btnSend').click()
        }
    })  
})

//获取自动回复内容
function getMsg(text){
    $.ajax({
        method:'GET',
        url: 'http://www.liulongbin.top:3006/api/robot',
        data: {
            spoken: text
        },
        success: function(res){
            if(res.message ==='success'){
                var msg = res.data.info.text;
                $('.talk_list').append('<li class="left_word clearfix"><img src="img/lsh.png" alt=""><div><div class="sanjiao_left"></div>'
                +msg+'</div></li>');
                getVoice(msg)
            }
        }
    })
}

//获取机器人声音
function getVoice(msg){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/synthesize',
        data: {
            text: msg
        },
        success: function(res){
            $('#voice').attr('src',res.voiceUrl)
        }
    })
}
