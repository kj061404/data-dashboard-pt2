import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('');
  const [stats, setStats] = useState({
    totalRecipes: 0,
    averageCalories: 0,
    healthyRecipes: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=20&addRecipeNutrition=true&addRecipeInformation=true&addRecipeInstructions=true&includeIngredients`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
      const data = await response.json();
      console.log(data);

      setRecipes(data.results);
        
        // Calculate statistics
        const totalRecipes = data.results.length;
        const avgCalories = data.results.reduce((acc, recipe) => 
          acc + (recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0), 0
        ) / totalRecipes;
        const healthyCount = data.results.filter(recipe => recipe.veryHealthy).length;

        setStats({
          totalRecipes,
          averageCalories: Math.round(avgCalories),
          healthyRecipes: healthyCount
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();


  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = !dietFilter || recipe.diets?.includes(dietFilter.toLowerCase());
    return matchesSearch && matchesDiet;
  });

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>🍽️ Food Explorer Dashboard</h1>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Recipes</h3>
          <p>{stats.totalRecipes}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Calories</h3>
          <p>{stats.averageCalories}</p>
        </div>
        <div className="stat-card">
          <h3>Healthy Recipes</h3>
          <p>{stats.healthyRecipes}</p>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={dietFilter}
          onChange={(e) => setDietFilter(e.target.value)}
          className="diet-filter"
        >
          <option value="">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
        </select>
      </div>

      <div className="recipes-list">
        {filteredRecipes.map(recipe => (
          <div 
            key={recipe.id} 
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <p>Calories: {recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A'}</p>
              {recipe.diets?.length > 0 && (
                <div className="diet-tags">
                  {recipe.diets.map(diet => (
                    <span key={diet} className="diet-tag">{diet}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
