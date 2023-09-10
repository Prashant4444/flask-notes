$(document).ready(function () {
  $("#toggleLayoutButton").click(function () {
    $(".layout_id").toggleClass("col-6 col-12");
});


  $("#scrollToTopBtn").click(function () {
    $("#add_note_container").addClass("display");
  });

  $(".colors").click(function () {
    $(".colors").removeClass("border_circle");
    $(this).addClass("border_circle");
  });

  $("#draw").click(function () {
    $("#draw_cont").addClass("display");
  });

  $("#close_note").click(function () {
    $("#add_note_container").removeClass("display");
    $("#draw_cont").removeClass("display");
  });
  $("#close_draw").click(function () {
    $("#draw_cont").removeClass("display");
  });

  $(".notes_card").click(function () {
    $(".popup-container").addClass("display");

    $(".popup-btn").click(function () {
      $(".popup-menu").toggle();
    });

    $(".popup-item").click(function () {
      $(".popup-menu").hide();
    });

    $(document).click(function (event) {
      if (!$(event.target).closest(".popup-container").length) {
        $(".popup-menu").hide();
      }
    });

    const sno = $(this).attr("id");
    const title = $(this).find(".title").text();
    const snippet = $(this).find(".snippet").attr("data");
    const time = $(this).find(".time").text();

    $("#rightColTitle").text(title);
    $("#rightColSnippet").text(snippet);
    $("#rightColTime").text(time);

    $("#updateButton").attr("href", `./update/${sno}`);
    $("#deleteButton").attr("href", `./delete/${sno}`);

    $(".popup-btn").show();
  });

  $(".popup-btn").hide();

  const randomNumber = Math.floor(Math.random() * 5) + 1;
  const backgroundImageName = `wallpaper_${randomNumber}.jpg`;

  const css = `
    .right_col::before {
      content: "";
      background-image: url('../static/${backgroundImageName}');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 2rem;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.25;
      pointer-events: none;
    }
  `;

  const styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.appendChild(document.createTextNode(css));

  document.head.appendChild(styleElement);
});

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
let drawing = false;
let erasing = false;

// Function to set canvas size based on screen width
function setCanvasSize() {
  if (window.innerWidth <= 768) { // Change 768 to your desired breakpoint
    canvas.width = 250; // Set the canvas width for small screens
    canvas.height = 250; // Set the canvas height for small screens
  } else {
    canvas.width = 525; // Set the canvas width for larger screens
    canvas.height = 275; // Set the canvas height for larger screens
  }
}

// Initial canvas size setup
setCanvasSize();

context.lineWidth = 2;
context.strokeStyle = "black";

canvas.addEventListener("mousedown", () => {
  drawing = true;
  context.beginPath();
});

// Event listener for window resize
window.addEventListener("resize", () => {
  setCanvasSize(); // Adjust canvas size when the window is resized
});


canvas.addEventListener("mousemove", (event) => {
  if (!drawing && !erasing) return;

  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;

  if (erasing) {
    context.clearRect(x - 10, y - 10, 20, 20); // Adjust eraser size as needed
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  erasing = false;
  context.closePath();
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
  erasing = false;
  context.closePath();
});

const eraserButton = document.getElementById("eraser");
const redColorButton = document.getElementById("redColor");
const greenColorButton = document.getElementById("greenColor");
const blueColorButton = document.getElementById("blueColor");
const blackColorButton = document.getElementById("blackColor");

eraserButton.addEventListener("click", () => {
  erasing = true;
});

redColorButton.addEventListener("click", () => {
  context.strokeStyle = "red";
});

greenColorButton.addEventListener("click", () => {
  context.strokeStyle = "green";
});

blueColorButton.addEventListener("click", () => {
  context.strokeStyle = "blue";
});

blackColorButton.addEventListener("click", () => {
  context.strokeStyle = "black";
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const notes = document.querySelectorAll(".notes_card");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    notes.forEach(function (note) {
      const title = note.querySelector(".title").textContent.toLowerCase();
      const snippet = note.querySelector(".snippet").textContent.toLowerCase();

      if (title.includes(query) || snippet.includes(query)) {
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
    });
  });
});

const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", (event) => {
  const newColor = event.target.value;
  document.documentElement.style.setProperty("--theme-color", newColor);
});

