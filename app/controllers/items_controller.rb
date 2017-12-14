class ItemsController < ApplicationController
    before_action :authenticate_user!, :except => [:show, :index]

    def index
        @items = Item.by_status('free') 
        respond_to do |format|
            format.html { render :show }
            format.json { render json: @items, each_serializer: ItemSerializer }
        end 
    end

    def show
        @item = Item.find(params[:id])
        respond_to do |format|
            format.html { render :show }
            format.json { render json: @item }
        end
    end
    
    def new
        @item = Item.new(category_id: params[:category_id])
    end

    def create
        @user = current_user
        @item = Item.new(item_params)

        if @item.save
            @item_user = ItemUser.create(user_id: @user.id, item_id: @item.id)
            render json: @item, status: 201 
        else
            render :action => 'new'
        end
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

    def destroy
        Item.find(params[:id]).destroy
        redirect_to root_path
    end

    private

    def item_params
        params.require(:item).permit(:title, :description, :category_id, :category_name, tag_ids:[], tags_attributes: [:name])
    end
end
