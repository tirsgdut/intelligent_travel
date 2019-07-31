define(['require','tools'],function(require){
//点击取消按钮删除输入
let tools = require('tools');
//清除起点坐标
$(function() {
    $("#cancel-start").click(function() {
        if(tools.verificat.isNotNullTrim($(".departure-input").val())){
            $(".departure-input").val("");           
        }else{
            alert("输入为空，无法取消");
        }
    });
});
//清除终点坐标
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
for(var i = 0; i < addlisten_search_reslut_contanier.length; i++) {
    addlisten_search_reslut_contanier[i].onmouseover = function() {       
        this.style.backgroundColor = "rgb(240,239,244)";
        this.getElementsByClassName("sperate-line")[0].style.display = "none";
    }   
}

for(var i = 0; i < addlisten_search_reslut_contanier.length; i++) {
    addlisten_search_reslut_contanier[i].onmouseout = function() {       
        this.style.backgroundColor = "rgb(245,245,245)";
        this.getElementsByClassName("sperate-line")[0].style.display = "block";
    }   
}

//点击下拉按钮展开或者收起路线信息
var open_detail_list_icon = document.getElementsByClassName("open-detail-arrow");
var station_number_icon = document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml");
var subway_icon = document.getElementsByClassName("place-photo-position");
//定义一个状态量,每一个按钮有自己的状态量存放在数组中,0表示收起,1表示展开
var status = new Array(open_detail_list_icon.length);
var status1 = new Array(10);
//初始化数组
for(var i = 0; i < open_detail_list_icon.length; i++){
    status[i] = 0;
    status1[i] = 0;
}

for(var i = 0; i < open_detail_list_icon.length; i++) {   
    open_detail_list_icon[i].onclick = open_routes_list.bind(document.getElementsByClassName("demonstrate-detail-travel-way")[i],i);    
}


//展开乘客类型
document.getElementsByClassName("show-visitor-type")[0].onclick = function() {
    document.getElementsByClassName("show-visitor-type-contaniner")[0].style.display = "block";
    document.getElementsByClassName("show-visitor-type-contaniner")[0].style.top = "0.8rem";
}

document.getElementsByClassName("shangla-arrow")[0].onclick = function() {
    document.getElementsByClassName("show-visitor-type-contaniner")[0].style.display = "none";
}

function open_routes_list(i) {  
    if(status[i] == 0){
        this.style.display = "block";
        open_detail_list_icon[i].style.backgroundImage = "url(../images/shouqi.png)"
        status[i] = 1;
        //向后台发送请求
        $(function() {                                     
                $.get("http://192.168.31.89:8080/todo/api/v1.0/route/try", {
                    //发送起点终点的名称
                    departure_site: document.getElementsByClassName("start-site-name")[i].innerHTML,
                    destination_site: document.getElementsByClassName("destination-site-name")[i].innerHTML                    
                }, function(data, textStatus) {
                    document.getElementsByClassName("")
                    console.log(document.getElementsByClassName("start-site-name")[i].innerHTML)                          
                    var subway;               
                    console.log(data);
                    subway = data;  
                    addsubwayinformation(subway,i);                   
                })                      
        })              
    }else{
        document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[i].innerHTML = "";
        this.style.display = "none";
        open_detail_list_icon[i].style.backgroundImage = "url(../images/xiala.png)"
        status[i] = 0;
    }
}


//当聚焦输入框时，清除模糊搜索结果
document.getElementById('start-site').onclick = function() {
    
    for(var i = 0; i< document.getElementsByClassName("fuzzy-search-result").length; i++) {
        document.getElementsByClassName("fuzzy-search-result")[i].innerHTML = "";
    }
    document.getElementsByClassName("fuzzy-search")[0].style.display = "none";
}

document.getElementById('end-site').onclick = function() {
    
    for(var i = 0; i< document.getElementsByClassName("fuzzy-search-result").length; i++) {
        document.getElementsByClassName("fuzzy-search-result")[i].innerHTML = "";
    }
    document.getElementsByClassName("fuzzy-search")[0].style.display = "none";
}

//模拟数据
//  var subway = 
//     {
//         "set_up_site": "fu_k大学",
//         "subway_block": [
//             {
//                 "a_changes": "步行1.5公里至于大学城南(约22分钟)",
//                 "b_line": "地铁4号线",
//                 "c_start": "大学城南<span ><span style='color: rgb(146,151,147);font-size: 9px;'>上车</span>",
//                 "d_end": "万胜围<span style='color: rgb(146,151,147);font-size: 9px'>下车</span>",
//                 "e_time": "上车站 首: 06:02 末: 23:22 约6分钟/趟",
//                 "f_number_stations": "3站",
//                 "g_color": "4",//改变颜色用,
//                 "h_middle": 
//                     {                                               
//                         "cross_1": "大学城北",
//                         "cross_2": "官洲"                                                                                          
//                     },                                
//             },
//             {
//                 "a_changes": "万胜围站内换乘",
//                 "b_line": "地铁8号线",
//                 "c_start": "万胜围<span ><span style='color: rgb(146,151,147);font-size: 9px;'>上车</span>",
//                 "d_end": "客村<span style='color: rgb(146,151,147);font-size: 9px'>下车</span>",
//                 "e_time": "上车站 首: 06:02 末: 23:22 约6分钟/趟",
//                 "f_number_stations": "3站",
//                 "g_color": "8",
//                 "h_middle": {                                               
//                         "cross_1": "大学城北",
//                         "cross_2": "官洲"                                                                                          
//                     }
                
//             }
//         ],
//         "destination_site": "go to hell"
//     }

var str = `<div class="go-to-site-route"></div>
            
    <div class="place-photo-position"></div>
    <div class="demonstrate-subway-detail-informations" id="fuck">
    <div class="subway-name" style="color: rgb(39,135,74)"></div>
    <div class="subway-name"><span style="color: rgb(97,103,101)"></div>
    <div class="two-stage-expansion">     
    </div>                     
    <div class="subway-name"></div>
    <div class="subway-name" style="color: rgb(146,151,147);font-size: 10px"></div>

    <div class="station-number"></div>
    <div class="station-number-icon"></div>
    
</div>`  

function addsubwayinformation(subway,index) {
    for(var i in subway) {
        if(i == "set_up_site") {
            document.getElementsByClassName("start-site-name")[index].innerHTML = subway[i];
        }

        if(i == "subway_block") {
            for(var j = 0; j < subway[i].length; j++ ) {
                
                document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].innerHTML += str;//插入了整一个框架

                for(var k in subway[i][j]){
                    if(k == "a_changes"){
                        console.log(subway[i][j][k]);
                        document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("go-to-site-route")[j].innerHTML = document.getElementsByClassName("start-site-name")[i].innerHTML;
                    } 
                    if(k == "b_line") document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].getElementsByClassName("subway-name")[0].innerHTML = subway[i][j][k];
                    if(k == "c_start") document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].getElementsByClassName("subway-name")[1].innerHTML = subway[i][j][k];
                    if(k == "d_end") document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].getElementsByClassName("subway-name")[2].innerHTML = subway[i][j][k];
                    if(k == "e_time") document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].getElementsByClassName("subway-name")[3].innerHTML = subway[i][j][k];
                    if(k == "f_number_stations") document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].getElementsByClassName("station-number")[0].innerHTML = subway[i][j][k] ;
                    if(k == "g_color") {
                        if (subway[i][j][k] == "0" || subway[i][j][k] == "1"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor = "#fbf3ca";
                        }
                        if (subway[i][j][k] == "2" || subway[i][j][k] == "3"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#c2dae8";
                        } 
                        if (subway[i][j][k] == "4" || subway[i][j][k] == "5" || subway[i][j][k] == "6" || subway[i][j][k] == "7"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#fae7d2";
                        } 
                        if (subway[i][j][k] == "8" || subway[i][j][k] == "9"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#c2e0d2";
                        } 
                        if (subway[i][j][k] == "10" || subway[i][j][k] == "11"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#f2c6cf";
                        } 
                        if (subway[i][j][k] == "12" || subway[i][j][k] == "13"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor = "#ddc8d4";
                        } 
                        if (subway[i][j][k] == "14" || subway[i][j][k] == "15"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#e3f1ca";
                        } 
                        if (subway[i][j][k] == "16" || subway[i][j][k] == "17"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#c2e1e3";
                        } 
                        if (subway[i][j][k] == "18" || subway[i][j][k] == "19"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#daefe5";
                        } 
                        if (subway[i][j][k] == "20" || subway[i][j][k] == "21"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#dfe2cc";
                        } 
                        if (subway[i][j][k] == "22" || subway[i][j][k] == "23") {
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#ddc8c8";
                        } 
                        if (subway[i][j][k] == "24" || subway[i][j][k] == "25"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#c4c6ce";
                        } 
                        if (subway[i][j][k] == "26" || subway[i][j][k] == "27"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#c2e6ce";
                        } 
                        if (subway[i][j][k] == "28" || subway[i][j][k] == "29"){
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#eef5c2";
                        }
                        if( subway[i][j][k] == "bus"){  
                            document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("demonstrate-subway-detail-informations")[j].style.backgroundColor  = "#eef5c2";
                        }
                        
                    }
                    if(k == "h_middle") {
                        
                        for(var z = 0; z < station_number_icon.length; z++) { 
                            for(var p = 0; p < station_number_icon[z].getElementsByClassName("station-number-icon").length; p++) {
                                station_number_icon[z].getElementsByClassName("station-number-icon")[p].onclick = open_detailed_station_name.bind(station_number_icon[z].getElementsByClassName("two-stage-expansion")[p],index,subway[i][j][k],p);
                            }     
                        }
                    }
                }
                
            }          
        }

        if(i == "destination_site") {
            document.getElementsByClassName("destination-site-name")[index].innerHTML = document.getElementsByClassName("destination-site-name")[i].innerHTML;
        }
    }
}

function open_detailed_station_name(index,information,addnum) {

    if(this.style.display == "block") {
        this.style.display = "none";
        document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("station-number-icon")[addnum].style.backgroundImage = "url(../images/xiala.png)"
        for(var k in information) {       
            this.innerHTML = information[k];
        } 
        //二级展开保证图片和展开的路线信息等高       
        document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum].style.height = document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum].nextSibling.nextSibling.clientHeight + "px";
    }else {
        this.style.display = "block";
        document.getElementsByClassName("demonstrate-subway-detail-informations-innerhtml")[index].getElementsByClassName("station-number-icon")[addnum].style.backgroundImage = "url(../images/shouqi.png)"
        console.log(document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum])
        console.log(document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum].nextSibling.nextSibling.clientHeight)

        for(var k in information) {       
            this.innerHTML += information[k]+"<br>";
        } 
        document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum].style.height = document.getElementsByClassName("demonstrate-detail-travel-way")[index].getElementsByClassName("place-photo-position")[addnum].nextSibling.nextSibling.clientHeight + "px";     
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
        "line_2": "公交",
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



// // 动态加入路线
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
// 这一部分是添加时间，路程，步行距离，价钱，方便的类型，和上车地点
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

// addinformation(json_information);



});