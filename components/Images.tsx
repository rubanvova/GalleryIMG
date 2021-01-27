import React from 'react';
import styles from './Images.module.css';

type Props = {
  items: [];
};

const Images: React.FC<Props> = ({ items }) => (
  <div className={styles.containerImages}>
    {(items || []).map((i: any) => (
      <img className={styles.img} key={i.id} src={i.webformatURL} alt="" />
    ))}
  </div>
);

export default Images;
