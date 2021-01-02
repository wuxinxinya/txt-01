$.ajax({
    url: 'admin/users',
    success: function (res) {
        console.log(res);
    }
})

$('#exit').on('click', function () {
    // e.preventDefault()
    layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token')
        layer.close(index)
        location.href = './login.html'
    });
})