function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category_id;
    this.category_name = item.category_name;
}

//Prototypes

Item.prototype.showIndexItem = function() {
    return `
    <div class="content">
        <h3><a href="/items/${this.id}">${this.title}</a></h3>
        <p><${this.description}/p><br>
        <p>Category: ${this.category_name}</p><br>
        <button class="reserve-button" id="${this.id}">Reserve</button>
    </div>
    ` 
}


Item.done = function(response){
    var item = new Item(response)
    var indexItem = item.showIndexItem();
    $("#main").append(indexItem);
}

Item.fail = function(response) {
    console.log("Problem submitting the form", response)
    alert("There was a problem submitting the form. Please try again.")
}

Item.reserveItem = function(e){
    e.preventDefault();
    var item = $(this);
    debugger
    $.post("/reserved_items", )
   
    var $form = $(this);
    var action = $form.attr("action")
    var params = $form.serialize();
    var posting = $.post(action, params);
    
    posting.then(Item.done, Item.fail)
}

Item.newItemFormSubmit = function(e){
    e.preventDefault();
    var $form = $(this);
    var action = $form.attr("action")
    var params = $form.serialize();
    var posting = $.post(action, params);
    
    posting.then(Item.done, Item.fail)
}


$(function() {
    $(".reserve-button").click(Item.reserveItem)
    $("form#new_item").on("submit", Item.newItemFormSubmit)
})