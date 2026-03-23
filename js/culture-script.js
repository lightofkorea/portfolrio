/* kpop 슬라이드 */
var kpopSwiper = new Swiper(".swiper.k-pop", {
  slidesPerView: 3,
  spaceBetween: 80,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".kpop-next",
    prevEl: ".kpop-prev",
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

/* 2번 스와이퍼 */
var swiper = new Swiper(".con-view", {
  spaceBetween: 30,
  centeredSlides: true,
  speed: 500,
  hashNavigation: {
    watchState: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const modal = document.getElementById("videoModal");
  const video = document.getElementById("popupVideo");
  const closeBtn = document.querySelector(".close-btn");

  // 자세히보기 버튼 클릭 시 모달 열기
  document.querySelectorAll(".con-view .swiper-slide .btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const slide = this.closest(".swiper-slide");
      const videoSrc = slide.dataset.video;

      if (!videoSrc) return;

      video.src = videoSrc;

      modal.style.display = "flex";
      document.body.classList.add("modal-open");

      video.play().catch(() => {});
    });
  });

  // 모달 닫기
  function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");

    video.pause();
    video.currentTime = 0;
    video.src = "";
  }

  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

window.addEventListener("load", function () {

  if (window.location.hash) {
    const hashName = window.location.hash.replace("#", "");
    const targetSlide = document.querySelector(`[data-hash="${hashName}"]`);

    if (targetSlide) {
      // [핵심] 슬라이드가 속한 섹션(k-content)으로 화면 먼저 이동
      // 해당 슬라이드를 감싸고 있는 가장 가까운 섹션이나 id가 있는 부모를 찾습니다.
      const targetSection = targetSlide.closest("#k-content") || targetSlide.closest("section");

      if (targetSection) {
        const offsetTop = targetSection.offsetTop;
        window.scrollTo({
          top: offsetTop - 100, // 헤더 높이만큼 여유 공간
          behavior: "smooth",
        });
      }

      // 스와이퍼를 해당 슬라이드로 이동 (setTimeout으로 안정성 확보)
      setTimeout(() => {

        const slideIndex = Array.from(targetSlide.parentNode.children).indexOf(targetSlide);
        swiper.slideToLoop(slideIndex, 0);
      }, 200);
    }
  }
});

// 슬라이드 넘길 때 주소창 튀는 현상 방지
swiper.on("slideChange", function () {
  if (window.location.hash) {
    history.replaceState(null, null, " ");
  }
});

