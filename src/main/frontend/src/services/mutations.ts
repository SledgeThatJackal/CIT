/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContainerType } from "@container/schemas/Container";
import { useErrorState } from "@hooks/state/useErrorState";
import { TagCreate, TagSchemaType } from "@schema/Tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  zipContainerCreate,
  createContainer,
  createImage,
  createLink,
  createTag,
  deleteContainer,
  deleteLink,
  deleteTag,
  updateContainer,
  updateParentContainer,
  updateQuantity,
  updateTag,
} from "./api";

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
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
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
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
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
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
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

        await queryClient.invalidateQueries({
          queryKey: ["containers"],
        });

        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
      }
    },
  });
}

export function useBulkContainerCreate() {
  const queryClient = useQueryClient();
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: FormData) => zipContainerCreate(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
        });
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
        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
        });
        await queryClient.invalidateQueries({ queryKey: ["container"] });
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
        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["item"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["container"],
        });
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
        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
        await queryClient.invalidateQueries({
          queryKey: ["detailedContainers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["containers"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["item"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["container"],
        });
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
        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
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
        await queryClient.invalidateQueries({ queryKey: ["infiniteItems"] });
      }
    },
  });
}

// Images
export function useCreateImage() {
  const { displayError } = useErrorState();

  return useMutation({
    mutationFn: (data: FormData) => createImage(data),

    onError: (error: any) => {
      displayError(error.response.data.message);
    },

    onSettled: async (_, error) => {
      if (!error) {
        // do something most likely
      }
    },
  });
}
