var contactForm = document.querySelector('.token-form');
var contactFormContainer = document.querySelector('.contact-form-container');
var successText = document.querySelector('.contact-success-text');

contactForm.addEventListener('submit', function(){
    contactFormContainer.style.display = "none";
    successText.style.display = "block";
})