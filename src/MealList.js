function MealList(props) {
  const {title, imgSrc, imgAlt, recipeUrl, calories, servings} = props;
  return (
    imgSrc != null &&
      (
      <li>
        <img src={imgSrc} alt={imgAlt} />
        <h2>{title}</h2>
        <p>Calories: {calories} for {servings} serving(s). (Calories for single serving can be found in the link)</p>
        <a className="button" href={recipeUrl}> View full Recipe</a>
      </li>
      )
  )
}

export default MealList;