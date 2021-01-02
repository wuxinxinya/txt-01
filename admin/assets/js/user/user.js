var form = layui.form;
var laypage = layui.laypage;
var data = {
  pagenum: 1,
  pagesize: 2,
}

function get() {
  $.ajax({
    type: 'GET',
    url: 'admin/users',
    data: data,
    success: function (res) {
      var html = template('tpl-a', res)
      $('tbody').html(html)
      showPage(res.total);

    }
  })
}
get()


function showPage(t) {

  laypage.render({
    elem: 'page',
    count: t,
    limit: data.pagesize,
    curr: data.pagenum,
    groups: 4,

    layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'],

    jump: function (obj, first) {


      if (!first) {

        data.pagenum = obj.curr;
        data.pagesize = obj.limit;
        get();
      }
    }
  });
}

$('tbody').on('click', '.layui-btn:contains(编辑)', function () {
  var id = $(this).data('id')
  location.href = 'edit.html?' + id
})

$('tbody').on('click', '.layui-btn:contains(删除)', function () {
  var id = $(this).data('id')
  layer.confirm("确定要删除吗", function (index) {
    $.ajax({
      type: 'DELETE',
      url: 'admin/users/' + id,
      success: function (res) {
        if (res.status == 0) {
          layer.confirm(res.message, {
            icon: 1
          })
          get()
        }
      }
    })
    layer.close(index)

  })
});



// 重置密码

$('tbody').on('click', '.layui-btn:contains(重置密码)', function () {
  var id_one = $(this).data('id')
  layer.open({
    type: 1,
    title: "重置密码",
    skin: 'layui-layer-rim', //加上边框
    area: ['420px', '240px'], //宽高
    content: $('#tpl-un').attr('index', id_one).html(),

  });

})

$('body').on('submit', '#add-form', function (e) {
  e.preventDefault();
  var a = ($('#tpl-un').attr('index'))
  var password1 = $('#new').val()
  var password2 =$('#new2').val()
    let param = {
      password: password1
  }
  if (password1 == password2) {
     $.ajax({
    type: 'PUT',
    url: 'admin/users/' + a,
    data: JSON.stringify(param),
    contentType: "application/json", //设置请求参数类型为json字符串
    success: function (res) {

      if (res.status == 0) {
        layer.msg(res.message)
        $('#new').val("")
        $('#new2').val("")
      }
    }
  })
  } else {
    layer.msg("密码不一致请重新输入")
    $('#new').val("")
  $('#new2').val("")
  }
 
})

// $('body').on('submit', '#add-form', function (e) {
//       e.preventDefault();
//   var a = ($('#tpl-un').attr('index'))
//   var password1 =($('#new').val()) 

//     $.ajax({
//       type: 'PUT',
//       data: password1,
//       url: 'admin/users/' + a,
//     success: function (res) {
//       if (res.status== 0) {
//        layer.confirm(res.message)
//       }
//     }
//   })

// })


$('body').on('click', '.layui-btn:contains(重置)', function (e) {
  $('#new').val("")
  $('#new2').val("")

})