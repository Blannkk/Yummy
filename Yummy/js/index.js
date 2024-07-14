$(document).ready(function () {
  $("#open-close").on("click", function () {
    $(".sidenav").toggleClass("open");
    updateIcon();
  });



  $("#search").on("click", function () {
    $("#search-box").removeClass("d-none");
    $("#recipes-data").addClass("d-none");
  });

  $("#search-name").on("input", function () {
    getMatchedMeal();
  });
  $("#search-letter").on("input", function () {
    getMatchedMeal();
  });



  async function getMatchedMeal() {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const nameUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
      const letterUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
      const meal = $("#search-name").val();
      const letter = $("#search-letter").val();
      let response;
      if (meal) {
        response = await fetch(`${nameUrl}${meal}`);
      } else if (letter) {
        response = await fetch(`${letterUrl}${letter}`);
      }
      const data = await response.json();
      let recipes = data.meals;
      let bBox = '';
      if (recipes) {
        for (let i = 0; i < recipes.length; i++) {
          const element = recipes[i];
          bBox += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor text-white" data-id="${element.idMeal}">
                    <img src="${element.strMealThumb}" class="img-fluid rounded-3" alt="${element.strMeal}" />
                    <div class="layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                      <h3>${element.strMeal}</h3>
                    </div>
                   </div>`;
        }
        $('#recipes-data').html(bBox);
        $("#recipes-data").removeClass("d-none");
      } else {

        $('#recipes-data').html('<p>No recipes found</p>');
      }
    } catch (error) {
      $('#recipes-data').html('<p>Error fetching recipes</p>');
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }
  $("#recipes-data").on("click", ".meal", function (e) {
    getMealDetails(e);
  });

  async function getMealDetails(e) {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const id = $(e.currentTarget).attr("data-id");


      if (!id) {
        console.error('No ID found for the selected meal.');
        $('.inner-loading-screen').fadeOut(1000);
        return;
      }

      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;


      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!data.meals) {
        throw new Error('No meal data found');
      }

      const meal = data.meals[0];


      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
      const tags = meal.strTags?.split(",");
      let bBox = "";
      if (meal) {
        bBox += ` <div class="col-md-4">
            <img
              src="${meal.strMealThumb}"
              class="img-fluid"
              alt=""
            />
            <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
              ${meal.strInstructions}
            </p>
            <h3>Area: ${meal.strArea}</h3>
            <h3>Category: ${meal.strCategory}</h3>
            <h3>Ingredients: </h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${ingredients.map(ing => `<li class="alert alert-info m-2 p-1">${ing}</li>`).join('')}
            </ul>
            <h3>Tags</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${tags ? tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('') : ''}
            </ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="https://www.youtube.com/watch?v=${meal.strYoutube.split('=')[1]}" class="btn btn-danger">YouTube</a>
          </div>`;
      }
      $("#recipes-data").html(bBox).removeClass("d-none");
    } catch (error) {
      console.error('Error fetching the meal:', error);
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }

  $(".sidenav .links li").on("click", function () {
    $(".sidenav").removeClass("open");
    updateIcon();
  });

  function updateIcon() {
    if ($(".sidenav").hasClass("open")) {
      $("#open-close").removeClass("fa-bars").addClass("fa-xmark"); // X icon
    } else {
      $("#open-close").removeClass("fa-xmark").addClass("fa-bars"); // Menu icon
    }
  }

  $("#Categories").on("click", function () {
    getCategories();
  });
  $("#Area").on("click", function () {
    getArea();
  });
  $("#Ingredients").on("click", function () {
    getIngredients();
  });

  $("#Contact").on("click", function () {
    getContact();
  });

  function getContact() {
    const bBox = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="name" type="text" class="form-control" placeholder="Enter Your Name" />
                        <div id="name-error" class="alert alert-danger w-100 mt-2 d-none">
                            Special characters and numbers not allowed
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="email" type="email" class="form-control" placeholder="Enter Your Email" />
                        <div id="email-error" class="alert alert-danger w-100 mt-2 d-none">
                            Email not valid *example@yyy.zzz
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phone" type="tel" class="form-control" placeholder="Enter Your Phone" />
                        <div id="phone-error" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid Phone Number
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="age" type="text" class="form-control" placeholder="Enter Your Age" />
                        <div id="age-error" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid age
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="password" type="password" class="form-control" placeholder="Enter Your Password" />
                        <div id="password-error" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="repassword" type="password" class="form-control" placeholder="Repassword" />
                        <div id="repassword-error" class="alert alert-danger w-100 mt-2 d-none">
                            Password does not match
                        </div>
                    </div>
                </div>
                <button disabled="true" id="submit-btn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div>`;

    $('#recipes-data').html(bBox);

    // Attach event listeners for validation
    $('#name').on('change', function () { validateInput(this, /^[a-zA-Z\s]+$/, '#name-error'); });
    $('#email').on('change', function () { validateInput(this, /^[^@\s]+@[^@\s]+\.[^@\s]+$/, '#email-error'); });
    $('#phone').on('change', function () { validateInput(this, /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, '#phone-error'); });
    $('#age').on('change', function () { validateInput(this, /^\d+$/, '#age-error'); }); // Assuming age should be a number
    $('#password').on('input', function () { validateInput(this, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '#password-error'); });
    $('#repassword').on('input', function () { matchPassword(this, '#password', '#repassword-error'); });

    // Validation function
    function validateInput(input, regex, errorSelector) {
      const value = $(input).val();
      if (regex.test(value)) {
        $(errorSelector).addClass('d-none');
      } else {
        $(errorSelector).removeClass('d-none');
      }
      validateForm();
    }

    // Match password function
    function matchPassword(input, passwordSelector, errorSelector) {
      const password = $(passwordSelector).val();
      const repassword = $(input).val();
      if (password === repassword && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(repassword)) {
        $(errorSelector).addClass('d-none');
      } else {
        $(errorSelector).removeClass('d-none');
      }
      validateForm();
    }

    // Form validation
    function validateForm() {
      const isValid =
        $('#name-error').hasClass('d-none') &&
        $('#email-error').hasClass('d-none') &&
        $('#phone-error').hasClass('d-none') &&
        $('#age-error').hasClass('d-none') &&
        $('#password-error').hasClass('d-none') &&
        $('#repassword-error').hasClass('d-none');
      $('#submit-btn').prop('disabled', !isValid);
    }
  }

  async function getIngredients() {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
      const data = await response.json();
      const meals = data.meals.slice(0, 20); // Get the first 20 ingredients
      let bBox = '';

      if (meals) {
        meals.forEach(element => {
          const truncatedDescription = truncateDescription(element.strDescription, 35);
          bBox += `<div class="col-md-3 ingredient position-relative overflow-hidden rounded-2 cursor text-white" data-name="${element.strIngredient}">
                    <div class="rounded-2 text-center cursor text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${element.strIngredient}</h3>
                        <p>${truncatedDescription}</p>
                    </div>
                 </div>`;
        });
      } else {

        $('#recipes-data').html('No ingredients found');
      }

      $('#recipes-data').html(bBox);

      // Attach click event to each ingredient item to fetch and display related recipes
      $('#recipes-data').on('click', '.ingredient', async function (e) {
        const ingredientName = $(this).attr("data-name");
        try {
          $('.inner-loading-screen').removeClass('d-none').fadeIn();
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
          const data = await response.json();
          const meals = data.meals;

          let bBox = '';
          if (meals) {
            meals.forEach(meal => {
              bBox += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor text-white" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-3" alt="${meal.strMeal}" />
                        <div class="layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                          <h3>${meal.strMeal}</h3>
                        </div>
                      </div>`;
            });
          } else {

            bBox = '<p>No recipes found for this ingredient</p>';
          }

          $('#recipes-data').html(bBox);

        } catch (error) {
          console.error(`Error fetching recipes for ingredient ${ingredientName}:`, error);
        } finally {
          $('.inner-loading-screen').fadeOut(1000);
        }
      });

    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }
  function truncateDescription(description, wordLimit) {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(' ') + '.';
  }

  async function getArea() {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const data = await response.json();
      const meals = data.meals;
      let bBox = '';

      if (meals) {
        meals.forEach(element => {
          bBox += `<div class="col-md-3 area position-relative overflow-hidden rounded-2 cursor text-white" data-name="${element.strArea}">
                    <div class="rounded-2 text-center cursor text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${element.strArea}</h3>
                    </div>
                 </div>`;
        });
      } else {

        bBox = '<p>No recipes found for this area</p>';
      }

      $('#recipes-data').html(bBox);

      // Attach click event to each area item to fetch and display related recipes
      $('#recipes-data').on('click', '.area', async function (e) {
        const areaName = $(this).attr("data-name");
        try {
          $('.inner-loading-screen').removeClass('d-none').fadeIn();
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
          const data = await response.json();
          const meals = data.meals;

          let bBox = '';
          if (meals) {
            meals.forEach(meal => {
              bBox += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor text-white" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-3" alt="${meal.strMeal}" />
                        <div class="layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                          <h3>${meal.strMeal}</h3>
                        </div>
                      </div>`;
            });
          } else {

            bBox = '<p>No recipes found for this area</p>';
          }

          $('#recipes-data').html(bBox);

        } catch (error) {
          console.error(`Error fetching recipes for area ${areaName}:`, error);
        } finally {
          $('.inner-loading-screen').fadeOut(1000);
        }
      });

    } catch (error) {
      console.error('Error fetching areas:', error);
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }
  async function getCategories() {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
      const categories = data.categories;

      let bBox = '';
      if (categories) {
        categories.forEach(category => {
          bBox += `<div class="col-md-3 category position-relative overflow-hidden rounded-2 cursor text-white" data-id="${category.strCategory}">
                    <img src="${category.strCategoryThumb}" class="img-fluid rounded-3" alt="${category.strCategory}" />
                    <div class="layer position-absolute d-flex flex-column align-items-center text-black p-2 rounded-3">
                      <h3>${category.strCategory}</h3>
                      <p>${category.strCategoryDescription}</p>
                    </div>
                  </div>`;
        });
      } else {

        bBox = '<p>No categories found</p>';
      }

      $('#recipes-data').html(bBox);

      // Attach click event to each category item to fetch and display related recipes
      $('#recipes-data').on('click', '.category', async function (e) {
        const categoryName = $(this).attr("data-id");
        try {
          $('.inner-loading-screen').removeClass('d-none').fadeIn();
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
          const data = await response.json();
          const meals = data.meals;

          let bBox = '';
          if (meals) {
            meals.forEach(meal => {
              bBox += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor text-white" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-3" alt="${meal.strMeal}" />
                        <div class="layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                          <h3>${meal.strMeal}</h3>
                        </div>
                      </div>`;
            });
          } else {

            bBox = '<p>No recipes found for this category</p>';
          }

          $('#recipes-data').html(bBox);

        } catch (error) {
          console.error(`Error fetching recipes for category ${categoryName}:`, error);
        } finally {
          $('.inner-loading-screen').fadeOut(1000);
        }
      });

    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }

  async function getRecipes(e) {
    $('.inner-loading-screen').removeClass('d-none').fadeIn();
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await response.json();
      const meals = data.meals;

      let bBox = '';
      if (meals) {
        meals.forEach(meal => {
          bBox += `<div class="col-md-3 meal position-relative overflow-hidden rounded-2 cursor text-white" data-id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-3" alt="${meal.strMeal}" />
                    <div class="layer position-absolute d-flex align-items-center text-black p-2 rounded-3">
                      <h3>${meal.strMeal}</h3>
                    </div>
                  </div>`;
        });
      } else {

        bBox = '<p>No meals found</p>';
      }

      $('#recipes-data').html(bBox);

      // Attach click event to each meal item to display details
      $('#recipes-data').on('click', '.meal', function (e) {
        getMealDetails(e);
      });

    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      $('.inner-loading-screen').fadeOut(1000);
    }
  }

  getRecipes(); // Fetch recipes on page load
});
