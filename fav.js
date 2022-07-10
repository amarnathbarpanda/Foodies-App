//getting the references
const content = document.querySelector('.content');

//event listeners
content.addEventListener('click', operations);

// getting all the stored favourite meals from localStorage 
window.addEventListener('load', ()=>{
    let data = JSON.parse(localStorage.getItem('fav_meals'));
    //if no meals are there in the favourite list show the following message
    if(data == null || data.length == 0){
       let html = `<h1 class="empty_favlist">Nothing to show, Your favourite meals will be shown here as soon as you add them to favorites...</h1>`;
       content.innerHTML = html;
    }
    // else display the meals
    else{ 
        data.forEach((meal)=>{
            const card = document.createElement('div');
            card.classList.add('card');
            const favMeal =  `<img src="${meal.strMealThumb}" class="card_img" alt="">
            <div class="info">
                <span class="meal_name">${meal.strMeal}</span>
                <span class="meal_info">Category: ${meal.strCategory}</span>
                <span class="meal_info">Country: ${meal.strArea}</span>
                <span class="meal_info">Tags: ${meal.strTags}</span>



                <button class="recipe_btn" data-id="${meal.idMeal}">
                    Get Recipe
                </button>

            </div>
            <span class="fav_btn_wrapper">
                <i class="fa-solid fa-heart-circle-minus fa-3x remove-fav-btn" title="Delete From Favorite"
                    data-id="${meal.idMeal}"></i>
            </span>`;
            
            card.innerHTML = favMeal;      
            content.appendChild(card);
        });
    }
});


//this function will be called when user clicks on any of the button present on cards
function operations(e) {

    //show Meal page when user clicks get recipe button
    if (e.target.classList.contains('recipe_btn')) {
        let mealId = e.target.getAttribute('data-id');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.meals);
                localStorage.setItem('current_meal', JSON.stringify(data.meals[0]));
                showMealPage();
            })

    }
    //remove Meal from favorites when user clicks remove favorite button
    if (e.target.classList.contains('remove-fav-btn')) {
        let mealId = e.target.getAttribute('data-id');

                //get existing data from localStorage
                let oldData = JSON.parse(localStorage.getItem("fav_meals"));
                
                // check whether current meal is already in my fav meal list 
                let searchRes = oldData.find(elem => elem.idMeal === mealId);

                //get all the meals except that matches with current meal
                let newData = oldData.filter(meal => meal.idMeal !== searchRes.idMeal);
                
                //set new data to localstorage
                localStorage.setItem(`fav_meals`, JSON.stringify(newData));
                //reload page to show updated favorite list
                window.location.reload();                
                
    }
    
}

//this method will be called when the back button on the meal page will be clicked.
function goBack() {
    location.href = "./index.html";
    localStorage.removeItem('current_meal');
}

function showMealPage() {
    location.href = "./meal.html";
}

// Show favourite meals

function showFavMeals() {
    location.href = "./favMeal.html";
}