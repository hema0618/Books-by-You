


var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var API_KEY = "&92c13ca014msh69a5e7877c22b96p156eb2jsnfc551398d102";

$(".searchBtn").on("click", function(event){
    event.preventDefault();
    var title = $(".input").val().trim();
    var titleArr = title.split(" ");
    title = titleArr.join("+")
    var query = '%22' + title + '%22';
    search(query);
});

function search(title){
    let titleURL = baseURL + title + API_KEY;
    console.log(titleURL);
    $.ajax({
        url: titleURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        display(response);
    });
}

function display(response){
    $(".searchDisplay").text("");
    const start = `<div class="container">`;
    $(".searchDisplay").append(start);
    localStorage.setItem("index", JSON.stringify(true));
    for(var i=0; i<2; i++){
        const startRow = `<div class="row">`;
        $(".searchDisplay").append(startRow);
        if(JSON.parse(localStorage.getItem("index"))){
            var index = 0;
        } else {
            var index = 5;
        }
        for(var j = 0; j<5; j++){

            if(response.items[index].saleInfo.saleability === "NOT_FOR_SALE"){
                var purchasable = `<li class="list-group-item">Not For Sale</li>
                </ul>
                <p class="card-text">${response.items[index].volumeInfo.description}</p>
            </div>
        </div>
    </div>`
            } else if (response.items[index].saleInfo.saleability === "FOR_SALE"){
                var purchasable = `<li class="list-group-item"><a href="${response.items[index].saleInfo.buyLink}" class="card-link">${response.items[index].saleInfo.listPrice.amount} ${response.items[index].saleInfo.listPrice.currencyCode}</a></li>
                </ul>
                <p class="card-text">${response.items[index].volumeInfo.description}</p>
            </div>
        </div>
    </div>`
            } else {
                var purchasable = `<li class="list-group-item"><a href="${response.items[index].saleInfo.buyLink}" class="card-link">${response.items[index].saleInfo.saleability}</a></li>
                </ul>
                <p class="card-text">${response.items[index].volumeInfo.description}</p>
            </div>
        </div>
    </div>`
            };
            // creates an image variable to hold a placeholder, if there is an image the placeholder is replaced with it
            var image = "https://placehold.it/500&text=n/a"
            if(response.items[index].volumeInfo.imageLinks){
                image = response.items[index].volumeInfo.imageLinks.thumbnail;
            }
            var rating = "n/a"
            if(response.items[index].volumeInfo.averageRating){
                rating = response.items[index].volumeInfo.averageRating;
            }
            const result =`<div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${response.items[index].volumeInfo.title}</strong></h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Author(s):</strong> ${response.items[index].volumeInfo.authors}</li>
                            <li class="list-group-item"><strong>Page Count: </strong>${response.items[index].volumeInfo.pageCount}</li>
                            <li class="list-group-item"><strong>Rating: </strong>${rating}</li>
                            ${purchasable}`;
            $(".searchDisplay").append(result);
            
            index++;
            localStorage.setItem("index", JSON.stringify(false));
        }
        const end = `</div>`
        $(".searchDisplay").append(end);
    }
    const end = `</div>`
    $(".searchDisplay").append(end);
    localStorage.setItem("index", JSON.stringify(true));
}