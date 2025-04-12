import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        
        const data = await response.json();
        console.log(data);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading recipe details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return <div className="error">Recipe not found</div>;

  return (
    <div className="recipe-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Recipes
      </button>
      
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      </div>
      
      <div className="recipe-info">
        <div className="recipe-meta">
          <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Calories:</strong> {recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A'}</p>
        </div>
        
        <div className="recipe-summary">
          <h2>Summary</h2>
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
        
        <div className="recipe-instructions">
          <h2>Instructions</h2>
          {recipe.analyzedInstructions && recipe.analyzedInstructions[0]?.steps ? (
            <ol>
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}
        </div>
        
        {recipe.diets && recipe.diets.length > 0 && (
          <div className="recipe-diets">
            <h2>Dietary Information</h2>
            <div className="diet-tags">
              {recipe.diets.map(diet => (
                <span key={diet} className="diet-tag">{diet}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail; 