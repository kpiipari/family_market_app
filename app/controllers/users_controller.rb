class UsersController < ApplicationController
    
        def show
            @user = User.find(params[:id])
            @item_users = ItemUser.where(:user_id => @user.id) 
        end
    end
    