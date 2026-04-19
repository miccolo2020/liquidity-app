import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  ArrowLeft, 
  Mail, 
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";

export function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h2>
            <p className="text-slate-600">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Mail className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Contact Us</h1>
        </div>

        <p className="text-blue-100">We're here to help! Get in touch with us</p>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-6">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <a
            href="mailto:support@liquidity.ng"
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg flex items-center gap-4 hover:border-yellow-400 transition-all"
          >
            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 mb-1">Email Support</p>
              <p className="text-sm text-slate-600">support@liquidity.ng</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+2348012345678"
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg flex items-center gap-4 hover:border-yellow-400 transition-all"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 mb-1">Call Us</p>
              <p className="text-sm text-slate-600">+234 801 234 5678</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/2348012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg flex items-center gap-4 hover:border-yellow-400 transition-all"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 mb-1">WhatsApp</p>
              <p className="text-sm text-slate-600">Chat with us on WhatsApp</p>
            </div>
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-yellow-500" />
            Send us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 bg-slate-50 border-slate-300 rounded-xl"
                required
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-700">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger className="h-12 bg-slate-50 border-slate-300 rounded-xl">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loan">Loan Inquiry</SelectItem>
                  <SelectItem value="repayment">Repayment Issue</SelectItem>
                  <SelectItem value="kyc">KYC Verification</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-700">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-32 bg-slate-50 border-slate-300 rounded-xl resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-12 text-base rounded-2xl font-bold shadow-lg"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Office Address */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-500" />
            Our Office
          </h3>
          <div className="space-y-3">
            <p className="text-slate-700">
              123 Liquidity Plaza,<br />
              Victoria Island,<br />
              Lagos, Nigeria
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>Monday - Friday: 8:00 AM - 8:00 PM WAT</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-900 mb-4">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/liquidity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all border border-white/20"
            >
              <Facebook className="w-6 h-6 text-slate-900" />
            </a>
            <a
              href="https://twitter.com/liquidity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all border border-white/20"
            >
              <Twitter className="w-6 h-6 text-slate-900" />
            </a>
            <a
              href="https://instagram.com/liquidity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all border border-white/20"
            >
              <Instagram className="w-6 h-6 text-slate-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
