import { Image } from "@schema/Image";
import React, { useMemo, useState } from "react";
import { Button, Carousel, Container } from "react-bootstrap";
import DetailGrid from "./DetailGrid";
import { useDetailContext } from "@hooks/data/useDetailContext";
import { ItemAttribute } from "@item/schemas/Item";
import DetailAdd from "./DetailAdd";

export type DataType = {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerItems: any;
};

export type DetailContextValueType<T, S> = {
  data: T;
  menuData: S[];
};

const DetailBody = <T extends DataType, S extends Image>() => {
  const { data } = useDetailContext<DetailContextValueType<T, unknown>>();
  const keyValues = useMemo(() => extractValues(data), [data]);
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <Container>
      <Container className="info-container">
        <Container className="detail-list">
          {keyValues &&
            keyValues.map(({ key, value }: { key: string; value: string }) => (
              <div className="detail-list-item" key={`detail-item-${key}`}>
                <strong>{`${setProperCase(key)}:`}</strong>
                <span className="detail-list-span">{String(value)}</span>
              </div>
            ))}
        </Container>
        <Container className="detail-carousel-container">
          {data.images && data.images.length > 0 ? (
            <Carousel>
              {data.images.map((element: S) => (
                <Carousel.Item key={`image-carousel-${element.image.id}`}>
                  <img
                    src={`/api/image/${element.image.fileName}`}
                    alt={`Image- ${element.image.fileName}`}
                    draggable={false}
                  />
                  <Carousel.Caption>{element.image.fileName}</Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div>No images to display</div>
          )}
        </Container>
      </Container>
      {data.containerItems.length > 0 && (
        <Container fluid className="detail-grid">
          <DetailGrid />
          {show ? (
            <Container fluid style={{ marginTop: "12px" }}>
              <DetailAdd toggleShow={toggleShow} />
            </Container>
          ) : (
            <div className="detail-grid-button">
              <Button size="sm" title="Add New Row" onClick={toggleShow}>
                <i className="bi bi-plus" />
              </Button>
            </div>
          )}
        </Container>
      )}
    </Container>
  );
};

export const setProperCase = (str: string) => {
  return (
    str
      // Add a space between the lower and uppercase letters
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Capitalize the first letter
      .replace(/^./, (char) => char.toUpperCase())
  );
};

const extractObjectValues = (value: Record<string, unknown>): string => {
  return Object.entries(value)
    .filter(([key, subValue]) => !isUnwantedValue(key) && subValue)
    .map(([key, subValue]) => {
      if (typeof subValue === "object" && !Array.isArray(subValue))
        return extractObjectValues(subValue as Record<string, unknown>);

      return `${key === "name" ? "" : `${setProperCase(key)}: `}${subValue}`;
    })
    .join("\n");
};

const extractArrayValues = (array: unknown[]): string => {
  return array
    .map((element) => {
      if (typeof element === "object" && !Array.isArray(element)) {
        return extractObjectValues(element as Record<string, unknown>);
      }

      return String(element);
    })
    .filter(Boolean)
    .join("\n");
};

const extractValues = (
  data: Record<string, unknown>,
  parentKey = "",
  result: { key: string; value: string }[] = [],
) => {
  for (const [key, value] of Object.entries(data)) {
    const nestedKey = parentKey ? `${parentKey}.${key}` : key;
    if (nestedKey === "containerItems" || nestedKey === "images") continue;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      result.push({
        key,
        value: extractObjectValues(value as Record<string, unknown>),
      });
    } else if (Array.isArray(value)) {
      if (isItemAttribute(value[0])) {
        result.push({ key, value: extractItemAttributes(value) });
      } else {
        result.push({ key, value: extractArrayValues(value) });
      }
    } else if (value !== null) {
      result.push({ key: nestedKey, value: String(value) });
    }
  }

  return result;
};

function isItemAttribute(obj: unknown): obj is ItemAttribute {
  return (obj as ItemAttribute)?.typeAttribute !== undefined;
}

const extractItemAttributes = (attributes: ItemAttribute[]): string => {
  return attributes
    .map(
      (attribute) =>
        `${attribute.typeAttribute.columnTitle}: ${attribute.numberValue ? attribute.numberValue : attribute.stringValue}`,
    )
    .join("\n");
};

const unwantedValues = new Set([
  "id",
  "color",
  "itemType",
  "displayOrder",
  "dataType",
  "stringDefaultValue",
  "numberDefaultValue",
  "containerItems",
  "images",
]);

const isUnwantedValue = (key: string) => unwantedValues.has(key);

export default DetailBody;
