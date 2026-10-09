import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="font-semibold">Coombb</span> — a modern
            fashion and accessories brand created for people who value style,
            quality, and individuality.
          </p>
        </div>

        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
              alt="Fashion"
              className="rounded-2xl shadow-lg w-full h-[420px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-5">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Founded in 2021, we started with a simple idea: fashion should
              feel personal, accessible, and confidence-boosting.
            </p>

            <p className="text-gray-600 leading-8 mb-5">
              As a small independent limited company based in the Midlands, we
              focus on carefully selected clothing and accessories that combine
              everyday wearability with contemporary design.
            </p>

            <p className="text-gray-600 leading-8">
              We believe great style is not about following every trend — it’s
              about finding pieces that make you feel comfortable, confident,
              and authentic.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
            What We Offer
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Fashion Accessories",
              "Bags & Small Leather Goods",
              "Jewellery & Statement Pieces",
              "Seasonal Fashion Collections",
              "Everyday Wardrobe Essentials",
              "Luggage & Travel Accessories",
            ].map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item}
                </h3>

                <p className="text-gray-600 leading-7">
                  Carefully selected products designed for modern lifestyles and
                  everyday confidence.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="bg-gray-50 rounded-3xl p-10 mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Our Approach
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Quality Over Quantity",
              "Honest Pricing",
              "Excellent Customer Service",
              "Personal Shopping Experience",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {item}
                </h3>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-center mt-8 leading-8 max-w-4xl mx-auto">
            Every order matters to us, and we’re committed to building a brand
            our customers can trust and return to.
          </p>
        </div>

        {/* Sustainability */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Sustainability & Responsibility
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            We are continually working towards more responsible sourcing and
            packaging choices wherever possible. As we grow, we remain
            committed to making thoughtful decisions that support both our
            customers and the wider community.
          </p>
        </div>

        {/* Thank You */}
        <div className="text-center bg-black text-white rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-5">Thank You</h2>

          <p className="text-gray-300 leading-8 max-w-3xl mx-auto mb-8">
            Thank you for supporting a small business. Every purchase, share,
            and recommendation helps us continue growing and doing what we
            love.
          </p>

          <p className="text-lg mb-6">
            We’re excited to have you as part of our journey.
          </p>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Coombb</h3>

            <a
              href="https://www.coombb.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              www.coombb.com
            </a>

            <p className="text-gray-400">
              Follow us on social media for updates & new collections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;