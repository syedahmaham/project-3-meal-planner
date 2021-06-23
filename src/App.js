import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MealList from './MealList';

function App() {
  const [meal, setMeal] = useState([]);
  // const [ingredient, setIngredient] = useState("");
  // const [diet, setDiet] = useState("balanced");
  const [userSelection, setUserSelection] = useState({ ingredient:'', calories:'300-600', healthLabels:'alcohol-free' });
  // id: '9f030d19'
  // apikey: 'ff0534f576b38a91664bb482ba71257b'

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
      console.log(response.data.hits);
      setMeal(response.data.hits);
    })
  }

  function handleChange(event) {  
    setUserSelection({
      ...userSelection, 
      [event.target.name]:event.target.value
    })
    // setIngredient(event.target.value);
    // setDiet(event.target.value);
    // setCalories(event.target.value);
  }

  useEffect(() => {
    // axios({
    //   url: 'https://api.edamam.com/search',
    //   // method: 'GET',
    //   // dataREsponse: 'json',
    //   params: {
    //     app_id: '9f030d19',
    //     app_key: 'ff0534f576b38a91664bb482ba71257b',
    //     q: ingredient,
    //     calories: '500-800',
    //     Diet: 'balanced'
    //   }
    // }).then((response) => {
    //   // console.log(response.data.hits);
    //   setMeal(response.data.hits);
    // })
  // Adding an empty array here to prevent the callback function from running every time our component re-renders!
  }, [])
  return (
    <div className="App">
      <header>
        <h1>Meal Planner</h1>

        <form className="form" onSubmit={(event) => getMealData(event, userSelection)}>
          <fieldset>
            <label htmlFor="ingredient" className="sr-only">Ingredient</label>
            <input type="text" name="ingredient"
            placeholder="Please enter ingredient"
            onChange={handleChange} value={userSelection.ingredient}/>
          </fieldset>

          <fieldset>
            <label htmlFor="diet" className="sr-only" >Diet preference</label>
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
            <label htmlFor="calorie-range">Select Calorie range</label>
            <select onChange={handleChange} name="calories" value={userSelection.calories}>
              <option value="placeholder" disabled>Select calorie range</option>
              <option value="300-600">300 - 600</option>
              <option value="600-900">600 - 900</option>
              <option value="900-1200">900 - 1200</option>
              <option value="1200-1600">1200 - 1600</option>
              <option value="1600-3000">More than 1600</option>
            </select>
          </fieldset>
          <button>Get My Results</button>
        </form>
      </header>

      <main>
        {
          meal.map((recipeList) => {
            return (
              <MealList
              title={recipeList.recipe.label}
              imgSrc={recipeList.recipe.image}
              imgAlt={"image of " + recipeList.recipe.label}
              key={recipeList.recipe.calories}
              recipeUrl={recipeList.recipe.shareAs}
              moreRecipes={recipeList.recipe.url}
              />
            )
          })
        }
      </main>
      
    </div>
  );
}

export default App;
