import React, { ReactElement } from "react";
import styles from './loading.module.scss';

type LoadingProps = {
  children: ReactElement;
  isLoading: boolean;
};

export const Loading = ({ children, isLoading }: LoadingProps) => {
  return (
    <>{isLoading ? <div className={styles.loading}>Loading...</div> : children}</>
  );
};

export default Loading;
