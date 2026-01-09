//const form_next = document.querySelector("#submit");
const edit_button = document.querySelector("#edit-button");
const form = document.querySelector("#action-query");
if(form) edit_button.addEventListener("click", ()=> form.removeAttribute("hidden"));
else console.log('Looks like this isn\'t the main page');
const home = document.querySelector("#part1 h1");
const tooltip =document.querySelector(".tooltip");
let warn = false;
const closeBtns = document.querySelectorAll(".close");
for(const close of closeBtns) {
    close.addEventListener("click", (e) => e.currentTarget.parentNode.setAttribute("hidden", "hidden"));
}

//Linking the buttons
const navButtons = document.querySelectorAll("#nav-bar button");
for(const n of navButtons){
    if(n.innerHTML === "Edit") continue;
    const path = n.innerHTML.toLowerCase();
    n.addEventListener("click", ()=>window.location.href=`/${path}`);
}
// form_next.addEventListener("click", (e)=>{
//     const selectMenu = document.querySelector("#actions-select");
//     if(selectMenu.value=== " "){
//         e.preventDefault();
//         if(!warn){
//             const warning = document.createElement("p");
//             warning.style.backgroundColor="rgba(206, 29, 29, 0.67)";
//             warning.style.fontFamily = "monospace";
//             warning.textContent= "Please select a valid value: ";
//             warning.style.color = "antiquewhite";
//             form.appendChild(warning);
//             setTimeout(()=>form.removeChild(warning), 3000);
//         }
//     }
// });

//Adding the home button tooltip
home.addEventListener("mouseover", ()=>tooltip.removeAttribute("hidden"));
home.addEventListener("mouseout", ()=>tooltip.setAttribute("hidden", true));



