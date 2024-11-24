# CIT
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
    - There's a checkbox next to the item attribute input if you toggle this on, if you create a | delimited list, it will create duplicate items with the various attributes
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
