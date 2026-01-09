const stories = [`It's %temp64\u00B0F outside, and slightly cloudy. %name is sitting under the shade of a tree.
     They are eating a %fruit when %object1 starts talking. "You know, I've seen %fruit sprout 
     this season," %object1 said to %name. Suddenly, it starts to rain. A flock of %object2 begin to play 
    beside %name.`,
    `It's %temp95\u00B0F outside, hot enough to cook %object1 on a sidewalk. %name is walking on the
    sidewalk, eating an %fruit ice cream sundae, when a friendly %object2 snags their cone. 
    %name and %object2 talk about the weather, when suddenly, a volleyball hits %object2 
    in the head. "Sorry, " says %object3. Striding across the sand, %object2 says, "your interuption is pardoned",
    and they all become busy in a challenging volleyball match`,
    `It's %temp50\u00B0F outside, and %name zips up their jacket. They're walking their pet %object1. 
    out of nowhere, a %object2 flies in their face, and drifts by. A panting man follows, 
    and stops for a rest. They ask %name, "Have you seen my %object2? I was about to have a picnic."
    \nLuckily, %name had a spare %object1 in their cross-body bag. The man invited %name over, and they
    relished some vegemite sandwhiches, quenched with %fruit juice`,
    `%name is building a snow %object1. It's as cold as it gets in Virginia, at %temp25\u00B0F. 
    "Splat!". A snowball hits their creation. "Might I add my artistic touch to your piece?",
    asks %object2. "It's on," says %name as they heave a snowball. And so, a snowball skirmish
    starts. Luckily, both sides agreed to a truce, and continued to make %object1 as they ate %fruit `];
const fruits = ['apple', 'orange', 'watermelon', 'peach'];
//Default names
const names = ['Father Christmas', 'Mozilla Cat', 'Nyan Cat', 'Gerald'];
let nationality;
let season;
let story = "";
let username;

//Selecting the output box
const output = document.querySelector(".output");
const reset = document.querySelector("#reset");

function generateStory(){
    //Get inputs
    const seasonField = document.querySelectorAll("#season input");
    for(let i=0; i<seasonField.length; i++){
        if(seasonField[i].checked)
            season=seasonField[i].value;
    }
    story = pickStory(season);
    convertToBritish();
    const nameField = document.querySelector("#name input");
    username = nameField.value;
    if(!username) username = chooseRandom(names);
    const objectField = document.getElementsByName("objects");
    const objectsFiltered=filterObjects(objectField);
    
    customize(objectsFiltered);
    output.textContent = story;
}
function pickStory(s){
    if(s==="spring"){
        return stories[0];
    }else if(s==="summer"){
        return stories[1];
    }else if(s==="fall"){
        return stories[2];
    }else{
        return stories[3];
    }
}
function convertToBritish(){
    const nationalityField = document.getElementsByName("ukus");
    for(let i=0; i<nationalityField.length; i++){
        if(nationalityField[i].checked)
           nationality = nationalityField[i].value;
    }
    const mod = document.getElementById("fall");
    const modLabels = document.querySelectorAll("label");
    let modLabel;
    for (let i=0; i<modLabels.length; i++){
        const lbl = modLabels[i]
        if(lbl.getAttribute("for")==="fall"){
            modLabel=lbl;
        }
    }
    const visual = document.getElementById("nationality-bar");
    if(nationality==="UK"){
        modLabel.textContent="Autumn";
        visual.style.backgroundImage = "URL(BritishFlag.png)";
        if(story!=""){
            const tempIndex = story.indexOf("%temp")+5;
            console.log(story[tempIndex])
            const temp2 = Number(story.slice(tempIndex, tempIndex+2));
            const temp3 = (5/9)*(temp2-32);
            story = story.replace(`${temp2}`, `${Math.round(temp3)}`);
            story=story.replace(story[tempIndex+3], 'C');
        }
    }else{
        modLabel.textContent="Fall";
        visual.style.backgroundImage = "URL(USFlag.png)";
        const tempIndex = story.indexOf("%temp");
        if(story[tempIndex+8]!="F"&&story){
            const temp2 = Number(story.slice(tempIndex+5, tempIndex+7));
            const temp3 = (9/5)*(temp2)+32;
            story = story.replace(`${temp2}`, `${Math.round(temp3)}`);
            story=story.replace(story[tempIndex+8], "F");
        }
    }
}
function customize(oF){
    //Can use indexOf() and .replace to achieve the goal
    //Picking a fruit
    const fruit = chooseRandom(fruits);
    //this is a number corresponding to the start of "leftover"
    let offset = 0;
    while(story.includes("%", offset)){
        let index = story.indexOf("%", offset);
        let end = story.indexOf(" ", index);
        let placeholder = story.slice(index, end);
        if(isPunctuation(placeholder[placeholder.length-1])) placeholder=placeholder.slice(0, placeholder.length-1);
        switch(placeholder){
        case "%object1":
            story=story.replace(placeholder, oF[0]);
            break;
        case "%object2":
            story=story.replace(placeholder, oF[1]);
            break;
        case "%object3":
            story=story.replace(placeholder, oF[2]);
            break;
        //remove the %temp placeholder
        case "%temp":
            break;
        case "%name":
            story=story.replace(placeholder, username);
            break;
        default:
            if(placeholder.startsWith("%temp")) story=story.slice(0, index) + story.slice(index+5);
            else story=story.replace(placeholder, fruit);  
        }
        console.log(story.slice(index));
        offset=index;
    }
}
function filterObjects(oField){
    let selectedObjects = [];
    let defaultObjects = ["banana", "slug", "rooster", "cloud"];
    let randPick;
    //We need two/three objects.
    let i = 0;
    for(i=0; i<oField.length; i++){
        if(oField[i].checked){
            selectedObjects.push(oField[i].value);
        }
    }
    const max = season==="summer" ? 3 : 2;
    while(selectedObjects.length<max){
        randPick = chooseRandom(defaultObjects);
        defaultObjects.splice(defaultObjects.indexOf(randPick), 1);
        selectedObjects.push(randPick);
    }
    while(selectedObjects.length>max){
        randPick = chooseRandom(selectedObjects);
        selectedObjects.splice(randPick, 1);
    }
    return selectedObjects;
}

function chooseRandom(arr){
    const randNum = Math.floor(Math.random()*arr.length);
    return arr[randNum];
}

function isPunctuation(char){
    switch(char){
        case '?':
        return true;
        case '!':
        return true;
        case '.':
        return true;
        case ',':
        return true;
        default:
        return false;
    }
}
const USUK=document.getElementsByName("ukus");
for(let i=0; i<USUK.length; i++){
    const button = USUK[i];
    button.addEventListener("change", convertToBritish);
}

function processSubmit(){
    generateStory();
    submitor.classList.add("hidden");
}

const submitor = document.querySelector("#generate-story");
submitor.addEventListener("click", processSubmit);
reset.addEventListener("click", ()=>{output.textContent=""; submitor.classList.remove("hidden");});

