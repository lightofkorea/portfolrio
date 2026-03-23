/* const DATA_PATH = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/test"; */
const API_URL = "./data/foods.json";

let $grid;
let limit = 9;
let category = "*";
let keyword = "";

const noResult = document.querySelector(".no-result");

// 1. 데이터 호출 및 초기화
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    renderCards(data);
  });

function renderCards(data) {
  let html = "";
  data.forEach(item => {
    html += `
      <div class="food-card ${item.category}">
        <div class="card-inner">
          <a href="food-detail.html?id=${item.id}">
            <img src="${item.list_image_url}" alt="${item.name}" />
            <div class="info">
              <h3>${item.name}</h3>
              <p>${item.tagline}</p>
            </div>
          </a>
        </div>
      </div>`;
  });

  $(".food-list").html(html);

  // 모든 이미지가 로드된 후 Isotope 실행 (애니메이션 튐 방지)
  $(".food-list").imagesLoaded(() => {
    $grid = $(".food-list").isotope({
      itemSelector: ".food-card",
      layoutMode: "fitRows",
      transitionDuration: "0.6s",
      stagger: 30
    });
    updateLayout();
  });
}

// 2. 핵심 필터링 로직
function updateLayout() {
  if (!$grid) return;

  let count = 0;
  // 매번 새로운 필터 함수를 전달하여 Isotope 애니메이션 활성화
  const filterFn = function () {
    const name = $(this).find("h3").text().toLowerCase();
    const matchSearch = keyword === "" || name.includes(keyword);
    const matchCategory = category === "*" || $(this).hasClass(category);

    if (matchSearch && matchCategory && count < limit) {
      count++;
      return true;
    }
    return false;
  };

  $grid.isotope({ filter: filterFn });

  // 결과 없음 메시지 제어
  setTimeout(() => {
    const hasItems = $grid.data("isotope").filteredItems.length > 0;
    noResult.style.display = hasItems ? "none" : "block";
  }, 100);

  updateMoreButton();
}

// 3. 더보기 버튼 노출 제어
function updateMoreButton() {
  const totalItems = $(".food-card").filter(function () {
    const name = $(this).find("h3").text().toLowerCase();
    const matchSearch = keyword === "" || name.includes(keyword);
    const matchCategory = category === "*" || $(this).hasClass(category);
    return matchSearch && matchCategory;
  }).length;

  limit >= totalItems ? $(".more-btn").hide() : $(".more-btn").show();
}

// 4. 이벤트 핸들러
$(".more-btn").click(() => {
  limit += 9;
  updateLayout();
});

$(".tab li").click(function () {
  $(".tab li").removeClass("on");
  $(this).addClass("on");

  const filterValue = $(this).data("filter");
  category = filterValue === "all" ? "*" : filterValue;
  limit = 9;

  updateLayout();
  moveTabBg($(this));
});

$("#searchInput").on("keyup", function () {
  keyword = $(this).val().toLowerCase().trim();
  limit = 9;
  updateLayout();
});

function moveTabBg(el) {
  if (!el.length) return;
  $(".tab-bg").css({ left: el.position().left, width: el.outerWidth() });
}

// 5. URL Hash 변경 대응
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  keyword = "";
  $("#searchInput").val("");

  const $target = $(`.tab li[data-filter="${hash || 'all'}"]`);
  $target.addClass("on").siblings().removeClass("on");
  
  category = hash || "*";
  limit = 9;
  
  updateLayout();
  moveTabBg($target);
});

$(window).on('load', () => moveTabBg($(".tab li.on")));