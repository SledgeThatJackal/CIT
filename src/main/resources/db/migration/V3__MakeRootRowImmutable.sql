CREATE OR REPLACE FUNCTION prevent_update_delete_on_root_row()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.id = -1 THEN
        RAISE EXCEPTION 'The root row cannot be modified or deleted.';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER root_row_immutable
BEFORE UPDATE OR DELETE ON itemtype_table
FOR EACH ROW
WHEN (OLD.id = -1)
EXECUTE FUNCTION prevent_update_delete_on_root_row();