const welcomeContainer = document.querySelector('#welcome_container');
const appContainer = document.querySelector('#app_container');
const aboutContainer = document.querySelector('#about_container');
const educationContainer = document.querySelector('#education_container');

const welcomeBtn1 = document.querySelector('#welcome_btn_1');
const welcomeBtn2 = document.querySelector('#welcome_btn_2');
const welcomeBtn3 = document.querySelector('#welcome_btn_3');

const navLinkHome = document.querySelector('#nav-link-home');

var returnButtons = document.querySelectorAll('.return_welcome');

welcomeBtn1.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    appContainer.style.transition = '0.3s ease-in all';
    appContainer.style.opacity = '1';
    appContainer.style.zIndex = '10';
});

welcomeBtn2.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    aboutContainer.style.transition = '0.3s ease-in all';
    aboutContainer.style.opacity = '1';
    aboutContainer.style.zIndex = '10';
});

welcomeBtn3.addEventListener('click', function(){
    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.zIndex = '-5';

    educationContainer.style.transition = '0.3s ease-in all';
    educationContainer.style.opacity = '1';
    educationContainer.style.zIndex = '10';
});

function returnWelcome(){

    appContainer.style.transition = '0.3s ease-in all';
    appContainer.style.opacity = '0';
    appContainer.style.zIndex = '-5';

    aboutContainer.style.transition = '0.3s ease-in all';
    aboutContainer.style.opacity = '0';
    aboutContainer.style.zIndex = '-5';

    educationContainer.style.transition = '0.3s ease-in all';
    educationContainer.style.opacity = '0';
    educationContainer.style.zIndex = '-5';

    welcomeContainer.style.transition = '0.3s ease-in all';
    welcomeContainer.style.opacity = '1';
    welcomeContainer.style.zIndex = '10';
};

let return1 = returnButtons[0];
let return2 = returnButtons[1];
let return3 = returnButtons[2];

return1.addEventListener('click', ()=>{
    returnWelcome()
});
return2.addEventListener('click', ()=>{
    returnWelcome()
});
return3.addEventListener('click', ()=>{
    returnWelcome()
});

navLinkHome.addEventListener('click', ()=>{
    returnWelcome()
})


// DESIGN APPLICATION PART 
// IDEA: 2 SECTIONS --> 1 FOR SEARCHING / 1 FOR DISPLAYING THE RESULTS AND INFORMATION / 
// A LIST OF TOTALS, MULTIPLE SEARHCES!