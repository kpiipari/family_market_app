module UsersHelper

    def list_borrowed_items(user)
        user.reserved_items.all.collect do |ri|
            item = Item.find(ri.item_id)
            item
        end     
    end


    def list_user_owned_reserved_items(item_users)
        reserved_items = item_users.collect do |iu| 
            item = Item.find(iu.id)
            if item.status == 'reserved'
                item
            end
        end
        if reserved_items.nil?
            return
        else
            reserved_items
        end
    end

    def list_user_owned_free_items(item_users)
        free_items = item_users.collect do |iu| 
            item = Item.find(iu.id)
            if item.status == 'free'
                item              
            end 
        end
        if free_items.nil?
            return
        else
            free_items
        end
    end

end