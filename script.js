// Setting up the Variables
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");


//setting up the listener
bars.addEventListener("click", barClicked, false);


//setting up the clicked Effect
function barClicked() {
  bars.classList.toggle('active');
  nav.classList.toggle('visible');
}



// Recipe data storage
const recipes = [
    {
        name: "Biryani",
        image: "https://media.istockphoto.com/id/501150349/photo/chicken-biryani-11.jpg?s=612x612&w=0&k=20&c=w6mDnUx8MnH3rnP9bR0VfWRwrODcbTz-6U07o3Zrs4o=",
        description: "A flavorful and aromatic rice dish with spices, meat, or vegetables.",
        long_description: "Biryani is a popular Indian dish known for its fragrant and flavorful preparation. It consists of long-grain rice cooked with a blend of aromatic spices, saffron, and either meat (such as chicken, mutton, or fish) or vegetables. Biryani is typically garnished with fried onions and served with raita or salad."
    },
    {
        name: "Butter Chicken",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZqjYWLr_kG8hByBLCPk5co5ucyT10ThBnsg&usqp=CAU",
        description: "Creamy and rich chicken curry cooked in a tomato-based sauce.",
        long_description: "Butter Chicken, also known as Murgh Makhani, is a creamy and indulgent Indian curry. Tender pieces of chicken are marinated in a mixture of yogurt and spices, then simmered in a luscious tomato-based gravy enriched with butter and cream. It's often enjoyed with naan or rice."
    },
    {
        name: "Paneer Tikka",
        image: "https://geekrobocook.com/wp-content/uploads/2021/03/6.-Paneer-Tikka.jpg",
        description: "Skewered and grilled cubes of paneer (Indian cottage cheese) with spices.",
        long_description: "Paneer Tikka is a popular vegetarian appetizer in India. Cubes of paneer are marinated in a mixture of yogurt and aromatic spices, then skewered and grilled until they develop a smoky and charred flavor. It's typically served with mint chutney and onion rings."
    },
    {
        name: "Chole Bhature",
        image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/6479819fd07f76c46875e905/webp/chole-bhature.webp",
        description: "Spicy chickpea curry served with deep-fried bread (bhature).",
        long_description: "Chole Bhature is a North Indian dish that combines spicy chickpea curry (chole) with deep-fried bread (bhature). The chickpea curry is prepared with a blend of spices, tomatoes, and onions, while the bhature is made from fermented dough. It's a hearty and satisfying meal often enjoyed for breakfast or lunch."
    },
    {
        name: "Tandoori Chicken",
        image: "https://www.cubesnjuliennes.com/wp-content/uploads/2022/12/Tandoori-Chicken-Recipe.jpg",
        description: "Marinated chicken cooked in a tandoor (clay oven) for a smoky flavor.",
        long_description: "Tandoori Chicken is a classic Indian dish known for its smoky and charred flavor. Chicken pieces are marinated in a mixture of yogurt and tandoori spices, then cooked in a tandoor (clay oven) at high temperatures. The result is tender and flavorful chicken with a vibrant red color."
    },
    {
        name: "Samosa",
        image: "https://myfoodstory.com/wp-content/uploads/2021/08/Punjabi-Samosa-2.jpg",
        description: "Crispy pastry filled with spiced potatoes and peas.",
        long_description: "Samosa is a popular Indian snack or appetizer. It features a crispy pastry shell filled with a flavorful mixture of spiced potatoes, peas, and sometimes, other ingredients like minced meat. Samosas are deep-fried to perfection and served with chutneys."
    }
    
];



// Function to add a recipe
function addRecipe(name, image, description, long_description) {
    const recipe = { name, image, description, long_description };
    recipes.push(recipe);

    // Display the newly added recipe
    displayRecipe(recipe);
}





// Function to display a single recipe
function displayRecipe(recipe) {
    const recipeList = document.getElementById("recipe-list");
    
    // Create a new row div for every three recipes
    if (recipeList.childElementCount % 3 === 0) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        recipeList.appendChild(rowDiv);
    }

    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("col-lg-4", "col-md-6", "mb-4", "first"); // Bootstrap classes for responsive layout

    const recipeCard = document.createElement("div");
    recipeCard.classList.add("card", "second");

    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("recipe-delete-icon");
    deleteIcon.innerHTML = "&#10006;"; // X icon symbol
    deleteIcon.addEventListener("click", () => deleteRecipe(recipe)); // Attach deleteRecipe function

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;
    recipeImage.classList.add("card-img-top", "image-rec");

    const recipeCardBody = document.createElement("div");
    recipeCardBody.classList.add("card-body");

    const recipeName = document.createElement("h5");
    recipeName.classList.add("card-title");
    recipeName.textContent = recipe.name;

    const recipeDescription = document.createElement("p");
    recipeDescription.classList.add("card-text");
    recipeDescription.textContent = recipe.description;

    recipeCardBody.appendChild(deleteIcon); // Add delete icon to the card
    recipeCardBody.appendChild(recipeName);
    recipeCardBody.appendChild(recipeDescription);

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeCardBody);

    recipeDiv.appendChild(recipeCard);

    // Append the recipe to the last row
    const rows = recipeList.getElementsByClassName("row");
    const lastRow = rows[rows.length - 1];
    lastRow.appendChild(recipeDiv);
}



// Function to delete a recipe
function deleteRecipe(recipe) {
    const recipeIndex = recipes.indexOf(recipe);
    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1); // Remove the recipe from the array
        refreshRecipeList(); // Refresh the displayed recipe list
    }
}




// Function to filter and display recipes based on search input
function searchRecipes(searchTerm) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Clear the current recipe list
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    // Display the filtered recipes
    filteredRecipes.forEach(displayRecipe);
}



// Add an event listener to the search input
const recipeSearchInput = document.getElementById("recipe-search");
recipeSearchInput.addEventListener("input", function () {
    const searchTerm = recipeSearchInput.value.trim();
    searchRecipes(searchTerm);
});


// Function to refresh the displayed recipe list after deletion
function refreshRecipeList() {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear the recipe list

    // Redisplay all recipes
    recipes.forEach(displayRecipe);
}




// Event listener for the recipe form submission
const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const recipeName = document.getElementById("recipe-name").value;
    const recipeImage = document.getElementById("recipe-image").value;
    const recipeDescription = document.getElementById("recipe-description").value;
    const recipelong_Description = document.getElementById("recipe-long_discription").value;

    if (recipeName && recipeImage && recipeDescription && recipelong_Description) {
        addRecipe(recipeName, recipeImage, recipeDescription, recipelong_Description);
        recipeForm.reset();
    }
});



// // Function to display a recipe in a popup
// function displayRecipePopup(recipe) {
//     const popup = document.createElement("div");
//     popup.classList.add("recipe-popup");

//     const popupContent = document.createElement("div");
//     popupContent.classList.add("recipe-popup-content");

//     const popupCloseButton = document.createElement("span");
//     popupCloseButton.classList.add("recipe-popup-close");
//     popupCloseButton.innerHTML = "&#10006;"; // X icon symbol
//     popupCloseButton.addEventListener("click", () => {
//         document.body.removeChild(popup);
//     });

//     const recipeTitle = document.createElement("h2");
//     recipeTitle.textContent = recipe.name;

//     const recipeDescription = document.createElement("p");
//     recipeDescription.textContent = recipe.long_discription;

//     popupContent.appendChild(popupCloseButton);
//     popupContent.appendChild(recipeTitle);
//     popupContent.appendChild(recipeDescription);

//     popup.appendChild(popupContent);
//     document.body.appendChild(popup);
// }


// // Add an event listener to display the recipe popup when a recipe heading is clicked
// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("card-title")) {
//         console.log("clicked");
//         const recipeName = event.target.textContent;
//         const recipe = recipes.find(r => r.name === recipeName);
//         if (recipe) {
//             displayRecipePopup(recipe);
//         }
//     }
// });



// Function to display the recipe details in a popup
function displayRecipePopup(recipeName) {
    // Find the recipe that matches the clicked name
    const recipe = recipes.find(r => r.name === recipeName);

    if (recipe) {
        // Extract data from the recipe object
        const imageUrl = recipe.image;
        const recipeLongDescription = recipe.long_description;

        // Create the popup content
        const popupContent = document.createElement("div");
        popupContent.classList.add("recipe-popup-content");

        // Create the close button
        const popupCloseButton = document.createElement("span");
        popupCloseButton.classList.add("recipe-popup-close");
        popupCloseButton.innerHTML = "&#10006;"; // X icon symbol
        popupCloseButton.addEventListener("click", () => {
            document.body.removeChild(popupContent);
        });

        // Create and set the recipe image
        const recipeImage = new Image();
        recipeImage.src = imageUrl;
        recipeImage.alt = recipeName;

        // Create and set the recipe title
        const recipeTitle = document.createElement("h2");
        recipeTitle.textContent = recipeName;

        // Create and set the recipe long description
        const recipeLongDescriptionElement = document.createElement("p");
        recipeLongDescriptionElement.textContent = recipeLongDescription;

        // Append elements to the popup content
        popupContent.appendChild(popupCloseButton);
        popupContent.appendChild(recipeImage);
        popupContent.appendChild(recipeTitle);
        popupContent.appendChild(recipeLongDescriptionElement);

        // Add the popup content to the document body
        document.body.appendChild(popupContent);
    }
}

// Add an event listener to the document to delegate the click event
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-title")) {
        const recipeName = event.target.textContent;
        displayRecipePopup(recipeName);
    }
});




// Initialize the app by displaying existing recipes (including pre-recipes)
recipes.forEach(displayRecipe);
