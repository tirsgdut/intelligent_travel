requirejs.config({
  baseUrl: '',
  paths: {
    jquery: '../js/jquery-3.3.1.min',
    index: '../js/index',
    tools: '../js/tools',
    intelligent_travel: "../js/intelligent_travel"
  }
});

requirejs(['intelligent_travel']);