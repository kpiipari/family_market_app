class ReservedItemsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def new
        @reserved_item = ReservedItem.new
    end

    def create
        @reserved_item = ReservedItem.create(reserved_item_params)
        Item.find(@reserved_item.item_id).reserve
        respond_to do |format|
            format.json { render json: @item, status: 201 }
            format.html { redirect_to root_path }
        end
    end

    def destroy
        @item = Item.find(params[:id])
        @item.return
        @reserved_item = ReservedItem.find_by(item_id: @item.id)
        
        if @reserved_item
            @reserved_item.destroy
        end
        redirect_to current_user
    end

    private
    
    def reserved_item_params
        params.permit(:user_id, :item_id)
    end
    
end
