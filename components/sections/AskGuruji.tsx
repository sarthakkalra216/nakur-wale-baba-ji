"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, RotateCcw } from "lucide-react"
import { sampleQuestions } from "@/data/guruji-knowledge"

interface Message {
  id: string
  role: "user" | "guruji"
  content: string
  timestamp: Date
}

const INITIAL: Message = {
  id: "init",
  role: "guruji",
  content:
    "Jai Guruji! 🙏\n\nI am here to share the wisdom and story of Shri Guruji Nakur Wale Baba Ji. You may ask me about Guruji's life journey, his teachings on faith, seva, meditation, compassion, or about the ashram and kirtan. What would you like to know?",
  timestamp: new Date(),
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-saffron"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isGuruji = msg.role === "guruji"
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`flex gap-3 ${isGuruji ? "justify-start" : "justify-end"}`}
    >
      {isGuruji && (
        <div
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base mt-0.5 text-paper"
          style={{
            background: "linear-gradient(135deg,#e07a1e,#7b1e2b)",
            boxShadow: "0 8px 18px -8px rgba(123,30,43,0.5)",
          }}
        >
          🕉
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
          isGuruji ? "rounded-tl-sm" : "rounded-tr-sm"
        }`}
        style={{
          background: isGuruji
            ? "rgba(224,122,30,0.08)"
            : "linear-gradient(135deg,#e07a1e,#c2410c)",
          border: isGuruji
            ? "1px solid rgba(224,122,30,0.22)"
            : "1px solid rgba(194,65,12,0.4)",
          color: isGuruji ? "#571220" : "#fffdf8",
        }}
      >
        {msg.content}
        <div
          className="text-[10px] mt-1.5 opacity-50 text-right"
          style={{ color: isGuruji ? "#b45309" : "#fde8c8" }}
          suppressHydrationWarning
        >
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </motion.div>
  )
}

export default function AskGuruji() {
  const [messages, setMessages] = useState<Message[]>([INITIAL])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isFirstMount = useRef(true)

  useEffect(() => {
    // Skip on initial mount — only scroll chat window when new messages arrive
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    // Scroll the chat container itself, never the page
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, loading])

  const sendQuestion = async (question: string) => {
    if (!question.trim() || loading) return
    setInput("")

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: question.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const startTime = Date.now()
      const res = await fetch("/api/ask-guruji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      })
      const data = (await res.json()) as { answer: string; topic: string }

      // Ensure typing animation shows for at least 900ms
      const elapsed = Date.now() - startTime
      if (elapsed < 900) {
        await new Promise((r) => setTimeout(r, 900 - elapsed))
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "guruji",
          content: data.answer ?? "Jai Guruji! Please try another question.",
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "guruji",
          content:
            "Jai Guruji! There was a small interruption. Please try again. 🙏",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendQuestion(input)
  }

  const reset = () => {
    setMessages([INITIAL])
    setInput("")
    inputRef.current?.focus()
  }

  return (
    <section id="ask-guruji" className="relative py-24 sm:py-32 overflow-hidden bg-paper-2">
      <div className="absolute inset-x-0 top-0 hairline" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <span className="eyebrow">AI-Powered</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-ink">
            Ask <span className="accent-text">Guruji</span>
          </h2>
          <p className="mt-4 text-ink-soft max-w-xl mx-auto text-sm leading-relaxed">
            Ask any question about Guruji&apos;s life, teachings, seva, or spiritual
            guidance. Answers are drawn exclusively from Guruji&apos;s knowledge base.
          </p>
          <div className="ornament">
            <span>✦</span>
          </div>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="paper-card rounded-3xl overflow-hidden"
        >
          {/* Window header */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-maroon/10 bg-paper/60">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-paper"
                style={{
                  background: "linear-gradient(135deg,#e07a1e,#7b1e2b)",
                  boxShadow: "0 8px 20px -8px rgba(123,30,43,0.5)",
                }}
              >
                🕉
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">
                  Guruji Nakur Wale Baba Ji
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Available for guidance
                </div>
              </div>
            </div>
            <button
              onClick={reset}
              className="p-2 rounded-lg text-ink-faint hover:text-maroon hover:bg-maroon/[0.05] transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="h-80 sm:h-96 overflow-y-auto px-4 sm:px-6 py-5 space-y-5 scrollbar-hide">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <AnimatePresence>
              {loading && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex gap-3 justify-start"
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base text-paper"
                    style={{ background: "linear-gradient(135deg,#e07a1e,#7b1e2b)" }}
                  >
                    🕉
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm"
                    style={{
                      background: "rgba(224,122,30,0.08)",
                      border: "1px solid rgba(224,122,30,0.22)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested questions */}
          <div className="px-4 sm:px-6 pb-3 pt-1 border-t border-maroon/[0.08]">
            <p className="text-[10px] text-ink-faint uppercase tracking-wider mb-2">
              Suggested Questions
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {sampleQuestions.slice(0, 5).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendQuestion(q.question)}
                  disabled={loading}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs border border-maroon/20 text-ink-soft hover:border-saffron hover:text-saffron-deep transition-all duration-200 whitespace-nowrap disabled:opacity-40 cursor-pointer"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-5 pt-2">
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,253,248,0.9)",
                border: "1px solid rgba(184,137,59,0.3)",
              }}
            >
              <Sparkles size={16} className="text-saffron shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Guruji anything…"
                disabled={loading}
                className="flex-1 bg-transparent text-ink text-sm placeholder:text-ink-faint outline-none min-w-0 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40 cursor-pointer"
                style={{
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg,#f1a93a,#e07a1e)"
                    : "rgba(123,30,43,0.08)",
                }}
              >
                <Send size={15} className={input.trim() && !loading ? "text-paper" : "text-ink-faint"} />
              </button>
            </div>
            <p className="text-center text-[10px] text-ink-faint mt-2">
              Answers sourced exclusively from Guruji&apos;s knowledge base.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
