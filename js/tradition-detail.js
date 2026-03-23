const API_URL = "./data/tradition.json";

const params = new URLSearchParams(location.search);
const category = params.get("category");
const id = params.get("id"); 

AOS.init({
  duration: 1000,
  once: true
});

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const items = data.filter(v => v.category === category);

    if (!items.length) {
      document.getElementById("detail-category-title").textContent = "전통문화";
      document.getElementById("detail-category-text").textContent = "선택한 카테고리의 데이터가 없습니다.";
      return;
    }

    document.getElementById("detail-category-title").textContent = items[0].krCategory;
    document.getElementById("detail-category-text").textContent = items[0].categoryText;

    const detailList = document.getElementById("detail-list");
    detailList.innerHTML = "";

    items.forEach((item, index) => {
      const div = document.createElement("div");

      div.id = "item" + (index + 1); 
      div.className = index % 2 === 1 ? "item reverse" : "item";

      div.innerHTML = `
        <div class="detail-text">
          <h3 class="detail-name" data-aos="fade" data-aos-duration="1500" data-aos-delay="600">
            ${item.name}
          </h3>
          <div class="info" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
            <div class="info-box">
              <h4>소개</h4>
              <p>${item.intro}</p>
            </div>
            <div class="info-box">
              <h4>역사</h4>
              <p>${item.history}</p>
            </div>
            <div class="info-box">
              <h4>관련지역 / 체험</h4>
              <p>${item.region}</p>
            </div>
          </div>
        </div>

        <div class="detail-thumb" data-aos="fade" data-aos-duration="1500" data-aos-delay="1000">
          <div class="thumb-grid">
            <img src="${item.img_url1}" alt="${item.name}">
            <img src="${item.img_url2}" alt="${item.name}">
            <img src="${item.img_url3}" alt="${item.name}">
            <img src="${item.img_url4}" alt="${item.name}">
          </div>
        </div>
      `;

      detailList.appendChild(div);
    });

    AOS.refreshHard();

   
    if (id) {
      const target = document.getElementById("item" + id);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 200);
      }
    }
  });

$(".return-btn").click(function () {
  location.href = "tradition-index.html";
});