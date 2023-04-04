document.querySelector(".signup-btn").addEventListener("click", () => {
  document.querySelector(".signup").classList.add("rotate-back");
  document.querySelector(".login").classList.add("rotate-front");
});

document.querySelector(".login-btn").addEventListener("click", () => {
  document.querySelector(".signup").classList.remove("rotate-back");
  document.querySelector(".login").classList.remove("rotate-front");
});

document.querySelectorAll(".pass-hide").forEach((element) => {
  element.addEventListener("click", () => {
    let inputField = document.getElementsByClassName(`${element.id}`);
    if (inputField[0].type === "password") {
      inputField[0].type = "text";
      element.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      inputField[0].type = "password";
      element.classList.replace("fa-eye", "fa-eye-slash");
    }
  });
});

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = [
  "#FF4858",
  "#1B7F79",
  "#00CCC0",
  "#72F2EB",
  "#3F7C85",
  "#FF5F5D",
];
// const colors = ['#fcc5e4', '#fda34b', '#ff7882', '#c8699e', '#7046aa', '#0c1db8', '020f75'];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.velocity = {
      dx,
      dy,
    };
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.filter = "blur(80px)";
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.velocity.dx = -this.velocity.dx;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.velocity.dy = -this.velocity.dy;
    this.x += this.velocity.dx;
    this.y += this.velocity.dy;

    this.draw();
  }
}

let circleArray = [];

function init() {
  circleArray = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let i = 0; i < 5; i++) {
    var radius = Math.random() * 50 + 50;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 9;
    var dy = (Math.random() - 0.5) * 9;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // c.fillStyle = "#fff";
  // c.fill();

  circleArray.forEach((e) => {
    e.update();
  });
}

init();
animate();
