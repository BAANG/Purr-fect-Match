$(document).ready(function () {
    $(".parallax").parallax();

    var urlID = window.location.pathname;
    var petID = urlID.split("/")[2];

    $.ajax({
        url: "https://api.petfinder.com/v2/oauth2/token",
        method: "POST",
        data: "grant_type=client_credentials&client_id=ycqJ1y4t1txs2Tm7959XrLlxHNoEz0YNoCC5YIY8oIh3v46SYh&client_secret=1mqC7cVSodCsKMibLnziY3kAqpKkeNS3KwJJ9sEQ"
    }).then(function (response) {
        var token = response["access_token"]
        $.ajax({
            url: `https://api.petfinder.com/v2/animals/` + petID,
            method: "GET",
            beforeSend: function (xhr) {
                // Authorization header
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        }).then(function (response) {
            console.log(response);

            var petIdData = response.animal;
            let photoUri = petIdData.photos.length > 0 ? petIdData.photos[0].large : "assets/img/no-image-available.svg";

            if (!(petIdData.name == null)) {
                $("#pet-name").append($("<h5>").text("Name: " + petIdData.name));
            };

            $(".card-image").append($("<img>").attr({
                "src": photoUri,
                "alt": "Animal",
            }).css("max-height", "500px"));

            if (!(petIdData.age == null)) {
                $("#pet-age").append($("<h5>").text("Age: " + petIdData.age));
            };

            if (!(petIdData.breeds.primary == null)) {
                $("#pet-breed").append($("<h5>").text("Breed: " + petIdData.breeds.primary));
            };

            if (!(petIdData.coat == null)) {
                $("#pet-coat").append($("<h5>").text("Coat: " + petIdData.coat));
            };

            if (!(petIdData.size == null)) {
                $("#pet-size").append($("<h5>").text("Size: " + petIdData.size));
            };

            if (!(petIdData.description == null)) {
                $("#pet-description").append($("<h5>").text("Description: " + petIdData.description));
            };

            var resp = petIdData.contact.address;
            var place = resp.address1 + ", ";
            var zoomLevel = 16;
            if (resp.address1 === null) {
                zoomLevel = 12;
                place = "";
            }
            else if (resp.address1.startsWith("P.O.")) {
                zoomLevel = 12;
                place = "";
            }
            var address = place + resp.city + ", " + resp.state + " " + resp.postcode;
            console.log(address)
            $(".maps").append('<iframe class="gmap" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + address + '&key=AIzaSyCH2xLVmpRkxfq20pbYsRE1Vp96Fbf-_s4&zoom=' + zoomLevel + '" allowfullscreen></iframe>')

            if (resp === null) {
                $(".org-info").append($("<br>"))
            }
            else {
                $(".org-info").append($("<h5>").text("Address: " + address));
            };
            if (!(petIdData.contact.email == null)) {
                $(".org-info").append($("<h5>").text("Contact Email: " + petIdData.contact.email));
            };
            if (!(petIdData.contact.phone == null)) {
                $(".org-info").append($("<h5>").text("Contact Phone: " + petIdData.contact.phone));
            };
            if (!(petIdData._links.organization.href == null)) {
                var orgLink = $("<a>").attr("href", petIdData._links.organization.href).attr("target", "_blank").text("Organization Link");

                $(".org-info").append(orgLink);
            };

            if (!(petIdData.organization_id == null)) {
                $(".org-info").append($("<h5>").text("Organization ID: " + organization_id));
            }
        })
    })
})




