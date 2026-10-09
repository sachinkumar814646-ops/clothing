import React from "react";
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Globe,
  Building2,
} from "lucide-react";

const ContactUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-8">
            Get in touch with Coombb for product enquiries, order support,
            returns, or general questions regarding our services.
          </p>
        </div>

        {/* Company Information */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm">

          <h2 className="text-3xl font-semibold text-gray-900 mb-10">
            Company Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Company */}
            <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white">
              <div className="bg-black text-white p-3 rounded-xl">
                <Building2 size={22} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Company
                </h3>

                <p className="text-gray-600 leading-7">
                  Nirwan One Limited
                </p>

                <p className="text-gray-600 leading-7">
                  Registered in England & Wales
                </p>

                <p className="text-gray-600 leading-7">
                  Company Number: 13193140
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white">
              <div className="bg-black text-white p-3 rounded-xl">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Address
                </h3>

                <p className="text-gray-600 leading-7">
                  coombb11@gmail.com
                </p>
              </div>
            </div>


            {/* Website */}
            <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white">
              <div className="bg-black text-white p-3 rounded-xl">
                <Globe size={22} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Website
                </h3>

                <a
                  href="https://www.coombb.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 underline hover:text-black"
                >
                  www.coombb.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white">
              <div className="bg-black text-white p-3 rounded-xl">
                <MapPin size={22} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Registered Office
                </h3>

                <p className="text-gray-600 leading-7">
                  Birmingham, England,
                  <br />
                  United Kingdom
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 border rounded-2xl p-6 bg-white">
              <div className="bg-black text-white p-3 rounded-xl">
                <Clock size={22} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Business Hours
                </h3>

                <p className="text-gray-600 leading-7">
                  Monday – Friday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 bg-black text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Thank You for Visiting Coombb
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-8">
            We appreciate your interest in our brand and look forward to
            assisting you with any questions regarding our products,
            services, or orders.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;