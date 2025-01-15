CREATE TABLE settings_table (
    id BIGINT PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL
);

CREATE SEQUENCE settings_table_seq START WITH 1 INCREMENT BY 50;