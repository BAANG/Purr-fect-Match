
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
    });

    // Script for generating custom favorite link
    // console.log('This is the okta-token-storage:' ,localStorage.getItem('okta-token-storage'))
    var currentUser = getCookie('currentUser')
    var favoriteButton = $('.favorite-button-index')
    var anchor = $('<a>')
    anchor.attr('href' ,'/myfavorites/' + currentUser)
    anchor.addClass('brand-logo right')
    anchor.html('<i class="material-icons">favorite</i>')
    favoriteButton.append(anchor);
});

$("#search").on("click", function (event) {
    event.preventDefault();

    var aniType = $("#types").val();
    var aniBreed = $("#breeds").val();
    var aniGender = $(".gender:checked").val();
    var aniSize = $("#size").val();
    var aniAge = $("#age").val();
    var aniCoat = $("#coat").val();
    var userLocation = $("#location").val();
    var userLocationParam = userLocation === "" ? "" : `&location=${userLocation}`;

    $.ajax({
        url: "https://api.petfinder.com/v2/oauth2/token",
        method: "POST",
        data: "grant_type=client_credentials&client_id=ycqJ1y4t1txs2Tm7959XrLlxHNoEz0YNoCC5YIY8oIh3v46SYh&client_secret=1mqC7cVSodCsKMibLnziY3kAqpKkeNS3KwJJ9sEQ"
    }).then(function (response) {
        var token = response["access_token"];
        $.ajax({
            url: `https://api.petfinder.com/v2/animals?type=${aniType}&breed=${aniBreed}&limit=30&size=${aniSize}&gender=${aniGender}&age=${aniAge}&coat=${aniCoat}${userLocationParam}`,
            method: "GET",
            beforeSend: function (xhr) {
                // Authorization header
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },

            error: function () {
                $('#card-section').append($("<h2>").html("<br>There was an error in your search!"))
            }
        }).then(function (response) {
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

                    var card = $("<div>").addClass("card grey lighten-4");
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

                    let isFavorite = false;
                    let favorite = $("<i>").addClass("material-icons").css({ "color": "red", "float": "right", "cursor": "pointer" }).text("favorite_border");
                    modalContent.append(favorite);

                    $.ajax({
                        url: `/favorites/${animal.id}/isFavorite`,
                        method: "GET"
                    }).done(function (data) {
                        isFavorite = data.isFavorite
                        if (isFavorite) {
                            favorite.addClass("material-icons").css("color", "red").text("favorite");
                        }
                    });

                    favorite.click(function (event) {
                        var currentUser = getCookie('currentUser')
                        console.log(currentUser, "is the userId")
                        if (isFavorite) {
                            $.ajax({
                                url: `/favorites/${animal.id}/` + currentUser,
                                method: "DELETE"
                            }).done(function () {
                                $(event.target).addClass("material-icons").css("color", "red").text("favorite_border");
                                isFavorite = false;
                            }).fail(function () {
                                M.toast({ html: "Unable to remove from your favorites", displayLength: 2000, classes: "red" });
                            })
                        } else {
                            var data = {
                                UserId: currentUser,
                                animalId: animal.id
                            }
                            $.post('/favorites/' + animal.id + '/' + currentUser, data, function (result) {
                                console.log(result)
                            }).done(function () {
                                $(event.target).addClass("material-icons").css("color", "red").text("favorite");
                                M.toast({ html: "Recorded in your favorites!", displayLength: 2000, classes: "teal" });
                                isFavorite = true;
                            }).fail(function () {
                                M.toast({ html: "Unable to record in your favorites", displayLength: 2000, classes: "red" });
                            })
                        }
                    });

                    modalContent.append($("<h4>").text(animal.name));
                    modalContent.append($("<img>").attr({
                        "src": photoUri,
                        "alt": "Animal",
                    }).css("max-height", "500px"));

                    var container = $("<div>").addClass("container left-align")
                    modalContent.append(container)

                    if (animal.breeds.primary === null) {
                        container.append($("<br>"))
                    }
                    else {
                        container.append($("<h6>").html("<br>Breed: " + animal.breeds.primary));
                    };
                    if (!(animal.gender == null)) {
                        container.append($("<h6>").text("Gender: " + animal.gender));
                    };
                    if (!(animal.age === null)) {
                        container.append($("<h6>").text("Age: " + animal.age));
                    };
                    if (!(animal.colors.primary === null)) {
                        container.append($("<h6>").text("Color: " + animal.colors.primary));
                    };
                    if (!(animal.size === null)) {
                        container.append($("<h6>").text("Size: " + animal.size));
                    };
                    if (!(animal.coat === null)) {
                        container.append($("<h6>").text("Coat: " + animal.coat));
                    };
                    if (animal.description === null) {
                        container.append($("<h6>").html("<br>No description available."));
                    }
                    else {
                        container.append($("<h6>").html("<br>Description: " + animal.description));
                    };

                    var modalFooter = $("<div>").addClass("modal-footer");
                    modal.append(modalFooter)
                    var findMe = $("<a>").attr("href", "/pets/" + animal.id).attr("target", "_blank").addClass("modal-close waves-effect waves-green btn-flat").text("Where to find me?")
                    modalFooter.append(findMe)

                    $(".modal").modal();
                    $("#breeds").val('');
                };
            };
        })
    });
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

