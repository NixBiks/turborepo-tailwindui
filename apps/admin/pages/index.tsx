import type { NextPage } from "next";
import Head from "next/head";
import Table from "ui/Table";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tailwind UI</title>
        <meta name="description" content="Tailwind shared UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table />
    </div>
  );
};

export default Home;
