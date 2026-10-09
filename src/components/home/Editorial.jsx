"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
const PERKS = [
    { icon: "🚚", title: "Free Delivery", sub: "On orders over £30" },
    { icon: "↩️", title: "Returns Accepted", sub: "Within 28 days" },
    { icon: "🔒", title: "Secure Payment", sub: "100% encrypted" },
];
export default function Editorial() {
    return (<section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {PERKS.map((perk, i) => (<motion.div key={perk.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{perk.icon}</span>
              <p className="font-body text-xs font-bold tracking-[0.15em] uppercase text-charcoal">{perk.title}</p>
              <p className="font-body text-xs text-gray-400">{perk.sub}</p>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
