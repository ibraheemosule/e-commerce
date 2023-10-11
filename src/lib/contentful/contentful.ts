const baseUrl = process.env.NEXT_PUBLIC_CONTENTFUL_BASE_URL as string;
const branch = process.env.NEXT_PUBLIC_CONTENTFUL_BRANCH as string;

const token = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN as string;

export const getContentfulData = async (
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
