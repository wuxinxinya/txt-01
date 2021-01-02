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

// 获取id
let id = new URLSearchParams(location.search).get('id')
// console.log(id);

// 获取评论列表
function getComments() {
    $.ajax({
        type: 'GET',
        url: `/api/articles/${id}/comments`,
        success: res => {
            console.log(res);
            if (res.status === 0) {
                let comStr = template('tpl_comments', res)
                $('#comments').html(comStr)
            }
        }
    })
}
getComments()

// 完成评论功能
$('#comForm').on('submit', function (e) {
    // console.log(1);
    e.preventDefault();
    let fd = $(this).serialize();
    console.log(fd);
    $.ajax({
        type: 'POST',
        url: `/api/articles/${id}/comments`,
        data: fd,
        success: res => {
            // console.log(res);
            if (res.status === 0) {
                layer.msg(res.message)
                $('#comForm').get(0).reset()
                getComments()
            }
        }
    })
})

// 不加form
// $('#comment-btn').on('click', function () {
//     var a = $('.aa').val();
//     var b = $('.bb').val();
//     console.log(a, b);
//     $.ajax({
//         type: 'POST',
//         url: `/api/articles/${id}/comments`,
//         data: {
//             uname: a,
//             content: b
//         },
//         success: res => {
//             // console.log(res);
//             if (res.status === 0) {
//                 console.log('添加评论成功');
//                 layer.msg(res.message)
//                 $('#comForm').get(0).reset()
//                 getComments()
//             }
//         }
//     })
// })