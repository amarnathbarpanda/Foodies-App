//! Meal Page
// getting the referrences
const content = document.querySelector('.content');

// event listerners
window.addEventListener('load', () => {
    //getting the meal stored in localStorage
    const storedData = localStorage.getItem('current_meal');
    const meal = JSON.parse(storedData);
    
    //show the meal details if exists
    if (meal !== null) {
        let html = `<div class="meal_card">
    <h1 class="meal_full_name">${meal.strMeal}</h1>
    <div class="meal_details">
        <div class="meal_img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <table>
            <tr>
                <td>Id:</td>
                <td>${meal.idMeal}</td>
            </tr>
            <tr>
                <td>Category:</td>
                <td>${meal.strCategory}</td>
            </tr>
            <tr>
                <td>Country:</td>
                <td>${meal.strArea}</td>
            </tr>
            <tr>
                <td>Video Link:</td>
                <td><a href="${meal.strYoutube}">Click Here</a></td>
            </tr>
        </table>
        <h2 class="instructions_head">Ingredients:</h2>
        <table>
        `;

        //array to store ingredients and thier measurements as properties of an object 
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                let ing = {};
                ing.name = meal[`strIngredient${i}`];
                ing.measure = meal[`strMeasure${i}`];
                ingredients.push(ing);
            }
        }
        
        //to store ingredients and thier measurements from ingredients array as String
        let item = "";
        ingredients.forEach(ing => {
            item += `
                <tr>
                     <td>${ing.name} :</td>
                     <td>${ing.measure}</td>
                 </tr>`
        })
        
        console.log(content);
        
        let inst = `</table>
        <h2 class="instructions_head">Instructions:</h2>
        <p class="instructions_body">${meal.strInstructions}</p>
        </div>
        </div>
        </div>`
        
        //adding all the elements inside content
        content.innerHTML = html + item + inst;
    } else {
        //if no data found
        content.innerHTML = `<h1 id="no_data_found">No Data Found!!! <i class="fa-solid fa-face-frown"></i></h1>`;
    }
})

// to go back to the home page
function goBack() {
    location.href = "./index.html";
    localStorage.removeItem('current_meal');
    document.getElementById('search_input').value = '';
}

// Show favourite meals
function showFavMeals() {
    location.href = "./favMeal.html";
}