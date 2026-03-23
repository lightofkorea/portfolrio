
/* now 슬라이드 */
var nowSwiper = new Swiper(".swiper.now", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  centeredSlides: false,
  slidesPerGroup: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  
  breakpoints: {
  0: {
    slidesPerView: 1,
    spaceBetween: 12,
  },
  431: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
}
});


const modal = document.getElementById("videoModal");
const video = document.getElementById("popupVideo");
const closeBtn = document.querySelector(".close-btn");

// 모달 열기
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", function(e) {

    e.preventDefault();

    const videoSrc = this.dataset.video;

    video.src = videoSrc;

    modal.style.display = "flex";
    document.body.classList.add("modal-open"); // 스크롤 막기

    video.play();

  });
});

/* 모달 닫기  */
function closeModal(){
  modal.style.display = "none";
  document.body.classList.remove("modal-open"); 

  video.pause();
  video.currentTime = 0;
  video.src = "";
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closeModal();
  }
});

modal.addEventListener("click", function(e){
  if(e.target === modal){
    closeModal();
  }
});

/* 갤러리 */
$(document).ready(function () {

  $(".thumb").click(function () {

    const newImg = $(this).find("img").attr("src");
    const newCate = $(this).find(".data-cate").text();
    const newTitle = $(this).find(".data-title").text();
    const newDesc = $(this).find(".data-desc").html();

    const main = $(".gallery-main");

    main.stop().fadeOut(200, function () {

      $("#mainImg").attr("src", newImg);
      $("#mainCate").text(newCate);
      $("#mainTitle").text(newTitle);
      $("#mainDesc").html(newDesc);

      main.fadeIn(250);

    });

    $(this).addClass("active").siblings().removeClass("active");

  });


  $(".gallery-tab li").click(function () {

    const tabName = $(this).data("name");

    $(".thumb").each(function () {
      if ($(this).data("name") === tabName) {
        $(this).trigger("click");
      }
    });

  });

  $(".thumb").eq(0).trigger("click");

});

/* explore 슬라이드 */
var swiper = new Swiper(".exploreview", {
  watchSlidesProgress: true,

  slidesPerView: 3,
  spaceBetween: 60,
  loop: true,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  
  breakpoints: {
  0: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  431: {
    slidesPerView: 3,
    spaceBetween: 60,
  },
}
});

