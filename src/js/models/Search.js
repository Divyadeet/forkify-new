import axios from 'axios';
/*
export default 'This is default export';

*/
export default class Search {
  constructor(query){
      this.query = query;
  }

    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '17609226a60ab694a976972e72bdd8a2';
        try {
            const res = await axios(`${proxy}http://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);
        }catch (error){
            alert(error);
        }   
    }
}

//http://www.food2fork.com/api/search?key=17609226a60ab694a976972e72bdd8a2&q=pizza
