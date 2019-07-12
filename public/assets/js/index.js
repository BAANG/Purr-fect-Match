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
            var aniData = response.animals;

        //Possible responses. Loop "n" to retreive all animals from result. n=0 for examples. 
            n=0;
            //Age
            console.log(aniData[n].age);

            //House-trained (T/F)
            console.log(aniData[n].attributes.house_trained);

            //Shots current (T/F)
            console.log(aniData[n].attributes.shots_current);

            //Spayed/neutered (T/F)
            console.log(aniData[n].attributes.spayed_neutered);

            //Mixed breed (T/F)
            console.log(aniData[n].breeds.mixed);

            //Primary breed
            console.log(aniData[n].breeds.primary);

            //Secondary breed (if mixed, sometimes "null" even if mixed)
            console.log(aniData[n].breeds.secondary);

            //Coat
            console.log(aniData[n].coat);

            //Color (primary only, many do not have secondary color listed)
            console.log(aniData[n].colors.primary);

            //Contact address
            console.log(aniData[n].contact.address.address1);
            console.log(aniData[n].contact.address.address2);
            console.log(aniData[n].contact.address.city + ", " + aniData[n].contact.address.state + " " +  aniData[n].contact.address.postcode);
            console.log(aniData[n].contact.address.country);

            //Contact email
            console.log(aniData[n].contact.email);

            //Pet description
            console.log(aniData[n].description);

            //Children OK (T/F)
            console.log(aniData[n].environment.children);

            //Gender
            console.log(aniData[n].gender);

            //Pet name
            console.log(aniData[n].name);

            //Organization ID
            console.log(aniData[n].organization_id);

            //Photo (full,large,medium,small; can have many images; example uses medium and first image)
            console.log(aniData[n].photos[0].medium);

            //Date published
            console.log(aniData[n].published_at);

            //Size
            console.log(aniData[n].size);

            //Species
            console.log(aniData[n].species);

            //Status
            console.log(aniData[n].status);

            //Petfinder URL
            console.log(aniData[n].url);
        })
    })
})
