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
            $("#pet-name").text(petIdData.name);
            $(".card-image").append(petIdData.photos[0].medium);
            $("#pet-age").text(petIdData.age);
            $("#pet-breed").text(petIdData.breeds.primary);
            $("#pet-coat").text(petIdData.caot);
            $("#pet-size").text(petIdData.size);
            $("#pet-description").text(petIdData.description);

        })
    })
})



// var cardImage = $("<div>").addClass("card-image");
//                     var image = $("<img>").attr({
//                         "src": petIdData.photos[0].medium,
//                         "alt": "Animal",
//                     }).css("height", "230px").css("object-fit", "cover")
//                     cardImage.append(image)
//                     card.append(cardImage)



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