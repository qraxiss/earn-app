import client from "./client";

export default async () => {
  return (
    await client.request({
      method: "POST",
      url: "/auth/test",
    })
  ).data;
};
