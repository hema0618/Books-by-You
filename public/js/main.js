var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = "&92c13ca014msh69a5e7877c22b96p156eb2jsnfc551398d102";

$(".searchBtn").on("click", function(event){
    event.preventDefault();
    var title = $(".input").val().trim();
    var titleArr = title.split(" ");
    title = titleArr.join("+")
    var query = '"' + title + '"';
    search(query);
});

function search(title){
    let titleURL = baseURL + title + apiKey;
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
        }
        for(var j = 0; i<5; i++){

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

            const result =`<div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${response.items[index].volumeInfo.imageLinks.thumbnail}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><bold>${response.items[index].volumeInfo.title}</bold></h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><bold>Author(s):</bold> ${response.items[index].volumeInfo.authors}</li>
                            <li class="list-group-item"><bold>Page Count: </bold>${response.items[index].volumeInfo.pageCount}</li>
                            <li class="list-group-item"><bold>Rating: </bold>${response.items[index].volumeInfo.averageRating}</li>
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