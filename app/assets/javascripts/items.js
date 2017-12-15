function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category.id;
    this.category_name = item.category.name;
    this.item_users = item.item_users;
    this.tags = item.tags;
    
    this.item_use
}

//Prototypes

var getItems = function() {
    $.get("/items.json").done(Item.done)
}

Item.prototype.showIndexItem = function() {
    return `
    <div class="content">
        <h3><a href="/items/${this.id}">${this.title}</a></h3>
        <p>${this.description}</p><br>
        <p>Category: ${this.category_name}</p><br>
        <button class="reserve-button" id="${this.id}" data-item_id="${this.id}" data-user_id="${this.item_users[0].user_id}" onclick="Item.reserveItem(this)">Reserve</button>
    </div>
    ` 
}


Item.done = function(response){
    $.each(response, function(index, value) {
        var item = new Item(response[index])
        var indexItem = item.showIndexItem();
        $("#main").append(indexItem);    
    }) 
}

Item.fail = function(response) {
    console.log("Problem submitting the form", response)
    alert("There was a problem submitting the form. Please try again.")
}

Item.reserveItem = function(item){
    console.log(item)
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
    getItems();
    $("form#new_item").on("submit", Item.newItemFormSubmit)
})