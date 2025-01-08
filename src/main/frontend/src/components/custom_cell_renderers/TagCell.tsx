import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Form, Stack } from "react-bootstrap";

import TagBadge from "@tag/components/TagBadge";

import { Tag } from "@schema/Tag";
import { createPortal } from "react-dom";
import { CellContext } from "@tanstack/react-table";
import GenericMenu from "@components/general/GenericMenu";

const tagStringCompare = (tag1: Tag, tag2: Tag) => {
  return tag1.tag.localeCompare(tag2.tag);
};

const TagCell = <T, S extends Tag[]>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, S>) => {
  const [value, setValue] = useState<Tag[]>(getValue());

  const [show, setShow] = useState<boolean>(false);
  const dropdownToggle = () => {
    handleResize();
    setShow(!show);
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const handleResize = () => {
    if (targetRef.current) {
      const { width, height, x, y } = targetRef.current.getBoundingClientRect();
      setDimensions({ width, height, x, y });
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);

    if (targetRef.current) {
      resizeObserver.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        resizeObserver.unobserve(targetRef.current);
      }
    };
  }, []);

  const addTag = (newTag: Tag) => {
    const newValue = [...value, newTag];

    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  const removeTag = (tagToRemove: Tag) => {
    const newValue = value.filter((tag) => tag.id !== tagToRemove.id);

    setValue(newValue);
    table.options.meta?.updateData(index, id, newValue);
  };

  return (
    <Stack
      direction="horizontal"
      gap={1}
      ref={targetRef}
      key={`tagCell-${id}-${index}`}>
      <React.Fragment key={`tagCellBadges-${id}-${index}`}>
        {value &&
          value.length > 0 &&
          value
            .sort((a, b) => tagStringCompare(a, b))
            .map((tag) => (
              <TagBadge {...tag} key={`tagBadge-${index}-${tag.id}`} />
            ))}
      </React.Fragment>
      <Dropdown
        className="d-inline-flex ms-auto"
        show={show}
        onToggle={dropdownToggle}
        title="Edit Tags">
        <Dropdown.Toggle className="ms-auto" variant="secondary">
          <i className="bi bi-gear" style={{ fontSize: "14px" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} show={show} dimensions={dimensions}>
          <GenericMenu
            currentData={value}
            type="Tag"
            filterProperty="tag"
            addObject={addTag}
            removeObject={removeTag}
            Component={TagBadge}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

type CustomMenuProps = {
  show: boolean;
  children: any;
  dimensions: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
};

const CustomMenu = React.forwardRef<HTMLDivElement, CustomMenuProps>(
  ({ show, children, dimensions }, ref) => {
    return show
      ? createPortal(
          <div
            ref={ref}
            className="dropdown-menu show"
            style={{
              position: "absolute",
              zIndex: 1050,
              overflowY: "auto",
              height: "300px",
              width: `${dimensions.width}px`,
              left: `${dimensions.x}px`,
              top: `${dimensions.y + dimensions.height + 3}px`,
            }}>
            {children}
          </div>,
          document.body,
        )
      : null;
  },
);

export default TagCell;
