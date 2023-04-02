import { createClient } from "contentful";

const token = process.env.CONTENTFUL_TOKEN as string;
const id = process.env.CONTENTFUL_SPACE_ID as string;

const client = createClient({
  space: id,
  accessToken: token,
});

const getContent = async (type: string) =>
  await client.getEntries({
    content_type: type,
  });

export default getContent;
