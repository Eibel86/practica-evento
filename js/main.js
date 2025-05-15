//Array de imagenes
const gallery = [
       {
        titulo: 'Viaje 1',
        url: '../assets/images/viajes/viajes-1.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen 1',
        tags: ['mar'],
    },
  {
        titulo: 'Viaje 2',
        url: '../assets/images/viajes/viajes-2.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen 2',
        tags: ["arena"],
    },
      {
        titulo: 'Viaje 3',
        url: '../assets/images/viajes/viajes-3.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen 3',
        tags: ["mar","cosa"],
    },

]

const fragment = document.createDocumentFragment();


// Function called when the user clicks on the filet tag button.
// @param idTag : String with the tag that will be used to filter elements.
const onClickFilterTag = (ev) =>{
    modifyImgBig(ev.target.id);
    const visibleCardsNum = modifyCardsVisibilty(ev.target.id);
    modifySentence(ev.target.id, visibleCardsNum);

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
        const sentence = document.querySelector("#sentence");
        //TODO: falta añadir el numero de imagenes.
        sentence.textContent =  `Se ha encontrado ${visibleCardsNum} imágenes con el tag ${tagId}`;  
}

// Modify the big img with a give id.
// @param tagId: String with the id the that will be used to modify the image.
const modifyImgBig = (tagId) => {
        const imgBig = document.querySelector(`#imgBig`);
        const imagen = gallery.find(imagen =>{

                return imagen.tags.includes(tagId);
        }) 
        if(imagen!= undefined && imagen != null){
            imgBig.src = imagen.url;
        }
        
}


// Crea un elemento con la etiqueta button.
// @param nombre : String de la id del botón.
// @return HTMLElement: referencia al objeto creado en el DOM.
const createFilter = (nombre) =>{
     //crear etiqueta buton
    const button = document.createElement("BUTTON");
    //Dar texto al button
    button.textContent = nombre;
    button.id = nombre;
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
    // Array de nombres de los buttons.
    const nombresFilters = getExistingTags(gallery);
    // ACCEDER AL SELECTOR DIV ID filtersContainer
    const filtersContainer = document.querySelector("#filtersContainer");
    //console.log(filtersContainer);//ok
  
    // funcion
    nombresFilters.forEach(name => {
        const newButton = createFilter(name);
        newButton.addEventListener("click", (ev) =>{
            onClickFilterTag(ev)
        })
        //dar ubicacion a la etiqueta button
        filtersContainer.append(newButton);
    });
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
    const galleryRef = document.querySelector("#gallery");
    gallery.forEach(element => {
        const newCard = createCard(element);
        fragment.append(newCard);
    })
    galleryRef.append(fragment);
}



// Functions calls.
createAllFilters();
fillGallery();


