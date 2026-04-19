import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Zap, ShieldCheck, Calendar } from "lucide-react";

const onboardingSteps = [
  {
    icon: Zap,
    title: "Instant Approval",
    description: "Get your loan approved in minutes, not days. No long paperwork or waiting time.",
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-blue-100",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description: "Your data is protected with bank-level security. We comply with all Nigerian financial regulations.",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-yellow-100",
  },
  {
    icon: Calendar,
    title: "Flexible Repayment",
    description: "Choose repayment plans that suit your income. Extend or pay early without penalties.",
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-blue-100",
  },
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className={`w-32 h-32 ${step.bgColor} rounded-full flex items-center justify-center mb-8`}>
          <Icon className={`w-16 h-16 ${step.color}`} strokeWidth={2} />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          {step.title}
        </h2>
        
        <p className="text-gray-600 text-center text-lg max-w-md mb-12">
          {step.description}
        </p>

        {/* Pagination Dots */}
        <div className="flex gap-2 mb-12">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-yellow-500"
                  : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-8 pb-8 space-y-3">
        <Button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-2xl font-bold"
        >
          {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
        </Button>
        
        {currentStep < onboardingSteps.length - 1 && (
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-gray-600 h-14 text-lg"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
}