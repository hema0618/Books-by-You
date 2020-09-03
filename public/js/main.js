


var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var API_KEY = "&92c13ca014msh69a5e7877c22b96p156eb2jsnfc551398d102";



$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    var title = $(".input").val().trim();
    var titleArr = title.split(" ");
    title = titleArr.join("+")
    var query = '%22' + title + '%22';
    search(query);
});

function search(title) {
    let titleURL = baseURL + title + API_KEY;
    console.log(titleURL);
    $.ajax({
        url: titleURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        display(response);
    });
}

function display(response) {
    $(".searchDisplay").text("");
    console.log(response.items.length);
    var iNeedChange = false;
    var jNeedChange = false;
    var index = 0;
    if (response.items.length < 12) {
        iNeedChange = true;
        if ((response.items.length % 4) > 0) {
            jNeedChange = true;
        }
    }
    for (var i = 0; i < 3; i++) {
        var display4 = `<div class="row">`;


        if (iNeedChange) {
            if (response.items.length < 5) {
                i = i + 2;
            } else if (response.items.length < 9) {
                i = i + 1;
            }
        }

        for (var j = 0; j < 4; j++) {

            // creates variables to hold a placeholder info, if the info exists the placeholder is replaced with it
            var image = "https://placehold.it/500&text=n/a";
            if (response.items[index].volumeInfo.imageLinks) {
                image = response.items[index].volumeInfo.imageLinks.thumbnail;
            };

            var title = "n/a";
            if (response.items[index].volumeInfo.title) {
                title = response.items[index].volumeInfo.title;
            };
            var subtitle = "";
            if (response.items[index].volumeInfo.subtitle) {
                subtitle = ", " + response.items[index].volumeInfo.subtitle;
            }

            var author = "n/a"
            if (response.items[index].volumeInfo.authors) {
                author = response.items[index].volumeInfo.authors;
            };

            var pageCount = "n/a"
            if (response.items[index].volumeInfo.pageCount) {
                pageCount = response.items[index].volumeInfo.pageCount;
            };

            var rating = "n/a";
            if (response.items[index].volumeInfo.averageRating) {
                rating = response.items[index].volumeInfo.averageRating;
            };

            var description = "n/a";
            if (response.items[index].volumeInfo.description) {
                description = response.items[index].volumeInfo.description;
            };

            if (response.items[index].saleInfo.saleability === "NOT_FOR_SALE") {
                var purchasable = `<li class="list-group-item">Not For Sale</li>
                </ul>
                <details>
                    <summary><strong>Description</strong></summary>
                    <p class="card-text">${description}</p>
                </details>
            </div>    
        </div>
    </div>`
            } else if (response.items[index].saleInfo.saleability === "FOR_SALE") {
                var purchasable = `<li class="list-group-item"><a href="${response.items[index].saleInfo.buyLink}" class="card-link">${response.items[index].saleInfo.listPrice.amount} ${response.items[index].saleInfo.listPrice.currencyCode}</a></li>
                </ul>
                <details>
                    <summary><strong>Description</strong></summary>
                    <p class="card-text">${description}</p>
                </details>
            </div>
        </div>
    </div>`
            } else {
                var purchasable = `<li class="list-group-item"><a href="${response.items[index].saleInfo.buyLink}" class="card-link">${response.items[index].saleInfo.saleability}</a></li>
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
                        <h5 class="card-title" id="card-title">${title}${subtitle}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="author"><strong>Author(s): </strong> ${author}</li>
                            <li class="list-group-item" id="pageCount"><strong>Page Count:</strong> ${pageCount}</li>
                            <li class="list-group-item"  id="rating"><strong>Rating: </strong>${rating}</li>
                            <li class="list-group-item" id="submit"><button type="button" class="save btn btn-link"><strong>Save to Wishlist</strong></button></li>
                            ${purchasable}`;

            display4 = display4 + result;
            if (i === 2 && jNeedChange) {
                console.log("j", j)
                j = (4 - (response.items.length % 4));
                jNeedChange = false;
                console.log("j", j)
            }

            if (j === 3) {
                $(".searchDisplay").append(display4);
                console.log("append count", i);
            }
            index++;
        }


    }

}

$(document).on("click", ".save", function (event) {
    event.preventDefault();
    //alert("clicked");
    // var user_id=data.id;
    var rating = $(this).parent().siblings("#rating").text().split(" ")[1];
    var pageCount = $(this).parent().siblings("#pageCount").text().split(" ")[2];
    var author = $(this).parent().siblings("#author").text().split(":")[1].trim();
    var title = $(this).parent().parent().siblings("#card-title").text();
    var cardImg = $(this).parent().parent().parent().siblings(".card-img-top").attr("src");

    var wishlistObj = {
        rating: rating,
        page_count: pageCount,
        author: author,
        title: title,
        card_img: cardImg
    };
    $.post("/api/wishlist", wishlistObj, function(data) {
        console.log(data);
        if (!data) {
            location.replace("/")
        }
        console.log("Succesfully added books")
    });
  });