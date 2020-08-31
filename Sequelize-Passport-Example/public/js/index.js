var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = "&92c13ca014msh69a5e7877c22b96p156eb2jsnfc551398d102";

$(".searchBtn").on("click", function(event){
    event.preventDefault();
    var title = "intitle:"+$(".input").val().trim()+"+intitle";
    title(title);
});

function title(title){
    let titleURL = baseUrl + title + apikey;
    $.ajax({
        url: titleURL,
        method: "GET"
    }).then(function(response){
        $(".card-title").text(response.items[0].volumeInfo.title);
        //author
        response.items[0].volumeInfo.authors;
        //description
        response.items[0].volumeInfo.description;
        
    })
}