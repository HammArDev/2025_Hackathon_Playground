var clicks = 0;
function addParagraph(){
	const para = document.createElement("p");
    para.textContent="Button Click "+ clicks;
    document.body.appendChild(para);
    clicks++;
}

const buttons = document.querySelectorAll("button");
for(const button of buttons){
	button.addEventListener("click", addParagraph);
}
