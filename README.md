# README

### Family Market App

Family market app is a web application that allows families to list unused baby items (e.g. car seats, clothig, nursery furniture etc). Families can reserve items listed by other users, use them and return back to the original owner when they longer need the items.

At the moment, only registered users can view and add new items. When a user selects to reserve an item, the item no longer shows up on the listed items index. 

Users account page shows all items she has borrowed herself, including the email address of the owner so that the user can contact the owner in order to arrange the actual collection and return of an item. Once the user no longer needs the item she has reserved, she can arrange to return the item to the owner and mark item for return, making it available for other users.

The user can also view all items she has listed herself, including whether they are currently free or reserved. If an item has been borrowed by someone, the item's status shows up as reserved and the user can see the borrower's email address.

## Install

1. Clone [this repository](https://github.com/kpiipari/family_market_app)
2. Run `bundle install`

## Technical details

Family Market has been built using Rails 5. It uses Devise and OmniAuth (currently only Facebook) for user registration and authentication. The CSS layout is built using [Bulma](https://bulma.io/).
