$(document).ready(() => {

getBooks();

function getBooks(){
  $.get("/api/wishlist").then(function(data) {
    if(!data[0]){
      $(".display").text("")
      return;
    };

    console.log("data: ", data);
    $(".display").text("");
    var jNeedChange = false;
    var index = 0;

    if ((data.length % 4) > 0) {
        console.log("Data.length%4=",(data.length % 4));
        jNeedChange = true;
        console.log(jNeedChange);
    }

    console.log("for loop i comparison:",Math.ceil(data.length/4))

    for (var i = 0; i < Math.ceil(data.length/4); i++) {
        var display4 = `<div class="row">`;

        for (var j = 0; j < 4; j++) {

          var image = data[index].card_img;

          var title = data[index].title;

          var author = data[index].author;

          var pageCount = data[index].page_count;

          var rating = data[index].rating;

          var description = data[index].description;

          var price = data[index].price;

          var buyLink = "";
          if(data[index].buy_link){
            buyLink = data[index].buy_link;
          };

          if(data[index].buy_link){
            var buyable = `<li class="list-group-item"><a href="${buyLink}" class="card-link">${price}</a></li>
            </ul>
            <details>
                <summary><strong>Description</strong></summary>
                <p class="card-text">${description}</p>
            </details>
        </div>
    </div>
</div>`
          } else {
           var buyable = `<li class="list-group-item">Not For Sale</li>
                </ul>
                <details>
                    <summary><strong>Description</strong></summary>
                    <p class="card-text">${description}</p>
                </details>
            </div>    
        </div>
    </div>`
          };

            const result = `<div class="column">
                    <div class="card">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title" id="card-title">${title}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="author"><strong>Author(s): </strong> ${author}</li>
                            <li class="list-group-item" id="pageCount"><strong>Page Count:</strong> ${pageCount}</li>
                            <li class="list-group-item"  id="rating"><strong>Rating: </strong>${rating}</li>
                            <li class="list-group-item ${data[index].id}" id="submit"><button type="button" class="delete btn btn-link"><strong>Delete from Wishlist</strong></button></li>
                            ${buyable}`;

            display4 = display4 + result;
            if (i === (Math.ceil(data.length/4)-1) && jNeedChange) {
                j = (4 - (data.length % 4));
                jNeedChange = false;
            };

            if (j === 3) {
                $(".display").append(display4);
                console.log("append count", i);
            };
            index++;
        };
    };
  });
}

    $(document).on("click", ".delete", function(event){
      event.preventDefault();
      console.log("click works delete");
      var deleteId = $(this).parent().attr("class").trim().split(" ")[1];
      deleteId = parseInt(deleteId);
      $.ajax({
        method: "DELETE",
        url: "/api/wishlist/" + deleteId
      })
        .then(getBooks);
    });

    $(document).on("click", ".deleteAll", function(event){
      event.preventDefault();
      console.log("delete All click");
      $.ajax({
        method: "DELETE",
        url: "/api/wishlist"
      })
        .then(getBooks);
    });
});
