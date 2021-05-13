const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealInfoEl = document.getElementById('meal-info');
getRandomMeal();
fetchFavMeal();
async function getRandomMeal(){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
}
async function getMealById(id){

    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;

}
async function getMealBySeach(term){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
    <div class="meal-header">
        ${random ? `        
        <span class="random">Random Recipe</span>
        `: ''}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="far fa-heart"></i>
        </button>
    </div>
    `;
    const btn = meal.querySelector('.meal-body .fav-btn');
    const btnIcon = meal.querySelector('.meal-body .fav-btn i');
    btn.addEventListener('click', () => {
        if(btnIcon.classList.contains('fas')){
            removeMealFromLS(mealData.idMeal);
            btnIcon.classList.remove('fas');
            btnIcon.classList.add('far');
            console.log(getMealsFromLS())

        }else{
            addMealToLS(mealData.idMeal);
            btnIcon.classList.remove('far');
            btnIcon.classList.add('fas');
            console.log(getMealsFromLS())
        }
        fetchFavMeal();
    });
    meal.addEventListener('click',()=>{
        showMealIfo(mealData);
    })
    meals.appendChild(meal);
}

function addMealToLS(mealId){
    const mealIds  = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId){
    const mealIds  = getMealsFromLS();
    localStorage.setItem(
        'mealIds', 
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );   
}
function getMealsFromLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeal(){
    favoriteContainer.innerHTML = '';
    const mealIds = getMealsFromLS();
    for(let i =0; i<mealIds.length; i++){
        const mealId= mealIds[i];
        meal = await getMealById(mealId);
        addMealFav(meal);
    }
}
function addMealFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', ()=>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeal();
    });
    favMeal.addEventListener('click', ()=>{
        showMealIfo(mealData);
    });
    favoriteContainer.appendChild(favMeal);
}


searchBtn.addEventListener('click', async () =>{
    mealsEl.innerHTML='';
    const search = searchTerm.value;
    const meals = await getMealBySeach(search);
    if(meals){
    meals.forEach(meal =>{
        addMeal(meal);
    });
    }
});

function showMealIfo(mealData){
    mealInfoEl.innerHTML = '';
    const mealEl = document.createElement('div');
    //get ingredients and measures
    const ingredients = [];
    for(let i=1; i<=20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`)
        }else{
            break;
        }
    }
    
    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
    <P>${mealData.strInstructions}</P>
    <h3>Ingredients</h3>
    <ul>
        ${ingredients.map(ing =>`<li>${ing}</li>`).join('')}
    </ul>`;
    mealInfoEl.appendChild(mealEl);
}