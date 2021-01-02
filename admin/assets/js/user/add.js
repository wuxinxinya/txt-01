
var form = layui.form;
form.verify({
  len: [/^\S{6,12}$/, '密码长度必须是6~12且不能有空格'],
  same: function (value) {
    var uname = $('.layui-form input[name=password]').val()
    if (value !== uname) {
      return '两次输入的密码不一样'
    }
  }
})


$('.layui-form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'admin/users',
    data: data,
    success: function (res) {
      layer.msg(res.message);
    }
  });
})



