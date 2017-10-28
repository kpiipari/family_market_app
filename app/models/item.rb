class Item < ApplicationRecord
    has_many :item_tags
    has_many :tags, through: :item_tags
    has_many :users, through: :item_users
    has_many :item_users
    belongs_to :category
    
    def reserve
        self.status = "reserved"
        self.save
        get_user_email
    end

    def get_user_email
        item_user = ItemUser.find_by(item_id: self.id)
        user = User.find(item_user.user_id)
        user.email 
    end
end
