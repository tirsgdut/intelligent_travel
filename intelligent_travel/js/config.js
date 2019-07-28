requirejs.config({
  baseUrl: '',
  paths: {
    jquery: '../js/jquery-3.3.1.min',
    index: '../js/index',
    tools: '../js/tools',
    intelligent_travel: "../js/intelligent_travel",
    search_part: "../js/search_part"
  }
});

requirejs(['intelligent_travel']);

requirejs(['search_part']);