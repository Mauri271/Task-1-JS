let article = document.getElementById("cardsArticle")


function cardCreator (card){
    return `<div class="card">
    <img src=${card.image} class="card-img-top" alt="foodFair">
    <div class="card-body d-flex flex-column align-center">
      <h5 class="card-title">${card.name}</h5>
      <p class="card-text">${card.description}</p>
      <p>Price: $${card.price}</p>
      <p>Place: ${card.place}</p>
      <a href="../pages/details.html?id=${card._id}" class="btn btn-primary bg-dark">See more</a>
    </div>
    </div>`
    }

    function cardPrinter(list, where) {
        let template = ""

        for(let element of list){
            if(element.date > data.currentDate){
                template += cardCreator(element)
            }
            
        }
        where.innerHTML = template
    }

    cardPrinter(data.events, article)



        //-----------------------------------------------------------------------------------------

// codigo task3

//------manejo de DOM-----
const searchBar = document.getElementById("searchBar");
const checkboxes = document.getElementById("form");


//-------search bar listener-------
searchBar.addEventListener(`input`, () => {
  doubleFilter()
});

//------search bar filter-------
function filteredByTitle(events) {
  return events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
      event.category.toLowerCase().includes(searchBar.value.toLowerCase())
  );
}

//-------checkboxlistener and categorie array------
checkboxes.addEventListener(`change`, () => {


  doubleFilter()

  // const cardsFilteredByCategory = filterCardsByCategory(data.events, checkedCheckbox)
  // console.log(cardsFilteredByCategory)

  // cardPrinter(cardsFilteredByCategory, article)
  
 

});


//-----categories new array --------------
const categories = data.events
  .map((event) => event.category)
  .filter((category, index, array) => array.indexOf(category) == index);


///-----checkbox printer----
const reduceFunction = (acumulador, actualElement) => {
  return (acumulador += `        <label>
  <input type="checkbox" id="" value="${actualElement}"> ${actualElement}
</label>`);
};

const reducedCheckboxes = categories.reduce(reduceFunction, ``);

checkboxes.innerHTML = reducedCheckboxes;


///----function to filter cards by category

function filterCardsByCategory(events, categories) {

  if(categories.length == 0){
    return events
  }
  return events.filter((event)=> categories.includes(event.category))

}


//----------crossed filter-------------

function doubleFilter() {
  const checkedCheckbox = Array.from(
    document.querySelectorAll(`input[type="checkbox"]:checked`)
  ).map((element) => element.value)
  let inputFunction = filteredByTitle(data.events,searchBar.value) ;
  let checkFunction = filterCardsByCategory(inputFunction, checkedCheckbox)
  cardPrinter(checkFunction, article)
}