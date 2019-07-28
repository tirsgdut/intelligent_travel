// define(function() {
    var map = new BMap.Map("container");

    // 创建地图实例  
    var point = new BMap.Point(113.26585637, 23.11648998);
    // 创建点坐标  
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);

    $(function() {
        $(".search-button").click(function() {
           // console.log($(".departure-input").val())
           // console.log($(".destination-input").val())
           $.post("http://192.168.31.89:8080/todo/api/v1.0/route", {
            departure: $(".departure-input").val(),
            destination: $(".destination-input").val()
           
           }, function(data, textStatus) {
                var position;//JSON数组用来接受传过来的坐标信息
                console.log(data);
                position = data;  
                showroute(position);                   
           })
        });
    })
      
    function showroute(position){       
        var array_store_instance = new Array(position.length);//用来存储多个创建的实例

        for(var i = 0; i < position.length; i++){   
            for(var j = 0; j<array_store_instance.length; j++){
                
                if(j == 0){              
                    array_store_instance[j] = new BMap.TransitRoute(map, { 
                        renderOptions: { 
                            map: map, 
                            autoViewport: true
                        },
                        onMarkersSet:function(routes) {                            
                            map.removeOverlay(routes[1].marker);//删除终点
                        }
                    });
                }
                
                if(j != 0 && j != array_store_instance.length){
                    array_store_instance[j] = new BMap.TransitRoute(map, { 
                        renderOptions: { 
                            map: map, 
                            
                        },
                        onMarkersSet:function(routes) {
                            map.removeOverlay(routes[0].marker); //删除起点
                            map.removeOverlay(routes[1].marker);//删除终点
                        }
                    });
                }

                if(j == array_store_instance.length - 1){
                    array_store_instance[j] = new BMap.TransitRoute(map, { 
                        renderOptions: { 
                            map: map, 
                            autoViewport: true
                        },
                        onMarkersSet:function(routes) {                            
                            map.removeOverlay(routes[0].marker);//删除起点
                        }
                    });
                }
            }
        }

        for(var i = 0; i<array_store_instance.length; i++){
             array_store_instance[i].search(new BMap.Point(position[i].start_x,position[i].start_y),new BMap.Point(position[i].end_x,position[i].end_y));            
        }
        
        var allOverlay = map.getOverlays();
        console.log(allOverlay.length);
        console.log(allOverlay);
    }

       
// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

// var point1 = new BMap.Point(113.25705998, 23.11334599);    
// var marker = new BMap.Marker(point1);        // 创建标注    
// map.addOverlay(marker);  

//     return{
//         showroute:showroute
//     }
   
// });