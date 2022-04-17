import faker from "@faker-js/faker";

export type Person = {
  name: string;
  title: string;
  email: string;
  role: "admin" | "store-owner" | "seller";
  href: string;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    href: faker.internet.url(),
    title: faker.name.jobTitle(),
    role: faker.helpers.shuffle<Person["role"]>([
      "admin",
      "store-owner",
      "seller",
    ])[0],
  };
};

export function makePersons(...lens: number[]) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}
