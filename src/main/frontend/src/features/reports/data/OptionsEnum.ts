import { useOptionsContext } from "@report/data/OptionsProvider";
import { useBasicContainers, useBasicItems } from "@services/queries";
import { UseQueryResult } from "@tanstack/react-query";

export class OptionsEnum {
  private static values: OptionsEnum[] = [];

  static readonly Item = new OptionsEnum("Item");
  static readonly Container = new OptionsEnum("Container");

  private constructor(public readonly name: string) {
    OptionsEnum.values.push(this);
  }

  ordinal(): number {
    return OptionsEnum.values.indexOf(this);
  }

  type() {
    return [][this.ordinal()];
  }

  fetchingFunction(): () => UseQueryResult<unknown, Error> {
    return [useFetchItemOptions, useFetchContainerOptions][this.ordinal()];
  }

  getContext(): () => unknown {
    return useOptionsContext;
  }

  toString(): string {
    return this.name;
  }
}

const useFetchItemOptions = () => {
  return useBasicItems();
};

const useFetchContainerOptions = () => {
  return useBasicContainers();
};
