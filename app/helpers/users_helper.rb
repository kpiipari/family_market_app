module UsersHelper

    def list_borrowed_items(user)
        user.reserved_items.all.collect do |ri|
            item = Item.find(ri.item_id)
            item
        end     
    end

    def list_user_owned_items(item_users)
        item_users.collect do |iu| 
            item = Item.find(iu.item_id)
            item 
        end
    end

    def get_borrower(item)
       reserved_item = ReservedItem.find_by(item_id: item.id)
       if reserved_item
            borrower_id = reserved_item.user_id
            User.find(borrower_id).email
       end
    end
    



end