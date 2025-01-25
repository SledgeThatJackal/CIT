import { ReadSortable, WriteSortable } from "@components/dnd/Sortable";
import GenericMenu from "@components/general/GenericMenu";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
  Active,
  Over,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ImageType } from "@schema/Image";
import React, {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Button,
  CloseButton,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

type ImageInputType<T extends ImageType> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onRemove: (index: number) => void;
  handleAdd: (element: T, order: number) => void;
  handleRemove: (element: T) => void;
  onDragEnd: (images: ImageType[]) => void;
  data: T[];
  buttonWidth: number;
};

const ImageInput = <T extends ImageType>({
  onChange,
  onRemove,
  handleAdd,
  handleRemove,
  onDragEnd,
  data,
  buttonWidth,
}: ImageInputType<T>) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const onAdd = (image: T) => {
    dispatch({
      type: ImageActionKind.ADD,
      image: image,
    });

    handleAdd(image, data.length);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [images, dispatch] = useReducer<Reducer<ImageType[], ImageAction>>(
    imagesReducer,
    data,
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    dispatch({
      type: ImageActionKind.REORDER,
      active: active,
      over: over,
    });

    setTrigger(true);

    setActiveId(null);
    setOverId(null);
  }, []);

  const removeImage = useCallback(
    (index: number) => {
      onRemove(index);

      dispatch({
        type: ImageActionKind.REMOVE,
        id: images[index].id,
      });
    },
    [onRemove, images],
  );

  useEffect(() => {
    if (trigger && data !== images) {
      onDragEnd(images);
      setTrigger(false);
    }
  }, [data, images, onDragEnd, trigger]);

  return (
    <React.Fragment>
      <Row>
        <Col className="p-0">
          <Form.Control
            type="file"
            onChange={onChange}
            multiple
            accept="image/*"
            style={{ display: "none" }}
            ref={fileUploadRef}
          />
          <InputGroup
            title={data.length < 1 ? "No file chosen" : `${data.length} files`}>
            <Button
              variant="secondary"
              id="customFileInput"
              style={{ width: `${buttonWidth}%` }}
              onClick={handleButtonClick}>
              Choose File(s)
            </Button>
            <InputGroup.Text
              as="label"
              htmlFor="customFileInput"
              style={{ cursor: "pointer", width: `${100 - buttonWidth * 2}%` }}>
              {data.length < 1 ? "No file chosen" : `${data.length} files`}
            </InputGroup.Text>

            <Dropdown drop="start">
              <Dropdown.Toggle
                className="ms-0 pe-1"
                variant="light"
                size="sm"
                style={{ width: `${buttonWidth}%`, border: "none" }}>
                Existing
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="p-2 w-75"
                style={{ maxHeight: "30vh", overflowY: "auto" }}>
                <GenericMenu
                  currentData={data}
                  type="Image"
                  filterProperty="fileName"
                  addObject={onAdd}
                  removeObject={handleRemove}
                  Component={ImageRow}
                />
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Col>
      </Row>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={(event) => setOverId(event.over?.id ?? null)}>
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map((field, index) => (
            <Row
              key={`image-${field.id}`}
              className="pb-2 pt-2 mt-2 align-items-center rounded"
              style={{
                border: "2px solid black",
                background:
                  overId?.toString() === field.fileName
                    ? "#FFFFBF"
                    : "darkGray",
              }}>
              <Col md={11}>
                <WriteSortable
                  key={`imageSortable-${index}`}
                  id={field.fileName}
                  isOver={overId?.toString() === field.fileName}>
                  <div className="text-dark">{field.fileName}</div>
                </WriteSortable>
              </Col>
              <Col md={1} className="p-0 d-flex justify-content-center">
                <CloseButton onClick={() => removeImage(index)} />
              </Col>
            </Row>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div
              className="rounded bg-dark text-light"
              style={{ cursor: "grabbing", opacity: "50%" }}>
              <ReadSortable id={activeId} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </React.Fragment>
  );
};

const ImageRow = (image: ImageType) => {
  return <span>{image.fileName}</span>;
};

export default ImageInput;

enum ImageActionKind {
  ADD = "ADD",
  REORDER = "REORDER",
  REMOVE = "REMOVE",
}

type ImageAction = {
  type: ImageActionKind;
  image?: ImageType;
  id?: number;
  active?: Active;
  over?: Over | null;
  onDragEnd?: (images: ImageType[]) => void;
};

function imagesReducer(images: ImageType[], action: ImageAction) {
  switch (action.type) {
    case ImageActionKind.ADD: {
      if (action.image) return [...images, action.image];

      return images;
    }

    case ImageActionKind.REORDER: {
      const { over, active } = action;

      if (over && active && action.id !== over.id) {
        const oldPosition = images.findIndex(
          (image) => image.fileName === active?.id,
        );

        const newPosition = images.findIndex(
          (image) => image.fileName === over?.id,
        );

        const newImages = arrayMove(images, oldPosition, newPosition);

        return newImages;
      }

      return images;
    }

    case ImageActionKind.REMOVE: {
      const updatedImages = [...images];

      return updatedImages.filter((image) => image.id !== action?.id);
    }

    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}
