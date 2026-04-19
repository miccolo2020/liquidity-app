import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { Input } from "../components/ui/input";

const faqs = [
  {
    category: "Loan Application",
    questions: [
      {
        q: "How do I apply for a loan?",
        a: "To apply for a loan, go to the Dashboard, click 'Apply for Loan', fill in the required details including amount, duration, and purpose, then submit your application. You'll get approval within 2 minutes!"
      },
      {
        q: "What is the maximum loan amount I can get?",
        a: "Your loan limit depends on your credit score and account tier. First-time borrowers start with ₦5,000. As you repay loans on time, your limit increases up to ₦500,000 for Platinum tier members."
      },
      {
        q: "How long does loan approval take?",
        a: "Loan approval is instant! Most applications are approved within 2 minutes, and funds are disbursed immediately to your registered bank account or PalmPay wallet."
      },
      {
        q: "What documents do I need?",
        a: "For your first loan (₦5,000), you only need a verified phone number. For higher amounts, you'll need to complete KYC verification with your BVN, ID card, and proof of address."
      }
    ]
  },
  {
    category: "Repayment",
    questions: [
      {
        q: "How do I repay my loan?",
        a: "Go to Dashboard, click 'Pay Now' on your active loan, select your payment method (Card, Bank Transfer, PalmPay, or USSD), and complete the payment. You'll receive instant confirmation."
      },
      {
        q: "What are the repayment fees?",
        a: "Standard loan interest is 5%. Late repayment attracts 1% penalty per day. Loan extension costs 2% of the loan amount. We recommend repaying on time to avoid extra charges."
      },
      {
        q: "Can I repay my loan early?",
        a: "Yes! You can repay your loan anytime before the due date with no penalties. Early repayment improves your credit score and unlocks higher loan limits faster."
      },
      {
        q: "What happens if I miss my repayment date?",
        a: "Late repayment attracts a 1% daily penalty fee. It also negatively impacts your credit score. We recommend setting up reminders or repaying early to maintain a good credit record."
      }
    ]
  },
  {
    category: "Credit Score",
    questions: [
      {
        q: "How is my credit score calculated?",
        a: "Your credit score (300-850) is calculated based on: Payment History (35%), Credit Utilization (30%), Credit Age (15%), Account Mix (10%), and Recent Inquiries (10%). Data is synced with CRC Credit Bureau Nigeria."
      },
      {
        q: "How can I improve my credit score?",
        a: "Repay loans on time, avoid late payments, complete KYC verification, maintain low credit utilization, and build a positive payment history. Each on-time repayment boosts your score!"
      },
      {
        q: "What are the account tiers?",
        a: "We have 5 tiers: Basic (₦5,000), Bronze (₦50,000), Silver (₦150,000), Gold (₦300,000), and Platinum (₦500,000). Your tier upgrades automatically as your credit score improves."
      }
    ]
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I verify my account?",
        a: "Go to Profile > KYC Verification. You'll need to provide your BVN, upload a valid ID card (Driver's License, National ID, or Voter's Card), and proof of address. Verification takes 24-48 hours."
      },
      {
        q: "Is my information secure?",
        a: "Yes! We use bank-level encryption and are regulated by the Central Bank of Nigeria. Your data is stored securely and never shared with third parties without your consent."
      },
      {
        q: "How do I update my bank details?",
        a: "Go to Profile > Bank Details. You can add multiple bank accounts including PalmPay, OPay, Kuda, and traditional banks. Set one as primary for loan disbursements."
      }
    ]
  }
];

export function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          <HelpCircle className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Help Center</h1>
        </div>

        <p className="text-blue-100 mb-6">Get answers to your questions</p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 text-lg bg-white border-slate-200 rounded-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-6">
        {/* Quick Contact */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-900 mb-4">Need Immediate Help?</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/30 transition-all border border-white/20"
            >
              <MessageCircle className="w-6 h-6 text-slate-900" />
              <span className="text-xs font-medium text-slate-900">Chat</span>
            </button>
            <a
              href="tel:+2348012345678"
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/30 transition-all border border-white/20"
            >
              <Phone className="w-6 h-6 text-slate-900" />
              <span className="text-xs font-medium text-slate-900">Call</span>
            </a>
            <a
              href="mailto:support@liquidity.ng"
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/30 transition-all border border-white/20"
            >
              <Mail className="w-6 h-6 text-slate-900" />
              <span className="text-xs font-medium text-slate-900">Email</span>
            </a>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Frequently Asked Questions</h3>
          
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border-2 border-slate-200">
              <p className="text-slate-600">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  {category.category}
                </h4>
                <div className="space-y-3">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openQuestions[key];
                    
                    return (
                      <div key={questionIndex} className="border-b-2 border-slate-100 last:border-0 pb-3 last:pb-0">
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full flex items-start gap-3 text-left"
                        >
                          <ChevronDown 
                            className={`w-5 h-5 text-yellow-500 flex-shrink-0 mt-1 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">{item.q}</p>
                            {isOpen && (
                              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                {item.a}
                              </p>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Support Hours */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 flex gap-3">
          <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-900 mb-1">Support Hours</p>
            <p className="text-sm text-blue-700">
              Monday - Friday: 8:00 AM - 8:00 PM WAT<br />
              Saturday: 9:00 AM - 5:00 PM WAT<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
