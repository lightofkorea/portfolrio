/* const DATA_PATH = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/test"; */
const API_URL = "./data/foods.json";

$(function () {
  const id = new URLSearchParams(location.search).get("id");

  $.getJSON(API_URL, function (foods) {
    const food = foods.find(f => f.id == id);
    if (!food) return;

    $("#foodImage").attr("src", food.detail_image_url);
    $("#foodCategory").text(food["kr-category"]);
    $("#foodName").text(food.name);
    $("#foodTagline").text(food.tagline);
    $("#foodIntro").text(food.intro);
    $("#foodHistory").text(food.history);
    $("#ingredientList").text(food.ingredient);
    $("#pairingList").text(food.pairing);
    $("#regionList").text(food.region);
  });
});

$(".return, .list-return").click(function () {
  location.href = "food-index.html";
});
