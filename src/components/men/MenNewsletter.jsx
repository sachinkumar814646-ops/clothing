"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function MenNewsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim())
            return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
    };
    return (<section className="py-16 sm:py-20 lg:py-24 bg-pinked text-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-block font-body text-[10px] tracking-[0.35em] text-white/40 border border-white/20 px-4 py-1.5 mb-6">
            EXCLUSIVE ACCESS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2">
            Get <span className="italic">10% Off</span>
          </h2>
          <p className="font-body text-sm tracking-[0.15em] text-white/50 mb-2 uppercase">Your First Order</p>
          <p className="font-body text-sm text-white/40 mb-9 leading-relaxed">
            Join the COOMBB mens community for style drops, early access and exclusive offers.
          </p>
          <AnimatePresence mode="wait">
            {!submitted ? (<motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit} className="flex flex-col xs:flex-row max-w-md mx-auto">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 min-w-0 bg-white/5 border border-white/15 border-r-0 px-5 py-3.5 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"/>
                <button type="submit" disabled={loading} className="flex-none bg-white text-charcoal px-6 py-3.5 font-body text-[11px] tracking-[0.2em] hover:bg-bone transition-colors disabled:opacity-70 whitespace-nowrap font-semibold border border-white">
                  {loading ? "..." : "SUBSCRIBE"}
                </button>
              </motion.form>) : (<motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
                <p className="font-display text-2xl font-light italic text-white mb-1">You&apos;re in. ✓</p>
                <p className="font-body text-sm text-white/50">Check your inbox for your 10% discount code.</p>
              </motion.div>)}
          </AnimatePresence>
          {!submitted && <p className="font-body text-[10px] text-white/25 mt-4 tracking-wide">No spam, ever. Unsubscribe at any time.</p>}
        </motion.div>
      </div>
    </section>);
}
