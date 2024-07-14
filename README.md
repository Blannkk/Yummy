Yummy
Yummy is a web project that provides a user-friendly interface to search and view various meal recipes. Users can search for meals by name, letter, category, area, and ingredients. The project fetches data from TheMealDB API.

Features
Search by Name: Users can search for meals by entering the meal name.
Search by First Letter: Users can search for meals by entering the first letter of the meal.
Categories: Browse meals by various categories.
Area: Browse meals by their area of origin.
Ingredients: Browse meals by different ingredients.
Meal Details: Click on a meal to view detailed information including ingredients, instructions, area, category, and related tags.
Contact Form: A contact form for users to get in touch.
Technologies Used
HTML
CSS (Bootstrap for styling)
JavaScript (jQuery for DOM manipulation)
TheMealDB API for fetching meal data


Installation **

Clone the repository:
bash
Copy code
git clone https://github.com/your-username/yummy.git
Navigate to the project directory:
bash
Copy code
cd yummy
Open the index.html file in your web browser.
Project Structure
index.html: The main HTML file containing the structure of the web page.
css/: Directory containing CSS files for styling.
bootstrap.min.css: Bootstrap CSS file.
all.min.css: Font Awesome CSS file.
main.css: Custom CSS for additional styling.
images/: Directory for images used in the project.
js/: Directory containing JavaScript files.
jquery-3.7.1.min.js: jQuery library.
bootstrap.bundle.js: Bootstrap JavaScript file.
index.js: Custom JavaScript for handling interactions and fetching data from TheMealDB API.
Usage
Search Meals: Enter a meal name or letter in the search input fields to find meals.
View Meal Details: Click on a meal to view detailed information about it.
Browse Categories/Area/Ingredients: Click on the respective navigation link to browse meals by category, area, or ingredients.
Contact Us: Fill in the contact form and submit to get in touch.
Custom JavaScript Functions
getMatchedMeal(): Fetches meals based on the search input (name or letter).
getMealDetails(e): Fetches detailed information about a selected meal.
getCategories(): Fetches and displays meal categories.
getArea(): Fetches and displays meal areas.
getIngredients(): Fetches and displays meal ingredients.
getContact(): Displays the contact form.
truncateDescription(description, wordLimit): Truncates the description to a specified word limit.
License
This project is licensed under the MIT License.

Contact
For any inquiries, please contact your-email@example.com.

