const content = document.getElementById("content");

function showHome() {
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
    const filteredRecipes = recipes.filter(recipe =>
        recipe.category === category
    );

    displayRecipes(filteredRecipes, category);
}

function openRecipe(title) {

    const recipe = recipes.find(r => r.title === title);

    if (!recipe) {
        content.innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    content.innerHTML = `
        <div id="recipeNavigation"></div>

        <h1>${recipe.title}</h1>

        <h2>Ingredients</h2>
        ${renderIngredients(recipe)}

        <h2>Directions</h2>
        ${renderInstructions(recipe)}
    `;

    const nav = document.getElementById("recipeNavigation");

    const homeButton = document.createElement("button");
    homeButton.className = "homeButton";
    homeButton.textContent = "🏠 Home";
    homeButton.onclick = showHome;

    const backButton = document.createElement("button");
    backButton.className = "homeButton";
    backButton.textContent = `← ${recipe.category}`;
    backButton.onclick = () => showCategory(recipe.category);

    nav.appendChild(homeButton);
    nav.appendChild(backButton);
}

function renderIngredients(recipe) {

    if (typeof recipe.ingredients[0] === "object") {

        return `
            <div class="ingredientGrid">
                ${recipe.ingredients.map(section => `
                    <div class="ingredientSection">
                        <h3>${section.section}</h3>
                        <ul>
                            ${section.items.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
        `;
    }

    return `
        <div class="ingredientGrid">
            <div class="ingredientSection">
                <ul>
                    ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}


function renderInstructions(recipe) {

    if (typeof recipe.instructions[0] === "object") {

        return `
            <div class="instructionGrid">
                ${recipe.instructions.map(section => `
                    <div class="instructionSection">
                        <h3>${section.section}</h3>
                        <ol>
                            ${section.steps.map(step => `<li>${step}</li>`).join("")}
                        </ol>
                    </div>
                `).join("")}
            </div>
        `;
    }

    return `
        <div class="instructionGrid">
            <div class="instructionSection">
                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
                </ol>
            </div>
        </div>
    `;
}

function displayRecipes(recipeList, title) {

    content.innerHTML = `
        <button class="homeButton" onclick="showHome()">🏠 Home</button>
        <h2>${title}</h2>
        <div id="recipeGrid"></div>
    `;

    const recipeGrid = document.getElementById("recipeGrid");

    if (recipeList.length === 0) {
        recipeGrid.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    [...recipeList]
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(recipe => {
            recipeGrid.appendChild(createRecipeCard(recipe));
        });
}

function createRecipeCard(recipe) {

    const card = document.createElement("div");

    card.className = "recipeCard";

    card.innerHTML = `
        <h3>${recipe.title}</h3>
    `;

    card.onclick = () => openRecipe(recipe.title);

    return card;
}