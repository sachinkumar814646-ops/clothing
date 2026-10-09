"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function ProductAccordion({ product }) {
  const [open, setOpen] = useState("details");
  const toggle = (id) => setOpen(open === id ? null : id);

  // ✅ SAFE DETAILS (fallback)
  const details =
    product?.details?.length > 0
      ? product.details
      : [
          product?.description || "Premium quality product",
          "Comfortable fit",
          "Durable fabric",
          "Perfect for everyday wear",
        ];

  const sections = [
    {
      id: "details",
      label: "Product Details",
      content: (
        <div
          className="font-body text-[13px] text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: product?.description,
          }}
        />
      ),
    },
    {
      id: "delivery",
      label: "Delivery & Returns",
      content: (
        <div className="space-y-3 font-body text-[13px] text-gray-600">
          <div>
            <p className="font-semibold text-charcoal mb-1">
              Standard Delivery — Free over £30
            </p>
            <p>3–5 working days</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal mb-1">
              Special delivery - £4.99
            </p>
            <p>1 - 2 working days</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal mb-1">
              Returns accepted 
            </p>
            <p>
              Return within 28 days for a full refund. Items must be unworn with tags attached.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "care",
      label: "Care Instructions",
      content: (
        <div className="space-y-2 font-body text-[13px] text-gray-600">
          <p>To keep this piece looking its best:</p>
          <ul className="space-y-1.5 mt-2">
            {[
              "Please refer to individual clothing labels for care instructions",
            ].map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full flex-none" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-gray-100">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-gray-100">
          <button
            onClick={() => toggle(section.id)}
            className="flex items-center justify-between w-full py-3.5 text-left group"
          >
            <span className="font-body text-[12px] font-semibold tracking-[0.1em] uppercase text-charcoal group-hover:text-gray-600 transition-colors">
              {section.label}
            </span>

            {open === section.id ? (
              <Minus size={14} strokeWidth={2} className="text-gray-400" />
            ) : (
              <Plus size={14} strokeWidth={2} className="text-gray-400" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {open === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="pb-4">{section.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}