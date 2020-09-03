$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });

  $.get("/api/wishlist").then(function(data) {
    console.log(data);
    $(".display").text("")
    var result = `<div class="column">
    <div class="card">
    <img class="card-img-top" src="${data.card_img}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title" id="card-title">${data.title}</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="author"><strong>Author(s): </strong> ${data.author}</li>
            <li class="list-group-item" id="pageCount"><strong>Page Count:</strong> ${data.page_count}</li>
            <li class="list-group-item"  id="rating"><strong>Rating: </strong>${data.rating}</li>
            <li class="list-group-item" id="submit"><button type="button" class="delete btn btn-link"><strong>Delete from Wishlist</strong></button></li>
            ${purchasable}`
    data.forEach($(".display").text())
  })

  
  
});
