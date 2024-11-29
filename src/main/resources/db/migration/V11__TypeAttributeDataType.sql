ALTER TABLE typeattributes_table ADD COLUMN data_type VARCHAR;

ALTER TABLE itemattributes_table RENAME COLUMN "value" TO string_value;

ALTER TABLE itemattributes_table ADD COLUMN number_value FLOAT8;

CREATE OR REPLACE FUNCTION add_itemattributes_typeattribute()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, typeattr_id, itemid)
    SELECT nextval('itemattributes_table_seq'), NEW.id, it.id
    FROM item_table AS it
    WHERE it.itemtype_id = NEW.itemtype_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_itemattributes_item()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, itemid, typeattr_id)
    SELECT nextval('itemattributes_table_seq'), NEW.id, ta.id
    FROM typeattributes_table AS ta
    WHERE ta.itemtype_id = NEW.itemtype_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_itemattributes()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM itemattributes_table AS ia
    WHERE ia.itemid = OLD.id;

    INSERT INTO itemattributes_table (id, typeattr_id, itemid)
    SELECT nextval('itemattributes_table_seq'), ta.id, NEW.id
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