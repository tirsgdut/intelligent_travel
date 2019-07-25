requirejs.config({
  baseUrl: '',
  paths: {
    tools: '../js/tools',
	index: '../js/index'
  }
});
requirejs(['tools'],function(getType){
	console.log(getType.getType);
});

requirejs(['index'],function(b){
	console.log(b);
});