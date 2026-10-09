"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lib/Link";
import { X } from "lucide-react";
export default function ProductSizeSelector({ sizes, selected, onSelect, error }) {
    const [guideOpen, setGuideOpen] = useState(false);
    const SIZE_GUIDE = {
        XS: { bust: "80-83cm", waist: "60-63cm", hips: "86-89cm" },
        S: { bust: "84-87cm", waist: "64-67cm", hips: "90-93cm" },
        M: { bust: "88-92cm", waist: "68-72cm", hips: "94-98cm" },
        L: { bust: "93-97cm", waist: "73-77cm", hips: "99-103cm" },
        XL: { bust: "98-103cm", waist: "78-83cm", hips: "104-109cm" },
        XXL: { bust: "104-110cm", waist: "84-90cm", hips: "110-116cm" },
    };
    return (<>
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className={`font-body text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${error ? "text-red-600" : "text-charcoal"}`}>
            {error ? "Please select a size" : "Size"}
          </span>
          <Link
            href="/size-guide"
            className="font-body text-[11px] text-gray-500 underline underline-offset-2 hover:text-charcoal transition-colors"
          >
            Size Guide
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (<button key={size} onClick={() => onSelect(size)} className={`min-w-[46px] h-10 px-3 font-body text-[12px] font-medium border transition-all duration-150 ${selected === size
                ? "bg-pinked text-white border-charcoal"
                : error
                    ? "border-red-200 text-charcoal hover:border-charcoal bg-red-50/30"
                    : "border-gray-200 text-charcoal hover:border-charcoal bg-white"}`}>
              {size}
            </button>))}
        </div>
      </div>

      {/* Size guide modal */}
      <AnimatePresence>
        {guideOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={() => setGuideOpen(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase">Size Guide</h3>
                <button onClick={() => setGuideOpen(false)} aria-label="Close">
                  <X size={18} strokeWidth={1.5}/>
                </button>
              </div>
              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full font-body text-[12px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 font-semibold text-charcoal">Size</th>
                      <th className="text-left py-2 font-semibold text-charcoal">Bust</th>
                      <th className="text-left py-2 font-semibold text-charcoal">Waist</th>
                      <th className="text-left py-2 font-semibold text-charcoal">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(SIZE_GUIDE).map(([size, measurements]) => (<tr key={size} className={`border-b border-gray-50 ${selected === size ? "bg-pinked/5" : ""}`}>
                        <td className={`py-2.5 font-medium ${selected === size ? "text-charcoal font-bold" : "text-gray-600"}`}>
                          {size}
                        </td>
                        <td className="py-2.5 text-gray-500">{measurements.bust}</td>
                        <td className="py-2.5 text-gray-500">{measurements.waist}</td>
                        <td className="py-2.5 text-gray-500">{measurements.hips}</td>
                      </tr>))}
                  </tbody>
                </table>
                <p className="font-body text-[11px] text-gray-400 mt-4 leading-relaxed">
                  Measurements are in centimetres. If you&apos;re between sizes, we recommend sizing up.
                </p>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </>);
}
