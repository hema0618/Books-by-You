var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = "&92c13ca014msh69a5e7877c22b96p156eb2jsnfc551398d102";

$(".searchBtn").on("click", function(event){
    event.preventDefault();
    var title = $(".input").val().trim();
    var titleArr = title.split(" ");
    title = titleArr.join("+")
    title = '"' + title + '"';
    title(title);
});

function title(title){
    let titleURL = baseUrl + title + apikey;
    $.ajax({
        url: titleURL,
        method: "GET"
    }).then(function(response){
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
        
            const result =`<div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${response.items[index].volumeInfo.imageLinks.thumbnail}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${response.items[index].volumeInfo.title}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${response.items[index].volumeInfo.authors}</li>
                            <li class="list-group-item">${response.items[index].volumeInfo.pageCount}</li>
                            <li class="list-group-item">${response.items[index].volumeInfo.averageRating}</li>
                        </ul>
                        <p class="card-text">${response.items[index].volumeInfo.description}</p>
                    </div>`;
            $(".searchDisplay").append(result);
            if(response.itmes[index].saleInfo.saleability === "NOT_FOR_SALE"){
                const purchasable = `<div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Not For Sale</li>
                </div>
            </div>
        </div>`
                $(".searchDisplay").append(purchasable);
            } else if (response.items[index].saleInfo.saleability === "FOR_SALE"){
                const purchasable = `<div class="card-body">
                    <a href="${response.items[index].saleInfo.buylink}" class="card-link">${response.items[index].saleInfo.listPrice.amount} ${response.items[index].saleInfo.listPrice.currencyCode}</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>`
                $(".searchDisplay").append(purchasable);
            } else {
                const purchasable = `<div class="card-body">
                    <a href="${response.items[index].saleInfo.buylink}" class="card-link">${response.items[index].saleInfo.saleability}</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>`
                $(".searchDisplay").append(purchasable);
            }
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