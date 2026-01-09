const checkboxes = document.querySelectorAll("input[name='element-choice']");
const priorityField = document.querySelector("#priority");
const liveEdit = document.querySelector("#live-editing");
const submit = document.querySelector("#change-elements-submit");
let checkboxObjs = [];
//Current priority number is 1
let priorNum = 1;
let changedFields = [];



//Create an object for each checkbox
//+add it to the array
//Also, attach an event handler to each checkbox
for(const checkbox of checkboxes){
    const editGroup = document.createElement("fieldset");
    let checkboxObj = {editObj: editGroup, activated: false, value: checkbox.value};
    checkboxObjs.push(checkboxObj);
    //Add an event handler
    checkbox.addEventListener("change", (e)=>modifyHandler(e));
    //Create the corresponding live-edit box
    const label = document.createElement("label");
    label.textContent = `You can edit the ${checkboxObj.value} of the news below:`;
    label.htmlFor = `${checkboxObj.value}-input`;
    const br = document.createElement("br");
    let input;
    if(checkboxObj.value==="description" || checkboxObj.value==="story"){
        input = document.createElement("textarea");
    }
    else if(checkboxObj.value==="category") {
        input = document.createElement("select");
        let categories = ["Sports", "Environment", "Politics"];
        let option;
        for (const cat of categories) {
            option = document.createElement("option");
            option.setAttribute("name", "category");
            option.value = cat;
            option.textContent = cat;
            input.appendChild(option);
        }
    }else if(checkboxObj.value ==="new-priority"){
        input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = Number(document.currentScript.getAttribute("max"));
        checkboxObj.value = "priority";
    }else{
        input = document.createElement("input");
        input.type = "text";
    }
    input.id = `${checkboxObj.value}-input`;
    editGroup.appendChild(label);
    editGroup.appendChild(input);
}
//Listen for confirmed changes to the category

const priorConfirm = document.querySelector("#priority-confirm");
const infoBox = document.querySelector("section output");

priorConfirm.addEventListener("click", priorityChangeHandler);
//Handle submission
submit.addEventListener("click", (evt)=>submitValidator(evt));


//Functions//
async function priorityChangeHandler(){
    if(Number(priorityField.value)!==priorNum && Math.floor(priorityField.value)===Math.ceil(priorityField.value)){
        priorNum = priorityField.value;
        for (const checkObj of checkboxObjs) {
            if (checkObj.activated) {
                const group = checkObj.editObj;
                await populate(group, checkObj.value);
            }
        }
        infoBox.textContent = `Current priority-numbered story: ${priorNum}`;
    }else{
        const saveState = infoBox.textContent;
        infoBox.textContent = "Can't continue: There was either no change detected, or the input wasn't an integer";
        infoBox.style.backgroundColor = "red";
        setTimeout(()=>{infoBox.textContent = saveState; infoBox.style.backgroundColor = "white"}, 2000);
    }
}

function modifyHandler(e){
    const currNode = e.target;
    let curr = checkboxObjs[0];
    //match the HTML object with it's object representation
    for(const c of checkboxObjs){
        if(c.value===currNode.value) curr = c;
    }
    const obj = curr.editObj;
    if(curr.activated){
        obj.parentElement.removeChild(obj);
        curr.activated = false;
        const removalIndex = changedFields.indexOf(curr);
        changedFields.splice(removalIndex, 1);
    }else{
        curr.activated= true;
        liveEdit.appendChild(obj);
        populate(obj, curr.value);
        changedFields.push(curr);
    }
}
//takes in an individual DOM group
async function populate(group, checkVal){
    const decoder = new TextDecoder();
    let storyValue = "";
    let thisCategory = "";
    let finished = false;
    const storyValueStream = await fetch(`../retrieve/${priorNum}/${checkVal.toLowerCase()}`).then(
    (response)=>{
        if(!response.ok){
            console.error(`Status error: ${response.status}`);
        }else return response;
    }).then((response)=>response.body)
    .catch((reason)=>console.log(reason));
    // for await (const storyValueStreamElement of storyValueStream) {
    //     storyValue += toString(storyValueStreamElement);
    //     console.log(toString(storyValueStreamElement);
    // }
    const reader = storyValueStream.getReader();
    while(!finished){
        const response = await reader.read();
        if(response["done"]) finished = true;
        else storyValue += decoder.decode(response["value"]);
    }
    reader.releaseLock();
    console.log(storyValue);
    //Reset finished for the next stream
    finished = false;
    const thisCategoryStream = await fetch(`../retrieve/${priorNum}/category`).then(
    (response)=>{
        if(!response.ok){
            console.error(`Status error: ${response.status}`);
        }else return response;
    }).then((response)=>response.body)
    .catch((reason)=>console.log(reason));
    const reader2 = thisCategoryStream.getReader();
    while(!finished){
        const response = await reader2.read();
        if(response["done"]) finished = true;
        else thisCategory += decoder.decode(response["value"]);
    }
    const input = group.lastElementChild;
    if(checkVal === "category"){
        //reset the option colors
        const options = input.children;
        for(const option of options){
            option.style.backgroundColor = "white";
            if(option.value===thisCategory) option.style.backgroundColor = "lime";
        }
    }else{
        input.value = storyValue;
    }
}

function submitValidator(e){
    e.preventDefault();
    if(changedFields.length === 0) {
        alert("No changes made. Please make a change to proceed");
        return;
    }
    let proceed = false;
    if(changedFields.length === 1) {
        proceed = confirm(`Are you sure you only want to change the ${changedFields[0].value.toLowerCase()}?`);
    }else {
        let message = "Are you sure that you want to change the ";
        changedFields.forEach((v, i) => i === changedFields.length - 1 ? message += `${v.value.toLowerCase()}.` : message += `${v.value.toLowerCase()}, `);
        proceed = confirm(message);
    }
    if(proceed){
        //See if the user wants to change the priority number
        let priorityChange = false;
        let newPriority = priorNum;
        //To update the length
        let length = -1;
        changedFields.forEach((obj)=>{
            if(obj.value==="priority"){
                priorityChange=true;
                newPriority = Number(obj.editObj.lastElementChild.value);
            }
            else if(obj.value ==="story"){
                const input = obj.editObj.lastElementChild.value;
                length = readingTime(input);
            }
        });
        if(priorityChange) fetch(`../changePriority/${priorNum}/${newPriority}`)
            .then((res)=>!res.ok?new Error(res.statusText):console.log("Priority Change successful!"))
            .catch(()=>{alert("Something went wrong. We'll redirect you to the main page for now");
                window.history.back();});
        let form = new FormData();
        for(const change of changedFields){
            const key = change.value.toLowerCase();
            const input = change.editObj.lastElementChild.value;
            form.append(key, input);
        }
        if(length>0){
            form.append("length", length);
        }
        const config = {
            method: 'POST',
            body: form
        };
        fetch(`../changeStory/${priorNum}`, config)
            .then((res)=>!res.ok ? new Error(res.statusText): res)
            .then(()=>{
                alert("Change succesfull! Redirecting you to the main page");
                window.history.back();
            })
            .catch(()=>
            {
                alert("Something went wrong. We'll redirect you to the main page for now");
                window.history.back();
            });
    }
}

function readingTime(story){
    if(typeof(story)==="string"){
        const storyWords = story.split(" ");
        const wpm = 200;
        let minutes = storyWords.length/wpm;
        minutes = minutes.toFixed(2);
        return minutes;
    }else{
        console.error("Invalid type: Can't get the reading time of something that isn't a string");
        return -1;
    }
}