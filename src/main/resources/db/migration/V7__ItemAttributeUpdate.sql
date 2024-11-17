CREATE OR REPLACE FUNCTION add_itemattributes_item()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, itemid, typeattr_id, "value")
    SELECT nextval('itemattributes_table_seq'), NEW.id, ta.id, ''
    FROM typeattributes_table AS ta
    WHERE ta.itemtype_id = NEW.itemtype_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER item_table_create_itemattributes_table
AFTER INSERT ON item_table
FOR EACH ROW
EXECUTE FUNCTION add_itemattributes_item();

CREATE OR REPLACE FUNCTION update_itemattributes()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM itemattributes_table AS ia
    WHERE ia.itemid = OLD.id;

    INSERT INTO itemattributes_table (id, typeattr_id, itemid, "value")
    SELECT nextval('itemattributes_table_seq'), ta.id, NEW.id, ''
    FROM typeattributes_table AS ta
    WHERE ta.itemtype_id = NEW.itemtype_id
    AND NOT EXISTS (
        SELECT 1
        FROM itemattributes_table AS ia
        WHERE ia.itemid = NEW.id
            AND ia.typeattr_id = ta.id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER item_table_update_itemattributes
AFTER UPDATE ON item_table
FOR EACH ROW
WHEN (OLD.itemtype_id != NEW.itemtype_id)
EXECUTE FUNCTION update_itemattributes();