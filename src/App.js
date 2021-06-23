import './App.css';
import { useState } from 'react';
import axios from 'axios';
import MealList from './MealList';
import loading from './loading.gif';

function App() {
  // this piece of state will get info from API
  const [meal, setMeal] = useState([]);
  // created a piece of state using an object
  // the property names here will match what we put as the "calories, ingredient and healthLabels" attribute in our HTML
  const [userSelection, setUserSelection] = useState({ ingredient:'', calories:'300-600', healthLabels:'alcohol-free' });
  const [isLoading, setIsLoading] = useState(true);
  // id: '9f030d19'
  // apikey: 'ff0534f576b38a91664bb482ba71257b'

  // making an API call on this function
  function getMealData(e, userSelection) {
    e.preventDefault();
    axios({
      url: 'https://api.edamam.com/search',
      method: 'GET',
      dataREsponse: 'json',
      params: {
        app_id: '9f030d19',
        app_key: 'ff0534f576b38a91664bb482ba71257b',
        q: userSelection.ingredient,
        calories: userSelection.calories,
        health: userSelection.healthLabels
      }
    }).then((response) => {
      // update meal state with response from API
      console.log(response.data.hits);
      setMeal(response.data.hits);
      setIsLoading(false);
    })    
  }

  // when we update the state we want to:
  // get users selected value from the form and get results
  // using spread operator so we can get values from multiple form elements
  function handleChange(event) {  
    setUserSelection({
      ...userSelection, 
      [event.target.name]:event.target.value
    })
  }

  return (
    <div className="App">
      {/* header */}
      <header>
        <div className="wrapper">

          <h1>Meal Planner 🗓</h1>

          {/* form */}
          <form className="form" onSubmit={(event) => getMealData(event, userSelection)}>
            <fieldset>
              <label htmlFor="ingredient">Ingredient:</label>
              <input type="text" name="ingredient"
              placeholder="Please enter ingredient"
              onChange={handleChange} value={userSelection.ingredient}/>
            </fieldset>

            <fieldset>
              <label htmlFor="diet" >Preference:</label>
              <select onChange={handleChange} name="healthLabels" value={userSelection.healthLabels}>
                <option value="placeholder" disabled>Select preference</option>
                <option value="alcohol-free">Alcohol free</option>
                <option value="crustacean-free">Crustacean free</option>
                <option value="dairy-free">Dairy free</option>
                <option value="gluten-free">Gluten free</option>
                <option value="keto-friendly">Keto</option>
                <option value="kosher">Kosher</option>
                <option value="tree-nut-free">Nuts Free</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </fieldset>

            <fieldset>
              <label htmlFor="calorie-range">Calorie range:</label>
              <select onChange={handleChange} name="calories" value={userSelection.calories}>
                <option value="placeholder" disabled>Select calorie range</option>
                <option value="300-600">300 - 600</option>
                <option value="600-900">600 - 900</option>
                <option value="900-1200">900 - 1200</option>
                <option value="1200-1600">1200 - 1600</option>
                <option value="1600-3000">More than 1600</option>
              </select>
            </fieldset>
            <button>Get Results</button>
          </form>
        </div>
      </header>

      {/* appending the dynamic content on page */}
      <main>
        <div className="wrapper">
          <ul>
          {
            isLoading ? <div className="loading-container"> <p>Please enter details and click 'Get Results' to continue.</p>
            <img className="loading" src={loading} alt="loading gif" /> </div>:
            meal.map((recipeList) => {
              return (
                <MealList
                title={recipeList.recipe.label}
                imgSrc={recipeList.recipe.image}
                imgAlt={"image of " + recipeList.recipe.label}
                key={recipeList.recipe.calories}
                recipeUrl={recipeList.recipe.shareAs}
                moreRecipes={recipeList.recipe.url}
                calories={recipeList.recipe.calories.toFixed(2)}
                servings={recipeList.recipe.yield}
                />
              )
            })
          }
          </ul>
        </div>
      </main>
        
      {/* footer */}
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College.</a></p>
      </footer>
    </div>
  );
}

export default App;
