function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category_id
}

$(function() {
    $("form#new_item").on("submit", function(e){
        e.preventDefault();
        console.log("Stop")
    })
})