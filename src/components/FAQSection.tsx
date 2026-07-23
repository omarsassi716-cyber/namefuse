import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Everything you need to know about our username generator engine and social platform rules.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                id={`faq-item-${idx}`}
                key={idx}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-500/30 bg-zinc-900/60 shadow-lg shadow-violet-500/5"
                    : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700/80 hover:bg-zinc-900/10"
                }`}
              >
                <button
                  id={`faq-button-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 transition-colors ${isOpen ? "text-violet-400" : "text-zinc-500"}`} />
                    <span className="font-semibold text-zinc-100 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-violet-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-zinc-400 text-sm sm:text-base leading-relaxed border-t border-zinc-800/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
