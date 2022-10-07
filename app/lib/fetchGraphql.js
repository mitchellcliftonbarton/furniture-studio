const ENDPOINT = `${process.env.NEXT_PUBLIC_FONTDUE_URL}/graphql`;

const fetchGraphql = async (query, variables) => {
  // console.log(query)
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Fontdue request failed');
  }

  const json = await response.json();

  const errorMessage = json.errors?.[0]?.message;
  if (errorMessage) {
    throw new Error(`Fontdue graphql request error: ${errorMessage}`);
  }

  return json.data;
};

export default fetchGraphql;