const newItemInput = document.querySelector("input");
const adder = document.querySelector("#add-button");
const itemList = document.querySelector("ul");
adder.addEventListener("click", addItem);
window.addEventListener("keypress", (e)=>e.key==="Enter" ? addItem(): null);
window.addEventListener("keypress", (e)=>e.key==="d"&&itemList.hasChildNodes() ? itemList.removeChild(itemList.lastChild) : null);

function addItem(){
    const newItem = document.createElement("li");
    newItem.textContent = newItemInput.value;
    newItem.style.paddingRight = "50px";
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    newItem.appendChild(removeButton);
    removeButton.addEventListener("click", ()=>removeButton.parentNode.remove());
    itemList.appendChild(newItem);
    newItemInput.value = "";
    newItemInput.focus();
}