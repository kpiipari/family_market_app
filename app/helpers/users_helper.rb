module UsersHelper

    def list_borrowed_items(user)
        user.reserved_items.all.collect do |ri|
            item = Item.find(ri.item_id)
            item
        end     
    end

    def list_user_owned_items(item_users)
        item_users.collect do |iu| 
            item = Item.find(iu.id)
            item 
        end
    end
    

    def list_user_owned_free_items(item_users)
        free_items = []
        item_users.each do |iu| 
            item = Item.find(iu.id)
            if item.status == 'free'
                free_items << item              
            end 
        end

        if free_items.nil?
            return
        else
            free_items
        end
    end

end