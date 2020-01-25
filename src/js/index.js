import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

/** Global state of the App
 * - Search Object
 * - Current recipe Object
 * - Shopping recipe Object
 * - Current recipe Object
 * - Liked recipes
 */

const state = {};

const controlSearch = async () => {
    //1. Get query from View

    const query = searchView.getInput();
    if(query){
        state.search = new Search(query);
        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResList();
        renderLoader(elements.searchRes);

        //4. Search for recipes
        await state.search.getResults();


        //5. Render results on UI
        clearLoader();
        console.log(state.search);
        searchView.renderResults(state.search.result);        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResList();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});
























/*
import str from './models/Search';
//import {add,multiply, ID} from './views/searchView';
import * as searchView from './views/searchView';



//console.log(`Using imported functions! ${add(ID, 2)} and ${multiply(3,5)} and ${str} `);
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)} and ${str} `);
*/



//API Key : 17609226a60ab694a976972e72bdd8a2
// Search API url: https://www.food2fork.com/api/search