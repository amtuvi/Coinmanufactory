var contactForm = document.querySelector('.contact-form');
var contactFormContainer = document.querySelector('.contact-form-container');
var successText = document.querySelector('.contact-success-text');

contactForm.addEventListener('submit', function(){
    contactFormContainer.classList.add('contact-fly-out');

    setTimeout(function () {
        contactFormContainer.style.display = "none";
        successText.style.display = "block";
    }, 1000);
})
