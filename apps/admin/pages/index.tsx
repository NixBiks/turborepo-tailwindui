import type { NextPage } from "next";
import Head from "next/head";
import { Table } from "ui";

type People = {
  name: string;
  title: string;
  email: string;
  role: string;
};

const people: People[] = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tailwind UI</title>
        <meta name="description" content="Tailwind shared UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table
        pageTitle="Users"
        buttonLabel="Add user"
        pageDescription="A list of all the users in your account including their name, title, email and role."
        data={people.map((p) => ({
          cells: [p.name, p.title, p.email, p.role],
          key: p.email,
          href: "#",
        }))}
        columns={[
          { label: "Name", align: "left" },
          { label: "Title", align: "left" },
          { label: "Email", align: "left" },
          { label: "Role", align: "left" },
        ]}
      />
    </div>
  );
};

export default Home;
