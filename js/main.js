//Array de imagenes

const galery = [
       {
        titulo: 'Viaje 1',
        url: '../assets/images/viajes/viajes-1.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen',
        tags: ['mar'],
    },
  {
        titulo: 'Viaje 2',
        url: '../assets/images/viajes/viajes-2.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen',
        tags: ["arena"],
    },
      {
        titulo: 'Viaje 3',
        url: '../assets/images/viajes/viajes-3.jpg',
        alt: 'texto alternativo de la imagen',
        descripcion: 'Breve descripción de la imagen',
        tags: ["mar","cosa"],
    },

]


// Function called when the user clicks on the filet tag button.
// @param idTag : String with the tag that will be used to filter elements.
const onClickFilterTag = (ev) =>{
    modifySentence(ev.target.id);
    modifyImgBig(ev.target.id);
}


// Modify the sentence with a given id.
// @param tagId: String with the id the that will be inserted in the text.
const modifySentence = (tagId) =>{
        const sentence = document.querySelector("#sentence");
        //TODO: falta añadir el numero de imagenes.
        sentence.textContent =  `Se ha encontrado ${null} imágenes con el tag ${tagId}`;  
}

// Modify the big img with a give id.
// @param tagId: String with the id the that will be used to modify the image.
const modifyImgBig = (tagId) => {
        const imgBig = document.querySelector(`#imgBig`);
        const imagen = galery.find(imagen =>{

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


//Create all the buttons for the id filters container.
const createAllFilters = () => {
    // Array de nombres de los buttons.
    const nombresFilters = ["mar", "edificio", "señales", "arena","cosa"];
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


// Functions calls.
createAllFilters()


