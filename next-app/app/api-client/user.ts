export async function getUser() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/user/profile`, {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
