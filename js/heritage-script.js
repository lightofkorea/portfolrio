/* const API_URL = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/heri"; */
const API_URL = "./data/heritage.json";

let $grid;
let limit = 12; 
let currentFilter = "*";
let keyword = "";

const noResult = document.querySelector(".no-result");

// 1. 데이터 가져오기
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    renderAll(data);
  });

// 2. 카드 그리기
function renderAll(data) {
  let html = "";
  data.forEach(item => {
    html += `
      <div class="item ${item.category}">
        <div class="card">
          <a href="heritage-detail.html?id=${item.id}">
            <img src="${item.list_image_url}" alt="${item.name}" />
            <div class="info">
              <h3>${item.name}</h3>
              <p>${item.tagline}</p>
            </div>
          </a>
        </div>
      </div>
    `;
  });

  $(".grid").html(html);

  // 이미지가 로드된 후 Isotope 초기화
  $(".grid").imagesLoaded(() => {
    $grid = $(".grid").isotope({
      itemSelector: ".item",
      layoutMode: "masonry",
      masonry: {
        columnWidth: ".item",
      },
      transitionDuration: "0.6s",
      stagger: 30,
    });

    update(); 

    moveTabBg($(".tab li.on"));
  });
}


function update() {
  if (!$grid) return;

  let count = 0;

  $grid.isotope({
    filter: function () {
      const name = $(this).find("h3").text().toLowerCase();
      const matchKeyword = keyword === "" || name.includes(keyword);
      const matchCategory = currentFilter === "*" || $(this).hasClass(currentFilter);

      if (matchKeyword && matchCategory && count < limit) {
        count++;
        return true;
      }
      return false;
    },
  });

  setTimeout(() => {
    const visibleCount = $grid.data("isotope").filteredItems.length;
    noResult.style.display = visibleCount === 0 ? "block" : "none";
  }, 100);
}

/* 무한 스크롤 */
$(window).on("scroll", function () {
  if (!$grid) return;

  const isBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - 300;

  if (isBottom) {
    const totalMatched = $(".item").filter(function () {
      const name = $(this).find("h3").text().toLowerCase();
      const matchKeyword = keyword === "" || name.includes(keyword);
      const matchCategory = currentFilter === "*" || $(this).hasClass(currentFilter);
      return matchKeyword && matchCategory;
    }).length;

    if (limit < totalMatched) {
      limit += 8;
      update();
    }
  }
});


$(".tab li").click(function () {
  $(this).addClass("on").siblings().removeClass("on");


  moveTabBg($(this));

  const filterValue = $(this).data("filter");
  currentFilter = filterValue === "all" ? "*" : filterValue;

  limit = 12;
  update();
});

// 탭 배경 이동 함수
function moveTabBg(el) {
  if (!el || el.length === 0) return;

  // jQuery의 position()은 부모(.tab) 기준 좌표를 가져옵니다.
  $(".tab-bg").css({
    left: el.position().left,
    width: el.outerWidth(),
  });
}

//  브라우저 크기 변할 때 배경 위치 재조정
$(window).resize(function () {
  moveTabBg($(".tab li.on"));
});

$("#searchInput").on("keyup", function () {
  keyword = $(this).val().toLowerCase().trim();
  limit = 12;
  update();
});
