function createStars() {
  const container = document.createElement("div");
  container.className = "stars";
  document.body.appendChild(container);

  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);

    container.appendChild(star);
  }
}

// 문서가 로드된 후 별 생성 함수 호출
document.addEventListener("DOMContentLoaded", createStars);
