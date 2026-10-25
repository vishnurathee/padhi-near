import { createServerFn } from "@tanstack/react-start";

export const askTriangleAgent = createServerFn({ method: "POST" })
  .inputValidator((data: { question: string }) => {
    const question = String(data?.question ?? "").trim().slice(0, 2000);
    if (!question) throw new Error("Question missing");
    return { question };
  })
  .handler(async ({ data }) => {
    const { env } = await import("./env.server");
    const key = env("AGENT37_API_KEY");
    const id = env("AGENT37_INSTANCE_ID");
    if (!key || !id) throw new Error("Agent37 is not configured");
    const response = await fetch(`https://${id}.agent37.app/v1/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Agent37-Key": key,
      },
      body: JSON.stringify({
        input: `You are the Padhaai Neev Class 10 Triangles tutor. Reply in exactly 4 short lines labeled Hint, Step 1, Step 2, Final. Question: ${data.question}`,
      }),
    });
    if (!response.ok) throw new Error("Agent37 failed");
    const body = (await response.json()) as { output_text?: string };
    return { text: body.output_text ?? "" };
  });
