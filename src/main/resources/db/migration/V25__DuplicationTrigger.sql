CREATE OR REPLACE FUNCTION handle_duplicate_itemattributes()
RETURNS TRIGGER AS $$
DECLARE
    existing_id INT;
BEGIN
    IF NEW.placeholder IS NOT NULL THEN
        SELECT id INTO existing_id FROM itemattributes_table
        WHERE itemid = NEW.itemid
        AND typeattr_id = NEW.typeattr_id
        LIMIT 1;

        IF FOUND THEN
            UPDATE itemattributes_table
            SET placeholder = existing_id
            WHERE id = existing_id;

            RETURN NULL;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER itemattributes_import_duplication_trigger
BEFORE INSERT ON itemattributes_table
FOR EACH ROW
EXECUTE FUNCTION handle_duplicate_itemattributes();