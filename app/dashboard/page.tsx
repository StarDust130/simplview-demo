"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  FileText,
  MessageSquare,
  Clock,
  ArrowUp,
  X,
  FileLineChart,
  Cloud,
  Database,
  HardDrive,
  FileSpreadsheet,
  Mic,
  StarPlus,
  MessagesSquare,
} from "lucide-react";
import {
  createSmartbook,
  formatSmartbookPreview,
  loadSmartbooks,
  saveSmartbooks,
  subscribeToSmartbookUpdates,
} from "@/lib/chat";

const useTypewriter = (
  texts: string[],
  typingSpeed = 40,
  deletingSpeed = 30,
  pauseDuration = 2500,
) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = texts[loopNum % texts.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentText.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setText(currentText.substring(0, text.length + 1));
        if (text.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopNum,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return text;
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const item = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 22, stiffness: 120 },
  },
} as const;

export default function Dashboard() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isWebSearch, setIsWebSearch] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [smartbooks, setSmartbooks] = useState(loadSmartbooks());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholderText = useTypewriter([
    "What can I build for you today?",
    "Analyze the Q3 revenue trends...",
    "Compare user retention cohorts...",
  ]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const addMockAttachment = () => {
    if (attachments.length < 3) {
      setAttachments([
        ...attachments,
        `Dataset_v${attachments.length + 1}.csv`,
      ]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, itemIndex) => itemIndex !== index));
  };

  useEffect(() => {
    const syncSmartbooks = () => setSmartbooks(loadSmartbooks());

    syncSmartbooks();
    return subscribeToSmartbookUpdates(syncSmartbooks);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const submitSmartbook = () => {
    const prompt = inputValue.trim();
    if (!prompt) return;

    const smartbook = createSmartbook(
      attachments.length > 0
        ? `${prompt}\n\nAttached files: ${attachments.join(", ")}`
        : prompt,
    );

    saveSmartbooks([smartbook, ...smartbooks]);
    setInputValue("");
    setAttachments([]);
    router.push(`/chat/${smartbook.id}?autostart=1`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-16 lg:pt-24 relative bg-[#fcfcfc] font-sans px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] w-[500px] h-[300px] bg-blue-50/80 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl"
      >
        <motion.div variants={item} className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 mb-4 text-mono">
            Simplview{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 pr-2">
              Launchpad
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium tracking-tight font-serif italic">
            Interact with your data and explore the boundless creative world
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full max-w-3xl mx-auto mb-8">
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] focus-within:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.2)] focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-300 transition-all duration-300 p-2 sm:p-3 group flex flex-col">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 px-3 pt-2 pb-1">
                {attachments.map((file, index) => (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={file}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm"
                  >
                    <FileLineChart className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-slate-700 truncate max-w-[120px]">
                      {file}
                    </span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="relative w-full min-h-[44px]">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submitSmartbook();
                  }
                }}
                className="w-full bg-transparent outline-none resize-none text-slate-900 text-base px-3 py-2 peer z-20 relative font-medium font-serif leading-relaxed max-h-[200px] overflow-y-auto"
                spellCheck={false}
                rows={1}
              />
              {inputValue.length === 0 && (
                <div className="absolute top-2 left-3 pointer-events-none text-slate-400 text-base z-10 flex items-center font-serif">
                  {placeholderText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-[1.5px] h-[1em] bg-blue-500 ml-1 inline-block"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-2 pt-2 mt-2 border-t border-slate-50">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={addMockAttachment}
                  className="p-2 cursor-pointer text-slate-400 hover:text-slate-700 md:hover:bg-slate-100 rounded-xl transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <div className="relative group/tooltip">
                  <button
                    onClick={() => setIsWebSearch(!isWebSearch)}
                    className={`p-2 cursor-pointer rounded-xl transition-all ${isWebSearch ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-700 md:hover:bg-slate-100 "}`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-[1px] h-5 bg-slate-200 mx-1 hidden sm:block" />

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/60 md:hover:bg-blue-50 text-blue-600 rounded-xl transition-all border border-blue-100/50 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold">Sheets</span>
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={submitSmartbook}
                className={`w-9 font-serif italic h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${inputValue.length > 0 || attachments.length > 0 ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" : "bg-slate-50 border border-slate-100 text-slate-300"}`}
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="flex justify-center gap-4 sm:gap-8 text-sm text-slate-500 mb-12"
        >
          <button
            onClick={() => {
              setInputValue("");
              setAttachments([]);
              textareaRef.current?.focus();
            }}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors font-semibold group font-serif"
          >
            <StarPlus className="w-4 h-4 hover:text-blue-500 group-hover:animate-pulse" />
            Start From Scratch
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors font-semibold group font-serif italic">
            <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            Try a Template
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl mx-auto pb-12 text-mono"
        >
          {smartbooks.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  Recent Smartbooks
                </h3>
              </div>
              <div className="space-y-3">
                {smartbooks.slice(0, 4).map((smartbook) => (
                  <button
                    key={smartbook.id}
                    onClick={() => router.push(`/chat/${smartbook.id}`)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm md:hover:shadow-md md:hover:border-blue-200 transition-all cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                        <MessagesSquare className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                          {smartbook.title}
                        </span>
                        <span className="block text-xs text-slate-400 truncate max-w-[240px]">
                          {formatSmartbookPreview(smartbook.messages[0])}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-400 shrink-0">
                      <Clock className="w-3 h-3" />
                      {new Intl.DateTimeFormat(undefined, {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(smartbook.updatedAt))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {smartbooks.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
                  Recent Dashboards
                </h3>
              </div>
              <div className="h-[72px] sm:h-[88px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                <p className="text-sm text-slate-400 font-medium">
                  No dashboards published
                </p>
              </div>
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col p-6 sm:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-10 relative">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10 -translate-y-1/2" />
                {["Source", "Auth", "Select", "Confirm"].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-2 bg-white px-2"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      {index + 1}
                    </div>
                    <span
                      className={`text-sm font-semibold hidden sm:block ${index === 0 ? "text-indigo-600" : "text-slate-400"}`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Connect Data Source
                </h2>
                <p className="text-slate-500 font-medium">
                  Select a platform to import your data from.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setIsModalOpen(false)}
                  className="flex flex-col items-center justify-center p-6 border-2 border-emerald-500 bg-emerald-50/30 rounded-2xl cursor-pointer hover:bg-emerald-50/50 transition-colors"
                >
                  <FileLineChart className="w-8 h-8 text-emerald-600 mb-3" />
                  <span className="font-bold text-slate-900">
                    Google Sheets
                  </span>
                </div>

                {[
                  { icon: Database, name: "BigQuery" },
                  { icon: Cloud, name: "Google Drive" },
                  { icon: HardDrive, name: "Cloud SQL" },
                  { icon: Cloud, name: "Cloud Storage" },
                  { icon: Database, name: "Firestore" },
                ].map((source, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-6 border border-slate-100 bg-slate-50/50 rounded-2xl opacity-60 grayscale cursor-not-allowed"
                  >
                    <source.icon className="w-8 h-8 text-slate-400 mb-3" />
                    <span className="font-bold text-slate-600 mb-1">
                      {source.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
