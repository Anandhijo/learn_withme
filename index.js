(function($) {
​
    var $window = $(window);
    var $body = $('body');
    var $navMain = $('.nav-main');
    var $navLinks = $('.nav-links');
    var $pageSubnav = $('.page-subnav');
    var $purchaseDetail = $('.purchase-detail');
    var $courseSubnav = $('.course-subnav');
    var $modal = $('.modal-overlay');
    var viewport_width = $window.outerWidth(true);
​
​
// FUNCTIONS
​
// Set equal heights to program boxes
    function equalHeight(container) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function() {
            $el = $(this);
            $($el).height('auto');
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            } for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
​
​
// Check if user has scrolled
// Add class of 'scrolling' body tag
    function scrollDetect() {
        var scroll_top = $window.scrollTop();
        if (scroll_top > 0) {
            $body.addClass('scrolling');
        } else {
            $body.removeClass('scrolling');
        }
    }
​
// Check if user has scrolled up or down
// Add class of 'scrolling-up' or 'scrolling-down' to body tag
    var scroll_pos = 0;
    function scrollDirection() {
        var scroll_top = $window.scrollTop();
        var viewport_width = $window.outerWidth(true);
        if (scroll_top > scroll_pos) {
            $body.addClass('scrolling-down').removeClass('scrolling-up');
        } else {
            $body.addClass('scrolling-up').removeClass('scrolling-down');
        } if (scroll_top === 0) {
            $body.addClass('scroll-top').removeClass('scrolling-up');
            if (viewport_width > 768) {
                $body.removeClass('nav-open');
            } else {
                return false;
            }
        } else {
            $body.removeClass('scroll-top');
        }
        scroll_pos = scroll_top;
    }
​
// Smooth scrolling function for all hash links
    function smoothScroll() {
        var nav_height = $navMain.outerHeight(true);
        $('a[href*=\\#]:not([href=\\#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - nav_height
                    }, 700);
                    return false;
                }
            }
        });
    }
​
// Check if user has scrolled more than 200px
// If so add class of 'nav-small' to body tag
    function smallNav() {
        var scroll_top = $window.scrollTop();
        var viewport_width = $window.outerWidth(true);
        if (viewport_width > 768) {
            if (scroll_top > 120) {
                $body.addClass('nav-small');
            } else {
                $body.removeClass('nav-small');
            }
        } else {
            $body.removeClass('nav-small');
        }
    }
​
​
    function courseSubnav() {
        var scroll_top = $window.scrollTop();
        var viewport_width = $window.outerWidth(true);
        if (viewport_width > 1024) {
            if (scroll_top > 130) {
                $courseSubnav.addClass('show');
            } else {
                $courseSubnav.removeClass('show');
            }
            if (scroll_top > 300) {
                $purchaseDetail.addClass('show');
            } else {
                $purchaseDetail.removeClass('show');
            }
        } else {
            $courseSubnav.removeClass('show');
        }
    }
​
    function pageSubnav() {
        var scroll_top = $window.scrollTop();
        if ($body.hasClass('course-single')) {
            if (scroll_top > 500) {
                $pageSubnav.addClass('show');
            } else {
                $pageSubnav.removeClass('show');
            }
        }
        if (scroll_top > 393) {
            $pageSubnav.addClass('fixed');
        } else {
            $pageSubnav.removeClass('fixed');
        }
    }
​
    function pageSubnavSecs() {
        var scroll_top = $window.scrollTop();
        var $pageSubnavA = $('.page-subnav a');
        $pageSubnav.each(function (event) {
            if (scroll_top >= $($(this).attr('href')).offset() - 200) {
                $pageSubnav.not(this).removeClass('active');
                $(this).addClass('active');
            }
        });
    }
​
    var $mastheadVid = $('.masthead video');
    var $mastheadVidWrap = $('.masthead .video');
    var videoURL = $mastheadVidWrap.attr('data-video');
​
    function videoStart() {
        if ($mastheadVid.length) {
            $mastheadVid.get(0).pause();
        }
        $mastheadVidWrap.find('iframe').prop('src', '');
        setTimeout(function(){
            $mastheadVidWrap.find('iframe').prop('src', videoURL + '?autoplay=1');
        }, 100);
    }
​
    function videoStop() {
        $mastheadVidWrap.find('iframe').prop('src', '');
        if ($mastheadVid.length) {
            $mastheadVid.get(0).play();
        }
    }
​
// social share
    function facebookPopup() {
        var left = ($window.width()/2)-(450/2);
        var top = ($window.height()/2)-(500/2);
        var pop = window.open($(this).data('id'),'Share on Facebook','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,copyhistory=0,width=554,height=550,top='+top+',left='+left);
    }
​
    function twitterPopup() {
        var left = ($window.width()/2)-(430/2);
        var top = ($window.height()/2)-(240/2);
        var pop = window.open($(this).data('id'),'Post on Twitter','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,copyhistory=0,width=540,height=240,top='+top+',left='+left);
    }
​
    function instagramFeed() {
        var accessToken = '2007878036.1677ed0.956d52cb6d7e4d9693df394fc2375a92';
        $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&count=8&likes?&callback=?', function (insta) {
            $.each(insta.data,function (photos,src) {
                var html = '\n<li class="instagram-'+src.type+'"><a href="'+src.link+'" target="_blank"><div class="img-block" style="background-image:url('+src.images.thumbnail.url.replace('s150x150/', '')+');"></div></a></li>';
                $('#content').append(html);
            });
        });
    }
​
// Main Subnav
    var $programListItem = $('.nav-main .program-links > li');
    var $programAnchor = $('.nav-main .program-links > li a');
​
    $programListItem.mouseenter(function() {
        if ($window.outerWidth(true) > 768) {
            $body.addClass('subnav-open');
            $(this).addClass('active');
        }
    }).mouseleave(function() {
        if ($window.outerWidth(true) > 768) {
            $body.removeClass('subnav-open');
            $(this).removeClass('active');
        }
    });
​
    $programAnchor.click(function() {
        if ($window.outerWidth(true) < 768) {
            $(this).parent().siblings().removeClass('active');
            $(this).parent().toggleClass('active');
        }
    });
​
​
​
    $(function() {
        smallNav();
        instagramFeed();
    });
​
​
    $window.on('load', function() {
        smoothScroll();
        $body.removeClass('preload');
        equalHeight('.course-detail > li');
        equalHeight('.courses-feature p');
        equalHeight('.feature-points p');
        equalHeight('.instructor .instructor-desc');
        equalHeight('.instructors-list .instructor h4');
    });
​
​
// Execute scrolling functions
    var scrolling = false;
    $window.on('scroll touchmove', function() { scrolling = true; });
    setInterval(function() {
        var scroll_top = $window.scrollTop();
        if (scrolling) {
            if (!$body.hasClass('nav-open')) {
                pageSubnavSecs();
                courseSubnav();
                pageSubnav();
                smallNav();
            }
            scrollDetect();
            scrollDirection();
            scrolling = false;
        }
    }, 250);
​
​
// Execute resize fuctions
    var resize = false;
​
    $window.on('resize', function() {
        resize = true;
        viewport_width = $window.outerWidth(true);
    });
​
    setInterval(function() {
        if (resize) {
            smallNav();
            equalHeight('.course-detail > li');
            equalHeight('.courses-feature p');
            equalHeight('.feature-points p');
            equalHeight('.instructor .instructor-desc');
​
            if (viewport_width > 768) {
                $programListItem.removeClass('active');
                $programAnchor.removeClass('active');
            }
​
            if (viewport_width > 768) {
                $('.summer-sched-col ul').show();
            } else {
                if ($(this).parent('.summer-sched-col').is('.open')) {
                    $('.summer-sched-col ul').hide();
                }
            }
​
            resize = false;
​
        }
    }, 250);
​
​
    $(document).ready(function() {
​
        // Subnav 'notify me' modal trigger
        $('.subnav-notify-trigger').click(function(e) {
            $('.subnav-notify-target').click();
        });
​
        // Subnav 'general' modal trigger
        $('.subnav-general-trigger').click(function(e) {
            $('.subnav-general-target').click();
        });
​
        // Open modal when modal trigger is clicked
        $('.modal-trigger').click(function(e) {
            e.stopPropagation();
            $(this).parents().next('.modal-overlay').fadeIn(200);
            if ($modal.hasClass('modal-video')) {
                videoStart();
            }
        });
​
        // Close modal when anywhere in the webpage is clicked
        $('html').click(function() {
            $('.modal-overlay').fadeOut(200);
            if ($modal.hasClass('modal-video')) {
                videoStop();
            }
        });
​
        // Stop closing of modal if modal box is clicked
        $('.modal-overlay > div').click(function(e){
            e.stopPropagation();
        });
​
        // Close modal if modal X is clicked
        $('.modal-overlay .close-x').click(function(e) {
            $(this).parents('.modal-overlay').fadeOut(200);
            if ($modal.hasClass('modal-video')) {
                videoStop();
            }
        });
​
        // Close modal if ESC key is used
        $(document).on('keyup', function(e) {
            if (e.keyCode == 27) {
                $('.modal-overlay').fadeOut(200);
                if ($modal.hasClass('modal-video')) {
                    videoStop();
                }
            }
        });
​
​
        // Close alert box when 'X' is clicked
        $('.alert-box .close-x').click(function() {
            $(this).parent().hide();
        });
​
​
        // Open and close mobile/tablet navigation
        $('.nav-icon').click(function() {
            var viewport_width = $window.outerWidth(true);
            $body.toggleClass('nav-open');
            $body.toggleClass('nav-small');
            if (viewport_width > 1024) {
                if ($body.hasClass('nav-open')) {
                    $courseSubnav.removeClass('show');
                } else {
                    $courseSubnav.addClass('show');
                }
            } else {
                $courseSubnav.removeClass('show');
            }
        });
​