//getting the referrences
const searchBtn = document.getElementById('search_btn');
const input = document.getElementById('search_input');
const homeImg = document.querySelector('.homeImg');
const homeText = document.querySelector('.homeText');

const content = document.querySelector('.content');

//event Listeners
content.addEventListener('click', operations);
input.addEventListener('keyup', () => {


    //Initially clear the previous suggestions
        removeCards();
                                       
    if (input.value !== '') {
        // Api call to get the searched results
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`).then((res) => res.json())
            .then((data) => {
                if (data.meals && data.meals.length > 0) {
                    if(homeImg && homeText){
                        homeImg.style.display = "none";
                        homeText.style.display = "none";
                    }
                    data.meals.forEach(meal => {
                        const card = document.createElement('div');
                        card.classList.add('card');

                        const html = `
                                <img src="${meal.strMealThumb}" class = "card_img" alt="${meal.strMeal} image">
                                <div class="info">
                                    <span class="meal_name">${meal.strMeal}</span>
                                    <span class="meal_info">Category: ${meal.strCategory}</span>
                                    <span class="meal_info">Country: ${meal.strArea}</span>
                                    <span class="meal_info">Tags: ${meal.strTags}</span>
                                    <button class="recipe_btn" data-id="${meal.idMeal}">Get Recipe</button>
                                    <span class="fav_btn_wrapper">
                                        <i class="fa-solid fa-heart-circle-plus fa-3x fav-btn" title="Add to Favorite" data-id="${meal.idMeal}"></i>
                                    </span>
                                </div>
                `;
                
                        const noDataFound = document.getElementById('no_data_found');

                        //remove "no results found" when results are found.
                        if (noDataFound)
                            content.removeChild(noDataFound);

                        //append the card meal into the content.
                        card.innerHTML = html;
                        content.appendChild(card);

                    });
                }

            })
            .catch((err) => {
                console.log(`The error is ->${err}`);
                content.innerHTML = `<h1 id="no_data_found">No results found...</i></h1>`;
            });
    }else{
        // to show homeImage and text when search field is empty
        if(homeImg && homeText){
            homeImg.style.display = "inline";
            homeText.style.display = "block";
        }
    }
});


// this function handles the actions when user clicks on 'get recipe' and 'add to favourite' button
function operations(e) {
    // display the meal details
    if (e.target.classList.contains('recipe_btn')) {
        let mealId = e.target.getAttribute('data-id');
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.meals);
                localStorage.setItem('current_meal', JSON.stringify(data.meals[0]));
                showMealPage();
            })

    }

    //add meal to favourite list
    if (e.target.classList.contains('fav-btn')) {
        let mealId = e.target.getAttribute('data-id');
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then((res) => res.json())
            .then((data) => {

                //get data from local Storage
                let oldData = JSON.parse(localStorage.getItem("fav_meals"));
                
                // initially oldData will be null as no data is present on localStorage
                oldData = oldData === null ? [] : oldData;

                // check whether current meal is already in my fav meals list 
                
                let res = oldData.find(elem => elem.idMeal === data.meals[0].idMeal);

                // if the current meal is already there then oldData.find() will return the meal, undefined otherwise.
                
                if (res !== undefined) {
                    alert('Meal already exist');
                } else {
                    let newData = [...oldData, data.meals[0]];
                    
                    localStorage.setItem(`fav_meals`, JSON.stringify(newData));
                    alert('Meal added to Favourite!!!');
                }
            });
    }
}

function showMealPage() {
    location.href = "./meal.html";
}


//this method is to remove the search results when search box is empty
function removeCards() {
    const cards = document.querySelectorAll('.card');
    // console.log(li);
    cards.forEach(item => item.remove());
}


//this method will be called when the back button on the Meal page will be clicked.
function goBack() {
    location.href = "./index.html";
    localStorage.removeItem('current_meal');
}

// Show favourite meal

function showFavMeals() {
    location.href = "./favMeal.html";
}