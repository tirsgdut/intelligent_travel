//点击取消按钮删除输入
$(function() {
    $("#cancel-start").click(function() {
        if(verificat.isNotNullTrim($(".departure-input").val())){
            $(".departure-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
});

$(function() {
    $("#cancel-end").click(function() {
        if(verificat.isNotNullTrim($(".destination-input").val())){
            $(".destination-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
})

//清除路线
$(function() {
    $("#cancel-end").click(function() {
        if(verificat.isNotNullTrim($(".destination-input").val())){
            $(".destination-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
})