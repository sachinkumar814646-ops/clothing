"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "lib/NextImage";
import { addSubscriber } from "services/api/menu";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    const data = await addSubscriber(email);

    if (data) {
      setSubmitted(true);
      setEmail("");
    } else {
      setError("Subscription failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-pinked py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=60"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-body text-[10px] tracking-[0.35em] text-white/60 border border-white/20 px-4 py-1.5 mb-6">
            EXCLUSIVE OFFER
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2">
            Get <span className="italic">10% Off</span>
          </h2>
          <p className="font-body text-sm tracking-[0.15em] text-white/60 mb-2">
            YOUR FIRST ORDER
          </p>
          <p className="font-body text-sm text-white/50 mb-9 leading-relaxed">
            Sign up for exclusive access to new arrivals, private sales, and style inspiration.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col xs:flex-row gap-0 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 min-w-0 bg-transparent border border-white/25 px-5 py-3.5 font-body text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-none bg-white text-charcoal px-6 py-3.5 font-body text-[11px] tracking-[0.2em] hover:bg-bone transition-colors disabled:opacity-70 whitespace-nowrap border border-white"
                >
                  {loading ? "..." : "SUBSCRIBE"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <p className="font-display text-2xl font-light italic text-white mb-1">
                  Welcome to COOMBB ✓
                </p>
                <p className="font-body text-sm text-white/55">
                  Check your inbox for your 10% discount code.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="text-red-400 text-xs mt-2 font-body">{error}</p>
          )}

          {!submitted && (
            <p className="font-body text-[10px] text-white/30 mt-5 tracking-wide">
              No spam, ever. Unsubscribe at any time.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}