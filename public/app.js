$(document).ready(function () {

  
    // Grab the articles as a json and display on screen
    function displayArticles() {
        $.getJSON("/articles", function (data) {
       
            for (var i = 0; i < data.length; i++) {
  
        
                var panelDiv = $("<div>")
                panelDiv.attr("id", data[i]._id)
                panelDiv.addClass("panel panel-default")
  
                var panelHeading = $("<div class='panel-heading' ></div>")
  
                var panelTitle = $("<h3 class='panel-title' ></h3>")
          
          
                var newATag = $("<a class='article-title'>");
                newATag.attr("target", "_blank")
                newATag.attr("href", data[i].url)
                newATag.text(data[i].headline)
  
                panelTitle.append(newATag)
                panelHeading.append(panelTitle)
                panelDiv.append(panelHeading)
  
                panelDiv.append(data[i].summary)

         
  
            }
        });
    }

    displayArticles();
  
  
    

  
    // when scrape button is clicked
    $(document).on("click", "#scrape-button", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        
        }).then(function (data) {
       
            console.log("hello")
            console.log(data);
  
       
            displayArticles()
  
            $("#scrapeModalLabel").text("You successfully scraped new articles")
            $("#scrapeModalBody").text("Woohoo!")
  
            $("#scrapeModal").modal("show");
  
        });
    });
});