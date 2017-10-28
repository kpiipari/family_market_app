categories_list = ["bedding", "bathing & changing", "car seats", "carriers", "clothing", "feeding", "furniture", "maternity", "pushchairs", "toys"]

categories_list.each do |category|
    Category.find_or_create_by(name: category)
end

@user1 = User.create(email: "nanny.mcphee@gmail.com", password: "password")
@user2 = User.create(email: "mary.poppins@gmail.com", password: "123test")
@user3 = User.create(email: "winifred.banks@gmail.com", password: "testtest")

@item1 = Item.create(title: "2 X 700 ml bottle", description: "Brand new green Mam bottles with stage 1 teats.", category_id: 5)
@item2 = Item.create(title: "Cardigan 12-18 months", description: "Blue cotton cardigan in good condition.", category_id: 4)
@item3 = Item.create(title: "Infant car seat", description: "Black Maxi-cose infant car seat. Hasn't been in any accident.", category_id: 2)

ItemUser.create(user_id: @user1.id, item_id: @item1.id)
ItemUser.create(user_id: @user2.id, item_id: @item2.id)
ItemUser.create(user_id: @user3.id, item_id: @item3.id)