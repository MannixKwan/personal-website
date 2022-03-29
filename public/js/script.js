// Stick Navbar
// const navbar = document.querySelector("#cust-navbar");
// const navbarHeight = navbar.offsetHeight;
// function fixNavbar () {
//     if (window.scrollY >= navbarHeight/2) {
//         navbar.classList.add("cust-navbar-sticky","animate__animated","animate__fadeIn")
//     } else {
//         navbar.classList.remove("cust-navbar-sticky")
//     }
// }

// window.addEventListener("scroll",fixNavbar)

$(document).ready(function() {

    // Sticky Navbar
    $(window).scroll(function(e) {
        let navbarHeight = $('#cust-navbar').height();
        let windowTop = $(this).scrollTop();

        if (windowTop >= navbarHeight/2) {
            $('#cust-navbar').addClass('cust-navbar-sticky animate__animated animate__fadeIn')
        } else {
            $('#cust-navbar').removeClass('cust-navbar-sticky animate__animated animate__fadeIn')
        }
    })

    // Highlight Nav item when scroll to the section
    $(window).scroll(function(e) {
        let windowTop = $(this).scrollTop();
        $('.cust-navbar .menu a.menu-item').each(function (event) {
            if (windowTop >= $($(this).attr('href')).offset().top - 250) {
                $('.menu .active').removeClass('active animate__animated animate__pulse');
                $(this).addClass('active animate__animated animate__pulse');
            }
        })
    });

    // Highlight Side Menu item when scroll to the section
    $(window).scroll(function(e) {
        let windowTop = $(this).scrollTop();
        $('.menu.side-menu a').each(function (event) {
            if (windowTop >= $($(this).attr('href')).offset().top - 250) {
                $('.menu .active').removeClass('active animate__animated animate__pulse');
                $(this).addClass('active animate__animated animate__pulse');
            }
        })
    });

    // About Role Change
    const roles = [
        "Enabler",
        "Transformer",
        "Consultant",
        "Analyst",
        "Enthusiast",
        "Advocate"
    ]
    let pointer = 0;

    function aboutRoleChange() {
        if (pointer < roles.length - 1) {
            pointer++;
        } else {
            pointer = 0;
        }
        $('.about-role-change').fadeOut(
            function(){$(this).html(roles[pointer]).fadeIn()}
        );
    }

    setInterval(aboutRoleChange,3000);

    // Number increase animation when scroll to the section
    let viewed = false;
    $(window).scroll(numberCountIncrease);

    function isScrolledIntoView (elem) {
        let windowTop = $(window).scrollTop();
        let windowBottom = windowTop + $(window).height();

        let elemTop = $(elem).offset().top;
        let elemBottom = elemTop + $(elem).height();

        return ((windowTop <= elemBottom) && (windowBottom >= elemBottom) || (windowBottom >= elemTop) && (windowTop <= elemTop));
    }

    function numberCountIncrease () {
        if (isScrolledIntoView('.figure-tiles') && !viewed) {
            viewed = true;
            $('.tile-number').each(function() {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: (Math.floor(Math.random() * 3) + 1) * 1000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                })
            })
        }
    }

    $(window).scroll(function(e) {
        let windowTop = $(this).scrollTop();
        $('.about .tile').each(function (event) {
            if (windowTop >= $(this).offset().top - 500) {

            }
        })
    })

    // Current Employment Calculation
    let timeDiff = moment([2019,8,2]).fromNow(true);

    $('.currentDuration').html(timeDiff);

    // Form Validation
    (function() {
        'use strict'
        $('.needs-validation').each(function () {
            $(this).submit(function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                $(this).addClass('was-validated');
            })
        })
    })()


    // Navbar Side Menu Display
    $('.cust-navbar .cust-navbar-main .cust-navbar-icon').click(function() {
        if ($('.collapsed')[0]) {
            $('.cust-navbar .cust-navbar-icon.collapsed').removeClass('collapsed')
            $('.cust-navbar .menu').css({"right":"-=350px"}).addClass('show-sidemenu');
            $('.cust-navbar .menu').animate({"right":"0"},500,"swing");
            $('.cust-navbar .cust-navbar-icon .cust-navbar-icon-bar').hide();
            $('.cust-navbar .cust-navbar-icon .cust-navbar-icon-close').show();
        } else {
            $('.cust-navbar .cust-navbar-icon').addClass('collapsed')
            // $('.cust-navbar .menu').show().css({"left":"+=350px"});
            $('.cust-navbar .menu').animate({"right":"-350px"},500,"swing",function() {
                $(this).css({"right":"0"});
                $(this).removeClass('show-sidemenu');
            });
            // $('.cust-navbar .menu').removeClass('show-sidemenu');
            // $('.cust-navbar .menu').css({"right":"0"});
            $('.cust-navbar .cust-navbar-icon .cust-navbar-icon-bar').show();
            $('.cust-navbar .cust-navbar-icon .cust-navbar-icon-close').hide();
        }
    })

    // Message Form Submission
    $('#messageForm').submit(function(event) {

        if (this.checkValidity()) {

            event.preventDefault();

            // Parsing Data
            const formData = new FormData(this);
    
            const plainFormData = Object.fromEntries(formData.entries());
            const formDataJsonString = JSON.stringify(plainFormData);
    
            console.log(formDataJsonString);
    
            // Reset Icons and Error Message
            $('.message-form-submitted').hide();
            $('.message-error').hide();
    
            // Call API
            postMessage('/message',formDataJsonString)
                .then(response => {
                    if (response.success) {
                        messageStopLoading();
                        messageSuccess();
                        $(this).trigger('reset');
                        $(this).removeClass('was-validated');
                    } else {
                        messageStopLoading();
                        messageError();
                    }
                })
        }
    })

    async function postMessage(url = '', data = {}) {
        messageLoading()
        const response = await fetch (url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return response.json();
    }

    function messageLoading () {
        $('.message-form-loading').css('display','inline-block');
    }

    function messageStopLoading () {
        $('.message-form-loading').hide();
    }

    function messageSuccess () {
        $('.message-form-submitted').show();
    }

    function messageError () {
        $('.message-error').show();
    }

})