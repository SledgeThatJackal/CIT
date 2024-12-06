CREATE OR REPLACE FUNCTION add_itemattributes_typeattribute()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, typeattr_id, itemid, string_value, number_value)
    SELECT nextval('itemattributes_table_seq'), NEW.id, it.id, NEW.string_default_value, NEW.number_default_value
    FROM item_table AS it
    WHERE it.itemtype_id = NEW.itemtype_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_itemattributes_item()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO itemattributes_table (id, itemid, typeattr_id, string_value, number_value)
    SELECT nextval('itemattributes_table_seq'), NEW.id, ta.id, ta.string_default_value, ta.number_default_value
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

    INSERT INTO itemattributes_table (id, typeattr_id, itemid, string_value, number_value)
    SELECT nextval('itemattributes_table_seq'), ta.id, NEW.id, ta.string_default_value, ta.number_default_value
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

CREATE OR REPLACE FUNCTION update_itemattributes_defaultvalues()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE itemattributes_table
    SET string_value = NEW.string_default_value
    WHERE typeattr_id = NEW.id
      AND (string_value = OLD.string_default_value OR string_value IS NULL);

    UPDATE itemattributes_table
    SET number_value = NEW.number_default_value
    WHERE typeattr_id = NEW.id
      AND (number_value = OLD.number_default_value OR number_value IS NULL);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER typeattributes_table_update_itemattributes_defaultvalues
AFTER UPDATE OF string_default_value, number_default_value ON typeattributes_table
FOR EACH ROW
EXECUTE FUNCTION update_itemattributes_defaultvalues();