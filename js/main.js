
const urlPath = "assets/images/viajes"

//Array de imagenes
const gallery = [
    {
        titulo: 'Viaje 1',
        url: `${urlPath}/viajes-1.jpg`,
        alt: 'alt1',
        descripcion: 'Breve descripción de la imagen 1',
        tags: ['mar, arena'],
    },
    {
        titulo: 'Viaje 2',
        url: `${urlPath}/viajes-2.jpg`,
        alt: 'alt2',
        descripcion: 'Breve descripción de la imagen 2',
        tags: ["arena"],
    },
    {
        titulo: 'Viaje 3',
        url: `${urlPath}/viajes-3.jpg`,
        alt: 'alt3',
        descripcion: 'Breve descripción de la imagen 3',
        tags: ["mar","cosa"],
    },
    {
        titulo: 'Viaje 4',
        url: `${urlPath}/viajes-4.jpg`,
        alt: 'alt4',
        descripcion: 'Breve descripción de la imagen 4',
        tags: ["mar","cosa"],
    },
    {
        titulo: 'Viaje 5',
        url: `${urlPath}/viajes-5.jpg`,
        alt: 'alt5',
        descripcion: 'Breve descripción de la imagen 5',
        tags: ["mar","cosa"],
    },
    {
        titulo: 'Viaje 6',
        url: `${urlPath}/viajes-6.jpg`,
        alt: 'alt6',
        descripcion: 'Breve descripción de la imagen 6',
        tags: ["mar","montaña"],
    },
    {
        titulo: 'Viaje 7',
        url: `${urlPath}/viajes-7.jpg`,
        alt: 'alt7',
        descripcion: 'Breve descripción de la imagen 7',
        tags: ["mar","cosa"],
    }

]

const sentence = document.querySelector("#sentence");
const imgBig = document.querySelector("#imgBig");
const filtersContainer = document.querySelector("#filtersContainer");
const galleryRef = document.querySelector("#gallery");

const fragment = document.createDocumentFragment();



// Function called when the user clicks on the filet tag button.
// @param idTag : String with the tag that will be used to filter elements.
filtersContainer.addEventListener("click", (ev) =>{
    onClickFilterTag(ev)
});



const onClickFilterTag = (ev) =>{
    const id = ev.target.id
    modifyImgBig(id);
    const visibleCardsNum = modifyCardsVisibilty(id);
    modifySentence(id, visibleCardsNum);

}


// Handle the visibility of the cards with a given tag.
// @param currentTag : String with the tag current tag, if the card contains that tag will be visible, else no.
// @return Number : the count of the visible elements.
const modifyCardsVisibilty = (currentTag) =>{
    const cards = document.querySelectorAll(".card");
    const groupedCards = Object.groupBy(cards, (element)=>{
        const elementTags = element.dataset.tags
        return elementTags.includes(currentTag) ? "visible" : "invisible";
    });
    groupedCards.invisible.forEach(element =>{
        element.classList.add("display-none");
    })
    groupedCards.visible.forEach(element =>{
        element.classList.remove("display-none");
    })
    return groupedCards.visible.length;
}


// Modify the sentence with a given id.
// @param tagId: String with the id the that will be inserted in the text.
// @param visibleCardsNum : Number with the value that will be inserted in the text.
const modifySentence = (tagId, visibleCardsNum) =>{
        sentence.textContent =  `Se ha encontrado ${visibleCardsNum} imágenes con el tag ${tagId}`;  
}


// Modify the big img with a give id.
// @param tagId: String with the id the that will be used to modify the image.
const modifyImgBig = (tagId) => {
    const imagen = gallery.find(imagen =>{
        return imagen.tags.includes(tagId);
    }) 
    if(imagen!= undefined && imagen != null){
        imgBig.src = imagen.url;
    }
}


// Create a filter element of button type.
// @param name : String with the id of the button.
// @return HTMLElement: reference of the created element in the DOM.
const createFilter = (name) =>{
    const button = document.createElement("BUTTON");
    button.textContent = name;
    button.id = name;
    return button;
}


// Get all the differents arrays in a object array.
// @param ObjectArray : Array with objects that should contains "tag" attribute.
// @return Array with all the tags without repetition.
const getExistingTags = (objectArray) =>{
    const uniqueTags = new Set();
    objectArray.forEach(galleryElement =>{
        galleryElement.tags.forEach(tag => {
            uniqueTags.add(tag);
        })
    });
    return [...uniqueTags];
}


//Create all the buttons for the id filters container.
const createAllFilters = () => {
    const nombresFilters = getExistingTags(gallery);
    

    nombresFilters.forEach(name => {
        const newButton = createFilter(name);
        newButton.addEventListener("click", (ev) =>{
            onClickFilterTag(ev)
        })
        //dar ubicacion a la etiqueta button
        fragment.append(newButton);
    });
    filtersContainer.append(fragment);
}


// Create a card element: a article with a image and a title.
// @param Object : information to fill the card element.
// @return HTMLElement : the card element reference in the DOM.
const createCard = (galleryImage) =>{
    const card = document.createElement("ARTICLE");
    const title = document.createElement("H3");
    const imageContainer = document.createElement("DIV");
    const image = document.createElement("IMG");
    card.classList.add("card");
    card.dataset.tags = galleryImage.tags;
    title.innerText = galleryImage.descripcion;
    image.src = galleryImage.url;
    image.alt = galleryImage.alt;
    imageContainer.append(image);
    card.append(title,imageContainer);
    return card;
}


// Fill the element with gallery id with card elements using the gallery data.
const fillGallery = () =>{
    
    gallery.forEach(element => {
        const newCard = createCard(element);
        fragment.append(newCard);
    })
    galleryRef.append(fragment);
}

//Initialize the code.
const init = () =>{
    createAllFilters();
    fillGallery();
}
init();