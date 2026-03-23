/* const API_URL = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/heri"; */
const API_URL = "./data/heritage.json";

const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const item = data.find(v => v.id == id);

    if (!item) return;

    document.getElementById("detail-category").textContent = item["kr-category"];
    document.getElementById("detail-name").textContent = item.name;
    document.getElementById("detail-tagline").textContent = item.tagline;
    document.getElementById("detail-intro").textContent = item.intro;
    document.getElementById("detail-history").textContent = item.history;
    document.getElementById("g1").src = item.gallery_1;
    document.getElementById("g2").src = item.gallery_2;
    document.getElementById("g3").src = item.gallery_3;
    document.getElementById("g4").src = item.gallery_4;

    const exp = document.getElementById("experience");
    exp.innerHTML = "";

    const list = [
      item.experience_1,
      item.experience_2,
      item.experience_3,
      item.experience_4
    ];

    list.forEach(v => {
      if (v) {
        const li = document.createElement("li");
        li.textContent = v;
        exp.appendChild(li);
      }
    });

    document.getElementById("location").textContent = item.location;
  })
  .catch(err => console.error(err));

$(".return").click(function () {
  location.href = "heritage-index.html";
});
