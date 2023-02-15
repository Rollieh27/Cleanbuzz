//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*- Food API
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('food');
const mealModal = document.getElementsByClassName('.food-details');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*`*Event Listener
searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });

//*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ API Key
const options = {
	headers: {
		'X-RapidAPI-Key': 'dec28b4a39mshed5fa293c9ae449p1c92e0jsn62280ed3ee7a',
		'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
	}
};

//*`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`-`- Results for list
function getMealList() {
	let searchInputTxt = document.getElementById('search-input').value.trim();
	fetch(`https://themealdb.p.rapidapi.com/filter.php?i=${searchInputTxt}`, options)
	.then(response => response.json())
	.then(data => {
		let html = "";
		if(data.meals){
			data.meals.forEach((food, i) => {
				if (i < 4) {
          html += `<div class="tile is-parent">
    <article class="tile is-child box">
        <figure class="image is-4by3">
            <img src="${food.strMealThumb}" alt="${food.strMeal}">
        </figure>
        <h3 class="title">${food.strMeal}</h3>
        <button class="js-modal-trigger button is-primary" data-target="modal-js-example" data-id="${food.idMeal}">
            Get This Recipe
        </button>
    </article>
</div>`;
    }
  });
        mealList.classList.remove('notFound');
      
		} else{
			html="Sorry, we couldn't find a recipe with that ingredient :( , Check back for updates in the future :) .";
			mealList.classList.add('notFound');
		}
		mealList.innerHTML=html;
	})
	
}
//? ----------------Modal Open & Close
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal

    mealList.addEventListener("click", function(event){
      const target = event.target;
      console.log(target.getAttribute("data-id"));
      // const modal = $trigger.dataset.target;
      (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
    
        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      });
    })

  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
