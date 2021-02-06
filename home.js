const topScroll = document.querySelector('.scroll-up');

window.addEventListener("scroll", () => {
   if (window.pageYOffset > 100){
       topScroll.classList.add("active");
   }
   else{
        topScroll.classList.remove("active");
   }
});


/*USER LOGGING IN OR SIGNING UP FOR A REQUEST*/
const login = document.querySelector(".startBtn");
const loginForm = document.querySelector(".login");
const loginExit = document.querySelector(".modalIcon") ;

login.addEventListener('click', () =>{
    loginForm.style.display = "block";
});

loginExit.addEventListener('click', () =>{
    loginForm.style.display = "none";
}); 


/*const logToReq = document.querySelector(".logbtn");*/
const openRequest = document.querySelector(".requestBtn");
const request = document.querySelector(".patientsform");
const cancelRequest = document.querySelector(".cancelbtn");

openRequest.addEventListener('click', () =>{
    request.style.display = "block";
});

cancelRequest.addEventListener('click', () =>{
    request.style.display = "none";
});


/*SIGNING UP FOR A REQUEST */
const signUpBtnLink = document.querySelector(".signUpLink");
const goTosignUpAcct = document.querySelector('.signup');
const cancelSignUp = document.querySelector(".modalIconC");

signUpBtnLink.addEventListener('click', () =>{
    goTosignUpAcct.style.display = "block";
    loginForm.style.display = "none";
});

cancelSignUp.addEventListener('click', () =>{
    goTosignUpAcct .style.display = "none";
    loginForm.style.display = "block";
});

//SIDEBAR
const openMenu = document.querySelector(".menubar");
const menu = document.querySelector(".sidebar");
const close = document.querySelector(".closeside");
const menuContainer = document.querySelector(".sidebar-container");

/*SIDEBAR FUNCTION*/
const product = document.querySelector(".prod");
const service = document.querySelector(".serv");
const about = document.querySelector(".abt");
const contact = document.querySelector(".cnt");


openMenu.addEventListener("click", () =>{
    menu.style.width = "80%";
    menuContainer.style.width = "100%";
});

close.addEventListener("click", () =>{
    menu.style.width = "0%";
    menuContainer.style.width = "0%";
});

service.addEventListener("click", () =>{
    menu.style.width = "0%";
    menuContainer.style.width = "0%";
});

about.addEventListener("click", () =>{
    menu.style.width = "0%";
    menuContainer.style.width = "0%";
});

contact.addEventListener("click", () =>{
    menu.style.width = "0%";
    menuContainer.style.width = "0%";
});



