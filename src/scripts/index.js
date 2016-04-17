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




    // 全部商品分类菜单鼠标悬浮样式变化
    (function() {
        var menu = $(".menu"),
            head = menu.find(".head"),
            body = menu.find(".body"),
            list = $(".menu .body > ul"),
            items = list.find("li");
        // 全部商品详细分类采用ajax条件加载,
        // 即头部鼠标悬浮时才加载
        head.one('mouseover', function(event) {
            // console.log("loading")
            $.ajax({
                    url: 'category.html',
                    // type: 'default GET (Other values: POST)',
                    dataType: 'html',

                })
                .done(success);
        });


        head.hover(function() {
            list.show();
        }, function() {
            list.hide();
        });


        // console.log(body)
        function success(html) {
            // 载入内容
            var div = document.createElement("div");
            div.innerHTML = html;
            $(div).find(".content").appendTo('.menu .body');

            var contents = body.find(".content");
            items.tabshow(contents);
            // console.log(contents)

            // 添加事件

            body.hover(function() {
                list.show();
                // console.log(1)
            }, function() {
                list.slideUp();
                contents.removeClass('current');
                items.removeClass('on');
            });

        }

    })();



    // 图书菜单栏目鼠标悬浮改变类
    $("dl.outer").slice(0, -2).hover(function() {
        $(this).addClass("on").siblings("div").addClass("current");
        var menu = $(".book-menu .body"),
            outer = $(this),
            box = outer.siblings("div"),
            // 外层元素距父元素顶部的距离
            outerTop = outer.position().top,
            // 外层元素高度
            outerHeight = outer.outerHeight(true),
            // 内层元素的高度
            boxHeight = box.outerHeight(true),
            // 整个菜单由于滚动隐藏的高度
            deltaY = $(window).scrollTop() - menu.offset().top,
            // 外层被隐藏的高度
            outerDeltaY = deltaY - outerTop,
            // 内层高度是否足以显示,外层相对可视顶部高度+自身高度 与盒子的高度差
            deltaHeight = outerHeight + outerTop - boxHeight;
        // 如果菜单部分被隐藏，并且box高度不够,计算top值时要减去隐藏的高度
        if (deltaY > 0) {
            deltaHeight -= deltaY;
        }
        // 最后设置的top值得
        var top = -1;

        // console.log(deltaHeight, deltaY);

        // 如果由于滚动隐藏box, 
        if (deltaY > 0) {
            top = deltaY - 1;
            // 如果外层元素也被隐藏，向上提升这个距离
            if (outerDeltaY > 0) {
                top -= outerDeltaY;
            }
        }

        // 如果元素高度不及
        // 判断内层DIV的底部是否高过内层dl的底部
        // 如果是，使内层div的底部刚好与外层底部对齐
        // innerHeight + top(?) = offsettop + outerHeight 
        if (deltaHeight > 0) {
            top += deltaHeight + 1;
        }

        box.css("top", top);

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
