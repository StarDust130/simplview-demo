"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  CornerDownLeft,
  Loader2,
  MessageSquarePlus,
  Mic,
  MoreHorizontal,
  Paperclip,
  RefreshCw,
  Share,
  StopCircle,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  X,
} from "lucide-react";
import {
  ChatMessage,
  createMessage,
  getSmartbookById,
  Smartbook,
  subscribeToSmartbookUpdates,
  updateSmartbookMessages,
} from "@/lib/chat";

/* ═══════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════ */
function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

/* ═══════════════════════════════════════
   STREAMING CONTENT — Production level
   ═══════════════════════════════════════ */
function StreamingContent({ content }: { content: string }) {
  const [displayedContent, setDisplayedContent] = useState(content);
  const prevLenRef = useRef(0);

  useEffect(() => {
    if (content.length > prevLenRef.current) {
      setDisplayedContent(content);
      prevLenRef.current = content.length;
    }
  }, [content]);

  return (
    <div className="relative">
      <div className="text-[15px] leading-7 text-slate-800">
        <MarkdownContent content={displayedContent} />
      </div>
      {/* Blinking cursor */}
      <motion.span
        className="inline-block h-[18px] w-[2px] bg-sky-500 ml-0.5 align-middle rounded-full"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════
   MARKDOWN RENDERER — Premium
   ═══════════════════════════════════════ */
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 mt-6 text-xl font-bold tracking-tight text-slate-900 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-5 text-lg font-semibold tracking-tight text-slate-900 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-4 text-base font-semibold text-slate-900 first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 leading-7 text-slate-700 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-3 ml-4 list-disc space-y-1.5 text-slate-700 last:mb-0">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 ml-4 list-decimal space-y-1.5 text-slate-700 last:mb-0">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-slate-600">{children}</em>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          return isInline ? (
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800 border border-slate-200">
              {children}
            </code>
          ) : (
            <pre className="mb-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-50 last:mb-0">
              <code className="font-mono">{children}</code>
            </pre>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="mb-3 border-l-4 border-slate-200 pl-4 italic text-slate-600 last:mb-0">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-6 border-slate-200" />,
        table: ({ children }) => (
          <div className="mb-4 overflow-x-auto rounded-xl border border-slate-200 shadow-sm last:mb-0">
            <table className="w-full text-sm text-left border-collapse">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-slate-100">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-slate-50/60 transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-slate-700 font-medium">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/* ═══════════════════════════════════════
   ACTION BAR
   ═══════════════════════════════════════ */
function MessageActions({
  onCopy,
  onRegenerate,
  isCopied,
}: {
  onCopy: () => void;
  onRegenerate?: () => void;
  isCopied: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <div className="mt-3 flex items-center gap-0.5">
      <button
        onClick={onCopy}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
        title={isCopied ? "Copied" : "Copy"}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
          title="Regenerate"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}

      <div className="mx-1 h-4 w-px bg-slate-200" />

      <button
        onClick={() => {
          setLiked(!liked);
          setDisliked(false);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-slate-100 ${liked ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
      >
        <ThumbsUp className="h-4 w-4" />
      </button>

      <button
        onClick={() => {
          setDisliked(!disliked);
          setLiked(false);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-slate-100 ${disliked ? "text-red-500" : "text-slate-400 hover:text-slate-600"}`}
      >
        <ThumbsDown className="h-4 w-4" />
      </button>

      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600">
        <Volume2 className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════
   MESSAGE BUBBLE — Clean, no sparkles icon
   ═══════════════════════════════════════ */
function MessageBubble({
  message,
  isStreaming,
  onCopy,
  onRegenerate,
}: {
  message: ChatMessage;
  isStreaming?: boolean;
  onCopy: (text: string) => void;
  onRegenerate?: () => void;
}) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex w-full justify-end py-1.5"
      >
        <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%]">
          <div className="rounded-2xl rounded-tr-sm bg-blue-600 px-5 py-3 text-[15px] leading-7 text-white shadow-sm">
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex w-full py-3"
    >
      <div className="flex w-full max-w-3xl gap-3">
        {/* Clean avatar — no sparkles, just a simple circle */}
     

        <div className="flex-1 min-w-0 pt-0.5">
          {isStreaming ? (
            <StreamingContent content={message.content} />
          ) : (
            <MarkdownContent content={message.content} />
          )}

          {!isStreaming && message.content && (
            <MessageActions
              onCopy={handleCopy}
              onRegenerate={onRegenerate}
              isCopied={copied}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   SUGGESTIONS
   ═══════════════════════════════════════ */
const SUGGESTIONS = [
  "Explain this data in simple terms",
  "What trends should I watch?",
  "Create a summary report",
  "Compare last quarter vs this quarter",
];

/* ═══════════════════════════════════════
   MAIN CHAT PAGE — Perfect 10/10
   ═══════════════════════════════════════ */
export default function ChatPage() {
  const router = useRouter();
  const params = useParams<{ chatId: string }>();
  const searchParams = useSearchParams();
  const chatId = params?.chatId;
  const autoStart = searchParams.get("autostart") === "1";

  const [chat, setChat] = useState<Smartbook | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const hasAutoStartedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevMessagesLenRef = useRef(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  /* ── Load chat ── */
  useEffect(() => {
    if (!chatId) return;
    const loadChat = () => {
      const nextChat = getSmartbookById(chatId);
      if (!nextChat) {
        setChat(null);
        setMessages([]);
        return;
      }
      setChat(nextChat);
      setMessages(nextChat.messages);
    };
    loadChat();
    return subscribeToSmartbookUpdates(loadChat);
  }, [chatId]);

  /* ── Scroll logic ── */
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  useEffect(() => {
    const len = messages.length;
    if (len > prevMessagesLenRef.current && !userScrolledUp) {
      scrollToBottom("smooth");
    }
    prevMessagesLenRef.current = len;
  }, [messages, userScrolledUp, scrollToBottom]);

  /* ── Track scroll position ── */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
      setShowScrollBtn(!isNearBottom);
      setUserScrolledUp(!isNearBottom);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Auto-resize textarea ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [inputValue]);

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  /* ── Mic / Voice input ── */
  const toggleMic = useCallback(async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        // Here you would send blob to speech-to-text API
        // For now, just stop the stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied:", err);
      setIsRecording(false);
    }
  }, [isRecording]);

  /* ── Submit ── */
  const submitPrompt = useCallback(
    (
      prompt: string,
      options?: { appendUserMessage?: boolean; sourceMessages?: ChatMessage[] },
    ) => {
      const sourceMessages = options?.sourceMessages ?? messages;
      const appendUserMessage = options?.appendUserMessage ?? true;
      const currentChat = chat;

      const promptText = prompt.trim();
      if (!chatId || !currentChat || !promptText || isSending) return;

      const userMessage = appendUserMessage
        ? createMessage("user", promptText)
        : null;

      const assistantMessage: ChatMessage = {
        id: createMessage("assistant", "").id,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      const nextMessages = userMessage
        ? [...sourceMessages, userMessage, assistantMessage]
        : [...sourceMessages, assistantMessage];

      const requestMessages = (userMessage ? [...sourceMessages, userMessage] : sourceMessages)
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

      setActiveAssistantId(assistantMessage.id);
      setErrorMessage(null);
      if (appendUserMessage) setInputValue("");
      setIsSending(true);
      setUserScrolledUp(false);

      const nextChat: Smartbook = {
        ...currentChat,
        updatedAt: new Date().toISOString(),
        messages: nextMessages,
      };

      setChat(nextChat);
      updateSmartbookMessages(chatId, nextMessages, nextChat.title);
      setMessages(nextMessages);

      abortControllerRef.current = new AbortController();

      void (async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: requestMessages }),
            signal: abortControllerRef.current?.signal,
          });

          if (!response.ok || !response.body) {
            const text = await response.text();
            throw new Error(text || `Request failed (${response.status})`);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let assistantText = "";

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            assistantText += decoder.decode(value, { stream: true });
            setMessages((curr) =>
              curr.map((m) =>
                m.id === assistantMessage.id ? { ...m, content: assistantText } : m,
              ),
            );
          }

          assistantText += decoder.decode();

          const finalMessages = nextMessages.map((m) =>
            m.id === assistantMessage.id ? { ...m, content: assistantText } : m,
          );

          setMessages(finalMessages);
          updateSmartbookMessages(chatId, finalMessages, currentChat.title);
          scrollToBottom("smooth");
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
          const msg = error instanceof Error ? error.message : "AI request failed.";
          setErrorMessage(msg);
          const failedMessages = nextMessages.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content:
                    m.content ||
                    "I could not reach the AI service just now. Please try again in a moment.",
                }
              : m,
          );
          setMessages(failedMessages);
          updateSmartbookMessages(chatId, failedMessages, currentChat.title);
        } finally {
          setIsSending(false);
          setActiveAssistantId(null);
          abortControllerRef.current = null;
        }
      })();
    },
    [chat, chatId, isSending, messages, scrollToBottom],
  );

  /* ── Stop ── */
  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsSending(false);
    setActiveAssistantId(null);
  }, []);

  /* ── Auto-start ── */
  useEffect(() => {
    if (
      !autoStart ||
      hasAutoStartedRef.current ||
      !chat ||
      messages.length !== 1 ||
      messages[0]?.role !== "user"
    ) {
      return;
    }
    hasAutoStartedRef.current = true;
    router.replace(`/chat/${chatId}`);
    submitPrompt(messages[0].content, {
      appendUserMessage: false,
      sourceMessages: messages,
    });
  }, [autoStart, chat, chatId, messages, router, submitPrompt]);

  const canSend = inputValue.trim().length > 0 && !isSending;
  const isEmpty = messages.length === 0;

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }, []);

  if (!chat && chatId) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8f9fb] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm text-center"
        >
          <h1 className="text-2xl font-bold text-slate-900">Smartbook not found</h1>
          <p className="mt-3 text-sm text-slate-500">
            This chat may have been removed. Start a fresh conversation.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/dashboard")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white font-sans antialiased overflow-hidden">
      {/* ═══ HEADER ═══ */}
      <header className="flex-shrink-0 border-b border-slate-100 bg-white/90 backdrop-blur-xl z-30">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-900">{chat?.title || "New Chat"}</h1>
            <p className="text-[11px] text-slate-400 font-medium">
              {messages.length} messages {chat && `• ${formatDate(chat.updatedAt)}`}
            </p>
          </div>
          <div className="md:flex items-center gap-1 hidden">
            <button onClick={() => router.push("/dashboard")} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors">
              <MessageSquarePlus className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors">
              <Share className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ MESSAGES ═══ */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto scroll-smooth bg-white relative">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">How can I help?</h2>
              <p className="text-sm text-slate-500 mb-10 max-w-xs">Ask me anything about your data, reports, or analytics.</p>
              <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => submitPrompt(s)} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-sm font-medium text-slate-700">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isStreaming={isSending && message.id === activeAssistantId}
                  onCopy={handleCopy}
                  onRegenerate={
                    message.role !== "user" && index === messages.length - 1
                      ? () => submitPrompt(messages[index - 1]?.content || "", {
                          appendUserMessage: false,
                          sourceMessages: messages.slice(0, -1),
                        })
                      : undefined
                  }
                />
              ))}
            </div>
          )}

          <AnimatePresence>
            {errorMessage && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <X className="h-4 w-4 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Something went wrong</p>
                    <p>{errorMessage}</p>
                  </div>
                  <button onClick={() => setErrorMessage(null)} className="p-1 hover:bg-red-100 rounded">
                    <CornerDownLeft className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-6" />
        </div>
      </div>

      {/* ═══ SCROLL TO BOTTOM BUTTON ═══ */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setUserScrolledUp(false); scrollToBottom(); }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-white shadow-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowDown className="h-4 w-4" />
            <span>Back to bottom</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ INPUT AREA ═══ */}
      <div className="flex-shrink-0 border-t border-slate-100 bg-white/90 backdrop-blur-xl z-40">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-blue-300 focus-within:shadow-md transition-all">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (canSend) submitPrompt(inputValue, { appendUserMessage: true });
                }
              }}
              placeholder="Message Simplview..."
              rows={1}
              spellCheck={false}
              className="max-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3.5 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              {/* Left: Attach + Mic */}
              <div className="flex items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Attach file">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleMic}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${isRecording ? "bg-red-50 text-red-500 animate-pulse" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`}
                  title={isRecording ? "Stop recording" : "Voice input"}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-400 ml-1">
                  <CornerDownLeft className="h-3 w-3" /> Enter
                </span>
              </div>

              {/* Right: Send/Stop */}
              <div className="flex items-center gap-2">
                {isSending ? (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleStop}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Stop generating"
                  >
                    <StopCircle className="h-4 w-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={canSend ? { scale: 1.08 } : {}}
                    whileTap={canSend ? { scale: 0.92 } : {}}
                    onClick={() => submitPrompt(inputValue, { appendUserMessage: true })}
                    disabled={!canSend}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${canSend ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Simplview AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  );
}