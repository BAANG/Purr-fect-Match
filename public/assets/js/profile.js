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
            let photoUri = petIdData.photos.length > 0 ? petIdData.photos[0].medium : "assets/img/no-image-available.svg";    
                    
            $("#pet-name").text(petIdData.name);
            $(".card-image").append($("<img>").attr({
                "src": photoUri,
                "alt": "Animal",
            }).css("max-height", "500px"));
               
            $("#pet-age").text(petIdData.age);
            $("#pet-breed").text(petIdData.breeds.primary);
            $("#pet-coat").text(petIdData.coat);
            $("#pet-size").text(petIdData.size);
            $("#pet-description").text(petIdData.description);
            
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
        })
    })
})







// $(document).on('click', ".modal-close", function () {
//     event.preventDefault();
//     var petDiv = $("<div>");
//     var petName = $('#pet-name').val().trim();
//     var userNameDiv = $("<p>").text(userName);
//     var userReview = $('#user-review').val().trim();
//     var userReviewDiv = $('<p>').text(userReview);

//     reviewDiv.append(userNameDiv, userReviewDiv);

//     if (userName.length > 0 && userReview.length > 0) {
//         database.ref($(this).attr("data-id")).push({
//             name: userName,
//             review: userReview
//         })
//     }
// });

// $(document).on('click', ".modal-close", function () {
//     event.preventDefault();
//     var id = $(this).attr('data-id');
//     $("#" + id).removeClass('hide');



//     $(this).addClass('hide');
// });







// $(document).ready(function() {

//     $('a[data-toggle=modal], button[data-toggle=modal]').click(function () {
  
//       var data_id = '';
  
//       if (typeof $(this).data('id') !== 'undefined') {
  
//         data_id = $(this).data('id');
//       }
  
//       $('#animalId').val(data_id);
//       console.log(data_Id)
//     })
//   });
