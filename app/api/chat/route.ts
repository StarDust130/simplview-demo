import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type ChatRequestMessage = {
  role: "user" | "assistant";
  content: string;
};

function normalizeMessageContent(content: string, maxLength: number) {
  const compact = content.replace(/\s+/g, " ").trim();

  if (compact.length <= maxLength) {
    return compact;
  }

  return `${compact.slice(0, maxLength - 1).trim()}…`;
}

function trimMessages(messages: ChatRequestMessage[]) {
  const latestMessages = messages.slice(-8);

  return latestMessages.map((message) => ({
    role: message.role,
    content: normalizeMessageContent(message.content, 1200),
  }));
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "Missing GROQ_API_KEY environment variable." },
      { status: 500 },
    );
  }

  let messages: ChatRequestMessage[] = [];

  try {
    const body = (await request.json()) as { messages?: ChatRequestMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json(
      { error: "At least one message is required." },
      { status: 400 },
    );
  }

  try {
    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are Simplview, a sharp AI analyst for dashboards and business intelligence. Be concise, helpful, and structured. Only use the recent conversation context supplied here. If the user asks for code, provide the smallest correct implementation.",
        },
        ...trimMessages(messages),
      ],
      model: "openai/gpt-oss-120b",
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      stream: true,
      reasoning_effort: "medium",
      stop: null,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Groq request failed.";

    return Response.json({ error: message }, { status: 502 });
  }
}
