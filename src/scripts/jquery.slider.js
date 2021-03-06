// // 水平无缝滚动插件
// 原理:
//     将需要滚动的元素克隆最前最后两个
//     外包裹两层,.slide .slide-list
//     .slide:相对定位
//     .slide-list绝对定位,top 0, left -滚动元素宽度
//     需要滚动的元素绝对定位到.slide-list,水平排列在其中
//     通过动画改变.slide-list的left值实现无缝滚动
//     .slide,slide-list的样式通过js初始化时设置完成, 样式表设置.slide-prev .slide-next .slide-btns 的样式
//     所需滚动元素个数大于1个时才实现
//bug: 不能自动获取需要滚动元素的高度,需要手动设置options
// 参数: options[width, height, btnHeight]
// width: 需要滚动元素的宽度
// height: 需要滚动元素的高度
// btnsHeight: 为放置下方按钮所需要的高度
// 说明:需要手动设置高度和宽度

jQuery.fn.slider = function(options) {
    var $this = $(this);
    // 如果元素不足2个不进行此操作
    if ($this.length <= 1)
        return $this;
    options = options || {};
    // 还会克隆首位两个原子,所以+2
    var width = options.width,
        height = options.height,
        itemsNum = this.length + 2,
        lazyload = (jQuery.fn.lazyload && options.lazyload) || false;

    // var _oldDisplay = this.css("display");
    // height = this.css("display", "block").outerHeight(true);
    // width = this.css("display", "block").outerWidth(true)
    // this.css("display", _oldDisplay);
    // 如果没有提供高度和宽度报错
    if (!width || !height) {
        console.error("没有提供滑块的宽度或高度")
    }
    // 增添的html
    html = {
        outer: '<div class="slide"><div class="slide-list"></div></div>',
        prev: "<span class='slide-prev'>prev</span>",
        next: "<span class='slide-next'>next</span>",
        btns: "<ul class='slide-btns'>"
    };

    // 初始化btn html
    for (var i = 0; i < this.length; i++) {
        html.btns += ("<li>" + i + 1 + "</li>");
    }
    html.btns += "</ul>";
    // 将克隆的两个元素加上去
    $this.wrapAll(html.outer).addClass("slide-item");
    var slideList = $this.parent(),
        slide = slideList.parent(),
        // 当前可见item的索引
        currentIndex = 1,
        // .slide和.slide-list的样式
        styles = {
            slide: {
                // border: "1px solid black",
                height: height,
                overflow: "hidden",
                position: "relative",
                width: width
            },
            slideList: {
                width: width,
                height: height,
                position: "absolute",
                left: -width,
                top: 0
            },
            slideItem: {
                width: width,
                position: "absolute",
                top: 0
            },
            jumpTop: {
                top: height / 2 - 12
            }
        };
    $this.eq(0).clone(true).appendTo(slideList);
    $this.eq(-1).clone(true).prependTo(slideList);
    // 设置.slide, .slide-list, slide-child的样式
    slide.append(html.prev + html.next + html.btns).css(styles.slide);
    slideList.css(styles.slideList)
        .find(".slide-item")
        .css(styles.slideItem)
        .each(function(index, el) {
            $(el).css("left", index * width)
        });

    var btns = slide.find(".slide-btns > li"),
        prev = slide.find(".slide-prev"),
        next = slide.find(".slide-next"),
        slideItems = slide.find(".slide-item"),
        // 用于lazyload的分组
        firstGroup = slideItems.eq(1),
        // 怎样为不可见加上lazyload????
        restGroup = slideItems.slice(2).add(slideItems.eq(0));

    // 设置翻页按钮的相对高度
    prev.add(next).css(styles.jumpTop);
    // 初始化完成----------------------------------

    // 核心函数,移动元素,step为移动的格数,正数为向右移动,负数为向左移动
    function go(step) {
        var offset = "+=" + (-step * width);

        slideList.animate({ left: offset }, "slow", function() {

            // 滑动到最前和最后时,改变元素位置,欺骗视觉
            // 最后时
            var newLeft = parseFloat(slideList.css("left"));
            if (newLeft == -width * (itemsNum - 1)) {
                slideList.css("left", -width)
            }
            // 最前时
            if (newLeft == 0) {
                slideList.css("left", -width * (itemsNum - 2))
            }

            if(lazyload && currentIndex != 1){
                restGroup.eq(currentIndex).trigger('inView')
            }
        });

    }

    // 改变按钮样式,由currentIndex决定
    function showButton() {
        // 最后时
        if (currentIndex == itemsNum - 1) {
            currentIndex = 1
        }
        // 最前时
        if (currentIndex == 0) {
            currentIndex = itemsNum - 2;
        }
        btns.eq(currentIndex - 1).addClass('on').siblings().removeClass('on');

    }
    showButton();

    // 翻页点击时的事件
    prev.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        currentIndex -= 1;
        showButton();
        go(-1);
    });
    next.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        currentIndex += 1;
        showButton();
        go(1);
    });

    prev.add(next)
        .mouseenter(function(event) {
            $(this).addClass("on")
        })
        .mouseleave(function(event) {
            $(this).removeClass('on')
        });

    // 点击按钮时间时滑动事件
    btns.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        // 被点击的按钮所在的索引
        var i = $(this).index();
        var step = (i + 1) - currentIndex;
        currentIndex += step;
        showButton();
        go(step);
    });

    // 加入lazyload功能
    if (lazyload) {
        // var images = target.find("img");
        // console.log(firstGroup.html(), restGroup.length)
            // 初始化需要延迟加载的图片
            // console.log(slideItems)
        firstGroup.add(restGroup).initLazy();

        // 延迟加载第一组元素
        firstGroup.find("img").lazyload({ effect: "fadeIn", threshold: 200 });
        // 延迟加载不可见元素
        restGroup.bind('inView', function(event) {
            console.log("invew")
            restGroup.find("img").lazyload({ effect: "show" });
            // console.log(this);

        });

    }


    return $this;
}
