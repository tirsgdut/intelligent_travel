define(['require','tools'],function(require) {
    var map = new BMap.Map("container", {
        label: null
    });
    var tools = require('tools');
    // 创建地图实例  
    var point = new BMap.Point(113.40085066839228, 23.064408982302982);
    // 创建点坐标  
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);

    //从描述获得地铁坐标
    // var departure_point = new BMap.Geocoder();
    // var desination_point = new BMap.Geocoder();
    
    // departure_point.getPoint($(".departure-input").val(), function(point){      
    //     if (point) {      
    //         console.log(point);
    //     }else {
    //         alert("请输入广州市内的地点")
    //     }      
    //  },"广州市");

    // desination_point.getPoint("大学城南站", function(point){      
    //     if (point) {      
    //         console.log(point);
    //     }else {
    //         alert("请输入广州市内的地点")
    //     }            
    // },"广州市");

       
var marker = new BMap.Marker(new BMap.Point(113.40640893373343,23.049620735802392));        // 创建标注    
map.addOverlay(marker);

    $(function() {
        $(".search-button").click(function() {
           // console.log($(".departure-input").val())
           // console.log($(".destination-input").val())
           if(tools.verificat.isNotNullTrim($(".destination-input").val()) && tools.verificat.isNotNullTrim($(".departure-input").val())){
            $.post("http://192.168.31.89:8080/todo/api/v1.0/route", {
                departure: departure_point,
                destination: desination_point          
               }, function(data, textStatus) {
                    document.getElementsByClassName("search-subway-result-contanier")[0].display = "block";
                    document.getElementsByClassName("filled-container")[0].display = "none";
                    var position;//JSON数组用来接受传过来的坐标信息
                    console.log(data);
                    position = data;  
                    showroute(position);
                    clearimg();
                    addrouteway(position);
                    addinformation(position);                   
               })
           }else {
                alert("请检查你的输入是否正确");
           }
           
        });
    })

    
    // //改变折现样式
    // var test_polyline = new BMap.Polyline([  
    //     new BMap.Point(113.28438, 23.00025),  
    //     new BMap.Point(113.276129, 22.99508), 
    //     new BMap.Point(113.2999, 23.040015) 
    //   ],  
    //   {strokeColor:"red", strokeWeight:6, strokeOpacity:0.5}  
    //  );  
    //  map.addOverlay(test_polyline); 

    //规划路线  
    // function showroute(position) {
    //     Clear();             
    //     for(var n = 0; n < position.length; n++) {    
    //         for(var key in position[n]) {
    //             if(key == "z_route") {
    //                 var array_store_instance = new Array(position[n][key].length);//用来存储多个创建的实例
    //                 for(var i = 0; i < key.length; i++) {
                           
    //                     for(var j = 0; j < array_store_instance.length; j++) {
                        
    //                         if(j == 0){              
    //                             array_store_instance[j] = new BMap.TransitRoute(map, { 
    //                                 renderOptions: { 
    //                                     map: map, 
    //                                     autoViewport: true
    //                                 },
    //                                 onMarkersSet: function(routes) {                                                                  
    //                                     map.removeOverlay(routes[1].marker);//删除终点
    //                                 }
                                    
    //                             });
    //                             array_store_instance[j].setPolylinesSetCallback(function(lines,routes) {
    //                                 console.log("fucking" + lines);
    //                                 console.log("yeah" + routes);
    //                                 map.getPolyline()
    //                             })
    //                         }
                        
    //                         if(j != 0 && j != array_store_instance.length) {
    //                             array_store_instance[j] = new BMap.TransitRoute(map, { 
    //                                 renderOptions: { 
    //                                     map: map,                                    
    //                                 },
    //                                 onMarkersSet: function(routes) {
    //                                     map.removeOverlay(routes[0].marker); //删除起点
    //                                     map.removeOverlay(routes[1].marker);//删除终点
    //                                 }
    //                             });
    //                         }
        
    //                         if(j == array_store_instance.length - 1) {
    //                             array_store_instance[j] = new BMap.TransitRoute(map, { 
    //                                 renderOptions: { 
    //                                     map: map, 
    //                                     autoViewport: true
    //                                 },
    //                                 onMarkersSet: function(routes) {                            
    //                                     map.removeOverlay(routes[0].marker);//删除起点
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 }
                
    //                 for(var i = 0; i < array_store_instance.length; i++) {
    //                     array_store_instance[i].search(new BMap.Point(position[n].z_route[i].start_x,position[n].z_route[i].start_y),new BMap.Point(position[n].z_route[i].end_x,position[n].z_route[i].end_y));            
    //                 }

    //                 //百度的路线规划
    //                 var transit = new BMap.TransitRoute(map, { 
    //                     renderOptions: { 
    //                         map: map, 
    //                         autoViewport: true 
    //                     } 
    //                 });
    //                 transit.search(new BMap.Point(position[n].z_route[0].start_x,position[n].z_route[0].start_y),new BMap.Point(position[n].z_route[array_store_instance.length-1].end_x,position[n].z_route[array_store_instance.length-1].end_y));
                    
    //                 //调整到最佳视野
                   
    //                 map.setViewport([new BMap.Point(position[n].z_route[0].start_x,position[n].z_route[0].start_y),new BMap.Point(position[n].z_route[array_store_instance.length-1].end_x,position[n].z_route[array_store_instance.length-1].end_y)]); 
                      
    //                 var allOverlay = map.getOverlays();                                  
    //             }
    //         }
    //     }
                   
    // }
    function showroute(position) {      
        Clear();

        for(var n = 0; n < position.length; n++) {    
            for(var key in position[n]) {
                if(key == "z_route") {
                    var array_store_instance = new Array(position[n][key].length);//用来存储多个创建的实例
                    for(var i = 0; i < position[n][key].length; i++) {
                        console.log(position[n][key][i]);
                        console.log(i+1)
                        //console.log(array_store_instance[i]);
                        array_store_instance[i] = new BMap.Point(position[n].z_route[i].x,position[n].z_route[i].y);
                        console.log(array_store_instance[i]);
                        
                    } 
                }
            }

            var polyline = new BMap.Polyline(array_store_instance,{strokeColor:"red",strokeWeight:6, strokeOpacity:0.5});
            map.addOverlay(polyline);

            //百度的路线规划
                    var transit = new BMap.TransitRoute(map, { 
                        renderOptions: { 
                            map: map, 
                            autoViewport: true 
                        } 
                    });
                    transit.search(new BMap.Point(position[n].z_route[0].x,position[n].z_route[0].y),new BMap.Point(position[n].z_route[array_store_instance.length-1].x,position[n].z_route[array_store_instance.length-1].y));
                    //调整到最佳视野 
                    map.setViewport([new BMap.Point(position[n].z_route[0].x,position[n].z_route[0].y),new BMap.Point(position[n].z_route[array_store_instance.length-1].x,position[n].z_route[array_store_instance.length-1].y)]);              
                   
        }
        
    }

    function addrouteway(json_information) {
        var information_contanier = document.getElementsByClassName("show-subway-search-result");
        var k = 0;
        
    
        for(var i = 0; i < json_information.length; i++){
            for(var key in json_information[i]){           
                while(key == "line_" + k){                                          
                    information_contanier[i].getElementsByClassName("subway-route-show")[0].innerHTML += "<img src='../images/subway.png' style='height: 11px;width:'25px';margin-right: '5px'></img>" + json_information[i][key] + ">";
                    k++;                             
                }                                                                                                      
            } 
            k=0;                      
        }       
    }
    
    //清除所有推荐路线img
    function clearimg() {
        for(var i = 0; i < document.getElementsByClassName("show-subway-search-result").length; i++) {
            document.getElementsByClassName("show-subway-search-result")[i].getElementsByClassName("subway-route-show")[0].innerHTML = "";
        }
    }
    

    //这一部分是添加时间，路程，步行距离，价钱，方便的类型，和上车地点
    function addinformation(json_information) {
        var information_contanier = document.getElementsByClassName("show-subway-search-result");
        var k = 0;
    
        for(let i = 0; i < json_information.length; i++) {
            information_contanier[i].style.display = "block";
            for(var j in json_information[i]){
                console.log(json_information[i][j]);
                
                
                if(j == "mile" || j == "price" || j == "walk" || j == "time"){
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
    
    function Clear(){//清除
        map.clearOverlays();//清除图层覆盖物
    }

    //清除路线按钮
    $(function() {
        $(".clear-route-button").click(function() {
            if(tools.verificat.isNotNullTrim($(".destination-input").val() || tools.verificat.isNotNullTrim($(".departure-input").val()))) {
                $(".destination-input").val("");
                $(".departure-input").val("");          
            }else{
                alert("输入为空，无法取消");
            }
            Clear();
        });
    });
// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

// var test_polyline = new BMap.Polyline([  
//     new BMap.Point(113.28438, 23.00025),  
//     new BMap.Point(113.276129, 22.99508), 
//     new BMap.Point(113.2999, 23.040015) 
//   ],  
//   {strokeColor:"red", strokeWeight:6, strokeOpacity:0.5}  
//  );  
//  map.addOverlay(test_polyline);

    //自定义一个放大的控件 
    function ZoomControl(){    
        // 设置默认停靠位置和偏移量  
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;    
        this.defaultOffset = new BMap.Size(20, 58);    
    }       
    // 通过JavaScript的prototype属性继承于BMap.Control   
    ZoomControl.prototype = new BMap.Control();  
    ZoomControl.prototype.initialize = function(map){    
        // 创建一个DOM元素   
        var div = document.createElement("div");    
        // 添加文字说明    
        div.appendChild(document.createTextNode("+"));    
        // 设置样式
        div.style.height = "40px";
        div.style.width = "40px";  
        div.style.cursor = "pointer";    
        div.style.textAlign = "center";
        div.style.fontSize = "27px";
        div.style.borderTopLeftRadius="4px"
        div.style.borderTopRightRadius="4px"
        div.style.lineHeight = "40px;";
        div.style.backgroundColor = "white";
        //绑定事件，点击一次放大两级    
        div.onclick = function(e){  
            map.zoomTo(map.getZoom() + 1);    
        }    
        // 添加DOM元素到地图中   
        map.getContainer().appendChild(div);    
        // 将DOM元素返回  
        return div;    
    }
    var myZoomCtrl = new ZoomControl();    
    // 添加到地图当中    
    map.addControl(myZoomCtrl);
    
    //添加一个缩小控件
    function ZoomControl1(){    
        // 设置默认停靠位置和偏移量  
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;    
        this.defaultOffset = new BMap.Size(20, 18);    
    }       
    // 通过JavaScript的prototype属性继承于BMap.Control   
    ZoomControl1.prototype = new BMap.Control();  
    ZoomControl1.prototype.initialize = function(map){    
        // 创建一个DOM元素   
        var div = document.createElement("div");    
        // 添加文字说明    
        div.appendChild(document.createTextNode("-"));    
        // 设置样式
        div.style.height = "40px";
        div.style.width = "40px";  
        div.style.cursor = "pointer";    
        div.style.textAlign = "center";
        div.style.fontSize = "27px";
        div.style.borderBottomLeftRadius="4px"
        div.style.borderBottomRightRadius="4px"
        div.style.lineHeight = "40px;"
        div.style.backgroundColor = "white";    
        //绑定事件，点击一次放大两级    
        div.onclick = function(e){  
            map.zoomTo(map.getZoom() - 1);    
        }    
        // 添加DOM元素到地图中   
        map.getContainer().appendChild(div);    
        // 将DOM元素返回  
        return div;    
    }
    var myZoomCtrl1 = new ZoomControl1();    
    // 添加到地图当中    
    map.addControl(myZoomCtrl1);

    //模糊搜索
    function searchroutename() {
        var ac = null;
        var ac1 = null;
        var start_site_container = document.getElementsByClassName("fuzzy-search-result");
        var start_site_result_container = document.getElementsByClassName("fuzzy-search")[0];

        //创建自动完成实例，input参数为文本输入框或者其id，location设定返回结果所属范围
        ac = new BMap.Autocomplete({
            "input": "start-site",
            "location": map,
            "onSearchComplete": function(data) {
                ac.hide();
                start_site_result_container.style.display = "block";
                document.getElementsByClassName("search-subway-result-contanier")[0].display = "none";
                for(var i =0; i < 10 ; i++){
                    start_site_container[i].innerHTML = "<img src='../images/位置.png' style='vertical-align:text-bottom;height: 14px;width: 14px;margin-right:4px'/>" + ac.getResults().Qq[i].city + ac.getResults().Qq[i].district + ac.getResults().Qq[i].street + ac.getResults().Qq[i].business;
                }

                //为搜索结果添加事件监听，用户点击后需要获得地点的坐标,需要利用ajax向后台返回数据
                for(var i = 0; i< 10; i++){
                        start_site_container[i].onclick = function () {
                        var locationinstance = null;
                        locationinstance = cutinnerhtml(this.innerHTML.toString());
                        console.log($(".departure-input").val());
                        console.log(locationinstance); 
                        document.getElementsByClassName("departure-input")[0].value = locationinstance;             
                    }           
                    
                }
                
            }   
        })

        ac1 = new BMap.Autocomplete({
            "input": "end-site",
            "location": map,
            "onSearchComplete": function(data) {
                ac1.hide();
                start_site_result_container.style.display = "block";
                document.getElementsByClassName("search-subway-result-contanier")[0].display = "none";
                for(var i =0; i < 10 ; i++){
                    start_site_container[i].innerHTML = "<img src='../images/位置.png' style='vertical-align:text-bottom;height: 14px;width: 14px;margin-right:4px'/>" + ac1.getResults().Qq[i].city + ac1.getResults().Qq[i].district + ac1.getResults().Qq[i].street + ac1.getResults().Qq[i].business;
                }

                //为搜索结果添加事件监听，用户点击后添加到输入框
                for(var i = 0; i< 10; i++){
                        start_site_container[i].onclick = function () {
                        var locationinstance = null;
                        locationinstance = cutinnerhtml(this.innerHTML.toString());
                        console.log($(".departure-input").val());
                        console.log(locationinstance); 
                        document.getElementsByClassName("destination-input")[0].value = locationinstance;             
                    }           
                    
                }
                
            }   
        })
     
        function cutinnerhtml(string) {                   
            var a = string.substring(string.indexOf(">",0)+1,string.length);
            return a;
        }            
    }
    searchroutename();

    function getBoundary(){       
		var bdary = new BMap.Boundary();
		bdary.get("广州市", function(rs){       //获取行政区域
			map.clearOverlays();        //清除地图覆盖物       
			var count = rs.boundaries.length; //行政区域的点有多少个
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return ;
			}
          	var pointArray = [];
			for (var i = 0; i < count; i++) {
				var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
				map.addOverlay(ply);  //添加覆盖物
				pointArray = pointArray.concat(ply.getPath());
			}    
			map.setViewport(pointArray);    //调整视野  
			addlabel();               
		});   
	}

	setTimeout(function(){
		getBoundary();
	}, 2000);

	function addlabel() {
	    var pointArray = [
	      new BMap.Point(121.716076,23.703799),
	      new BMap.Point(112.121885,14.570616),
	      new BMap.Point(123.776573,25.695422)];
	    var optsArray = [{},{},{}];
	    var labelArray = [];
	    var contentArray = [
	      "台湾是中国的！",
	      "南海是中国的！",
	      "钓鱼岛是中国的！"];
	    for(var i = 0;i < pointArray.length; i++) {
	      optsArray[i].position = pointArray[i];
	      labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
	      labelArray[i].setStyle({
			color : "red",
			fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑"
			 });
	      map.addOverlay(labelArray[i]);
	    }	  
	}

 
    return{
        map: map
    }
});