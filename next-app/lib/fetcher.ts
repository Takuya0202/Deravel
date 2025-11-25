export default async function fetcher(url: string) {
  return fetch(url, {
    credentials: "include",
  }).then((res) => res.json());
}
