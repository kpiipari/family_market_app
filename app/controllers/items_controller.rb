class ItemsController < ApplicationController
    before_filter :authenticate_user!, :except => [:show, :index]

    def show
    end
    
    def new
        @item = Item.new
    end

    def create
        @item = Item.create(item_params)
        @user = current_user
        @item_user = ItemUser.create(user_id: user.id, item_id: item.id)
        redirect_to users_path(@user)
    end

    private

    def item_params
        params.permit(:item).require()
    end
end
