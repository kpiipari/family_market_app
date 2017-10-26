class MarketController < ApplicationController

    def index
        @users = User.all
    end
end
