function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category_id
}

$(function() {
    $("form#new_item").on("submit", function(e){
        e.preventDefault();
        var $form = $(this);
        var action = $form.attr("action")
        var params = $form.serialize();
        var posting = $.post(action, params);
        
        posting.done(function(data) {
            debugger;
            console.log(data)
        })
    })
})