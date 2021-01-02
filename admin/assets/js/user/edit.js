

var id = location.search.substr(1);
$.ajax({
  url: 'admin/users/' + id,
  success: function (res) {
    $('.a0').val(res.data.id)
   $('.a1').val(res.data.username)
    $('.a2').val(res.data.nickname)
    $('.a3').val(res.data.email)
  }
})

$('.layui-btn:contains(重置)').on('click', function () {
  $('.a1').val('')
   $('.a2').val('')
   $('.a3').val('')
})

$('#aa').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  $.ajax({
    type:'PUT',
    url: 'admin/users',
    data:data,
    success: function (res) {
      
      if (res.status ==0) {
        layer.msg(res.message, {icon:1},function (index) {
         location.href='user.html'
       });
       
      }
    }
  })

})

