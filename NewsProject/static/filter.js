const category = document.currentScript.getAttribute("title");
const color = document.currentScript.getAttribute("color");
const container = document.querySelector("#articles-container");
async function loadFiltered(){
    const data = await fetch(`/filterStories/${category}`)
        .then((res)=>!res.ok?new Error(res.statusText): res.json());
    for(const datum of data){
        const div = document.createElement("article");
        div.className = `priority-${datum["priority"]+1}`;
        div.style.backgroundColor = color;
        div.style.color = "cadetblue";
        const articleTitle = document.createElement("h2");
        articleTitle.className = "title";
        const author = document.createElement("p");
        author.className = "author";
        const desc = document.createElement("p");
        desc.className = "description";
        const length = document.createElement("p");
        length.className = "length";
        articleTitle.textContent = datum["title"];
        desc.textContent = datum["description"];
        length.textContent = `${datum["length"]} minutes`;
        author.textContent = datum["author"];
        div.appendChild(articleTitle);
        div.appendChild(author);
        div.appendChild(desc);
        div.appendChild(length);
        container.appendChild(div);
    }
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

loadFiltered();