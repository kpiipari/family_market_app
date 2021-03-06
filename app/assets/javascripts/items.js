function Item(item) {
    this.id = item.id
    this.title = item.title;
    this.description = item.description;
    this.category_id = item.category.id;
    this.category_name = item.category.name;
    this.item_users = item.item_users;
    this.tags = item.tags;
}

//Prototypes

const getItems = function() {
    $.get("/items.json").done(Item.done)
}

const getNextItemForShow = function(id) {
    var nextId = id + 1;
    $.get("/items/" + nextId + ".json", function(data) {
        if(data.status === "free") {
            $(".itemTitle").text(data.title);
            $(".itemDescription").text(data.description);
            $(".itemTag").html(showTags(data.tags));
            $(".js-next").data("id", data.id);
            $(".itemReserve").html(reserveButton(data.id))
        } else {
            $(".itemTitle").text(data.title);
            $(".itemDescription").text(data.description);
            $(".itemTag").html(showTags(data.tags));
            $(".js-next").data("id", data.id);
            $(".itemReserve").html(reservedButton(data.id))
        }    
    })
}

const showTags = function(tags) {
    let tagsString = ""
    for (let tag of tags) {
        tagsString += tag.name + "<br>"
    }
    return tagsString
}

const reserveButton = function(id) {
    return `
    <span href="#" class="button is-small" is-primary data-item_id="${id}" onclick="reserveItem(${id})">Reserve</span>
    `
}

const reservedButton = function(id) {
    return `
    <span href="#" class="button is-small" is-primary data-item_id="${id}">Reserved</span>
    `
}

Item.prototype.showIndexItem = function() {
    return `
        <p class="subtitle"><a href="/items/${this.id}" data-id="${this.id}">${this.title}</a></p>
        <p>${this.description}</p><br>
        <p>Category: ${this.category_name}</p>
        <p>Tags:</p>
        <p>${showTags(this.tags)}</p>
        <h3><span href="#" class="button" is-primary data-item_id="${this.id}" onclick="reserveItem(${this.id})">Reserve</span></h3>
        <hr>
        ` 
}

Item.prototype.showItemTitle = function() {
    return `
        <p class="subtitle"><a href="/items/${this.id}" data-id="${this.id}">${this.title}</a></p>
        <hr>
    ` 
}

Item.done = function(response){
        response.sort(function(a, b) {
            let itemA = a.title.toUpperCase();
            let itemB = b.title.toUpperCase();
            if (itemA < itemB) {
                return -1;
            } if (itemA > itemB) {
                return 1;
            }
            return 0;
        });
        $.each(response, function(index, value) {
        var item = new Item(response[index])
        var indexItem = item.showIndexItem();
        $("#js-index-items").append(indexItem);   
    }) 
}

Item.fail = function(response) {
    console.log("Problem submitting the form", response)
    alert("There was a problem submitting the form. Please try again.")
}

const reserveItem = function(item){
    var userId = $("#js-items").data('user')
    var reservedItem = {"user_id":"userId", "item_id":"item"};
    var token = $("meta[name=csrf-token]").attr("content");
    var item = item;
    var data = {authenticity_token:token, item_id:item, user_id:userId}
    var json = JSON.stringify(data)
    if($('[data-item_id="' + item + '"]').attr("disabled") != "disabled") {
        $.ajax({
            type: 'POST',
            url: '/reserved_items', 
            data: data,
            success: function() {
                $('[data-item_id="' + item + '"]').attr("disabled", true);
                $('[data-item_id="' + item + '"]').text("Reserved");
            },
            error: function() {
                alert("Unable to reserve the item.");
            }
        }) 
    }
}

Item.newItemFormSubmit = function(e){
    e.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);
    
    posting.done(function(data) {
        var item = new Item(data);
        var indexItem = item.showIndexItem();
        $("#js-new-item").append(indexItem); 
        document.getElementById("new_item").reset(); 
        $("input[type=submit]").removeAttr('disabled');;  
    })
}

function Category(category) {
    this.id = category.id
    this.name = category.name;
    this.items = category.items;
}

//Prototypes

const getCategories = function() {
    $("#js-show-category").click(function() {
        if ($("#js-category").children().length == 0) {
            $.get("/categories.json").done(Category.done)
        } else {
            $("#js-category").show() 
        }
        
    });
}

const hideCategories = function() {
    $("#js-hide-category").click(function() {
        $("#js-category").hide()
    });
}

let getCategoryItem = function(id) {
    $.get("/categories/" + id + ".json").done(Category.itemDone)
}

Category.itemDone = function(response){
    $.each(response, function(index, value) {
        var item = new Item(response[index]);
        var itemTitle = item.showItemTitle();
        var id = item.category_id;
        document.getElementById(id).insertAdjacentHTML('beforeend',itemTitle);   
    }) 
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
            <p class="title"><span href="#" class="js-category-name" is-primary data-id="${this.id}")" onclick="getCategoryItem(${this.id}); this.onclick=null;">${this.name}</span></p>
            <div id="${this.id}"></div>
    ` 
}

const reloadHome = function() {
    location.replace("/");
}

$(function() {
    getItems();
    getCategories();
    hideCategories();
    $("form#new_item").on("submit", Item.newItemFormSubmit);
})