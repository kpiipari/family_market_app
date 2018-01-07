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
    $.get("/items/" + nextId + ".json", function(data) {
        $(".itemTitle").text(data.title);
        $(".itemDescription").text(data.description);
        $(".js-next").data("id", data.id);
    })
}

Item.prototype.showIndexItem = function() {
    return `
    <div class="content">
        <div class="tile is-child notification is-dark box">
            <h3><a href="/items/${this.id}" class="button" is-primary data-id="${this.id}")">${this.title}</a></h3>
            <p>${this.description}</p><br>
            <p>Category: ${this.category_name}</p><br>
        </div>
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
    $.post("/reserved_items", function(item){
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
    
    posting.done(function(data) {
        var item = new Item(data)
        var indexItem = item.showIndexItem();
        $("#main").append(indexItem); 
        document.getElementById("new_item").reset();    
    })
}

function Category(category) {
    this.id = category.id
    this.name = category.name;
    this.items = category.items;
}

//Prototypes

var getCategories = function() {
    $("#js-show-category").click(function() {
        debugger
        $.get("/categories.json").done(Category.done)
    });
}

var getCategoryItem = function() {
    $("a").click(function() {
        alert("category clicked")
        debugger
    });
}

Category.done = function(response){
    $.each(response, function(index, value) {
        var category = new Category(response[index])
        var indexCategory = category.showIndexCategory();
        $("#js-category").append(indexCategory);    
    }) 
}

Category.prototype.showIndexCategory = function() {
    return `
    <div class="content">
        <div class="tile is-child notification is-dark box">
            <h3><a href="/categories/${this.id}" class="button" is-primary data-id="${this.id}")">${this.name}</a></h3>
        </div>
    </div>
    ` 
}

$(function() {
    getItems();
    getCategories();
    $("form#new_item").on("submit", Item.newItemFormSubmit);
    getCategoryItem();
})