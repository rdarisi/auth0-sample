var deleteItem = function(id) {

    $.ajax({
        url: "/api/v1/items/" + id,
        type: 'DELETE',
        success: function(resp) {
            $("#error").html(resp.message).show();
            document.location.reload();
        },
        error: function(resp) {
            $("#error").html(resp.responseJSON.message).show();
        }
      });
}

var addItem = function() {
    $.post("/api/v1/items/", {
        "name": $("#name").val(),
        "modelId": $("modelId").val(),
        "location": $("#location").val(),
        "connectivity": $("#connectivity").val().split(" "),
        "controllers": $("#controllers").val().split(" "),
        "credentials": {
            "username": $("#username").val(),
            "password": $("#password").val()
        },
        "type": $("#type").val()

    }, function(resp) {
        if(resp.code == 201) {
            $("#error").html(resp.message).show();
            document.location.reload();
        }
        else {
            $("#error").html("Something went wrong!").show();
        }
    })
}
