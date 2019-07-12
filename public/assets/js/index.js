$(document).ready(function () {
    $(".parallax").parallax();
    $("select").formSelect();

    // Ajax call to retrieve the access token to the Petfinder API
    $.ajax({
        url: "https://api.petfinder.com/v2/oauth2/token",
        method: "POST",
        data: "grant_type=client_credentials&client_id=ycqJ1y4t1txs2Tm7959XrLlxHNoEz0YNoCC5YIY8oIh3v46SYh&client_secret=1mqC7cVSodCsKMibLnziY3kAqpKkeNS3KwJJ9sEQ"
    }).then(function (response) {
        var token = response["access_token"]

        // Get the breeds for the autocomplete form
        $("#types").change(function (event) {
            $.ajax({
                url: `https://api.petfinder.com/v2/types/${event.target.value}/breeds`,
                method: "GET",
                beforeSend: function (xhr) {
                    // Authorization header
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            }).then(function (response) {
                console.log(response)
                let breeds = response.breeds.map(breed => breed.name);
                let breedsKeyValue = breeds.reduce(function (map, breed) {
                    map[breed] = null;
                    return map
                }, {});

                $("#breeds").autocomplete({ data: breedsKeyValue });
            })
        })

        // card section
        $.ajax({
            url: "https://api.petfinder.com/v2/animals",
            method: "GET",
            beforeSend: function (xhr) {
                // Authorization header
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).then(function (response) {
            console.log(response);

            $("#card-section").empty();

            if (response.animals.length === 0) {
                var noResult = $("<h1>")
                noResult.css("font-size", "30px")
                noResult.html("No results")
                $("#card-section").append(noResult)
            } else {
                for (let i = 0; i < response.animals.length; i++) {
                    let animal = response.animals[i];
                    let photoUri = animal.photos.length > 0 ? animal.photos[0].medium : "assets/img/no-image-available.svg";


                    var container = $("<div>").addClass("col s12 m4")

                    var card = $("<div>").addClass("card");
                    container.append(card)
                    var cardImage = $("<div>").addClass("card-image");
                    var image = $("<img>").attr({
                        "src": photoUri,
                        "alt": "Animal",
                    }).css("height", "230px").css("object-fit", "cover")
                    cardImage.append(image)
                    card.append(cardImage)

                    var cardTitle = $("<span>")
                        .addClass("card-title")
                        .css("text-shadow", "3px 3px 5px #000000")
                        .text(animal.name);
                    cardImage.append(cardTitle)

                    var cardContent = $("<div>").addClass("card-content center")

                    var button = $("<button>").attr("data-target", "modal" + i).addClass("btn modal-trigger waves-effect").text("Read more");

                    cardContent.append(button)
                    card.append(cardContent)

                    $('#card-section').append(container)


                    var modal = $("<div>").attr("id", "modal" + i).addClass("modal");
                    var modalContent = $("<div>").addClass("modal-content");
                    modal.append(modalContent)
                    cardContent.append(modal)
                    modalContent.append($("<h4>").text(animal.name));
                    modalContent.append($("<img>").attr({
                        "src": photoUri,
                        "alt": "Animal",
                    }).css("max-height", "500px"));
                    modalContent.append($("<p>").text("Breed: " + animal.breed));
                    modalContent.append($("<p>").text("Gender: " + animal.gender));
                    modalContent.append($("<p>").text("Age: " + animal.age));
                    modalContent.append($("<p>").text("Color: " + animal.colors.primary));
                    modalContent.append($("<p>").text("Size: " + animal.size));
                    modalContent.append($("<p>").text("Coat: " + animal.coat));
                    modalContent.append($("<p>").text("Description: " + animal.description));

                    var modalFooter = $("<div>").addClass("modal-footer");
                    modal.append(modalFooter)
                    var findMe = $("<a>").attr("href", "/pets/" + animal.id).addClass("modal-close waves-effect waves-green btn-flat").text("Where to find me?")
                    modalFooter.append(findMe)

                    $(".modal").modal();
                };
            };
        })
    });
});



$("#search").on("click", function(event) {
    event.preventDefault();

    var aniType = $("#types").val();
    var aniBreed = $("#breeds").val();
    var aniGender = $(".gender:checked").val();
    var aniSize = $("#size").val();
    var aniAge = $("#age").val();
    var aniCoat = $("#coat").val();
    var aniTemp = $("#temperament").val();
    var userLocation = $("#location").val();

    console.log("test")
    // console.log(aniBreed)
    // console.log(aniType)
    // console.log(aniGender)
    // console.log(aniSize)
    // console.log(aniAge)
    // console.log(aniCoat)
    // console.log(aniTemp)
    // console.log(userLocation)
})


