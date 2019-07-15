$(document).ready(function () {
    $(".parallax").parallax();

    // Delete the favorite when the user clicks the delete button
    $(".delete-btn").click(function (event) {
        var id = $(event.target).data("id");
        $.ajax({
            url: `/favorites/${id}`,
            method: "DELETE"
        }).done(function () {
            $(`#card-${id}`).remove()
        }).fail(function () {
            M.toast({ html: "Unable to remove from your favorites", displayLength: 2000, classes: "red" });
        })
    });
});
