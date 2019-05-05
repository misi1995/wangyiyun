window.onload = function() {
    //1.获取需要的标签
    var imgLis = $("banner_img").getElementsByTagName("li");
    var dotLis = $("dots").getElementsByTagName("span");
    var banner_img = $("banner_img");
    var banner = $("banner");
    var btn_prev = $("btn_prev");
    var btn_next = $("btn_next");
    var inner_prev = $("inner_prev");
    var inner_next = $("inner_next");
    var ul = $("roll").getElementsByTagName("ul");
    var msk = document.getElementsByClassName("msk");
    var n_paly = document.getElementsByClassName("n-play");
    var rank = $("rank");
    var allLis = rank.getElementsByTagName("li");
    var return_top = $("return_top");
    var top_login = $("top_login");
    var login_method = $("login_method");
    var index = 0;


    var jq = jQuery.noConflict();
    jq(document).ready(function() {

    })


    //2.让第一个索引默认选中
    dotLis[0].className = "dot-current";

    //3.让轮播图第一张图片opacity为1,其他都为0
    for (var i = 0; i < imgLis.length; i++) {
        imgLis[i].style.opacity = "0";
    }
    imgLis[0].style.opacity = "1";

    //4.设置自动轮播定时器
    var timer = setInterval(autoPlay, 4000);

    //5.索引圆点的点击
    for (var j = 0; j < dotLis.length; j++) {
        dotLis[j].onmousedown = function() {
            var t_index = parseInt(this.innerText);
            index = t_index;
            change();

            changeIndex();

        }
    }

    //6.上一张下一张按钮的点击
    btn_prev.onmousedown = function() {
        index--;
        if (index < 0) {
            index = imgLis.length - 1;
        }
        change();
        changeIndex();

    }

    btn_next.onmousedown = function() {
        index++;
        change();
        changeIndex();
        if (index === imgLis.length - 1) {
            index = -1;
        }
    }

    //7.新碟推荐鼠标覆盖播放图标显示
    for (var i = 0; i < msk.length; i++) {
        msk[i].onmouseenter = function() {
            this.nextElementSibling.style.opacity = "1";
            this.nextElementSibling.onmouseenter = function() {
                this.style.opacity = "1";
            }
        }
        msk[i].onmouseleave = function() {
            this.nextElementSibling.style.opacity = "0";
        }
    }

    function change() {
        for (var i = 0; i < imgLis.length; i++) {
            imgLis[i].style.opacity = "0";
        }
        imgLis[index].style.opacity = "1";
        banner.style.background = 'url("images/bg' + (index + 1) + '.jpg") repeat-x';
    }

    //8.新碟推荐按钮点击事件
    var ulNow = 0;
    inner_prev.onmousedown = function() {
        animate(ul[ulNow], 665, 7);
        ulNow--;
        if (ulNow < 0) {
            ulNow = 1;
        }
        ul[ulNow].style.left = -665 + "px";
        animate(ul[ulNow], 0, 7);
    }

    inner_next.onmousedown = function() {
        animate(ul[ulNow], -665, 7);
        ulNow++;
        if (ulNow > 1) {
            ulNow = 0;
        }
        ul[ulNow].style.left = 665 + "px";
        animate(ul[ulNow], 0, 7);
    }

    //9.排行榜鼠标经过改变a大小

    for (var i = 0; i < allLis.length; i++) {
        allLis[i].onmouseover = function() {
            this.children[1].style.width = 85 + "px";
            this.children[2].style.display = "block";
        }
        allLis[i].onmouseout = function() {
            this.children[1].style.width = 170 + "px";
            this.children[2].style.display = "none";
        }
    }

    //10.返回顶部按钮的显示隐藏
    window.onscroll = function() {
        var scroll_top = scroll().top;
        if (scroll_top > 0) {
            return_top.style.display = "block";
        } else {
            return_top.style.display = "none";
        }
    }

    return_top.onclick = function() {
        window.scrollTo(0, 0);
    }

    window.onbeforeunload = function() {
        //刷新后页面自动回到顶部
        document.documentElement.scrollTop = 0; //ie下
        document.body.scrollTop = 0;
    }

    //11.绑定登录框鼠标事件
    top_login.onmouseover = function() {
        login_method.style.display = "block";
    }

    top_login.onmouseout = function() {
        login_method.style.display = "none";
    }

    /**
     * 自动轮播
     */
    function autoPlay() {
        //2.1 改变透明度
        for (var i = 0; i < imgLis.length; i++) {
            var singerLi = imgLis[i];
            buffer(singerLi, { opacity: 0 }, null);
        }

        //2.2 索引自增
        index++;

        buffer(imgLis[index], { opacity: 1 }, null);
        banner.style.background = 'url("images/bg' + (index + 1) + '.jpg") repeat-x';

        changeIndex();

        if (index === imgLis.length - 1) {
            index = -1;
        }
    }

    /**
     * 改变图片索引
     */
    function changeIndex() {
        for (var i = 0; i < dotLis.length; i++) {
            dotLis[i].className = "";
        }
        dotLis[index].className = "dot-current";
    }

    banner.onmouseover = function() {
        clearInterval(timer);
    }

    banner.onmouseout = function() {
        timer = setInterval(autoPlay, 2000);
    }
}