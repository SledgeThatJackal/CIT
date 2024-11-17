CREATE OR REPLACE FUNCTION add_itemattributes_typeattribute()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, typeattr_id, itemid, "value")
    SELECT nextval('itemattributes_table_seq'), NEW.id, it.id, ''
    FROM item_table AS it
    WHERE it.itemtype_id = NEW.itemtype_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER typeattributes_table_add_itemattributes
AFTER INSERT ON typeattributes_table
FOR EACH ROW
EXECUTE FUNCTION add_itemattributes_typeattribute();