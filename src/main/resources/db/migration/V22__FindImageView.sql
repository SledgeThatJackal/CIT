CREATE VIEW image_find AS
SELECT
    c.scanner_id, null AS item_id, it.file_name
FROM container_table c
INNER JOIN containerimages_table ci ON c.id = ci.container_id
INNER JOIN images_table it ON ci.image_id = it.id

UNION

SELECT
    c.scanner_id, i.id AS item_id, it.file_name
FROM item_table i
INNER JOIN itemimages_table ii ON i.id = ii.item_id
INNER JOIN images_table it ON ii.image_id = it.id
INNER JOIN containeritem_table ci ON i.id = ci.item_id
INNER JOIN container_table c ON c.id = ci.container_id;