const randomFact = document.querySelector(".first-section__fact");
const listOfFactsContainer = document.querySelector(".second-section__facts");
const catImgsAndFacts = document.querySelector(".third-section__obj");
const singleCatsTinderProfile = document.querySelector('.fourth-section__profile')
const firstSection = document.querySelector("#first-section");
const secondSection = document.querySelector("#second-section");
const thirdSection = document.querySelector("#third-section");
const fourthSection = document.querySelector("#fourth-section");

const CatAPIKey ='live_JjCPFj8T1hf6Kj3FWNL342xTb1umW6ux0EuPbs3ioyLns4ODK2TsMkzUedr3PzBm';
const fallbackCatObject = {
    breeds: [
        {
            description: "We couldn't retrieve detailed information about this cat breed at the moment. Please try again later.",
            name: "Ocicat",
            weight: { 
                imperial: '7 - 15', 
                metric: '3 - 7' 
            },
            life_span: "12 - 14",
            temperament: "Active, Agile, Curious, Demanding, Friendly, Gentle, Lively, Playful, Social",
            origin: "United States"
        }
    ],
    url: 'https://cdn2.thecatapi.com/images/rLKF3Yzcf.jpg',
};

// First section logic

async function getFact() {
    try {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        // Optionally, you can return a user-friendly message to be displayed in the UI
        return { fact: "Could not fetch the fact, please try again later." };
    }
}
 
 async function displayRandomFact(docElement) {
    const singleRandomFactObject = await getFact();
docElement.textContent = singleRandomFactObject.fact;
 }

//  Second section logic
 function displayListOfFacts(docElement) {
const ListOfFacts = document.createElement('ul');
for(i=0;i<5;i++){
    const singleRandomFactLi = document.createElement('li');
    displayRandomFact(singleRandomFactLi);
    ListOfFacts.appendChild(singleRandomFactLi)
    docElement.appendChild(ListOfFacts)
}

 }

//  Third section logic
 async function getCat() {
    try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?&has_breeds=1&api_key=${CatAPIKey}`)
if(!response.ok) {
    throw new Error('Network response was not ok'+response.statusText);
}
return await response.json();
}
catch(error) {
    console.error('Error fetching cat fact:',error);
    return fallbackCatObject;
}
}
async function getCatObject() {
    const singleCatObject = await getCat();
return singleCatObject[0];
}
 async function getCatImg(docElement) {
    const singleCat =  await getCatObject();
    const catImg = document.createElement('img');
    catImg.src = singleCat.url;
docElement.appendChild(catImg);
}
function composeCatImgWithQuote(docElement) {
    const quoteContainer =document.createElement('p');
    getCatImg(docElement);
    displayRandomFact(quoteContainer);
    
    docElement.appendChild(quoteContainer);
    
}
// Fourth section logic
 async function catsTinterProfile(docElement) {
    
    const singleCatObject = await getCatObject();
    const catImg = document.createElement('img');
    
    const catProfile = document.createElement('div');
    const catProfileInfo = document.createElement('p');
    const catProfileName = document.createElement('h2');
    const catProfileDescription = document.createElement('p')
    
    
    let name = singleCatObject.breeds[0].name;
    let weight = singleCatObject.breeds[0].weight.metric;
    let id =singleCatObject.breeds[0].id;
    let lifeSpan=singleCatObject.breeds[0].life_span;
    let temperament=singleCatObject.breeds[0].temperament;
    let description=singleCatObject.breeds[0].description;
    let origin=singleCatObject.breeds[0].origin;
    
    catImg.src = singleCatObject.url;

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    if (description.includes("We couldn't retrieve detailed information")) {
        errorMessage.textContent = description;
        description = ''; // Clearing description so it doesn't display twice
    }
    catProfileInfo.innerText=
    `Personality: ${temperament}
    Life span:  ${lifeSpan}years
    Weight: ${weight}kg
    Origin: ${origin}`;
    catProfileDescription.innerText=description;
    catProfileName.innerText=name;
    
    catProfile.appendChild(catProfileName);
    catProfile.appendChild(catImg);
    catProfile.appendChild(errorMessage);
    catProfile.appendChild(catProfileDescription);
    catProfile.appendChild(catProfileInfo);
    docElement.appendChild(catProfile);
    
    
    
 }





// Button handlers functions
function firstButtonHandler() {
    firstSection.classList.add('visible');
    firstSection.classList.remove('hidden');
    [secondSection, thirdSection, fourthSection].forEach(section => {
        section.classList.remove('visible');
        section.classList.add('hidden');
    })
    displayRandomFact(randomFact)
}
function secondButtonHandler() {
    secondSection.classList.add('visible');
    secondSection.classList.remove('hidden');
    [firstSection, thirdSection, fourthSection].forEach(section => {
        section.classList.remove('visible');
        section.classList.add('hidden');
    })
    listOfFactsContainer.innerHTML='';
    displayListOfFacts(listOfFactsContainer);
}
function thirdButtonHandler() {
    catImgsAndFacts.innerHTML=''
    thirdSection.classList.add('visible');
    thirdSection.classList.remove('hidden');
    [firstSection, secondSection, fourthSection].forEach(section => {
            section.classList.remove('visible');
            section.classList.add('hidden');
    });
    composeCatImgWithQuote(catImgsAndFacts);
}
function fourthButtonHandler() {
    singleCatsTinderProfile.innerHTML="";
    fourthSection.classList.add('visible');
    fourthSection.classList.remove('hidden');
    [firstSection, secondSection, thirdSection].forEach(section => {
            section.classList.remove('visible');
            section.classList.add('hidden');
    })
    catsTinterProfile(singleCatsTinderProfile);
}
