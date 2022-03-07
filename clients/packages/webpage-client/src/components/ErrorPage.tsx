import React from 'react';

import Head from 'next/head';
import styled from '@emotion/styled';

import Bonde from './Bonde';

const Fullpage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 52px;
  font-family: 'Roboto', sans-serif;

  .main {
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 120px 0 0;
  }

  .content {
    max-width: 428px;
    margin-left: 70px;

    h2 {
      font-size: 60px;
      font-weight: 900;
      line-height: 66px;
      margin: 20px 0;
    }

    p {
      font-size: 18px;
      line-height: 27px;
      margin: 10px 0;
    }

    a {
      color: rgb(233, 97, 184);
    }
  }

  @media screen and (max-width: 991px) {
    padding: 0 29px;

    .main {
      flex-direction: column;
      margin: 0;

      img {
        width: 100%;
      }

      .content {
        margin-left: 0;
      }
    }
  }
`;

export default function ErrorPage({ children }: any) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://static.bonde.org/static/images/icon/favicon-16.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Fullpage>
        <Bonde />
        <div className="main">{children}</div>
      </Fullpage>
    </>
  );
}
