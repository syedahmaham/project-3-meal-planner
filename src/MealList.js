function MealList(props) {
  const {title, imgSrc, imgAlt, recipeUrl, calories, servings} = props;
  let perServing = calories / servings;
  return (
    imgSrc != null &&
      (
      <li>
        <img src={imgSrc} alt={imgAlt} />
        <h2>{title}</h2>
        <p>Total Calories: {calories} ({perServing.toFixed(1)} per serving.)</p>
        <a className="button" href={recipeUrl}> View full Recipe</a>
      </li>
      )
  )
}

export default MealList;