import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BGM Factory</title>
        <meta name="description" content="Help your sleep" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="player"></div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/iu-CYRHgJ3M?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Home;
