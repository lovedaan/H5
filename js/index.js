/*
 * @Author: Marte
 * @Date:   2017-09-29 20:06:49
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-10-03 13:04:40
 */

(function($) {

    var app = {
        viewHeight: $(window).height(),
        $con: $('#contianer'),
        $pages: $('#pageList > .page'),
        lens: $('#pageList > .page').length,
        init() {
            document.addEventListener('touchmove', function(ev) {
                ev.preventDefault();
            });

            app.initEvent();

        },
        initEvent() {
            app.slidePage();
            app.bannerSlide();
            var arrAn = app.animateFun();
            $.each(arrAn, function(index, item) {
                item.outAn();
            });
            app.initLoading();
        },
        slidePage() {

            var startY = 0;
            var step = 1 / 4;
            var nextAndPreIndex = 0;
            var nowIndex = 0;
            var off = true;

            app.$pages.on('touchstart', function(ev) {
                if (!off) {
                    return;
                }
                off = false;
                var touch = ev.originalEvent.changedTouches[0];
                startY = touch.pageY;
                nowIndex = $(this).index();
            });

            app.$pages.on('touchmove', function(ev) {
                var touch = ev.originalEvent.changedTouches[0];
                var translate = touch.pageY - startY;
                $(this).not('#arrow').siblings('.page').hide();
                if (translate > 50) {
                    //向下滑
                    nextAndPreIndex = nowIndex == 0 ? app.lens - 1 : nowIndex - 1;
                    app.$pages.eq(nextAndPreIndex).css('transform', `translate3d(0,${-app.viewHeight +translate }px,0)`);
                } else if (translate < -50) {
                    //向上滑
                    nextAndPreIndex = nowIndex == app.lens - 1 ? 0 : nowIndex + 1;
                    app.$pages.eq(nextAndPreIndex).css('transform', `translate3d(0,${app.viewHeight +translate }px,0)`);
                } else {
                    return;
                }

                app.$pages.eq(nextAndPreIndex).show().addClass('active');
                var scale = 1 - Math.abs((translate) / app.viewHeight * step);
                $(this).css('transform', 'translate3d(0,' + translate * step + 'px,0) scale(' + scale + ')');

            });

            app.$pages.on('touchend', function(ev) {
                var touch = ev.originalEvent.changedTouches[0];
                var translate = touch.pageY - startY;

                if (translate > 50) {
                    $(this).css({
                        'transition': '0.7s',
                        'transform': `translate3d(0,${app.viewHeight * step}px,0) scale(0.75)`
                    });

                } else if (translate < -50) {
                    $(this).css({
                        'transition': '0.7s',
                        'transform': `translate3d(0,${-app.viewHeight * step}px,0) scale(0.75)`
                    });
                } else {
                    return;
                }
                app.animateFun()[nowIndex].outAn();
                setTimeout(function() {
                    app.animateFun()[nextAndPreIndex].inAn();
                }, 800);
                app.$pages.eq(nextAndPreIndex).css({
                    'transition': '0.7s',
                    'transform': 'translate3d(0,0,0)'
                });
            });


            app.$pages.on('transitionEnd webkitTransitionEnd', function(ev) {
                if (ev.target.className.indexOf('page') >= 0) {
                    //alert(1);
                    //当前是页面在切换
                    app.$pages.eq(nextAndPreIndex).removeClass('active').siblings('.page').hide();
                    app.$pages.css('transition', 'none');

                    off = true;
                }
            });

        },
        bannerSlide() {
            var bannerLi = $('#page3 .img_item');
            var bannerSpn = $('#page3 .page3_dot > span');
            var len = bannerLi.length;
            var startX = 0;
            var nowIndex = 0;
            var preIndex = 0;
            var iNum = 0;
            var timer = null;

            bannerLi.on('touchstart', function(ev) {
                var touch = ev.originalEvent.changedTouches[0];
                startX = touch.pageX;
                nowIndex = $(this).index();
                clearInterval(timer);
            });

            bannerLi.on('touchend', function(ev) {
                var touch = ev.originalEvent.changedTouches[0];
                var translate = touch.pageX - startX - 50;
                if (translate > 0) {
                    preIndex = nowIndex == 0 ? len - 1 : nowIndex - 1;
                    bannerLi.eq(nowIndex).attr('class', 'img_item rightHide');
                    bannerLi.eq(preIndex).attr('class', 'img_item leftShow');
                } else if (translate < 0) {
                    preIndex = nowIndex == len - 1 ? 0 : nowIndex + 1;
                    bannerLi.eq(nowIndex).attr('class', 'img_item leftHide');
                    bannerLi.eq(preIndex).attr('class', 'img_item rightShow');
                }

                bannerSpn.eq(preIndex).addClass('active').siblings().removeClass('active');

                iNum = preIndex;
                nowIndex = preIndex
                clearInterval(timer);
                timer = setInterval(autoPlay, 3000);

            });

            timer = setInterval(autoPlay, 3000);

            function autoPlay() {
                iNum++;
                if (iNum == len - 1) {
                    iNum = 0;
                }

                bannerLi.eq(nowIndex).attr('class', 'img_item leftHide');
                bannerLi.eq(iNum).attr('class', 'img_item rightShow');
                bannerSpn.eq(iNum).addClass('active').siblings().removeClass('active');
                nowIndex = iNum;
            }
        },
        animateFun() {
            var page1Stone = $('#page1 .page1_stone');
            var page1Logo = $('#page1 .page1_logo');
            var page1Sword = $('#page1 .page1_sword');
            var pageAllText = $('#page1 .page1_title > img');
            var pageText1 = $('#page1 .title_text1');
            var pageText2 = $('#page1 .title_text2');
            var pageText3 = $('#page1 .title_text3');
            var pageText4 = $('#page1 .title_text4');
            var page1Name = $('#page1 .page1_name');
            var arrowDown = $('#page1 .arrowDown');
            var arrowUp = $('#page1 .arrowUp');
            var page1Yqh = $('#page1 .yqh');
            var jiangMa = $('#page2 .jiangMa');
            var jiangQizi = $('#page2 .jiangQizi');
            var shuaiMa = $('#page2 .shuaiMa');
            var shuaiQizi = $('#page2 .shuaiQizi');
            var page2_qiziText = $('#page2 .page2_qiziText');
            var page3Qizi = $('#page3 .page3_pizi');
            var funArr = [{
                inAn: function() {
                    console.log('第一屏的进场动画');
                    page1Logo.animate({
                        'opacity': 1
                    }, 800);
                    page1Stone.velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 800);
                    page1Sword.delay(1000).velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 800);
                    pageText1.delay(1800).velocity({
                        'scale': 1,
                        'opacity': 1
                    }, 800);
                    pageText2.delay(2600).velocity({
                        'scale': 1,
                        'opacity': 1
                    }, 800);
                    pageText3.delay(3200).velocity({
                        'scale': 1,
                        'opacity': 1
                    }, 800);
                    pageText4.delay(4000).velocity({
                        'scale': 1,
                        'opacity': 1
                    }, 800);
                    page1Name.delay(4800).velocity({
                        'translateX': 0
                    }, 800);
                    arrowDown.delay(5600).velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 800);
                    arrowUp.delay(5600).velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 800);
                    page1Yqh.delay(6400).velocity({
                        'scale': 1,
                        'opacity': 1
                    }, 800);
                },
                outAn: function() {
                    console.log('第一屏的出场动画');
                    page1Logo.css('opacity', 0);
                    page1Stone.velocity({
                        'translateY': 100,
                        'opacity': 0
                    }, 0);

                    page1Sword.velocity({
                        'translateY': -200,
                        'opacity': 0
                    }, 0);

                    pageAllText.velocity({
                        'scale': 2,
                        'opacity': 0
                    }, 0);
                    page1Name.velocity({
                        'translateX': 600,
                    }, 0);
                    arrowDown.velocity({
                        'translateY': -200,
                        'opacity': 0
                    }, 0);
                    arrowUp.velocity({
                        'translateY': 200,
                        'opacity': 0
                    }, 0);
                    page1Yqh.velocity({
                        'scale': 2,
                        'opacity': 0
                    }, 0);

                }
            }, {
                inAn: function() {
                    console.log('第二屏的进场动画');
                    jiangQizi.velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 1000);
                    jiangMa.delay(1000).animate({
                        'opacity': 1
                    }, 500);
                    shuaiQizi.delay(1500).velocity({
                        'translateY': 0,
                        'opacity': 1
                    }, 1000);
                    shuaiMa.delay(2500).animate({
                        'opacity': 1
                    }, 500);
                    setTimeout(function() {
                        page2_qiziText.addClass('active');
                    }, 3000);
                },
                outAn: function() {
                    console.log('第二屏的出场动画');
                    page2_qiziText.removeClass('active');
                    jiangQizi.velocity({
                        'translateY': -400,
                        'opacity': 0
                    }, 0);
                    jiangMa.css({
                        'opacity': 0
                    });
                    shuaiQizi.velocity({
                        'translateY': -400,
                        'opacity': 0
                    }, 0);
                    shuaiMa.css({
                        'opacity': 0
                    });
                }
            }, {
                inAn: function() {
                    console.log('第三屏的进场动画');
                    setTimeout(function() {
                        page3Qizi.addClass('active');
                    }, 1000);
                },
                outAn: function() {
                    console.log('第三屏的出场动画');
                    page3Qizi.removeClass('active');
                }
            }, {
                inAn: function() {
                    console.log('第四屏的进场动画');
                },
                outAn: function() {
                    console.log('第四屏的出场动画');
                }
            }, {
                inAn: function() {
                    console.log('第五屏的进场动画');
                },
                outAn: function() {
                    console.log('第五屏的出场动画');
                }
            }];

            return funArr;
        },
        initLoading() {
            var arrImage = ['images/page1-2/arrowDown.png',
                'images/page1-2/arrowUp.png',
                'images/page1-2/companyName.png',
                'images/page1-2/jian.png',
                'images/page1-2/jiang_ma.png',
                'images/page1-2/jiang_qizi.png',
                'images/page1-2/jing.png',
                'images/page1-2/logo.png',
                'images/page1-2/qizi_text.png',
                'images/page1-2/shanguan.png',
                'images/page1-2/shanguan1.png',
                'images/page1-2/shitou.png',
                'images/page1-2/shuai_ma.png',
                'images/page1-2/shuai_qizi.png',
                'images/page1-2/wu.png',
                'images/page1-2/yqhWZ.png',
                'images/page1-2/zhan.png',
                'images/page1-2/zhi.png',
                'images/page3/1.png',
                'images/page3/2.png',
                'images/page3/3.png',
                'images/page3/4.png',
                'images/page3/5.png',
                'images/page3/arrangement.png'
                /*,
                                'page4-5/2017deadline.png',
                                'page4-5/4-0.png',
                                'page4-5/4-1.png',
                                'page4-5/4-2.png',
                                'page4-5/4-3.png',
                                'page4-5/4-4.png',
                                'page4-5/4-5.png',
                                'page4-5/4-6.png',
                                'page4-5/4-7.png',
                                'page4-5/4-8.png',
                                'page4-5/4-9.png',
                                'page4-5/cloth-black.png',
                                'page4-5/cloth-red.png',
                                'page4-5/date.png',
                                'page4-5/day.png',
                                'page4-5/drum.png',
                                'page4-5/fight.png',
                                'page4-5/hopingNext.png',
                                'page4-5/hotel.png',
                                'page4-5/hour.png',
                                'page4-5/IT.png',
                                'page4-5/location.png',
                                'page4-5/mapSpot.png',
                                'page4-5/minute.png',
                                'page4-5/playing.png',
                                'page4-5/ribbon.png',
                                'page4-5/second.png',
                                'page4-5/year.png',*/
            ];

            var iNum = 0;
            for (var i = 0; i < arrImage.length; i++) {
                var oImg = new Image();
                oImg.src = arrImage[i];

                oImg.onload = function() {
                    iNum++;

                    if (iNum == arrImage.length) {
                        $('#loading').fadeOut(1000, function() {
                            $('#loading').remove();
                            setTimeout(function() {
                                app.animateFun()[0].inAn();
                            }, 500);
                        });
                    }
                }
            }

        }
    };

    app.init();

})(jQuery);