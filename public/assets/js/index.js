$(document).ready(function () {
    $('.parallax').parallax();
    $('select').formSelect();

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
                },
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
    })
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

    $.ajax({
        url: "https://api.petfinder.com/v2/oauth2/token",
        method: "POST",
        data: "grant_type=client_credentials&client_id=ycqJ1y4t1txs2Tm7959XrLlxHNoEz0YNoCC5YIY8oIh3v46SYh&client_secret=1mqC7cVSodCsKMibLnziY3kAqpKkeNS3KwJJ9sEQ"
    }).then(function (response) {
        var token = response["access_token"];
        $.ajax({
            url: `https://api.petfinder.com/v2/animals?type=`+aniType+`&breed=`+aniBreed+`&size=`+aniSize+`&gender=`+aniGender+`&age=`+aniAge+`&coat=`+aniCoat+`&location=`+userLocation+``,
            method: "GET",
            beforeSend: function (xhr) {

                // Authorization header
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            error: function() {
                console.log("There was an error!")
            }
        }).then(function (response) {
            console.log(response.animals)
        })
    })
})
