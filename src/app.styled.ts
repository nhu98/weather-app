import { Theme } from './theme';

declare module 'styled-components' {
  /* tslint:disable */
  export type DefaultTheme = Theme;
}
