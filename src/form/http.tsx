interface URLPostData {
  short: string;
  target: string;
};

export const submitURL = async (url: URLPostData) => {
  const response = await fetch('/api/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(url)
  });
  return await response.json();
};
