import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>

          <p className="text-gray-500 text-lg">
            Last Updated: May 2026
          </p>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p className="text-gray-700 leading-8 text-lg">
            Welcome to <span className="font-semibold">Coombb</span> (“we”,
            “our”, “us”). These Terms & Conditions govern your use of our
            website and the purchase of products from us.
          </p>

          <p className="text-gray-700 leading-8 mt-4 text-lg">
            By using our website, you agree to these Terms & Conditions in full.
            If you do not agree with these terms, please do not use our website.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">

          {/* Company Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Company Information
            </h2>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-3 text-gray-700">
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.coombb.com"
                  className="text-black underline"
                >
                  www.coombb.com
                </a>
              </p>

              <p>
                <strong>Operated By:</strong> Nirwan One Limited
              </p>

              <p>
                <strong>Registered In:</strong> England and Wales
              </p>

              <p>
                <strong>Company Number:</strong> 13193140
              </p>

              <p>
                <strong>Registered Office:</strong> Birmingham
              </p>

              <p>
                <strong>Email:</strong> coombb11@gmail.com
              </p>
            </div>
          </div>

          {/* Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Use of Our Website
            </h2>

            <p className="text-gray-700 leading-8 mb-4">
              You agree to use this website only for lawful purposes and in a
              way that does not infringe the rights of others.
            </p>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Misuse or attempt to hack the website</li>
              <li>Introduce viruses or malicious software</li>
              <li>Copy or reproduce website content without permission</li>
              <li>Use the website for fraudulent purposes</li>
            </ul>

            <p className="text-gray-700 leading-8 mt-4">
              We reserve the right to suspend or terminate access to our
              website if misuse is suspected.
            </p>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Products & Descriptions
            </h2>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>
                Colours may vary slightly depending on screen settings
              </li>
              <li>
                Product sizes and measurements may have small variations
              </li>
              <li>
                We reserve the right to update product information at any time
              </li>
              <li>
                We do not guarantee all items will always be in stock
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Pricing & Payments
            </h2>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>All prices are listed in GBP (£)</li>
              <li>Prices may change without notice</li>
              <li>
                Payment must be made in full before orders are dispatched
              </li>
              <li>
                We reserve the right to cancel orders due to pricing errors
              </li>
            </ul>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Orders
            </h2>

            <p className="text-gray-700 leading-8 mb-4">
              Once you place an order, you will receive an order confirmation
              email. This does not mean your order has been accepted.
            </p>
            <p className="text-gray-700 leading-8 mb-1">We have the right to</p>
            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Refuse or cancel orders</li>
              <li>Limit quantities purchased</li>
              <li>
                Cancel orders suspected of fraud or unauthorised activity
              </li>
            </ul>

            <p className="text-gray-700 leading-8 mt-4">
              If your order is cancelled after payment, a full refund will be
              issued.
            </p>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Shipping & Delivery
            </h2>

            <p className="text-gray-700 leading-8 mb-4">
              Delivery times are estimates and may vary due to courier delays
              or external factors beyond our control.
            </p>
            <p className="text-gray-700 leading-8 mb-1">We are not responsible for</p>
            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Delays caused by couriers</li>
              <li>Incorrect delivery information provided by customers</li>
              <li>Lost parcels marked as delivered by the courier</li>
            </ul>

            <p className="text-gray-700 leading-8 mt-4">
              Customers are responsible for customs duties or import taxes for
              international orders.
            </p>
          </div>

          {/* Returns */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Returns & Refunds
            </h2>

            <p className="text-gray-700 leading-8 mb-4">
              Returns and refunds are accepted under the following conditions:
            </p>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Items must be unused and in original condition</li>
              <li>Tags and packaging must remain intact</li>
              <li>Returns must be requested within 14 days</li>
            </ul>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Non-Returnable Items
              </h3>

              <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
                <li>Earrings (for hygiene reasons)</li>
                <li>Personalised/custom items</li>
                <li>Gift cards</li>
                <li>Sale items (if stated)</li>
                <li>Pillows</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-8 mt-4">
              Customers are responsible for return shipping costs unless the
              item is faulty.
            </p>
          </div>

          {/* Faulty */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Faulty or Incorrect Items
            </h2>

            <p className="text-gray-700 leading-8">
              If you receive a faulty, damaged, or incorrect item, please
              contact us within 5 days of delivery with photos where possible.
              Your statutory rights under UK consumer law are not affected.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Intellectual Property
            </h2>

            <p className="text-gray-700 leading-8">
              All website content including logos, images, graphics, text, and
              designs are owned by or licensed to Coombb. You may not copy,
              reproduce, or distribute any content without written permission.
            </p>
          </div>

          {/* Liability */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Limitation of Liability
            </h2>

            <ul className="list-disc pl-6 text-gray-700 leading-8 space-y-2">
              <li>Indirect or consequential losses</li>
              <li>Loss of profits or business</li>
              <li>Website interruptions or technical issues</li>
            </ul>

            <p className="text-gray-700 leading-8 mt-4">
              Nothing in these terms excludes liability for fraud, death, or
              personal injury caused by negligence where prohibited by law.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Privacy
            </h2>

            <p className="text-gray-700 leading-8">
              Your personal information is handled in accordance with our
              Privacy Policy. By using this website, you consent to the
              collection and use of information as outlined in our Privacy
              Policy.
            </p>
          </div>

          {/* Third Party */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Third-Party Links
            </h2>

            <p className="text-gray-700 leading-8">
              Our website may contain links to third-party websites. We are not
              responsible for their content, policies, or practices.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Changes to These Terms
            </h2>

            <p className="text-gray-700 leading-8">
              We may update these Terms & Conditions at any time without prior
              notice. Changes will take effect immediately upon posting on the
              website.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Governing Law
            </h2>

            <p className="text-gray-700 leading-8">
              These Terms & Conditions are governed by the laws of England and
              Wales. Any disputes shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-black text-white rounded-3xl p-10">
            <h2 className="text-3xl font-semibold mb-6">
              Contact Us
            </h2>

            <p className="text-gray-300 leading-8 mb-4">
              If you have any questions regarding these Terms & Conditions,
              please contact:
            </p>

            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Brand:</strong> Coombb
              </p>

              <p>
                <strong>Email:</strong> coombb11@gmail.com
              </p>

              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.coombb.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-white"
                >
                  www.coombb.com
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;