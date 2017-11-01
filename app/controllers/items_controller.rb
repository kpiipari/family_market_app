class ItemsController < ApplicationController
    before_action :authenticate_user!, :except => [:show, :index]

    def show
        @item = Item.find(params[:id])
    end
    
    def new
        @item = Item.new
    end

    def create
        @user = current_user
        @item = Item.create(item_params)
        binding.pry
        @item_user = ItemUser.create(user_id: @user.id, item_id: @item.id)
        redirect_to root_path
    end

    def edit
        @item = Item.find(params[:id])
    end

    def update
        @item = Item.find(params[:id])
        if @item.update_attributes(item_params)
            redirect_to item_path(@item)
        else 
            render 'edit'
        end
    end

    private

    def item_params
        params.require(:item).permit(:title, :description, :category_name, tag_ids:[], tags_attributes: [:name])
    end
end
