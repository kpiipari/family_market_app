function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category_id
}

Item.done = function(response){
    var item = new Item(response)
    var itemLi = item.buildItemLi();
    $("ul.market").append(itemLi);
    console.log(item)
}

Item.fail = function(response) {
    console.log("Problem submitting the form", response)
    alert("There was a problem submitting the form. Please try again.")
}



Item.prototype.buildItemLi = function() {

}

Item.newItemFormSubmit = function(e){
    e.preventDefault();
    var $form = $(this);
    var action = $form.attr("action")
    var params = $form.serialize();
    var posting = $.post(action, params);
    
    posting.done(function(data) {
        var item = new Item(data)
        var itemLi = item.buildItemLi();
        $("ul.market").append(itemLi);
        console.log(item)
    })
}

$(function() {
    $("form#new_item").on("submit", Item.newItemFormSubmit)
})