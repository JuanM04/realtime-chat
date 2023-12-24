import { PORT } from "@realtime-chat/shared";

export async function sendApi<Query extends [unknown, { success: boolean }]>(
  endpoint: string,
  data: Query[0]
) {
  try {
    const res = await fetch(`http://localhost:${PORT}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (!res.success) {
      throw new Error(res.error);
    }

    return res as Query[1] & { success: true };
  } catch (error) {
    console.error(error);
    alert("An error occurred, please try again.");
    throw error;
  }
}
