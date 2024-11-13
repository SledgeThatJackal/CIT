import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContainer,
  createItem,
  createItemAttribute,
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
import { ItemAttribute, ItemSchemaType } from "@item/schemas/Item";
import { TagCreate, TagSchemaType } from "@schema/Tag";
import { ContainerType } from "@container/schemas/Container";
import { useErrorState } from "@hooks/state/useErrorState";

// Items
export function useCreateItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => createItem(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemSchemaType) => updateItem(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        // await queryClient.invalidateQueries({ queryKey: ["item", { id: variables.id }]})
      }
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteItem(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
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
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: ({ container, parentContainerId }: ContainerProps) =>
      createContainer(container, parentContainerId),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

export function useUpdateContainer() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    retry: false,
    mutationFn: (data: ContainerType) => updateContainer(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
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
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: ({ id, parentContainerId }: ParentContainerProps) =>
      updateParentContainer(id, parentContainerId),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
      }
    },
  });
}

export function useDeleteContainer() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteContainer(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
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
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: ({ itemId, containerId, quantity }: createLinkParams) =>
      createLink(itemId, containerId, quantity),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
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
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: ({ quantity, id }: quantityParams) =>
      updateQuantity(quantity, id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteLink(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Tags
export function useCreateTag() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: TagCreate) => {
      return createTag(data);
    },

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
      }
    },
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: TagSchemaType) => updateTag(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (id: number) => deleteTag(id),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["tags"] });
        await queryClient.refetchQueries({ queryKey: ["items"] });
      }
    },
  });
}

// Types
export function useCreateItemAttribute() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: ItemAttribute) => createItemAttribute(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        // set up invadliation
      }
    },
  });
}
