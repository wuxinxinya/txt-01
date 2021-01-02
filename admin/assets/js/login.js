    var form = layui.form

$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    var fd = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: 'api/login',
        data: fd,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) {
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        }
    })
})

