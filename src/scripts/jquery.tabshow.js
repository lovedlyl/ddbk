/*
    导航元素和相应的内容元素,
    鼠标悬浮或点击导航元素时,
    对应索引的内容元素显示,否则隐藏
    默认鼠标事件为mouseover,
    导航显示的类为on, 内容显示的类为.current
    可选自动播放
*/
// 初始时,目标元素都不显示,只有类为current的单个元素显示,
// 避免在样式表中书写
// target.css("display", "none").find(".current").css("display", "block");
// 添加事件
jQuery.fn.tabshow = function(selector, options) {
    // 初始化参数
    options = options || {};
    var event = options.event || "mouseover",
        // 是否自动播放,默认为否
        autoplay = options.autoplay || false,
        // 自动播放间隔时间
        interval = options.interval || 3000,
        // 变化元素的个数
        len = this.length,
        target = jQuery(selector),
        // 内容变化区域的父元素,以控制自动播放
        parent = target.parent(),
        that = this,
        currentIndex = 0;
    var timer;

    // console.log(target)
    function go(step) {
        // console.log("go...")
        that.eq(currentIndex).removeClass('on');
        target.eq(currentIndex).removeClass('current');
        currentIndex += step;
        if (currentIndex >= len) {
            currentIndex = 0;
        }
        if (currentIndex <= -1) {
            currentIndex = len - 1;
        }
        that.eq(currentIndex).addClass('on');
        target.eq(currentIndex).addClass('current');
    }
    // 自动播放
    function play() {
        timer = setTimeout(function() {
            go(1);
            play();
        }, interval);
    }

    function stop() {
        clearInterval(timer);
    }
    if (autoplay) {
        play();
        parent.hover(stop, play);
    }
    this.on(event, function(event) {
        event.preventDefault();
        var index = $(this).index();
        var step = index - currentIndex;
        go(step);
    });

    return this;
}
