
// To send a DELETE Request from the <a> delet ebottom in _show.ejs 

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {

        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:5500/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this User?")) {
            $.ajax(request).done(response => {
                alert("Data DELETED successfully!")
                location.reload();
            })
        }

    })
}