"use client";
import { useState } from "react";
import Link from "lib/Link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ArrowRight,
  X,
} from "lucide-react";
import BrandLogo from "components/ui/BrandLogo";
import { addSubscriber } from "services/api/menu";
import { useApp } from "../../lib/menu-context";

const footerLinks = {
  COLLECTIONS: [
    { label: "New In", href: "/products/new" },
    { label: "Women", href: "/category/women" },
    { label: "Men", href: "/category/men" },
    { label: "Accessories", href: "/category/bags-accessories" },
    { label: "Sale", href: "/products/sale" },
  ],
  HELP: [
    { label: "Shipping & Returns", href: "/privacy-policy" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "FAQ", href: "/faq" },
  ],
  COMPANY: [
    { label: "About Coombb", href: "/about-us" },
    { label: "Sustainability", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-and-conditions" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const { settings } = useApp();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await addSubscriber(email);

      if (data) {
        setSubscribed(true); // ✅ important fix
        setEmail("");
      } else {
        setError("Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <footer className="bg-pinked text-white">
      <div className="border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light italic mb-3">
              Join the Inner Circle
            </h3>
            <p className="font-body text-[10px] tracking-editorial text-white/60 mb-7">
              EXCLUSIVE ACCESS TO NEW COLLECTIONS, PRIVATE EVENTS & EDITORIAL
              CONTENT
            </p>
            {!subscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="flex max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 min-w-0 bg-transparent border border-white/30 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="flex-none bg-white text-charcoal px-5 py-3 font-body text-xs tracking-editorial hover:bg-bone transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  JOIN <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-sm tracking-editorial text-white/80"
              >
                THANK YOU FOR SUBSCRIBING
              </motion.p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex w-fit items-center rounded-md bg-white/95 p-1.5"
            >
              <BrandLogo />
            </Link>
            <p className="mt-4 font-body text-xs text-white/50 leading-relaxed max-w-xs">
              Modern luxury fashion for the discerning individual. Crafted with
              intention, worn with purpose.
            </p>
            <div className="flex gap-4 mt-5">
              {/* Instagram */}
              <a
                href={
                  settings?.instagram_url ||
                  "https://www.instagram.com/coombb_collection/"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-[#E4405F] transition-colors"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>

              {/* YouTube */}
              <a
                href={settings?.youtube_url || "#"}
                target={settings?.youtube_url ? "_blank" : undefined}
                rel={settings?.youtube_url ? "noopener noreferrer" : undefined}
                aria-label="YouTube"
                className="text-white/50 hover:text-[#FF0000] transition-colors"
              >
                <Youtube size={17} strokeWidth={1.5} />
              </a>

              {/* Facebook */}
              <a
                href={
                  settings?.facebook_url ||
                  "https://www.facebook.com/people/Coombb/100090489987079"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/50 hover:text-[#1877F2] transition-colors"
              >
                <Facebook size={17} strokeWidth={1.5} />
              </a>

              {/* X / Twitter */}
              <a
                href={settings?.twitter_url || "#"}
                target={settings?.twitter_url ? "_blank" : undefined}
                rel={settings?.twitter_url ? "noopener noreferrer" : undefined}
                aria-label="X / Twitter"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Twitter size={17} strokeWidth={1.5} />
              </a>

              {/* LinkedIn */}
              <a
                href={settings?.linkedin_url || "#"}
                target={settings?.linkedin_url ? "_blank" : undefined}
                rel={settings?.linkedin_url ? "noopener noreferrer" : undefined}
                aria-label="LinkedIn"
                className="text-white/50 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-[10px] tracking-editorial text-white/40 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="font-body text-[10px] text-white/30">
              © 2026 COOMBB. ALL RIGHTS RESERVED.
            </p>

            <p className="font-body text-[10px] text-white/30">
              Designed & Developed by{" "}
              <a
                href="https://wa.me/919779770059"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-white transition-colors no-underline hover:no-underline"
              >
                Premier WebTech
              </a>
            </p>
          </div>

          <div className="flex gap-5 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors"
            >
              Terms
            </Link>

            <Link
              href="/privacy-policy"
              className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
