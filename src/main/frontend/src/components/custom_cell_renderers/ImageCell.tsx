import React, { useMemo, useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { ItemImageType } from "@schema/Image";
import { OverlayTrigger } from "react-bootstrap";
import { useModalState } from "@hooks/state/useModalState";
import ImageEdit from "@item/components/image/ImageEdit";
import { useAttributeState } from "@item/hooks/useAttributeState";

const ImageCell = <T, S extends ItemImageType[]>(
  context: CellContext<T, S>,
) => {
  const [index, setIndex] = useState<number>(0);
  const images: ItemImageType[] = context.getValue();
  const { openElementModal } = useModalState();
  const { setContext } = useAttributeState();

  const displayedImage = useMemo(() => {
    return images.length > 0
      ? `/api/image/${images[index].image.fileName}`
      : "";
  }, [index, images]);

  const handleOnClick = () => {
    const newIndex = (index + 1) % images.length;

    setIndex(newIndex);
  };

  const handleRightClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    event.preventDefault();
    openElementModal("Edit Images", "Save", handleSubmit, ImageEdit);
    setContext(context);
  };

  const handleSubmit = () => {
    const { data } = useAttributeState.getState();
    if (!data) return;

    context.table.options.meta?.updateData(
      context.row.index,
      context.column.id,
      data,
    );
  };

  return (
    <div className="d-flex justify-content-center">
      {images.length > 0 ? (
        <OverlayTrigger
          key={`imageOverlay-${index}`}
          placement="right"
          overlay={<ImageOverlay source={displayedImage} />}>
          <img
            src={displayedImage}
            onClick={handleOnClick}
            width="50"
            height="50"
            style={images.length > 1 ? { cursor: "pointer" } : {}}
            draggable={false}
            alt="Item Image"
            onContextMenu={handleRightClick}
          />
        </OverlayTrigger>
      ) : (
        <div
          title="Right Click to Edit"
          className="w-100"
          style={{ height: "50px" }}
          onContextMenu={handleRightClick}></div>
      )}
    </div>
  );
};

export default ImageCell;

type ImageOverlayProps = {
  source: string;
  arrowProps?: any;
  hasDoneInitialMeasure?: any;
};

const ImageOverlay = React.forwardRef<HTMLImageElement, ImageOverlayProps>(
  ({ source, arrowProps, hasDoneInitialMeasure, ...rest }, ref) => {
    return <img ref={ref} {...rest} src={source} width="500" height="auto" />;
  },
);
