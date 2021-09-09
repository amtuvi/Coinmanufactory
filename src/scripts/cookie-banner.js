var cookieBanner = document.querySelector('.cookie-banner-container');


function cookieConfirm (){
    cookieBanner.classList.add('cookie-banner-fly-out');
    localStorage.setItem("cookieBannerDisplayed", "true");
    localStorage.setItem("cookieBannerTime", Date.now());
    activateAnalytics();
    setTimeout(function() {
        cookieBanner.style.display = "none";
    }, 500);
}

function cookieDecline() {
    cookieBanner.classList.add('cookie-banner-fly-out');
    localStorage.setItem("cookieBannerDisplayed", "false");
    localStorage.setItem("cookieBannerTime", Date.now());

    setTimeout(function() {
        cookieBanner.style.display = "none";
    }, 500);
}

setTimeout(function () {
    if(!localStorage.getItem("cookieBannerDisplayed") || !localStorage.getItem("cookieBannerTime")){
        cookieBanner.style.display = "block";
        cookieBanner.classList.add('cookie-banner-fly-in');
    }
    else if(compareConfirmTime()){
        cookieBanner.style.display = "block";
        cookieBanner.classList.add('cookie-banner-fly-in');
    }
    else if(compareDeclineTime()){
        cookieBanner.style.display = "block";
        cookieBanner.classList.add('cookie-banner-fly-in');
    }
    else{
        var answer = localStorage.getItem("cookieBannerDisplayed");
        console.log(answer);
        if(answer == true){
            activateAnalytics();
        }
    }
}, 2000);


function compareConfirmTime() {
    var result = false;

    var confirmed = localStorage.getItem("cookieBannerDisplayed");

    if(confirmed == true){
        var now = Date.now();
        var answer = localStorage.getItem("cookieBannerTime");

        var timeApart = (now - answer)/1000/60/60/24/7;

        if(timeApart > 52){
            result = true;
        }
    }
    return result;
}

function compareDeclineTime() {
    var result = false;
    var confirmed = localStorage.getItem("cookieBannerDisplayed");

    if(confirmed == false){
        var now = Date.now();
        var answer = localStorage.getItem("cookieBannerTime");

        var timeApart = (now - answer)/1000/60/60/24/7;

        if(timeApart > 1){
            result = true;
        }
    }
    return result;
}


function activateAnalytics() {
    var scriptOne = document.createElement('script');
    scriptOne.type = 'text/javascript';
    scriptOne.async = true;
    scriptOne.src = 'https://www.googletagmanager.com/gtag/js?id=G-MC49X32Z38';
    document.body.appendChild(scriptOne);

    var scriptTwo = document.createElement('script');
    scriptTwo.type = 'text/javascript';
    scriptTwo.src = 'src/scripts/googleAnalytics.js';
    document.body.appendChild(scriptTwo);
}