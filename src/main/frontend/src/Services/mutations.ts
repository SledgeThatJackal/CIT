import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContainer,
  createItem,
  createLink,
  createTag,
  deleteContainer,
  deleteItem,
  deleteLink,
  deleteTag,
  updateContainer,
  updateItem,
  updateParentContainer,
  updateQuantity,
  updateTag,
} from "./api";
import { ItemSchemaType } from "@item/schemas/Item";
import { TagCreate, TagSchemaType } from "@schema/Tag";
import { ContainerType } from "@container/schemas/Container";

// Items
export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => createItem(data),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => updateItem(data),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        // await queryClient.invalidateQueries({ queryKey: ["item", { id: variables.id }]})
      }
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Containers
type ContainerProps = {
  container: ContainerType;
  parentContainerId?: number;
};

export function useCreateContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ container, parentContainerId }: ContainerProps) =>
      createContainer(container, parentContainerId),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

export function useUpdateContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ContainerType) => updateContainer(data),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

type ParentContainerProps = {
  id: number;
  parentContainerId: number;
};

export function useUpdateParentContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, parentContainerId }: ParentContainerProps) =>
      updateParentContainer(id, parentContainerId),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

export function useDeleteContainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteContainer(id),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });

        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Links
type createLinkParams = {
  itemId: number;
  containerId: number;
  quantity: number;
};

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, containerId, quantity }: createLinkParams) =>
      createLink(itemId, containerId, quantity),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

type quantityParams = {
  quantity: number;
  id: number;
};

export function useUpdateQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quantity, id }: quantityParams) =>
      updateQuantity(quantity, id),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLink(id),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Tags
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TagCreate) => {
      return createTag(data);
    },

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
      }
    },
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TagSchemaType) => updateTag(data),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTag(id),

    onSettled: async (_, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
        await queryClient.refetchQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Types
