// Selecting elements
// -----
// console.log($("h1").css("color");
// $("h1").css("color", "red");
// $("button").css("color", "green");

// Manipulating styles
// -----
// $("h1").addClass("big-title margin-50");
// $("h1").text("Bye");

// Manipulating text
// -----
// $("button").text("Don't Click Me");
// $("button").html("<em> Hey </em>");

// Manipulating attributes
// -----
// $("a").attr("href", "https://www.yahoo.com");
// console.log($("h1").attr("class"));

// Adding event listeners
// -----
// $("button").click(function() {
//   $("h1").css("color", "blue");
// })

// $("input").keypress(function(event) {
//   console.log(event.key);
// });

// $(document).keypress(function(event) {
//   console.log(event.key);
//   $("h1").text(event.key);
// });

// $("h1").on("click", function() {
//   $("h1").css("color", "red");
// })


// Adding & removing elements
// -----
// $("h1").before("<button> New </button>");
// $("h1").after("<button> New </button>");
// $("h1").prepend("<button> New </button>");
// $("h1").append("<button> New </button>");

// $("button").remove();

// Animations
// -----

// $("button").click(function() {
//   $("h1").toggle();
// });

// $("button").click(function() {
//   $("h1").fadeToggle();
// });

// $("button").click(function() {
//   $("h1").slideToggle();
// });

$("button").click(function() {
  $("h1").animate({ opacity: 0.5 });
  $("h1").animate({ margin: "20%" });
  $("h1").slideUp().slideDown().animate({ opacity: 1 });
});
