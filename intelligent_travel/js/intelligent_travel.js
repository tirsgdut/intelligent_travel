var map = new BMap.Map("container");
// 创建地图实例  
var point = new BMap.Point(113.40705419, 23.04966679);
// 创建点坐标  
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom(true);
var opts = {offset: new BMap.Size(1400, 5)}
function ZoomControl(){    
    // 设置默认停靠位置和偏移量  
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;    
    this.defaultOffset = new BMap.Size(10, 10);    
}    
// 通过JavaScript的prototype属性继承于BMap.Control   
ZoomControl.prototype = new BMap.Control();
// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
ZoomControl.prototype.initialize = function(map){    
    // 创建一个DOM元素   
    var div = document.createElement("div");    
    // 添加文字说明    
    div.appendChild(document.createTextNode("放大2级"));    
    // 设置样式    
    div.className = "control";
    // 绑定事件，点击一次放大两级    
    div.onclick = function(e){  
        map.zoomTo(map.getZoom() + 2);    
    }    
    // 添加DOM元素到地图中   
    map.getContainer().appendChild(div);    
    // 将DOM元素返回  
    return div;    
 }

 // 创建控件实例    
var myZoomCtrl = new ZoomControl();    
// 添加到地图当中    
var map = new BMap.Map("container"); 
map.centerAndZoom(new BMap.Point(116.404, 39.915), 14); 
var options = { 
    onSearchComplete: function(results){ 
        if (driving.getStatus() == BMAP_STATUS_SUCCESS){ 
            // 获取第一条方案 
            var plan = results.getPlan(0); 
            // 获取方案的驾车线路 
            var route = plan.getRoute(0); 
            // 获取每个关键步骤，并输出到页面 
            var s = []; 
            for (var i = 0; i < route.getNumSteps(); i ++) { 
                var step = route.getStep(i); 
                console.log(step); 
            } 
        } 
    } 
}; 
var driving = new BMap.DrivingRoute(map, options);
var start = new BMap.Point(116.310791, 40.003419);
var end = new BMap.Point(116.486419, 39.877282);
driving.search(start, end);