// 获取轮播图渲染到页面上
function Rendering() {
    $.ajax({
        url: 'admin/swipers',
        success: function (res) {
            console.log(res);
            var html = template('tpl-list', res)
            $('tbody').html(html)
        }
    })
}
Rendering()

//切换状态

$('tbody').on('click', '.box', function () {
    var status = $(this).data('status');
    var id = $(this).data('id');
    // console.log(status, id);
    $.ajax({
        type: 'PUT',
        url: 'admin/swipers/' + id,
        data: { status: status },
        success: function (res) {
            if (res.status === 0) {
                layer.msg(res.message);
                Rendering()
            }
        }
    })
})

// 批量上传轮播图
$('.btn-file').on('click', '.addFiles', function () {
    $('#file').trigger('click');
})
$('#file').on('change', function () {
    let fd = new FormData();
    let files = this.files;
    for (let i = 0; i < files.length; i++) {
        fd.append('swipers', files[i]);
    }
    $.ajax({
        type: 'POST',
        url: 'admin/swipers',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.status === 0) {
                layer.msg(res.message);
                Rendering()
            }

        }
    })
})


// 点击删除删除轮播图
$('tbody').on('click', '.delete', function () {
    var id = $(this).data('id');
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'DELETE',
            url: 'admin/swipers/' + id,
            success: function (res) {
                // console.log(res);
                layer.msg(res.message);
                Rendering()
            }
        })
    })
})