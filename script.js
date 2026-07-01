const content = document.getElementById("content");

let currentCategory = null;

function showHome() {

    currentCategory = null;
    document.getElementById("search").value = "";

    content.innerHTML = `
        <h2>Recipe Categories</h2>
        <div id="categoryGrid"></div>
    `;

    const categoryGrid = document.getElementById("categoryGrid");
    const categories = [...new Set(recipes.map(r => r.category))].sort();

    categories.forEach(category => {
        const button = document.createElement("button");

        button.className = "categoryButton";
        button.textContent = category;

        button.onclick = () => showCategory(category);

        categoryGrid.appendChild(button);
    });
}

showHome();

function showCategory(category) {

    currentCategory = category;

    const filteredRecipes = recipes.filter(recipe =>
        recipe.category === category
    );

    content.innerHTML = `
        <button class="homeButton" onclick="showHome()">🏠 Home</button>
        <h2>${category}</h2>
        <div id="recipeGrid"></div>
    `;

    const recipeGrid = document.getElementById("recipeGrid");

    filteredRecipes.forEach(recipe => {

        const card = document.createElement("div");

        card.className = "recipeCard";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
        `;

        // Make the entire card clickable
        card.onclick = () => openRecipe(recipe.title);

        recipeGrid.appendChild(card);

    });

}

function openRecipe(title) {

    const recipe = recipes.find(r => r.title === title);

    content.innerHTML = `
        <button class="homeButton" onclick="showHome()">🏠 Home</button>
        <button class="homeButton" onclick="showCategory('${recipe.category}')">
            ← ${recipe.category}
        </button>

        <h1>${recipe.title}</h1>

        <h2>Ingredients</h2>

        <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>

        <h2>Directions</h2>

        <ol>
            ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

}

function displayRecipeList(recipeList, title) {

    content.innerHTML = `
        <button class="homeButton" onclick="showHome()">🏠 Home</button>
        <h2>${title}</h2>
    `;

    recipeList.forEach(recipe => {

        const button = document.createElement("button");

        button.className = "recipeButton";
        button.textContent = recipe.title;

        button.onclick = () => openRecipe(recipe.title);

        content.appendChild(button);
    });
}

document.getElementById("search").addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    let filteredRecipes = recipes;

    // If viewing a category, only search within that category
    if (currentCategory) {
        filteredRecipes = recipes.filter(recipe =>
            recipe.category === currentCategory
        );
    }

    filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchText)
    );

    if (currentCategory) {
        displayRecipeList(filteredRecipes, currentCategory);
    } else {
        displaySearchResults(filteredRecipes);
    }
});

function displaySearchResults(recipeList) {

    content.innerHTML = `
        <button class="homeButton" onclick="showHome()">🏠 Home</button>
        <h2>Search Results</h2>
        <div id="recipeGrid"></div>
    `;

    const recipeGrid = document.getElementById("recipeGrid");

    if (recipeList.length === 0) {

        recipeGrid.innerHTML = "<p>No recipes found.</p>";
        return;

    }

    recipeList.forEach(recipe => {

        const card = document.createElement("div");

        card.className = "recipeCard";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
        `;

        // Make the entire card clickable
        card.onclick = () => openRecipe(recipe.title);

        recipeGrid.appendChild(card);

    });

}