# CIT
v0.7.0
- Added the ability to upload a zip file to the server and create containers associated with them
  - This sets up a basic container with the name coming from the folder name inside of the zip file
    - Any images inside of that folder get associated with that container
- On the container page, you can now create an item and associate it with that container and optionally move some of the images on the container to it
- Added the ability to save your username and password with the browser's password manager

v0.6.0
- Set up GitHub actions to automatically increment the version number and create a Docker image when a branch is merged into the main branch
- Added a default value to type attributes that automatically sets the item attribute value and updates that value, if the default value changes and the item attribute value matches
- Set up a basic login page and security functionality for the application
- Added the ability to order images
  - The order is set based on where the images are in the modal in ascending order
  - The changed the order, you drag and drop the image based on where you want it to be in the list
- Set up a settings page
  - Currently, this page allows you to change what delimiter you want to use for duplicating items

v0.5.0
- Items can now have an external URL associated with them
  - This URL can be clicked when on the item table and it will open up in a new tab
- Added a tooltip to the item attributes area to inform you how to duplicate items and what delimiter to use
- Added the item name to the side canvas that allows you to edit item attributes
- Item attributes now have a type associated with them (text, number, boolean)
  - On the item table, you can now filter based on the item type
    - ex. If the type attribute has a type of number, you can now filter the column based on various things like a range of numbers, or if the number is less than a certain amount
- Added a version number to the NavBar

v0.4.0
- Images
  - Items can now have images associated with them
    - Clicking the image will cycle through them
    - Hovering over the image thumbnail will display a larger one
- Infinite Scrolling
  - Instead of using pagination on the item page, the page now has an infinite query setup
- Typed Tables
  - Above the table is now a select bar that allows you to switch types, this changes the displayed columns and filters the table based on type
- Item Duplication
  - Items now have a button to duplicate them
    - This will pull all of the information for that item into the Create page
  - When creating an item there is now the ability to create multiple duplicates of an item based on the item attributes
    - There's a checkbox next to the item attribute input if you toggle this on, if you create a delimited list, it will create duplicate items with the various attributes
      - This is set up to handle any number of attributes at once

v0.3.0
- Create Item Types
  - Custom fields for items based on type

v0.2.0
- New Item and Container Tables
  - Sorting, column filtering, and column resizing
  - Cell-based editing
  - Same page creating
- New Settings Page
  - Tags
    - Create, Edit, and Delete Tags
    - More options later
  - Type (WIP)

v0.1.3
- Made inline editing instead of using a modal

v0.1.2
- Edit page is now a modal on the item table page

v0.1.1
- Items can now have tags associated with them

v0.1.0
- Application now uses React to render frontend elements instead of Thymeleaf

v0.0.3
- Ability to link multiple containers when creating items
- Delete links between items and containers
- Edit items and their associated links

v0.0.2
- Fixed random bugs that caused crashes
- Changed minor aesthetics

v0.0.1
- Basic CRUD functionality for containers and objects
