import { buildChatbotKnowledge } from "@/lib/chatbotKnowledge";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const QUOTA_LIMIT_MESSAGE = "Tôi nghèo nhưng tôi vẫn làm chatbot. Vì tôi là một dev nổi loạn :>";

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => ["user", "assistant"].includes(message?.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, 1200),
    }))
    .filter((message) => message.content.trim().length > 0)
    .slice(-10);
}

function extractOutputText(data) {
  return (data?.candidates?.[0]?.content?.parts || [])
    .filter((part) => typeof part?.text === "string")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function toGeminiContents(messages) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function getGeminiErrorMessage(data) {
  const status = data?.error?.status;
  const message = data?.error?.message || "";
  const normalizedMessage = message.toLowerCase();

  if (status === "UNAUTHENTICATED" || status === "PERMISSION_DENIED") {
    return "Gemini API key không hợp lệ hoặc chưa được cấp quyền. Vui lòng kiểm tra lại GEMINI_API_KEY.";
  }

  if (status === "RESOURCE_EXHAUSTED" || normalizedMessage.includes("quota") || normalizedMessage.includes("rate")) {
    return QUOTA_LIMIT_MESSAGE;
  }

  if (status === "NOT_FOUND" && normalizedMessage.includes("model")) {
    return "Gemini model chưa đúng hoặc chưa được cấp quyền. Vui lòng kiểm tra GEMINI_MODEL.";
  }

  if (normalizedMessage.includes("credit") || normalizedMessage.includes("billing")) {
    return QUOTA_LIMIT_MESSAGE;
  }

  return message || "Gemini request failed.";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Missing GEMINI_API_KEY. Add it to your environment to enable the AI chatbot.",
    });
  }

  const messages = normalizeMessages(req.body?.messages);
  const currentPath = String(req.body?.currentPath || "/").slice(0, 200);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "A user message is required." });
  }

  const instructions = [
    "You are Holmes AI, the assistant for Nguyen Duong Anh Huy's portfolio website.",
    "Use the knowledge base below as your source of truth about this website, the owner, projects, articles, experience, skills, and Holmes AdBlock DNS.",
    "Answer in the user's language. If the user writes Vietnamese, answer naturally in Vietnamese.",
    "Be concise, helpful, and factual. Do not invent details outside the knowledge base.",
    "If the user asks for hiring or collaboration, guide them to email ngduonganhhuy@gmail.com or the resume link.",
    "If the user asks about the current page, use the provided current path and relevant site knowledge.",
    "",
    `Current page path: ${currentPath}`,
    "",
    "Knowledge base:",
    buildChatbotKnowledge(),
  ].join("\n");

  try {
    const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const response = await fetch(`${GEMINI_API_URL}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: instructions }],
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          maxOutputTokens: 700,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: getGeminiErrorMessage(data),
      });
    }

    return res.status(200).json({
      reply: extractOutputText(data) || "I could not generate a response right now.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Unexpected chatbot error.",
    });
  }
}
