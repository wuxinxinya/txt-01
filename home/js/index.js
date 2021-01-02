// 轮播图
$.ajax({
    url: '/api/swipers',
    success: function (res) {
        // console.log(res);
        if (res.status === 0) {
            let htmlStr = template('tpl_lunbotu', res);
            $('#lunbotu').html(htmlStr);
            layui.use('carousel', function () {
                // 轮播模块
                let carousel = layui.carousel;
                // 轮播交互
                carousel.render({
                    elem: '#kr_carousel',
                    width: 720,
                    height: 300,
                    interval: 3000
                });
            });
        }

    }
})

// 友情链接
$.ajax({
    url: '/api/links',
    success: function (res) {
        // console.log(res);
        if(res.status === 0) {
            let linksStr = template('tpl_links', res)
            $('.kr_collaborator').html(linksStr) 
        }
    }
})