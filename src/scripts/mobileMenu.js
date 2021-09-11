var mobileWidth = window.innerWidth;

if(mobileWidth <= 700){
    
}

function showMobileMenu() {
    var mobileMenu = document.querySelector('.mobile-menu-container');
    var mobileOverlay = document.querySelector('.mobileOverlay');

    mobileMenu.style.display = "block";
    mobileOverlay.style.display = "block";
}

function deactivateMobileMenu() {
    var mobileMenu = document.querySelector('.mobile-menu-container');
    var mobileOverlay = document.querySelector('.mobileOverlay');

    mobileMenu.classList.add('mobile-fly-out');

    setTimeout(function () {
        mobileMenu.classList.remove('mobile-fly-out');

        mobileMenu.style.display = "none";
        mobileOverlay.style.display = "none";
    }, 500);
}