"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function HomeNewsletter() {
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
    return (<section className="py-16 sm:py-20 lg:py-24 bg-[#f7f7f5]">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

          <span className="inline-block font-body text-[10px] tracking-[0.35em] text-stone border border-stone/30 px-4 py-1.5 mb-6">
            EXCLUSIVE OFFER
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal mb-2">
            Get <span className="italic">10% Off</span>
          </h2>
          <p className="font-body text-sm tracking-[0.15em] text-stone mb-2">
            YOUR FIRST HOME ORDER
          </p>
          <p className="font-body text-sm text-stone/70 mb-9 leading-relaxed">
            Join our community for exclusive home decor inspiration, new arrivals, and members-only offers.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (<motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit} className="flex flex-col xs:flex-row max-w-md mx-auto">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 min-w-0 bg-white border border-gray-200 border-r-0 px-5 py-3.5 font-body text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-charcoal transition-colors"/>
                <button type="submit" disabled={loading} className="flex-none bg-pinked text-white px-6 py-3.5 font-body text-[11px] tracking-[0.2em] hover:bg-pinked/85 transition-colors disabled:opacity-70 whitespace-nowrap border border-charcoal">
                  {loading ? "..." : "SUBSCRIBE"}
                </button>
              </motion.form>) : (<motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
                <p className="font-display text-2xl font-light italic text-charcoal mb-1">
                  Welcome to COOMBB Home ✓
                </p>
                <p className="font-body text-sm text-stone">
                  Check your inbox for your 10% discount code.
                </p>
              </motion.div>)}
          </AnimatePresence>

          {!submitted && (<p className="font-body text-[10px] text-stone/50 mt-4 tracking-wide">
              No spam, ever. Unsubscribe at any time.
            </p>)}
        </motion.div>
      </div>
    </section>);
}
