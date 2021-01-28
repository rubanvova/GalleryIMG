import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import styles from './styles.module.css';

import ReactPaginate from 'react-paginate';
import Images from '../components/Images';

const TOTAL = 36;
const API = `https://pixabay.com/api/?key=20034979-06688ffb500e619eb5a632699&q=key&image_type=photo&per_page=${TOTAL}&page=`;

const Index: React.FC = () => {
  const [state, setState] = useState<[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get(API + pageNumber)
      .then((res) => {
        setPageCount(Math.floor(res.data.totalHits / TOTAL));
        setState(res.data.hits);
      })
      .catch((err) => console.log(err));
  }, [pageNumber]);

  const handlerChange = (data: any) => {
    const selcted = data.selected;
    setPageNumber(selcted + 1);
  };

  return (
    <Layout>
      <Images items={state} />
      <div className={styles.wrap}>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={handlerChange}
          activeClassName={styles.active}
        />
      </div>
    </Layout>
  );
};

export default Index;
