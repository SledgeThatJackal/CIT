import React from "react";

import { Tag } from "@schema/Tag";

type TagProps = {
  tag: Tag;
};

const TagBadge = ({ tag }: TagProps) => {
  const tagColor = tag.color.replace("#", "");

  // Darken base color
  const colorValue = (parseInt(tagColor, 16) & 0xfefefe) >> 1;

  // Turn the numbered color back into a hex number and pad the start, if there's not enough values
  const darkerColor = `#${colorValue.toString(16).padStart(6, "0")}`;

  return (
    <div
      className="d-inline-flex badge rounded-pill align-items-center shadow"
      style={{
        backgroundColor: tag.color,
        border: `3px solid ${darkerColor}`,
        cursor: "default",
        userSelect: "none",
      }}
      title={tag.description}>
      <span
        style={{
          color: darkerColor,
          whiteSpace: "nowrap",
        }}>
        {tag.tag}
      </span>
    </div>
  );
};

export default TagBadge;
