class Item < ApplicationRecord

    has_many :users, through: :item_users
    has_many :item_users, dependent: :destroy
    has_many :reserved_items
    belongs_to :category
 

    validates :title, :category_name, presence: true

    scope :by_status, -> status { where(status: status) }

    attr_accessor :category_name

    def category_name=(name)
        self.category = Category.find_or_create_by(name: name)
    end

    def reserve
        self.status = "reserved"
        self.save
    end

    def get_user_email
        item_user = ItemUser.find_by(item_id: self.id)
        user = User.find(item_user.user_id)
        user.email 
    end

    def return
        self.status = "free"
        self.save
    end

    
end
