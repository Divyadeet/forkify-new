/*
export const add = (a,b) => a+b;
export const multiply = (a,b) => a*b;
export const ID = 23;
*/
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResList = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link href="#${recipe.recipe_id} ">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => {
    console.log('divyadeet');
    return `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}></use>
        </svg>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span> 
    </button>
`;
};

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if(page === 1 && page> 1){
        //Button to get to page 1
        console.log('1');
        button = createButton(page, 'next');
    }else if(page<pages){
        //both buttons
        console.log('2');
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
    `;
    }else if(page === pages && page>1 ){
        //Only button to go to prev page
        console.log('3');
        button = createButton(page, 'prev');
    }

    //elements.searchResPages.insertAdjacentHTML('afterbegin',button);
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render results of current page
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    //console.log(recipes);
    //recipes.forEach(renderRecipe);
    
    renderButton(page, recipes.length, resPerPage);
};