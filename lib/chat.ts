export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface Smartbook {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const STORAGE_KEY = "simplview.smartbooks.v1";
const SMARTBOOK_UPDATED_EVENT = "simplview-smartbooks-updated";

function canUseStorage() {
  return typeof window !== "undefined";
}

function safeParseSmartbooks(value: string | null): Smartbook[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as Smartbook[];

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item.id === "string")
      .map((item) => ({
        id: item.id,
        title: typeof item.title === "string" ? item.title : "New Smartbook",
        createdAt:
          typeof item.createdAt === "string"
            ? item.createdAt
            : new Date().toISOString(),
        updatedAt:
          typeof item.updatedAt === "string"
            ? item.updatedAt
            : new Date().toISOString(),
        messages: Array.isArray(item.messages)
          ? item.messages
              .filter(
                (message) =>
                  message &&
                  (message.role === "user" || message.role === "assistant") &&
                  typeof message.content === "string",
              )
              .map((message) => ({
                id: typeof message.id === "string" ? message.id : createId(),
                role: message.role,
                content: message.content,
                createdAt:
                  typeof message.createdAt === "string"
                    ? message.createdAt
                    : new Date().toISOString(),
              }))
          : [],
      }))
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  } catch {
    return [];
  }
}

export function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `chat_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: createId(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function makeSmartbookTitle(prompt: string) {
  const normalizedPrompt = prompt.replace(/\s+/g, " ").trim();

  if (!normalizedPrompt) {
    return "New Smartbook";
  }

  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "build",
    "can",
    "compare",
    "create",
    "for",
    "from",
    "how",
    "i",
    "in",
    "is",
    "it",
    "make",
    "me",
    "my",
    "of",
    "on",
    "please",
    "show",
    "the",
    "to",
    "what",
    "when",
    "where",
    "why",
    "with",
  ]);

  const words = normalizedPrompt
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const chosenWords = words.filter(
    (word) => !stopWords.has(word.toLowerCase()),
  );

  const titleWords = (chosenWords.length > 0 ? chosenWords : words)
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  const title = titleWords.join(" ").trim();

  if (!title) {
    return "New Smartbook";
  }

  return title.length > 28 ? `${title.slice(0, 27).trim()}…` : title;
}

export function createSmartbook(initialPrompt: string): Smartbook {
  const createdAt = new Date().toISOString();
  const userMessage = createMessage("user", initialPrompt);

  return {
    id: createId(),
    title: makeSmartbookTitle(initialPrompt),
    createdAt,
    updatedAt: createdAt,
    messages: [userMessage],
  };
}

export function loadSmartbooks(): Smartbook[] {
  if (!canUseStorage()) return [];

  return safeParseSmartbooks(window.localStorage.getItem(STORAGE_KEY));
}

export function saveSmartbooks(smartbooks: Smartbook[]) {
  const normalized = smartbooks
    .map((item) => ({
      ...item,
      messages: [...item.messages].sort((left, right) =>
        left.createdAt.localeCompare(right.createdAt),
      ),
    }))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event(SMARTBOOK_UPDATED_EVENT));
  }

  return normalized;
}

export function updateSmartbookMessages(
  smartbookId: string,
  messages: ChatMessage[],
  title?: string,
) {
  const smartbooks = loadSmartbooks();
  const updatedAt = new Date().toISOString();

  const nextSmartbooks = smartbooks.map((smartbook) =>
    smartbook.id === smartbookId
      ? {
          ...smartbook,
          title: title ?? smartbook.title,
          updatedAt,
          messages: [...messages],
        }
      : smartbook,
  );

  return saveSmartbooks(nextSmartbooks);
}

export function getSmartbookById(smartbookId: string) {
  return (
    loadSmartbooks().find((smartbook) => smartbook.id === smartbookId) ?? null
  );
}

export function subscribeToSmartbookUpdates(listener: () => void) {
  if (!canUseStorage()) return () => undefined;

  const storageListener = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", storageListener);
  window.addEventListener(SMARTBOOK_UPDATED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", storageListener);
    window.removeEventListener(SMARTBOOK_UPDATED_EVENT, listener);
  };
}

export function formatSmartbookPreview(message: ChatMessage | undefined) {
  if (!message) return "Start a new analysis";

  const preview = message.content.replace(/\s+/g, " ").trim();
  return preview.length > 54 ? `${preview.slice(0, 53).trim()}…` : preview;
}
