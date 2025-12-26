import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export const ContactFormSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Buying a Home',
    message: '',
    website: '' // Initialize empty
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (data: ContactFormData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(data.email)) newErrors.email = 'Invalid email address';
    
    if (!data.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if already touched (skip for hidden field)
    if (name !== 'website' && touched[name]) {
      const currentErrors = validate({ ...formData, [name]: value });
      setErrors(prev => ({
        ...prev,
        [name]: currentErrors[name as keyof FormErrors]
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const currentErrors = validate(formData);
    setErrors(prev => ({
      ...prev,
      [name]: currentErrors[name as keyof FormErrors]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check: If the hidden 'website' field has a value, it's a bot.
    // We return silently to not alert the bot.
    if (formData.website) {
      setIsSuccess(true); // Fake success
      return;
    }

    // Mark all as touched on submit attempt
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      message: true,
      interest: true
    });

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', interest: 'Buying a Home', message: '', website: '' });
    setTouched({});
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const getInputClass = (fieldName: keyof FormErrors) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `w-full bg-white border ${hasError ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'} rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all`;
  };

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

        <div className="bg-gray-50 rounded-[24px] p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Message Sent!</h3>
              <p className="text-gray-500">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                 onClick={() => setIsSuccess(false)}
                 className="mt-6 text-brand font-bold hover:underline px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Field - Hidden from users but visible to bots */}
              <input 
                type="text" 
                name="website" 
                value={formData.website} 
                onChange={handleChange} 
                tabIndex={-1} 
                className="absolute opacity-0 -z-10 h-0 w-0" 
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="firstName" className="text-sm font-semibold text-gray-600">First Name <span className="text-red-500">*</span></label>
                  <input 
                    id="firstName" type="text" name="firstName"
                    value={formData.firstName} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('firstName')}
                    placeholder="John" 
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1 animate-in slide-in-from-left-1 duration-200">
                      <AlertCircle size={12}/> {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName" className="text-sm font-semibold text-gray-600">Last Name <span className="text-red-500">*</span></label>
                  <input 
                    id="lastName" type="text" name="lastName"
                    value={formData.lastName} onChange={handleChange} onBlur={handleBlur}
                    className={getInputClass('lastName')}
                    placeholder="Doe" 
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1 animate-in slide-in-from-left-1 duration-200">
                      <AlertCircle size={12}/> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email Address <span className="text-red-500">*</span></label>
                <input 
                  id="email" type="email" name="email"
                  value={formData.email} onChange={handleChange} onBlur={handleBlur}
                  className={getInputClass('email')}
                  placeholder="john@example.com" 
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 animate-in slide-in-from-left-1 duration-200">
                    <AlertCircle size={12}/> {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label htmlFor="interest" className="text-sm font-semibold text-gray-600">Interest</label>
                <select 
                  id="interest" name="interest"
                  value={formData.interest} onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-gray-600 appearance-none"
                >
                  <option>Buying a Home</option>
                  <option>Selling a Property</option>
                  <option>Investment Advice</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-semibold text-gray-600">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" name="message"
                  value={formData.message} onChange={handleChange} onBlur={handleBlur}
                  rows={4} 
                  className={`${getInputClass('message')} resize-none`}
                  placeholder="How can we help you?" 
                />
                {touched.message && errors.message && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1 animate-in slide-in-from-left-1 duration-200">
                    <AlertCircle size={12}/> {errors.message}
                  </p>
                )}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal text-white font-bold py-4 rounded-lg hover:bg-black transition-all shadow-lg mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};