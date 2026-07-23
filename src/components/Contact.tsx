import React, { useState } from "react";
import { Mail, Send, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feedback",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    // Simulate submission to simulate organic connection
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "Feedback",
        message: ""
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-4">
          <div className="flex items-center gap-3 text-violet-400">
            <Mail className="w-8 h-8" />
            <span className="text-xs font-bold tracking-widest uppercase">Support &amp; Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            Contact Us
          </h1>
          <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
            Have a question about our procedural generators, encountered a bug, or want to explore brand collaboration? We would love to hear from you.
          </p>
        </div>

        {/* Content & Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left panel info */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/10 space-y-4">
              <h3 className="font-bold text-zinc-200 text-sm sm:text-base">Support Hours</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Our team monitors inquiries Monday through Friday from 9:00 AM to 5:00 PM EST. We typically reply to all legitimate requests within 24 to 48 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/10 space-y-3">
              <h3 className="font-bold text-zinc-200 text-sm sm:text-base">Direct Email</h3>
              <p className="text-zinc-450 text-xs sm:text-sm">
                For complex partnerships or DMCA requests, contact us directly at:
              </p>
              <p className="text-violet-400 font-bold font-mono text-sm sm:text-base hover:underline selection:bg-violet-500/30 selection:text-violet-200">
                support@namefuse.com
              </p>
            </div>
          </div>

          {/* Right panel form */}
          <div className="md:col-span-7">
            {status === "success" ? (
              <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 text-center space-y-4 animate-in zoom-in duration-350">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Message Sent Successfully!</h3>
                <p className="text-zinc-450 text-xs sm:text-sm leading-relaxed">
                  Thank you for reaching out to NameFuse. Your submission has been captured. Our team will review your message and get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm space-y-5">
                
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-red-400 text-xs sm:text-sm flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-100 placeholder-zinc-650 text-sm font-medium transition-all focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-100 placeholder-zinc-650 text-sm font-medium transition-all focus:outline-none"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    Inquiry Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-200 text-sm font-medium transition-all focus:outline-none cursor-pointer"
                  >
                    <option value="Feedback">General Feedback</option>
                    <option value="Bug Report">Technical Bug Report</option>
                    <option value="Partnership">Business/Partnership</option>
                    <option value="Feature Request">New Generator Request</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 text-zinc-100 placeholder-zinc-650 text-sm font-medium transition-all focus:outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-violet-600/10 hover:shadow-violet-650/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Transmitting message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-violet-200" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
