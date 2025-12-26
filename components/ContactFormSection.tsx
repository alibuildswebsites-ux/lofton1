import React from 'react';

export const ContactFormSection = () => {
  return (
    <section className="bg-white py-[60px] md:py-[80px] lg:py-[100px]" id="contact">
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[13px] font-bold tracking-[2px] text-brand uppercase mb-3 block">Contact Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-charcoal mb-6 tracking-tight">Get In Touch</h2>
          <p className="text-gray-500 text-lg">
            Have questions about a property or ready to sell? Send us a message below.
          </p>
        </div>

        <div className="bg-gray-50 rounded-[24px] p-8 md:p-10 border border-gray-100 shadow-sm">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">First Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-transparent transition-all" placeholder="John" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Last Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-transparent transition-all" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <input type="email" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-transparent transition-all" placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Interest</label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-transparent transition-all text-gray-600">
                <option>Buying a Home</option>
                <option>Selling a Property</option>
                <option>Investment Advice</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Message</label>
              <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-transparent transition-all resize-none" placeholder="How can we help you?" />
            </div>
            <button className="w-full bg-charcoal text-white font-bold py-4 rounded-lg hover:bg-black transition-all shadow-lg mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};