class UsersController < ApplicationController
    
        def show
            @user = User.find(params[:id])
            @item_users = ItemUser.where(:user_id => @user.id) 

            respond_to do |format|
                format.html { render :show }
                format.json { render json: @item_users }
            end
        end
    end
    