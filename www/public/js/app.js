var deleteItem = function(id) {

    $.ajax({
        url: "/api/v1/items/" + id,
        type: 'DELETE',
        success: function(resp) {
            
        },
      });
}


