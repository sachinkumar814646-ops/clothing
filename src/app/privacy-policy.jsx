import React from "react";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Mail,
  Globe,
} from "lucide-react";

const PoliciesPage = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Policies
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-8">
            Learn more about our Privacy Policy, Returns & Refunds,
            and Shipping arrangements at Coombb.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="mb-16 border rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-black text-white p-3 rounded-xl">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Privacy Policy
              </h2>

              <p className="text-gray-500">
                Last Updated: May 2026
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Information We Collect
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact details</li>
                <li>Billing and delivery address</li>
                <li>Email and telephone number</li>
                <li>Purchase history</li>
                <li>IP address and browser information</li>
                <li>Cookies and tracking information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How We Use Your Information
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Process and deliver orders</li>
                <li>Manage payments and refunds</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and security issues</li>
                <li>Send marketing communications where permitted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Payment Information
              </h3>

              <p>
                Payments are processed securely through trusted
                third-party payment providers such as Stripe.
                We do not store full payment card details on our servers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Your Rights
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Request data portability</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Security
              </h3>

              <p>
                We implement appropriate technical and organisational
                measures to protect your personal information against
                unauthorised access, misuse, or disclosure.
              </p>
            </div>
          </div>
        </div>

        {/* Returns & Refunds */}
        <div className="mb-16 border rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-black text-white p-3 rounded-xl">
              <RotateCcw size={26} />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Returns & Refunds Policy
              </h2>

              <p className="text-gray-500">
                Last Updated: May 2026
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Return Eligibility
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>To arrange a return, please contact us at coombb11@gmail.com within 14 days of receiving your order.  Items to be returned must be sent back within 28 days of receiving item.</li>
                <li>Items must be unused and unworn</li>
                <li>Original tags must remain attached</li>
                <li>Original packaging required where possible</li>
                <li>Proof of purchase required</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Non-Returnable Items
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Earrings and pierced jewellery</li>
                <li>Used hair accessories</li>
                <li>Personalised/custom items</li>
                <li>Gift cards</li>
                <li>Clearance or final sale items</li>
                <li>Pillows and duvets</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Refunds
              </h3>

              <p>
                Approved refunds will be processed to the original
                payment method within 5–10 working days depending
                on your payment provider.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Faulty or Incorrect Items
              </h3>

              <p>
                Please contact us within 48 hours of delivery with
                photographs if your item is damaged, faulty,
                or incorrect.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Policy */}
        <div className="border rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-black text-white p-3 rounded-xl">
              <Truck size={26} />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Shipping Policy
              </h2>

              <p className="text-gray-500">
                Last Updated: May 2026
              </p>
            </div>
          </div>

          <div className="space-y-8 text-gray-700 leading-8">

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Order Processing
              </h3>

              <p>
                Orders are usually processed within 1–3 working days
                after payment has been received.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Shipping Locations
              </h3>

              <p>
                We currently ship within the United Kingdom.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Estimated Delivery Times
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Standard Delivery: 2–5 working days</li>
                <li>Express Delivery: 1–2 working days</li>
                <li>Europe: 5–10 working days</li>
                <li>Rest of World: 7–21 working days</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Shipping Partners
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <div className="border rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Royal Mail
                  </h4>

                  <p className="text-gray-600">
                    Standard Delivery & Express Delivery
                  </p>
                </div>

                <div className="border rounded-2xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Evri Parcel Delivery
                  </h4>

                  <p className="text-gray-600">
                    Standard Delivery & Express Delivery
                  </p>
                </div>

              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lost or Delayed Parcels
              </h3>

              <p>
                We are not responsible for delays caused by couriers,
                customs processing, weather conditions, or parcels
                marked as delivered by the courier.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-black text-white rounded-3xl p-10">

          <h2 className="text-3xl font-semibold mb-8">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Email */}
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail size={22} />

                <h3 className="text-xl font-semibold">
                  Email
                </h3>
              </div>

              <p className="text-gray-300">
                coombb11@gmail.com
              </p>
            </div>

            {/* Website */}
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={22} />

                <h3 className="text-xl font-semibold">
                  Website
                </h3>
              </div>

              <a
                href="https://www.coombb.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 underline"
              >
                www.coombb.com
              </a>
            </div>

            {/* Brand */}
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Brand
              </h3>

              <p className="text-gray-300">
                Coombb
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PoliciesPage;