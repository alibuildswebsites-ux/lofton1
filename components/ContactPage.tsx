import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  Linkedin, AlertCircle, MessageSquare,
  Building, ArrowRight, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MapIllustration } from './Illustrations';
import { STATS } from '../data';
import { getOptimizedImageUrl, updateSEO } from '../utils';

// --- Types ---

interface FormData {
  name: string;
  email: string;
  phone: string;
  method: 'Phone' | 'Email' | 'Text';
  interest: string;
  location: string;
  message: string;
  times: string[];
  botField: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// --- Main Component ---

export const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    method: 'Email',
    interest: 'Buying a Home',
    location: 'Houston, TX',
    message: '',
    times: [],
    botField: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    updateSEO({
      title: "Contact Us | Lofton Realty",
      description: "Get in touch with Lofton Realty. Call, email, or visit us for your Houston real estate needs. Available 24/7.",
      url: "https://loftonrealty.com/contact"
    });
    window.scrollTo(0, 0);
  }, []);

  // --- Validation Logic ---

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!data.name.trim()) newErrors.name = 'Full Name is required';
    else if (data.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) newErrors.email = 'Email Address is required';
    else if (!emailRegex.test(data.email)) newErrors.email = 'Invalid email address';

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!data.phone.trim()) newErrors.phone = 'Phone Number is required';
    else if (!phoneRegex.test(data.phone)) newErrors.phone = 'Invalid phone format (e.g., 555-123-4567)';

    if (!data.message.trim()) newErrors.message = 'Message is required';
    else if (data.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name !== 'botField' && touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCheckboxChange = (time: string) => {
    setFormData(prev => {
      const times = prev.times.includes(time) 
        ? prev.times.filter(t => t !== time)
        : [...prev.times, time];
      return { ...prev, times };
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validationErrors = validate(formData);
    if (validationErrors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: validationErrors[name as keyof FormErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.botField) {
      setIsSuccess(true);
      return;
    }

    setTouched({ name: true, email: true, phone: true, message: true });
    
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '', email: '', phone: '', method: 'Email', interest: 'Buying a Home',
      location: 'Houston, TX', message: '', times: [], botField: ''
    });
    setTouched({});
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-charcoal-dark overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center" 
          style={{ backgroundImage: `url(${getOptimizedImageUrl('https://images.unsplash.com/photo-1497366216548-37526070297c', 1200)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/90 to-charcoal-dark/60" />
        
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand/20 border border-brand/40 text-brand font-bold text-sm tracking-widest uppercase mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Let's Start the Conversation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Available 24/7 for your real estate needs. Whether you're buying, selling, or just have questions, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="relative z-20 -mt-16 px-5 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: Phone, title: 'Call Us', detail: '713-203-7661', sub: '24/7 Availability', 
              action: 'Call Now', href: 'tel:7132037661' 
            },
            { 
              icon: Mail, title: 'Email Us', detail: 'Info@LoftonRealty.com', sub: 'Response within 1 hour', 
              action: 'Send Email', href: 'mailto:Info@LoftonRealty.com' 
            },
            { 
              icon: MapPin, title: 'Visit Our Office', detail: 'Houston, Texas Area', sub: 'By appointment', 
              action: 'Get Directions', href: 'https://maps.google.com' 
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:border-brand/30 transition-all"
            >
              <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center text-brand mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-1">{item.title}</h3>
              <p className="text-lg font-medium text-gray-900 mb-1">{item.detail}</p>
              <p className="text-sm text-gray-500 mb-6">{item.sub}</p>
              <a 
                href={item.href}
                target={item.action === 'Get Directions' ? "_blank" : undefined}
                rel={item.action === 'Get Directions' ? "noopener noreferrer" : undefined}
                className="mt-auto text-brand font-bold border-b-2 border-brand/20 hover:border-brand pb-0.5 transition-colors"
              >
                {item.action}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
          
          {/* Left Column: Form */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-charcoal mb-4">Send us a Message</h2>
              <p className="text-gray-500">Fill out the form below and a member of our team will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              {/* Honeypot */}
              <input 
                type="text" 
                name="botField" 
                value={formData.botField} 
                onChange={handleChange} 
                className="absolute opacity-0 -z-10 h-0 w-0" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" name="name"
                    value={formData.name} onChange={handleChange} onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-brand/20 focus:border-brand'} outline-none focus:ring-4 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" name="email"
                    value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-brand/20 focus:border-brand'} outline-none focus:ring-4 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" name="phone"
                    value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-brand/20 focus:border-brand'} outline-none focus:ring-4 transition-all`}
                    placeholder="555-123-4567"
                  />
                  {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.phone}</p>}
                </div>

                {/* Preferred Method */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Preferred Contact Method</label>
                  <div className="flex gap-4 pt-2">
                    {['Phone', 'Email', 'Text'].map((m) => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.method === m ? 'border-brand bg-brand' : 'border-gray-300 group-hover:border-brand'}`}>
                          {formData.method === m && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <input 
                          type="radio" name="method" value={m} 
                          checked={formData.method === m} 
                          onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value as any }))}
                          className="hidden" 
                        />
                        <span className="text-gray-600 text-sm font-medium">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interest */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">I'm interested in</label>
                  <div className="relative">
                    <select 
                      name="interest" value={formData.interest} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none appearance-none bg-white text-gray-700"
                    >
                      {['Buying a Home', 'Selling a Home', 'Investment Properties', 'Renting', 'General Inquiry'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Property Location</label>
                  <div className="relative">
                    <select 
                      name="location" value={formData.location} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none appearance-none bg-white text-gray-700"
                    >
                      {['Houston, TX', 'Galveston, TX', 'Austin, TX', 'Louisiana', 'Mississippi', 'Florida', 'Not sure yet'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label className="text-sm font-bold text-gray-700">Message <span className="text-red-500">*</span></label>
                <div className="relative">
                  <textarea 
                    name="message" rows={4}
                    value={formData.message} onChange={handleChange} onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-brand/20 focus:border-brand'} outline-none focus:ring-4 transition-all resize-none`}
                    placeholder="Tell us about your property goals..."
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
                    {formData.message.length}/500
                  </div>
                </div>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</p>}
              </div>

              {/* Best Time */}
              <div className="space-y-3 mb-8">
                <label className="text-sm font-bold text-gray-700">Best time to contact</label>
                <div className="flex flex-wrap gap-3">
                  {['Morning (8am-12pm)', 'Afternoon (12pm-5pm)', 'Evening (5pm-9pm)'].map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => handleCheckboxChange(time)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        formData.times.includes(time) 
                          ? 'bg-brand-light border-brand text-brand' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-600 font-medium"
                    >
                      <CheckCircle2 size={20} />
                      <span>Message sent successfully! We'll be in touch.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

          {/* Right Column: Info & Team */}
          <div className="space-y-12">
            
            {/* Team Section */}
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Building size={20} className="text-brand" /> Meet the Team
              </h3>
              
              {/* Jared Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Jared Lofton" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-lg">Jared Lofton, MBA</h4>
                    <p className="text-brand text-sm font-bold uppercase tracking-wide">Founder & Broker</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Real Estate Broker with 19+ years experience. MBA in Finance. Former Financial Planner. Philosophy: Clients come first.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 rounded-lg"><Linkedin size={18} /></a>
                  <a href="mailto:Info@LoftonRealty.com" className="p-2 text-gray-400 hover:text-brand transition-colors bg-gray-50 rounded-lg"><Mail size={18} /></a>
                </div>
              </div>

              {/* Placeholder Card */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 border-dashed text-center">
                 <p className="text-gray-400 text-sm font-medium">Looking to join our team?</p>
                 <a href="#" className="text-brand font-bold text-sm hover:underline">View Careers</a>
              </div>
            </div>

            {/* Office Hours */}
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Clock size={20} className="text-brand" /> Office Hours
              </h3>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Mon - Fri</span>
                    <span className="font-bold text-charcoal">8:00 AM - 8:00 PM</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Saturday</span>
                    <span className="font-bold text-charcoal">9:00 AM - 6:00 PM</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Sunday</span>
                    <span className="font-bold text-charcoal">12:00 PM - 5:00 PM</span>
                 </div>
                 <div className="pt-3 mt-3 border-t border-gray-100 flex items-center gap-2 text-brand font-bold text-sm">
                    <CheckCircle2 size={16} /> 24/7 Emergency Support Available
                 </div>
              </div>
            </div>

            {/* FAQ Links */}
            <div>
              <h3 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-brand" /> Common Questions
              </h3>
              <div className="space-y-3">
                {[
                   { label: 'Read our Buyer\'s Guide', action: () => navigate('/buy') },
                   { label: 'Read our Seller\'s Guide', action: () => navigate('/sell') },
                   { label: 'View Current Listings', action: () => navigate('/properties') },
                ].map((link, i) => (
                  <button 
                    key={i}
                    onClick={link.action}
                    className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-brand/30 hover:shadow-md transition-all group text-left"
                  >
                    <span className="text-gray-600 font-medium group-hover:text-charcoal">{link.label}</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-brand" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map & Service Area */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">Serving Houston & Beyond</h2>
            <p className="text-gray-500">Visit our headquarters or connect with us in any of our 6 major markets.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
             {/* Map Embed */}
             <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-[400px] relative bg-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443088.0518320649!2d-95.68266224375!3d29.817478200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1652822453673!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lofton Realty Office Location"
                ></iframe>
             </div>
             
             {/* Service Area Illustration */}
             <div className="w-full max-w-lg mx-auto">
                <MapIllustration />
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-charcoal-dark py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-brand mb-3">
                  <stat.icon size={32} />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             {['BBB Accredited', 'Realtor.com Partner', 'HAR.com Member', 'Equal Housing'].map((badge, i) => (
               <div key={i} className="px-4 py-2 border border-white/30 rounded text-white text-xs font-bold uppercase tracking-widest">
                 {badge}
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};