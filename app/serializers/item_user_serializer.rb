class ItemUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id
  belongs_to :user, serializer: UserSerializer
  belongs_to :item, serializer: ItemSerializer
end
