

$(function () {

  const header = $("header");

  /* gnb hover */
  $(".gnb").mouseenter(function () {
    header.addClass("on");
  });

  header.mouseleave(function () {
    header.removeClass("on");
  });

  /* language */
  $(".lang > a").click(function (e) {
    e.preventDefault();
    $(".lang").toggleClass("active");

  });

});

/* 탭메뉴 이동 */
$(window).on("load", function () {

  const hash = window.location.hash.replace("#", "");

  if (hash) {

    const target = $(`.tab li[data-filter="${hash}"]`);

    if (target.length) {
      target.click();
    }
  }
});


// 같은 페이지에서 hash 변경될 때
$(window).on("hashchange", function () {

  const hash = window.location.hash.replace("#", "");

  if (hash) {

    const target = $(`.tab li[data-filter="${hash}"]`);

    if (target.length) {
      target.click();
    }
  }
});


/* 테마변경 */
const buttons = document.querySelectorAll(".color button[data-theme]");

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add("light");
}

// 테마 버튼 클릭
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;

    document.body.classList.remove("light", "dark", "mix");
    document.body.classList.add(theme);

    localStorage.setItem("theme", theme);
  });
});



/* BGM */
const bgm = document.getElementById("bgm");
const bgmButton = document.querySelector(".bgm-btn");

// 저장된 상태
let savedBgm = localStorage.getItem("bgm");
let savedTime = localStorage.getItem("bgmTime");

if (savedTime) {
  bgm.currentTime = savedTime;
}

if (savedBgm === "on") {
  bgm.play().catch(() => { });
}

bgm.addEventListener("timeupdate", () => {
  localStorage.setItem("bgmTime", bgm.currentTime);
});

// BGM 버튼
bgmButton.addEventListener("click", () => {

  if (bgm.paused) {
    bgm.play();
    localStorage.setItem("bgm", "on");
  } else {
    bgm.pause();
    localStorage.setItem("bgm", "off");
  }

});

/* 모바일 메뉴 */
const mobileMenuBtn = document.querySelector(".mobile-menu");
const gnb = document.querySelector(".gnb");
const gnbItems = document.querySelectorAll(".gnb > li");

if (mobileMenuBtn && gnb) {
  mobileMenuBtn.addEventListener("click", () => {
    gnb.classList.toggle("active");
    document.body.classList.toggle("modal-open");
  });
}

/* gnbItems.forEach((item) => {
  const link = item.querySelector(":scope > a");
  const depth = item.querySelector(".depth");

  if (link && depth) {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 430) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    });
  }
}); */

