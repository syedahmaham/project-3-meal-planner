function MealList(props) {
  const {title, imgSrc, imgAlt, recipeUrl, moreRecipes} = props;
  return (
    <section>
      <ul>
      <li>
        <img src={imgSrc} alt={imgAlt} />
        <h2>{title}</h2>
        <a className="button" href={recipeUrl}> View full Recipe</a>
        {/* <a className="button" href={moreRecipes}>More recipes like this</a> */}
      </li>
      </ul>
    </section>
  )
}

export default MealList;