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

var getNextItemForShow = function(id) {
    var nextId = id + 1;
    $.get("/items/" + nextId + ".json").done(Item.show)
}
    

Item.prototype.showIndexItem = function() {
    return `
    <div class="content">
        <div class="tile is-child notification is-dark box">
            <h3><a href="/items/${this.id}" class="button" is-primary data-id="${this.id}")">${this.title}</a></h3>
            <p>${this.description}</p><br>
            <p>Category: ${this.category_name}</p><br>
            <button class="reserve-button" is-white id="${this.id}" data-item_id="${this.id}" data-user_id="${this.item_users[0].user_id}" onclick="Item.reserveItem(this)">Reserve</button>
        </div>
    </div>
    ` 
}

Item.prototype.itemShowPage = function() {
    return `
    <div class="tile is-child notification is-dark box">
            <h3>${this.title}</h3>
            <p>${this.description}</p><br>
            <p>Category: ${this.category_name}</p><br>
            <button class="reserve-button" id="${this.id}" data-item_id="${this.id}" data-user_id="${this.item_users[0].user_id}" onclick="Item.reserveItem(this)">Reserve</button>
            <button class="js-next" data-id="${this.id}">Next...</button>
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

Item.show = function(response){
    var item = new Item(response)
    var showItem = item.itemShowPage();
    debugger
    $("#main").html(showItem);
}

Item.reserveItem = function(item){
    console.log(item)
    debugger
    $.post("/reserved_items", item, function(item) {
        var itemId = item.dataset.item_id;
        var userId = item.dataset.user_id
        console.log(data)
        debugger
    })
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