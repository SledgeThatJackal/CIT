import { useDetailContext } from "@app/pages/container/DetailedContainerPage";
import { Image } from "@schema/Image";
import React from "react";
import { Carousel, Container } from "react-bootstrap";
import DetailGrid from "./DetailGrid";

export type DataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerItems: any;
};

const DetailBody = <T extends DataType, S extends Image>() => {
  const data = useDetailContext<T>();

  return (
    <Container>
      <Container className="info-container">
        <Container className="detail-list">
          {Object.entries(data).map(([key, value]) => {
            if (key !== "images" && key !== "containerItems")
              return (
                <div className="detail-list-item" key={`detail-item-${key}`}>
                  <strong>{`${setProperCase(key)}:`}</strong>
                  <span>{String(value)}</span>
                </div>
              );
          })}
        </Container>
        <Container className="carousel-container">
          {data.images && data.images.length > 0 ? (
            <Carousel>
              {data.images.map((element: S) => (
                <Carousel.Item
                  key={`image-carousel-${element.image.id}`}
                  className="w-100 h-100">
                  <img
                    className="w-100 h-100"
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
        <Container className="grid-container">
          <DetailGrid />
        </Container>
      )}
    </Container>
  );
};

export const setProperCase = (str: string) => {
  return (
    str.substring(0, 1).toLocaleUpperCase() +
    str.substring(1).toLocaleLowerCase()
  );
};

export default DetailBody;
