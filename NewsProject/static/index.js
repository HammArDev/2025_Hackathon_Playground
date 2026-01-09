//Place the stories
async function loadArticles(){

    const data = await fetch("/filterStories/all").then(
        (response)=>{
            if(!response.ok){
                console.error(`Status error: ${response.status}`);
            }else return response;
        }).then((response)=>response.json())
        .then((obj)=> {
            const container = document.querySelector("#article-container");
            let field;
            let title;
            let desc;
            let length;
            let author;
            for (let i = 0; i < obj.length; i++) {
                if (i < 3) {
                    field = document.querySelector(`.podium.${CSS.escape(i + 1)}`);
                    field.style.position = "relative";
                    title = field.querySelector(".title");
                    desc = field.querySelector(".description");
                    length = field.querySelector(".length");
                    author = field.querySelector(".author");
                } else {
                    field = document.createElement("article");
                    field.className = `priority-${i+1}`;
                    field.style.position = "relative";
                    field.style.height = "fit-content";
                    container.appendChild(field);
                    title = document.createElement("h2");
                    desc = document.createElement("p");
                    desc.className = "description";
                    //To-do: Create the author field in the json file
                    author = document.createElement("p");
                    author.className = "author";
                    length = document.createElement("p");
                    length.className = "length";
                    length.style.textAlign = "right";
                    length.textContent = "Placeholder text";
                    const readIcon = document.createElement("img");
                    readIcon.setAttribute("src", "https://marketplace.canva.com/Njmq0/MADBWZNjmq0/2/tl/canva-time-icon-MADBWZNjmq0.png");
                    readIcon.style.width = "1em";
                    readIcon.style.height = "1em";
                    field.appendChild(title);
                    field.appendChild(author);
                    field.appendChild(desc);
                    field.appendChild(length);
                    container.appendChild(field);
                    length.appendChild(readIcon);
                }
                title.textContent = obj[i]["title"];
                desc.textContent = obj[i]["description"];
                length.textContent = `${obj[i]["length"]} minutes`;
                author.textContent = obj[i]["author"];
                const category = obj[i]["category"];
                if (category === "Politics") field.style.backgroundColor = "skyblue";
                else if (category === "Environment") field.style.backgroundColor = "mediumspringgreen";
                else if (category === "Sports") field.style.backgroundColor = "indianred";
            }
        });
    addIcons();
}
function addIcons(){
    const lengths = document.querySelectorAll(".length");
    lengths.forEach((l)=>{
        const readIcon = document.createElement("img");
        readIcon.setAttribute("src", "https://marketplace.canva.com/Njmq0/MADBWZNjmq0/2/tl/canva-time-icon-MADBWZNjmq0.png");
        readIcon.style.width = "1em";
        readIcon.style.height = "1em";
        readIcon.style.marginLeft = "5px";
        l.appendChild(readIcon);
    });
}

// function fixFormat(){
//     const podiumFields = document.querySelectorAll(".podium");
//     let anchorHeight = 0;
//     for(const podium of podiumFields){
//         if(podium.classList.contains('1')){
//             continue;
//         }else{
//             if(anchorHeight<podium.clientHeight) anchorHeight = podium.clientHeight;
//         }
//     }
//     podiumFields.forEach((podium, i)=>podium.style.height= podium.classList.contains('1')?`${anchorHeight+200}px`: `${anchorHeight}px`);
// }
// sample.sort((a, b)=>{
//     if(a["priority"]>b["priority"]) return 1;
//     else return -1;
// });

loadArticles();
