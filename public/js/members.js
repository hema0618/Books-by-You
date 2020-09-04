$(document).ready(() => {

  $.get("/api/wishlist").then(function(data) {
    console.log(data);
    $(".display").text("");
    var iNeedChange = false;
    var jNeedChange = false;
    var index = 0;

    if (data.length < 12) {
        iNeedChange = true;
        if ((data.length % 4) > 0) {
            jNeedChange = true;
        }
    }

    for (var i = 0; i < 3; i++) {
        var display4 = `<div class="row">`;

        if (iNeedChange) {
            if (data.length < 5) {
                i = i + 2;
            } else if (data.length < 9) {
                i = i + 1;
            };
        };
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
                            <li class="list-group-item" id="submit"><button type="button" class="delete btn btn-link"><strong>Delete from Wishlist</strong></button></li>
                            ${buyable}`;

            display4 = display4 + result;
            if (i === 2 && jNeedChange) {
                console.log("j", j)
                j = (4 - (data.length % 4));
                jNeedChange = false;
                console.log("j", j)
            };

            if (j === 3) {
                $(".display").append(display4);
                console.log("append count", i);
            };
            index++;
        };
    };
  });

    $(document).on("click", ".delete", function(event){
      event.preventDefault();
      
    })  
});
