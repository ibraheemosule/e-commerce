const env = process.env.NODE_ENV === "production";

const baseUrl = process.env.CONTENTFUL_BASE_URL as string;

const branch = env ? "master" : "staging";
const token = env
  ? (process.env.CONTENTFUL_TOKEN as string)
  : (process.env.CONTENTFUL_STAGING_TOKEN as string);

console.log(token, branch);

export const fetchCall = async (
  query: string,
  variables: Record<string, string> = {}
) => {
  try {
    const req = await fetch(`${baseUrl}/${branch}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data: unknown = await req.json();
    return data;
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else console.log("an error occured");
    return e;
  }
};
