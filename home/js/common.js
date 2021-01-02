
// $(function () {
  var baseUrl = 'http://localhost:8888';

  $.ajaxPrefilter(function (options) {
    // 配置Ajax请求的根路径
    options.url = baseUrl + options.url;
  });
  // 菜单展开/折叠交互
  $('.menus .triangle').click(function () {
    $(this).parents('li').toggleClass('collapsed');
  })

// })