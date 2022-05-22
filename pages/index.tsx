import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BGM Factory</title>
        <meta name="description" content="Help your sleep" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul className="p-10 grid gap-5 justify-self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li className="bgm-category-box">WORK</li>
        <li className="bgm-category-box">SLEEP</li>
      </ul>

      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/iu-CYRHgJ3M?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}
    </div>
  );
};

export default Home;
