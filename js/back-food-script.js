const API_URL = "https://69a843a637caab4b8c6138b7.mockapi.io/api/v1/test";

let allData = [];
let currentPage = 1;
const itemsPerPage = 12;

let $grid;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {

    allData = data;

    render();

  });

function render(){

  const start = (currentPage-1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageData = allData.slice(start,end);

  let html = "";

  pageData.forEach(food => {

    html += `
      <div class="food-card ${food.category}">
        <div class="card-inner">

          <a href="detail-food.html?id=${food.id}">

            <img src="${food.list_image_url}" />

            <h3>${food.name}</h3>

            <p>${food.tagline}</p>

          </a>

        </div>
      </div>
    `;

  });

  document.querySelector(".food-list").innerHTML = html;

  $grid = $(".food-list").isotope({
    itemSelector: ".food-card",
    layoutMode: "fitRows"
  });

  renderPagination();

}

/* 탭 */
$(".tab li").click(function(){

  $(".tab li").removeClass("on");
  $(this).addClass("on");

  const filter = $(this).data("filter");

  if(filter === "all"){
    $grid.isotope({ filter: "*" });
  }else{
    $grid.isotope({ filter: "." + filter });
  }

});

/* 검색 */
$("#searchInput").on("keyup", function(){

  const keyword = $(this).val().toLowerCase();

  $grid.isotope({
    filter:function(){

      const name = $(this).find("h3").text().toLowerCase();

      return name.includes(keyword);

    }
  });

});

/* 페이지네이션 */
function renderPagination(){

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  let html = "";

  html += `<button onclick="changePage(1)"><<</button>`;

  for(let i=1;i<=totalPages;i++){

    html += `<button onclick="changePage(${i})">${i}</button>`;

  }

  html += `<button onclick="changePage(${totalPages})">>></button>`;

  document.querySelector(".pagination").innerHTML = html;

}

function changePage(page){

  currentPage = page;

  render();

}