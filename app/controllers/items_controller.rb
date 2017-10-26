class ItemsController < ApplicationController
    before_action :authenticate_user!, :except => [:show, :index]

    def show
    end
    
    def new
        @item = Item.new
    end

    def create
        @item = Item.create(item_params)
        @user = current_user
        @item_user = ItemUser.create(user_id: @user.id, item_id: @item.id)
        redirect_to '/'
    end

    private

    def item_params
        params.require(:item).permit(:title, :description, :category_id)
    end
end
