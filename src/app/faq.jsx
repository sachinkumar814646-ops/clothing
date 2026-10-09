import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within 1–2 business days. Delivery usually takes 3–7 business days depending on your location.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes. Returns and exchanges are accepted within 30 days if the item is unworn, unwashed, and has its original tags attached.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking link that lets you monitor your package in real time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and other secure payment methods.",
  },
  {
    question: "Are your sizes true to fit?",
    answer:
      "Most items are true to size. Please refer to the size guide on each product page for accurate measurements.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes. We ship to many countries worldwide. Shipping costs and delivery times are calculated during checkout.",
  },
  {
    question: "What if I receive a damaged or incorrect item?",
    answer:
      "Contact our support team within 48 hours of delivery with photos, and we'll arrange a replacement or refund.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can be cancelled before they are shipped. Once dispatched, they must follow the standard return process.",
  },
];

const answerVariants = {
  open: { height: "auto", opacity: 1, y: 0 },
  collapsed: { height: 0, opacity: 0, y: -8 },
};

const transition = { duration: 0.35, ease: "easeOut" };

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <article className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => onToggle(index)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          <span className="text-left text-base font-semibold text-slate-900 sm:text-lg">
            {faq.question}
          </span>
          <motion.span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-transform duration-300"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={transition}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={answerVariants}
            transition={transition}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6 text-sm leading-7 text-slate-600 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[1.75rem] bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Frequently Asked Questions
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to know before placing your order.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={activeIndex === index}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
