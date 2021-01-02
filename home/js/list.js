// 参数
let paging = { pagenum: 1, pagesize: 7 };
// 定义一个接收当前渲染总数的变量
var total = 0;
// 获取文章列表
function getNews() {
    $.ajax({
        url: '/api/articles',
        data: paging,
        success: function (res) {
            console.log(res);
            total = res.total;
            if (res.status === 0) {
                var newsStr = template('tpl_news', res);
                $('.kr_news_list').html(newsStr);
            }
            
        }
    })
}
getNews()
// 加载更多
$('.kr_more a').on('click', () => {
    if (paging.pagesize > total) {
        return layer.msg('没有更多数据了')
    }
    paging.pagesize += 7;
    getNews()
})
