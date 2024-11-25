CREATE TABLE containerimages_table (
    container_id BIGINT NOT NULL,
    image_id BIGINT NOT NULL,
    PRIMARY KEY (container_id, image_id),
    FOREIGN KEY (container_id) REFERENCES container_table(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images_table(id) ON DELETE CASCADE
);