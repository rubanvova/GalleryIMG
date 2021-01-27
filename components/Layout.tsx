import React, { ReactNode } from 'react';
import Head from 'next/head';
import ShowTimer from './Timer';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = 'images' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    {children}
    <footer>
      <hr />
      <ShowTimer date={'January 28 2021 00:10:00'} />
    </footer>
  </div>
);

export default Layout;
