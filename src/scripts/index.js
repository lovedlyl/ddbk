$(function() {
    // lazyload


    (function() {
        // 初始化需要lazyload的图片
        // .slide中的图片如果延时加载本能正常显示，所以不延时
        // 侧边栏的图片也不延时加载，原因，浮动定位，图片位置其实是在主体位置的下方
        // 不能得到同步载入的效果
        $(".dd-tegong, .zhubian-suggest, .guess, .author")
            .find(".book img")
            .add(".vip img")
            .each(function(index, el) {
                var image = $(el),
                    width = image.outerWidth(),
                    height = image.outerHeight(),
                    url = image.attr("src");
                image.removeAttr("src")
                    .attr({ "data-original": url, width: width, height: height });
            })
            .lazyload({ effect: "fadeIn", threshold: 100 });
    })();

    // 图书菜单栏目鼠标悬浮改变类
    $("dl.outer").slice(0, -2).hover(function() {
        $(this).addClass("on").siblings("div").addClass("current");
    }, function() {
        $(this).removeClass("on").siblings("div").removeClass("current");
    });

    $("dl.outer+div").hover(function() {
        $(this).addClass("current").siblings("dl.outer").addClass("on");
    }, function() {
        $(this).removeClass("current").siblings("dl.outer").removeClass("on");
    });

    // 顶部工具栏改变样式
    // alert(1);
    (function() {
        var area = $(".area"),
            head = $(".area .head"),
            headSpan = head.find("span"),
            body = $(".area .body"),
            items = body.find("a");
        // 送货区域
        head.hover(function() {
            head.addClass('on');
            body.addClass('on')
        }, function() {
            head.removeClass('on');
            body.removeClass('on');
        });
        body.hover(function() {
            $(this).addClass("on");
        }, function() {
            $(this).removeClass("on")
        });
        items.click(function(event) {
            event.preventDefault();
            var text = $(this).text();
            headSpan.html(text);
            body.removeClass('on');
        });

        // // 后面的工具栏目
        var heads = $(".service, .company, .my").find(">a"),
            lists = heads.siblings('ul');
        // console.log(heads)

        heads.hover(function() {
            $(this).addClass("on").siblings('ul').addClass("on")
            console.log("on")
        }, function() {
            $(this).removeClass("on").siblings('ul').removeClass("on")
        });
        lists.hover(function() {
            $(this).addClass("on").siblings('a').addClass("on");
        }, function() {
            $(this).removeClass("on").siblings('a').removeClass("on");
        });

        // 手机当当
        $(".phone>a").hover(function() {
            $(this).parent().addClass("on").find(">div").addClass("on")
        }, function() {
            $(this).parent().removeClass("on").find(">div").removeClass("on")
        });
        $(".phone>div").hover(function() {
            $(this).addClass("on").parent().addClass("on");
        }, function() {
            $(this).removeClass("on").parent().removeClass("on")
        });

    })();

    // 搜索框点击改变样式和html
    (function() {
        var select = $(".search .select"),
            head = $(".search .select>span"),
            list = $(".search .select ul"),
            items = list.find("li");
        // 是否出现列表
        select.hover(function() {
            list.addClass("on")
        }, function() {
            list.removeClass("on")
        });
        // 更改列表项目样式
        items.hover(function() {
                $(this).addClass('on')
            }, function() {
                $(this).removeClass('on')
            })
            .click(function(event) {
                event.preventDefault();
                var text = $(this).text();
                // console.log(text);
                head.html(text);
                list.removeClass('on')
            });


    })();

    // 新书上架无缝滚动
    $(".section-one-main .books").slider({ width: 750, height: 540 });

    // 购物车和订单鼠标悬浮时更改类,以改变样式
    $(".cat, .order").hover(function() {
        $(this).addClass("on");
    }, function() {
        $(this).removeClass("on");
    });
    // 最上方焦点图,自动播放
    $(".section-one-main .play-pics li")
        .tabshow(".section-one-main .play-pics .pic", { autoplay: true, interval: 3000 });

    // 新书预售无缝滚动
    $(".yushou .sidebar-book").slider({ width: 238, height: 120 });

    // 行书热卖榜鼠标悬浮,改变显示内容
    $(".section-one-sidebar .sidebar-with-list .nav li")
        .tabshow(".section-one-sidebar .sidebar-with-list .list");
    // 猜你喜欢!!!!!!!!!!!!!!!!!!!!!
    // 1.使侧边栏高度与展示区高度一致
    // 2.点击"换一批",更换展示内容
    (function() {
        // 将侧边栏高度设置为与主体部分相同
        // 为啥子每次获取的高度都不一样,是图片加载没完成,不过用了$(document).ready啊???????????????
        // var mainHeight = $(".guess-foot-main").outerHeight();
        // console.log(mainHeight);
        // $(".guess-foot-sidebar").outerHeight(mainHeight);

        var mainHeight = 538;
        // console.log(mainHeight);
        $(".guess-foot-sidebar").outerHeight(mainHeight);
        // 点击换一批时,掩藏的两部分交换.current类名
        // console.log(mainHeight)
        $("#huanyipi").click(function(event) {
            event.preventDefault();
            // alert(1);
            // console.log(boxes)
            $(".guess-foot-main >div").toggleClass('current')
        });

    })();
    // 侧边栏li元素鼠标悬浮时更改类.on
    $(".sidebar-with-list .list li").mouseover(function(event) {
        // console.log("qwd")
        $(this).addClass('on').siblings().removeClass('on')
    });
    // 当当特供鼠标悬浮,改变显示内容
    $(".dd-tegong-main .head li")
        .tabshow(".dd-tegong-main .books");
    // 侧边栏
    $(".dd-tegong .sidebar-with-list .nav li")
        .tabshow(".dd-tegong .sidebar-with-list .list");

    // 主编推荐鼠标悬浮,改变显示内容
    $(".zhubian-suggest-main .head li")
        .tabshow(".zhubian-suggest-main .books");
    // 作者推荐鼠标悬浮,改变显示内容
    $(".author-main-head li")
        .tabshow(".author-main-body > div");
    // 读者推荐导航,鼠标悬浮时更改样式
    $(".reader-suggest-main-head li")
        .tabshow(".reader-suggest-main-body > div");
    // 读者推荐栏目中的无缝滚动
    $.each([".haoping", ".guanzhu", ".shoucang"], function(index, val) {
        $(".reader-suggest-main-body " + val + " .books").slider({ width: 950, height: 289 });
    });
    // 合作伙伴展示区上下来回滚动,进行动画时绝对定位,减小性能消耗
    (function() {
        // 可见内容高度和宽度
        var height = 178 + 2,
            width = 1200,
            outer = "<div class='jump'><div class='jump-list'></div></div>",
            outerStyle = {
                width: width,
                height: height,
                position: "relative",
                overflow: "hidden"
            },
            items = $(".parteners .cats"),
            // 循环间隔时间
            interval = 7000,
            timer;
        items.wrapAll(outer);
        var jump = $(".parteners .jump");
        var jumpList = jump.find(".jump-list");
        jump.css(outerStyle);
        jumpList.css({
            position: 'absolute',
            top: 0,
            left: 0
        });
        // 初始化完成
        function scroll() {
            if (jumpList.is(":animated")) {
                return;
            }
            var oldTop = parseFloat(jumpList.css("top"));
            if (oldTop == 0) {
                jumpList.animate({ top: -height }, "slow");
            }
            if (oldTop == -height) {
                jumpList.animate({ top: 0 }, "slow");
            }
            timer = setTimeout(scroll, interval);
        }
        // 循环
        scroll();
        items.hover(function() {
            clearTimeout(timer);
        }, function() {
            scroll();

        });

    })();

    // 返回顶部按钮不显示,当页面滚动到一定距离时显示,并且点击后页面滚动为0
    (function() {
        // 页面滚动多少时开始显示返回顶部按钮
        var heightWhenShow = 200,
            // 缓存返回顶部按钮和window对象
            back = $(".backtop .back"),
            win = $(window);

        function hideBack() {
            back.css('display', 'none');
        }

        function showBack() {
            back.css('display', 'block');
        }
        hideBack();
        // 当页面滚动到一定值时,显示返回顶部按钮,如果小于某值时,隐藏按钮
        win.on('scroll', function(event) {
            var scrollTop = $(this).scrollTop();
            // console.log(scrollTop);
            // console.log(btn);
            if (scrollTop >= heightWhenShow) showBack();
            if (scrollTop < heightWhenShow) hideBack();
        });
        // 点击按钮时,页面返回顶部,滚动为0
        back.click(function(event) {
            // 避免作为链接的元素默认行为
            event.preventDefault();
            win.scrollTop(0);
        });

    })();


})
