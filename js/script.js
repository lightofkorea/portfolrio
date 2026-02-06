const circle = document.querySelector('#circle');
const articles = document.querySelectorAll("article");
console.log(articles); //nodeList(8)

/* 
  - animationPlayState: css 애니메이션을 재생 또는 멈춤 상태를 제어하는 속성
  - 멈춤: paused / 재생: running
*/
for (let article of articles) {
    console.log(article)

    article.addEventListener('mouseenter', function() {
        circle.style.animationPlayState = 'paused'
    })
    article.addEventListener('mouseleave', function() {
        circle.style.animationPlayState = 'running'
    })
}