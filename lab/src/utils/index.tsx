import { PropsWithChildren, ReactElement } from 'react';

/**
 * The function `createLayout` takes a layout component and returns a higher-order function that takes
 * a page component and wraps it with the layout component.
 * @param Layout - The `Layout` parameter is a React functional component that takes
 * `PropsWithChildren` as its props. It is used to define the layout structure of a page.
 * @returns The function `createLayout` returns a higher-order function that takes a `Page` component
 * as an argument and returns a new component that wraps the `Page` component with the `Layout`
 * component.
 */
export const createLayout = (Layout: React.FC<PropsWithChildren>) => {
  // eslint-disable-next-line react/display-name
  return function (Page: ReactElement) {
    return <Layout>{Page}</Layout>;
  };
};
