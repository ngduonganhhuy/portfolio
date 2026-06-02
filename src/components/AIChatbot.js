import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content:
      "Xin chào, mình là Holmes. Bạn có thể hỏi về portfolio, kinh nghiệm, dự án, bài viết, hoặc bất cứ thông tin gì mình có thể public được",
  },
];

const ChatIcon = ({ className = "" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.75 5.75C4.75 4.78 5.53 4 6.5 4h11c.97 0 1.75.78 1.75 1.75v7.5c0 .97-.78 1.75-1.75 1.75h-6.22L7.6 18.16A.75.75 0 0 1 6.35 17.6V15H6.5c-.97 0-1.75-.78-1.75-1.75v-7.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M8 8h8M8 11.5h5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M20 4 9.5 14.5M20 4l-6.5 18-3.75-7.75L2 10.5 20 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-dark text-light dark:bg-light dark:text-dark"
            : "bg-light text-dark border border-dark/15 dark:bg-dark dark:text-light dark:border-light/20"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default function AIChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(1),
          currentPath: router.asPath,
        }),
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.ok
            ? data.reply
            : data.error || "Chatbot đang gặp lỗi. Vui lòng thử lại sau.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Không kết nối được chatbot. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-4 sm:right-4">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-dark bg-light text-dark shadow-[8px_8px_0px_0px_#333333] dark:border-light dark:bg-dark dark:text-light dark:shadow-[8px_8px_0px_0px_#F2E7D5] sm:h-[70vh] sm:w-[calc(100vw-2rem)]"
            aria-label="Holmes AI chatbot"
          >
            <div className="flex items-center justify-between border-b border-dark/15 px-4 py-3 dark:border-light/15">
              <div>
                <h2 className="text-base font-bold">Holmes AI</h2>
                <p className="text-xs text-dark/65 dark:text-light/65">Gemini trained on this portfolio</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-dark/20 text-dark transition hover:bg-dark hover:text-light dark:border-light/20 dark:text-light dark:hover:bg-light dark:hover:text-dark"
                aria-label="Close chatbot"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <MessageBubble key={`${message.role}-${index}`} {...message} />
              ))}
              {isLoading && <MessageBubble role="assistant" content="Đang trả lời..." />}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-dark/15 p-3 dark:border-light/15">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-dark/20 bg-light px-3 py-2 text-sm text-dark outline-none transition focus:border-primary dark:border-light/20 dark:bg-dark dark:text-light dark:focus:border-primaryDark"
                placeholder="Hỏi về Holmes..."
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="grid h-10 w-10 place-items-center rounded-lg bg-dark text-light transition hover:bg-primary disabled:opacity-45 dark:bg-light dark:text-dark dark:hover:bg-primaryDark"
                aria-label="Send message"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative ml-auto grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-dark bg-dark text-light shadow-[4px_4px_0px_0px_#B63E96] transition dark:border-light dark:bg-light dark:text-dark dark:shadow-[4px_4px_0px_0px_#58E6D9]"
        aria-label={isOpen ? "Close Holmes AI chatbot" : "Open Holmes AI chatbot"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, scale: 0.65, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.65, rotate: 45 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <CloseIcon className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, scale: 0.65, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.65, rotate: -45 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <ChatIcon className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
