class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :category, :item_users, :tags
  belongs_to :category, serializer: CategorySerializer
  #belongs_to :user, serializer: UserSerializer
  has_many :tags
  has_many :item_users

  private

  def category_name
    CategorySerializer.new(object.category_name).attributes
  end

  def item_users
    ItemUserSerializer.new(object.item_users).attributes
  end

  def tags
    TagSerializer.new(object.tags).attributes
  end

end
