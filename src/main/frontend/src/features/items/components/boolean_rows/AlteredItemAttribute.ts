import { ItemAttribute } from "@item/schemas/Item";

export const alterItemAttribute = (old: ItemAttribute, value: any) => {
  switch (old.typeAttribute.dataType) {
    case "STRING": {
      return {
        ...old,
        stringValue: value,
      };
    }
    case "NUMBER":
    case "BOOLEAN": {
      return {
        ...old,
        numberValue: value,
      };
    }
  }

  return old;
};
