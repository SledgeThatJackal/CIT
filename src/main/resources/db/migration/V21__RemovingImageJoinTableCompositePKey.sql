CREATE SEQUENCE containerimages_table_seq START WITH 1 INCREMENT BY 50;

ALTER TABLE itemimages_table DROP CONSTRAINT IF EXISTS itemimages_table_pkey;
ALTER TABLE itemimages_table ADD COLUMN id BIGINT DEFAULT nextval('itemimages_table_seq') PRIMARY KEY;

ALTER TABLE containerimages_table DROP CONSTRAINT IF EXISTS containerimages_table_pkey;
ALTER TABLE containerimages_table ADD COLUMN id BIGINT DEFAULT nextval('containerimages_table_seq') PRIMARY KEY;