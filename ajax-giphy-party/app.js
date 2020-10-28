// for jQuery need to use $ for all inputs and stored values  
let $myInput = $("#search");
let $gifSpace = $("#gif-space");


//function to place new Gif
function newGif(result){
    let gif = result.data.length;
    if(gif){
        //there are many gifs so use math.random to select a random gif instead of the same one
        let randIdx = Math.floor(Math.random() * gif);
        let $newColumn = $("<div>", {class: "col-12 col-md-4 mt-2 mb-3"});
        let $newImg = $("<img>", {
            src: result.data[randIdx].images.original.url, class: "w-100" // cant use auto it will overlap on some images
        });
        $newColumn.append($newImg);
        $gifSpace.append($newColumn);
    }
}

//Ajax and form submission: call ajax and clear the search input box
$("form").on("submit", async function(e){
    e.preventDefault();
    
    let mySearch = $myInput.val();
    $myInput.val(""); // clear the search input box after sumission

    const res = await  axios.get(`http://api.giphy.com/v1/gifs/search`,{
        params: {
            q: mySearch, 
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    }); 
    newGif(res.data);
});

// remove all gifs button
$("#delete").on("click", function(){
    $gifSpace.empty();
});