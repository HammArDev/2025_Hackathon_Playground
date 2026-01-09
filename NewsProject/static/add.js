const form = document.querySelector("form");
form.addEventListener("submit", ()=>submitor);

function submitor(){
    const inputs = document.querySelectorAll("form [name]:not(option)");
    //Check if any pieces of data are invalid
    let valid = true;
    inputs.forEach((value)=>!value.checkValidity()?valid=false:null);
    if(valid) {
        let fd = new FormData();
        inputs.forEach((value) => {
            fd.append(value.name.replace("-input", ""), value.value);
            if(value.name.replace("-input", "") === "story"){
                const length = countWords(value.value)/200;
                fd.append("length", length.toFixed(2));
            }
        });
        fetch("../addStory", {
            method: "POST",
            body: fd
        })
            .then((res) => !res.ok ? new Error(res.statusText) : res)
            .then(() => console.log("Succesfull Submission!"))
            .catch((err) => console.error(err));
    }else{
        alert("It seems like you're missing something in your form, please try again");
    }
}
function countWords(para){
    const arr = para.split(" ");
    return arr.length;
}

//validation functions

const desc = document.querySelector("#description-input");
desc.addEventListener("change", (e)=>{
    const words = countWords(e.target.value);
    if(words<8||words>30){
        if(words>30) e.target.setCustomValidity("Your description is too long, cut it down a bit")
        else e.target.setCustomValidity("Don't leave the readers hanging, make your hook sharper!");
        warn(e);
    }else e.target.setCustomValidity("");
});
const categorySelect = document.querySelector("#category-input");
categorySelect.addEventListener("blur", (evt)=>{
    if(evt.target.value === ""){
        evt.target.setCustomValidity("Bad Input Value");
        warn(evt);
    }else{
        evt.target.setCustomValidity("");
    }
});

const titleSelect = document.querySelector("#title-input");
titleSelect.addEventListener("blur", (evt)=>{
    if(countWords(evt.target.value)<8){
        evt.target.setCustomValidity("Don't text, communicate!");
        warn(evt);
    }else evt.target.setCustomValidity("");
})
function warn(e){
    e.target.classList.add("active");
    const warning = document.createElement("p");
    warning.style.backgroundColor = "indianred";
    warning.textContent = e.target.validationMessage;
    e.target.parentElement.prepend(warning);
    setTimeout(()=>{warning.parentElement.removeChild(warning); e.target.classList.remove("active")}, 2000);
}