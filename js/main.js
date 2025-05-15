// Function called when the user clicks on the filet tag button.
// @param idTag : String with the tag that will be used to filter elements.
const onClickFilterTag = (idTag) =>{
    console.log(idTag)
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
    const nombresFilters = ["Mar", "Edificio", "Señales", "Arena","Cosa"];
    // ACCEDER AL SELECTOR DIV ID filtersContainer
    const filtersContainer = document.querySelector("#filtersContainer");
    //console.log(filtersContainer);//ok
  
    // funcion
    nombresFilters.forEach(name => {
        const newButton = createFilter(name);
        newButton.addEventListener("click", (ev) =>{
            onClickFilterTag(ev.target.id)
        })
        //dar ubicacion a la etiqueta button
        filtersContainer.append(newButton);
    });
}


// Functions calls.
createAllFilters()


