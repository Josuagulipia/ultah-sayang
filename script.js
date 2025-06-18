let currentPage = 1;

function goToPage(pageNum) {
  const totalPages = 6;
  if (pageNum < 1 || pageNum > totalPages) return;

  document.getElementById(`page${currentPage}`).classList.remove("active");
  currentPage = pageNum;
  document.getElementById(`page${currentPage}`).classList.add("active");

  if (currentPage === 3) startConfetti();
}

function goToForm() {
  goToPage(2);
}

// Tangani form input
document
  .getElementById("birthdayForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const usia = document.getElementById("usia").value;
    const harapan = document.getElementById("harapan").value;

    document.getElementById(
      "greeting"
    ).innerText = `Selamat Ulang Tahun, ${nama}! 🎉`;
    document.getElementById(
      "wishMessage"
    ).innerText = `Hari ini kamu genap berusia ${usia} tahun. Semoga harapanmu "${harapan}" bisa segera tercapai ya!`;

    goToPage(3);
  });

function replyViaWA() {
  const nama = document.getElementById("nama").value || "Aku";
  const message = encodeURIComponent(
    `Hai! Aku ${nama}. Aku mau dong hadiahnya! 🥰`
  );
  window.open(`https://wa.me/?text=${message}`, "_blank");
}

// Confetti setup
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function startConfetti() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 50,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.1,
      tiltAngle: 0,
    });
  }
  animateConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt + p.r);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;

    if (p.y > canvas.height) {
      particles[i].y = -10;
      particles[i].x = Math.random() * canvas.width;
    }
  }
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

// Auto-play musik saat tombol ditekan
document.getElementById("startBtn").addEventListener("click", function () {
  const music = document.getElementById("bgMusic");
  if (music.paused) {
    music.play().catch((e) => {
      console.log("Autoplay ditolak, user harus interaksi dulu:", e);
    });
  }
});
