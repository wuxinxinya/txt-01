// 补零
function padZero(n) {
  if (n < 10) {
      return '0' + n
  } else {
      return n
  }
}

// 封装时间函数
template.defaults.imports.dateFormat = function (dtStr) {
  var dt = new Date(dtStr)

  var y = dt.getFullYear()
  var m = padZero(dt.getMonth() + 1)
  var d = padZero(dt.getDate())

  var hh = padZero(dt.getHours())
  var mm = padZero(dt.getMinutes())
  var ss = padZero(dt.getSeconds())

  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

function loadCommmentList() {
  $.ajax({
    type: 'get',
    url: 'admin/comments',
    success: function (res) {
      var html = template('tall', res)
      $('#tb').html(html)
    }
  })
}
loadCommmentList()
$('.layui-table tbody').on('click', '.delete', function (e) {
  var id = $(e.target).data('id')
  layer.confirm('确认要删除吗？', function (index) {
    $.ajax({
      type: 'delete',
      url: 'admin/comments/' + id,
      success: function (res) {
        if (res.status === 0) {
          layer.close(index)
          loadCommmentList()
        }
      }
    })
  })
})
