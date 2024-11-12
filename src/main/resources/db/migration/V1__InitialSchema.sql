CREATE TABLE container_table (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    scanner_id VARCHAR(255),
    parent_id BIGINT,
    FOREIGN KEY (parent_id) REFERENCES container_table(id) ON DELETE SET NULL
);

CREATE TABLE itemtype_table (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE tags_table (
    id BIGINT PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    color VARCHAR(255) NOT NULL
);

CREATE TABLE item_table (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    itemtype_id BIGINT,
    FOREIGN KEY (itemtype_id) REFERENCES itemtype_table(id) ON DELETE SET NULL
);

CREATE TABLE typeattributes_table (
    id BIGINT PRIMARY KEY,
    itemtype_id BIGINT NOT NULL,
    display_order INTEGER,
    column_title VARCHAR(255) NOT NULL,
    FOREIGN KEY (itemtype_id) REFERENCES itemtype_table(id) ON DELETE CASCADE
);

CREATE TABLE containeritem_table (
    id BIGINT PRIMARY KEY,
    container_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    FOREIGN KEY (container_id) REFERENCES container_table(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item_table(id) ON DELETE CASCADE
);

CREATE TABLE itemattributes_table (
    id BIGINT PRIMARY KEY,
    item_id BIGINT NOT NULL,
    typeattr_id BIGINT NOT NULL,
    "value" VARCHAR(255),
    FOREIGN KEY (item_id) REFERENCES item_table(id) ON DELETE CASCADE,
    FOREIGN KEY (typeattr_id) REFERENCES typeattributes_table(id) ON DELETE CASCADE
);

CREATE TABLE itemtag_table (
    item_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, tag_id),
    FOREIGN KEY (item_id) REFERENCES item_table(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags_table(id) ON DELETE CASCADE
);