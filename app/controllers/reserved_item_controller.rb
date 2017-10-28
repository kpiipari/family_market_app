class ReservedItemController < ApplicationController

    def new
        @reserved_item = ReservedItem.new
    end

    def create
        @reserved_item = ReservedItem.create(reserved_item_params)
    end

    private
    
    def reserved_item_params
        params.require(:reserved_item).permit(:used_id, :item_id)
    end
    
end
