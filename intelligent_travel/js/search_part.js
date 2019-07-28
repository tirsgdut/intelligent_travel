define(['require','tools'],function(require){
//点击取消按钮删除输入
let tools = require('tools');

$(function() {
    $("#cancel-start").click(function() {
        if(tools.verificat.isNotNullTrim($(".departure-input").val())){
            $(".departure-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
});

$(function() {
    $("#cancel-end").click(function() {
        if(tools.verificat.isNotNullTrim($(".destination-input").val())){
            $(".destination-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
});

var addlisten_search_reslut_contanier = document.getElementsByClassName("show-subway-search-result");

//鼠标放在搜索出的路线结果容器上使其背景颜色变化，同时去掉分割线
for(var i = 0; i < addlisten_search_reslut_contanier.length; i++){
    addlisten_search_reslut_contanier[i].onmouseover = function() {       
        this.style.backgroundColor = "rgb(240,239,244)";
        this.getElementsByClassName("sperate-line")[0].style.display = "none";
    }   
}

for(var i = 0; i < addlisten_search_reslut_contanier.length; i++){
    addlisten_search_reslut_contanier[i].onmouseout = function() {       
        this.style.backgroundColor = "rgb(245,245,245)";
        this.getElementsByClassName("sperate-line")[0].style.display = "block";
    }   
}

var json_information = [
    {
        "time": "27分钟",
        "mile": "&nbsp&nbsp321米",
        "walk": "&nbsp&nbsp步行400米",
        "price": "&nbsp&nbsp4元",
        "convenient_type": "时间短", 
        "set_up_site": "大学城南站(B口)上车",
        "line_0": "大学城专线四路",
        "line_1": "地铁8号线",
        "line_2": "地铁3号线",
        "line_3": "APM线"
    },
    // {
    //     "time": "45分钟",
    //     "mile": "&nbsp&nbsp400米",
    //     "walk": "&nbsp&nbsp步行200米",
    //     "price": "&nbsp&nbsp10元",
    //     "convenient_type": "草泥马", 
    //     "set_up_site": "公元前上车",
    //     "line_0": "大学城专线四路",
        
    // },
    // {
    //     "time": "45分钟",
    //     "mile": "&nbsp&nbsp400米",
    //     "walk": "&nbsp&nbsp步行200米",
    //     "price": "&nbsp&nbsp10元",
    //     "convenient_type": null, 
    //     "set_up_site": "体育西路上车",
    //     "line_0": "大学城专线四路",
    //     "line_1": "地铁8号线",  
    // },
    // {
    //     "time": "45分钟",
    //     "mile": "&nbsp&nbsp400米",
    //     "walk": "&nbsp&nbsp步行200米",
    //     "price": "&nbsp&nbsp10元",
    //     "convenient_type": null, 
    //     "set_up_site": "体育西路上车",
    //     "line_0": "大学城专线四路",
    //     "line_1": "地铁8号线",  
    // },
    // {
    //     "time": "45分钟",
    //     "mile": "&nbsp&nbsp400米",
    //     "walk": "&nbsp&nbsp步行200米",
    //     "price": "&nbsp&nbsp10元",
    //     "convenient_type": null, 
    //     "set_up_site": "体育西路上车",
    //     "line_0": "大学城专线四路",
    //     "line_1": "地铁8号线",  
    // },

]



//动态加入路线
function addrouteway(json_information) {
    var information_contanier = document.getElementsByClassName("show-subway-search-result");
    var k = 0;

    for(let i = 0; i < json_information.length; i++) {
        for(var j in json_information[i]) {
            if(j == "line_" + [k]) {
                console.log(j);
                information_contanier[i].getElementsByClassName("subway-route-show")[0].innerHTML += "<img src='../images/subway.png' style='height: 11px;width:'25px';margin-right: '5px'></img>" + json_information[i][j] + ">";
                k++;
            }           
        }
        k = 0;
    }
}

addrouteway(json_information);
//这一部分是添加时间，路程，步行距离，价钱，方便的类型，和上车地点
function addinformation(json_information) {
    var information_contanier = document.getElementsByClassName("show-subway-search-result");
    var k = 0;

    for(let i = 0; i < json_information.length; i++) {
        information_contanier[i].style.display = "block";
        for(var j in json_information[i]){
            console.log(json_information[i][j]);
            if(j == "line_0"){
                break;
            }
            
            if(j != "convenient_type" && j != "set_up_site"){
                information_contanier[i].getElementsByClassName("information_li")[k++].innerHTML = json_information[i][j];
            }
            
            if(j == "convenient_type" && json_information[i][j] != null) {
                information_contanier[i].getElementsByClassName("convenient_type")[0].style.display = "block";
                information_contanier[i].getElementsByClassName("convenient_type")[0].innerHTML = json_information[i][j];
                information_contanier[i].getElementsByClassName("set-up-point")[0].style.marginLeft = "2%";
            }

            if(j == "convenient_type" && json_information[i][j] == null){               
                information_contanier[i].getElementsByClassName("convenient_type")[0].style.display = "none";
                information_contanier[i].getElementsByClassName("set-up-point")[0].style.marginLeft = "6.5%";
            }
            
            if(j == "set_up_site"){
                information_contanier[i].getElementsByClassName("set-up-point")[0].innerHTML = json_information[i][j];
            }
        }
        k = 0;
    }
}

addinformation(json_information);
});