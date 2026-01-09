const imgs = ["graduation", "hangout", "COSMOS", "family-photo", "India Trip", "India Trip 2"];
const imgsCtnr = document.querySelector("#images-container");
const imgViewer = document.querySelector('#image-viewer');

let imageBox;
for(const img of imgs){
    imageBox = document.createElement("div");
    imageBox.classList.add("imageBox");
    imageBox.textContent = img;
    imgsCtnr.appendChild(imageBox);
}


function Gru(minion1, minion2) {
    if (typeof (minion1) === "string" && typeof (minion2) === "string") {
        this.minion1 = minion1;
        this.minion2 = minion2;
    }else{
        this.minion1 = "Bob";
        this.minion2 = "Billy";
    }
    this.attack = function(){alert(`Gru summoned ${this.minion1}, who used his fart cannon to deter the enemy`);};
    this.attack2 = function(){alert(`Gru distracted the enemy with invisible ${this.minion2}'s tickles`);};
}

class ImageObj{
    name;
    #featured = ["example"];
    location;
    description;
    #keywords = [];
    url;
    constructor(name, description, url){
        this.name = name;
        this.description = description;
        this.url = url;
    }
    setFeatured(objs){
        this.featured = objs;
    }
    setLocation(loc){
        this.location = loc;
    }
    setKeywords(kwds){
        this.keywords = kwds;
    }
    // getKeywords(){
    //     return this.keywords.join(" ");
    // }
    // getFeatured(){
    //     return this.featured.join(" ");
    // }
}
const imageArray = [];
const img1 = new ImageObj("Office Hours", "Here I'm posing next to my former English professor, "
    +" Mrs. Birch, after chatting with her."
    +" I enjoyed her class as it featured popular culture analysis,"
    +" so we were able to discuss the meaning behind 'Get Out' and 'Barbie'",
"Resources/IMG_1.jpg");
img1.setFeatured(["Professor Birch", "Hamish Arora"]);
img1.setLocation("SDSU");
img1.setKeywords(["Academic", "Candid"]);
imageArray.push(img1);
const img2 = new ImageObj("Social butterflies", "At prom night, my friends and I"
    +" partied responsibly as we said goodbye. At prom, we saw unique fishes and "+
    "jellies. We shook a leg at the disco, reconnected with our pals, and enjoyed"
    +"the appetizers.", "Resources/IMG_2.jpg");
img2.setLocation("Birch Aquarium");
img2.setKeywords(["Party", "Graduation", "Friends"]);
img2.setFeatured(["Darsh Anup", "Hamish Arora"]);
const img3 = new ImageObj("Nautical Navigators", "After a fruit snack and chat, "
    +"We rented a boat and drove around the harbor. We enjoyed the lake mist and observed the"
    +" beachgoers, and came back in style", "Resources/IMG_3.jpg"
);
imageArray.push(img2);
img3.setLocation("Mission Bay");
img3.setKeywords(["Adventure", "Family"]);
img3.setFeatured(["Hamish Arora", "Mom", "Dad", "Ashwin B.", "Reena","Ayush"]);
imageArray.push(img3);
const img4 = new ImageObj("Pep Partners", "During the last pep rally, Color Wars, "
    +"my friends and I cheered on our summer sports teams as they competed against "
    +"each other. There were  tug-of-war and dodgeball matches. " 
    +"We also had the hip-hop team perform, and perhaps had sports teams switch sports."
    , "Resources/IMG_4.jpg"
);
img4.setLocation("Ed Burke Field");
img4.setFeatured(["Hamish Arora", "Diego", "Logan Friedman", "SJ Dorwhend"]);
img4.setKeywords(["Friends", "Graduation"]);
imageArray.push(img4);
const img5 = new ImageObj("Vegas Vegetarians", "My family and I toured the Vegas strip."+
    "we admired the Sphere, and it's complex tech, from the outside AND inside. "
    +"we also walked around the Strip, and saw the fountain show of the Bellagio, "
    +"and the pirate ship of Treasure Island."
    , "Resources/IMG_5.jpg"
);
img5.setLocation("Las Vegas");
img5.setFeatured("Mom");
img5.setKeywords("Family", "Potrait", "Adventure");
imageArray.push(img5);
const img6 = new ImageObj("High School Reunion", "Mustafa and I met with Darsh. We all caught up"
    +", having all been together at Darsh's Birthday last. We talked about our college"
    +"roommates, sleeping habits, study routines, etc., and watched part of a movie."
    , "Resources/IMG_6.jpeg"
);
img6.setLocation("Home");
img6.setFeatured(["Darsh Anup", "Mustafa Sathaliyawala", "Hamish Arora"]);
img6.setKeywords(["Friends", "Academic", "Candid"]);
imageArray.push(img6);

for(const imgd of imageArray){
    const imageTile = document.createElement("div");
    imageTile.classList.add("imageBox");
    imageTile.style.backgroundImage = `url(${imgd.url})`;
    imageTile.addEventListener("click", ()=>displayImage(imgd));
    //imageTile.addEventListener("click", (evt)=>console.log(evt.target));
    //imageTile.addEventListener("focus", ()=>displayImage(imgd));
    imgsCtnr.appendChild(imageTile);
}

function displayImage(imgObj){
    //Clear viewer
    const namePara = document.querySelector("#name");
    const img = document.querySelector("#current-image");
    const featuredBullet = document.querySelector("#featured");
    const locationBullet = document.querySelector("#location");
    const descriptionBullet = document.querySelector("#description");
    const keywordsBullet = document.querySelector("#keywords");
    namePara.textContent = `${imgObj.name}`;
    featuredBullet.textContent = `Featuring: ${imgObj.featured}`;
    locationBullet.textContent = `Location: ${imgObj.location}`;
    descriptionBullet.textContent = `Description: ${imgObj.description}`;
    keywordsBullet.textContent = `Keywords: ${imgObj.keywords}`;
    img.setAttribute("src", `${imgObj.url}`);
    console.log(img.getAttribute("src"));
}
const arr = [1, 2, 4, 8];
arr.join(" ");