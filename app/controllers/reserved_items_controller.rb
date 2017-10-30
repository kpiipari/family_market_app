class ReservedItemsController < ApplicationController

    def new
        @reserved_item = ReservedItem.new
    end

    def create
        @reserved_item = ReservedItem.create(reserved_item_params)
        Item.find(@reserved_item.item_id).reserve
        redirect_to current_user
    end

    private
    
    def reserved_item_params
        params.permit(:user_id, :item_id)
    end
    
end
