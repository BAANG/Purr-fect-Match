$(document).ready(function () {
    $(".parallax").parallax();

    // Delete the favorite when the user clicks the delete button
    $(".delete-btn").click(function (event) {
        var id = $(event.target).data("id");

        $.ajax({
            url: `/favorites/${id}/` + getCookie('currentUser'),
            method: "DELETE"
        }).done(function () {
            $(`#card-${id}`).remove()
        }).fail(function () {
            M.toast({ html: "Unable to remove from your favorites", displayLength: 2000, classes: "red" });
        })
    });
});

console.log(getCookie('currentUser'))

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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