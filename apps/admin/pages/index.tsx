import type { NextPage } from "next";
import Head from "next/head";
import { DomainTable } from "ui";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tailwind UI</title>
        <meta name="description" content="Tailwind shared UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DomainTable />
    </div>
  );
};

export default Home;
