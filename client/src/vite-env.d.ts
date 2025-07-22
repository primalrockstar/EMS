/// <reference types="vite/client" />
/// <reference types="@tanstack/react-query" />
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}
declare module 'shared' {
  export const someFunction: () => void;
}
