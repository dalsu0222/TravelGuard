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

    // 별의 위치를 결정하는 로직 수정
    let x, y;
    const edge = Math.random();
    if (edge < 0.25) {
      // 왼쪽 가장자리
      x = `${Math.random() * 20}%`;
      y = `${Math.random() * 100}%`;
    } else if (edge < 0.5) {
      // 오른쪽 가장자리
      x = `${80 + Math.random() * 20}%`;
      y = `${Math.random() * 100}%`;
    } else if (edge < 0.75) {
      // 위쪽 가장자리
      x = `${Math.random() * 100}%`;
      y = `${Math.random() * 20}%`;
    } else {
      // 아래쪽 가장자리
      x = `${Math.random() * 100}%`;
      y = `${80 + Math.random() * 20}%`;
    }

    star.style.left = x;
    star.style.top = y;

    star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);

    container.appendChild(star);
  }
}

// 문서가 로드된 후 별 생성 함수 호출
document.addEventListener("DOMContentLoaded", createStars);
