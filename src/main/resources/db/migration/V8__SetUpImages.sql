CREATE TABLE images_table (
    id BIGINT PRIMARY KEY,
    file_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE itemimages_table (
    item_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,
    PRIMARY KEY (item_id, image_id),
    FOREIGN KEY (item_id) REFERENCES item_table(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images_table(id) ON DELETE CASCADE
);

CREATE INDEX idx_image_id ON itemimages_table(image_id);