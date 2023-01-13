// Check If There's Local Storage Color Option

if(window.localStorage.getItem("color")){
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));

    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");
        if(window.localStorage.getItem("color") === element.dataset.color){
            element.classList.add("active");
        }
    })

} 


let aboutUsImgs = document.querySelectorAll(".image-box img");
let aboutUsImgsLocal = window.localStorage.getItem("img")



if(aboutUsImgsLocal !== null ){
    aboutUsImgs.forEach(img => {
        img.classList.remove("active");

        if(img.dataset.img === window.localStorage.getItem("color")){
            img.classList.add("active");

        }
        });
}




// Random Background Option
let backgroundOption = true;
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = window.localStorage.getItem("background");

if(backgroundLocalItem !== null){
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })

    if(backgroundLocalItem === "true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-cog").onclick = function(){
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open")
}

// Switch Colors 
let colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach(li => {
    li.addEventListener("click", (e) => {
        
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("color", e.target.dataset.color);


        colorLi.forEach((li) => {
            li.classList.remove("active");
            
            aboutUsImgs.forEach(img => {
                img.classList.remove("active");

                if(img.dataset.img === window.localStorage.getItem("color")){
                    img.classList.add("active")
                    window.localStorage.setItem("img", img.classList.contains("active"));
                }
                
                });

        })

        e.currentTarget.classList.add("active");
        
    })
})

// Switch Backgrounds
let randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {

        handleActive(e)

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            window.localStorage.setItem("background", true)
            randomizeImgs()
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            window.localStorage.setItem("background", false)

        }
    })

})



// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images 
let imgsArray = ["landing1.webp", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg"];


// Function To Randomize Imgs

function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{
    
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage = "url(imgs/"+imgsArray[randomNumber] +")"
            
        },3000)
    }
}
randomizeImgs();



// Select Skills Section

let skillsSection = document.querySelector(".skills");

window.onscroll = function(){
    // Skills Section Offset Top
    let skillsOffsetTop = skillsSection.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = skillsSection.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    
    if(windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight - 200){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// Create Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay 
        overlay.className = "popup-overlay";
        
        // Append Overlay To The Body
        document.body.appendChild(overlay)

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = "popup-box";

        if(img.alt !== null){

            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box 
            popupBox.appendChild(imgHeading)
        }

        // Create The Image 
        popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append Popup Box To Body
        document.body.appendChild(popupBox);

        // Create Close Span
        let closeButton = document.createElement("span");
        
        // Create The Close Button Text

        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = "close-button";

        // Add The Close Button To Popup Box;
        popupBox.appendChild(closeButton);

    })
})

// Close Popup
document.addEventListener("click", function(e){
    if(e.target.className == "close-button"){
        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
})

// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(element){
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
} 

scrollToSection(allBullets);
scrollToSection(allLinks);

// Handle Active State
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach((element)=>{
        element.classList.remove("active");
    })

    ev.currentTarget.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = window.localStorage.getItem("bullets-option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if(span.dataset.display === "show" ){
        
            bulletsContainer.style.display= "block";
            window.localStorage.setItem("bullets-option", "block");

        } else {
            bulletsContainer.style.display= "none";
            window.localStorage.setItem("bullets-option", "none");
        }

        handleActive(e)

    })
})

// Reset Button
document.querySelector(".reset-options").onclick = function(){

    // localStorage.clear(); but this problem was delete anything in local storage 
    localStorage.removeItem("color");
    localStorage.removeItem("background");
    localStorage.removeItem("img");
    localStorage.removeItem("bullets-option");

    window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
}

document.addEventListener("click", (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks){

        if(tLinks.classList.contains("open")){

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");

        }
    }
})

tLinks.onclick = function(e){
    e.stopPropagation();
}