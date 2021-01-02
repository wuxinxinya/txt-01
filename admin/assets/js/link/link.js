// 发请求获取数据渲染到页面
function getLink() {
  $.ajax({
    url: 'admin/links',
    success: function (res) {
      var str = template('tel-link', res)
      $('tbody').html(str)
    }
  })
}
getLink()

// ---------删除-----------
$('tbody').on('click', '.del', function () {
  // 获取要删除行的id
  var id = $(this).attr('data-id')
  var index = layer.confirm('确定要删除吗？', function () {
    $.ajax({
      type: 'DELETE',
      url: 'admin/links/' + id,
      success: function (res) {
        if (res.status === 0) {
          // 关闭提示层
          layer.close(index);
          // 重新渲染页面
          getLink()
        }
      }
    })
  });
})
// ---------------添加链接----------------------
// 1-添加链接的弹层
// 样式叉号位置不对，需要调整
var editIndex;
$('.lian').on('click', function () {
  // 打开弹层
  editIndex = layer.open({
    type: 1,
    title: '添加友情链接',
    area: ['500px', '350px'], //宽高
    // 内容
    content: $('#tel-add').html()

  });
})
// 2-----图片上传预览-------
$('body').on('click', '.upImg-m', function () {
  $('.df').trigger('click')
  $('.df').on('change', function () {
    var file = this.files[0]
    var url = URL.createObjectURL(file)
    $('#add-link .img-edit').attr('src', url)
  })
})


// 3----实现添加链接---
$('body').on('submit', '#add-link', function (e) {
  e.preventDefault();
  var fd = new FormData(this)
  // 想查看通过new FormData(this)获取的数据，就要遍历
  // fd.forEach((item, value) => {
  //   console.log(item);
  // })
  $.ajax({
    type: 'POST',
    url: 'admin/links',
    data: fd,
    // 使用fromdata一定注意要加这两行
    processData: false,
    contentType: false,
    // --------
    success: function (res) {
      // 无论成功，还是失败，都给提示
      layer.msg(res.message);
      if (res.status === 0) {
        // 添加成功，重新渲染数据
        getLink()
        // 关闭弹出层
        layer.close(editIndex);
      }
    }
  })

})

//4 -----重置--------

$('body').on('click', '.re-btn', function () {
  $('#add-link')[0].reset()
})

// --------------***编辑***------------
// 弹层
var maEdit;
// 点击编辑获取它的id
var reditI;
$('body').on('click', '.edit', function () {
  // 获取数据-----进行回填
  // 获取所有的data-***数据
  // var data = $(this).data()

  // 注意数据回填时，文件域图片回填字符串会报错，所以先不会填
  reditI = $(this).attr('data-id')
  var linkname = $(this).attr("data-linkname")
  var linkurl = $(this).attr("data-linkurl")
  var linkdesc = $(this).attr("data-linkdesc")
  var linkicon = $(this).attr("data-linkicon")
  maEdit = layer.open({
    type: 1,
    title: '编辑友情链接',
    area: ['500px', '350px'], //宽高
    content: $('#maEdit').html(),
    // 弹出后的回调
    success: function () {
      // 使用layui方法进行数据回填
      var form = layui.form;
      form.val('edit-a', { linkname, linkurl, linkdesc })
      $('#edit-link .img-edit').attr("src", "http://localhost:8888/uploads/" + linkicon)
      // ---------
      // -----图片上传预览-------
      $('body').on('click', '.upImg-e', function () {
        $('.df').trigger('click')
        $('.df').on('change', function () {
          var file = this.files[0]
          var url = URL.createObjectURL(file)
          $('#edit-link .img-edit').attr('src', url)
        })
      })
      // ---------
    }
  });

})

// ----确认编辑修改------
$('body').on('submit', '#edit-link', function (e) {
  e.preventDefault();
  var data = new FormData(this)
  // data.forEach((item) => {
  //   console.log(item);
  // })
  $.ajax({
    type: 'PUT',
    url: 'admin/links/' + reditI,
    data: data,
    // 使用fromdata一定注意要加这两行
    processData: false,
    contentType: false,
    // --------
    success: function (res) {
      layer.msg(res.message)
      if (res.status === 0) {
        // 重新渲染
        getLink()
        // 关闭弹层
        layer.close(maEdit)
      }
    }
  })
})
