import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoanHistory {
  id: string;
  amount: number;
  status: "active" | "completed" | "overdue" | "pending";
  repaid: boolean;
  repaidOnTime: boolean;
  disbursedDate: string;
  dueDate: string;
  repaidDate?: string;
}

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  creditScore: number;
  creditBureauScore: number; // From CRC Credit Bureau Nigeria
  isFirstTimeBorrower: boolean;
  hasActiveLoans: boolean;
  totalLoansRepaid: number;
  loansRepaidOnTime: number;
  loanHistory: LoanHistory[];
  availableLimit: number;
  maxLoanAmount: number;
  maxLoanDuration: number; // in days
  kycVerified: boolean;
  bvnVerified: boolean;
  accountTier: "basic" | "bronze" | "silver" | "gold" | "platinum";
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  calculateCreditScore: () => number;
  checkLoanEligibility: (amount: number, duration: number) => { eligible: boolean; reason?: string };
  recordLoanRepayment: (loanId: string, onTime: boolean) => void;
  disburseLoan: (amount: number, duration: number) => void;
}

const defaultUserData: UserData = {
  userId: "USR_" + Math.random().toString(36).substr(2, 9),
  firstName: "Chukwudi",
  lastName: "Okafor",
  phoneNumber: "+2348012345678",
  email: "chukwudi@email.com",
  creditScore: 300, // Starting score for new users
  creditBureauScore: 300, // CRC Credit Bureau Nigeria score (300-850)
  isFirstTimeBorrower: true,
  hasActiveLoans: false,
  totalLoansRepaid: 0,
  loansRepaidOnTime: 0,
  loanHistory: [],
  availableLimit: 5000, // First-time users limited to ₦5,000
  maxLoanAmount: 5000,
  maxLoanDuration: 7, // First-time users limited to 7 days
  kycVerified: false,
  bvnVerified: false,
  accountTier: "basic",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("liquidityUserData");
    return saved ? JSON.parse(saved) : defaultUserData;
  });

  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem("liquidityUserData", JSON.stringify(userData));
  }, [userData]);

  const calculateCreditScore = (): number => {
    let score = 300; // Base score

    // Payment history (35% weight) - Most important factor
    if (userData.totalLoansRepaid > 0) {
      const onTimeRate = userData.loansRepaidOnTime / userData.totalLoansRepaid;
      score += Math.floor(onTimeRate * 350); // Up to 350 points
    }

    // Credit utilization (30% weight)
    const utilizationRate = userData.hasActiveLoans ? 0.5 : 0;
    score += Math.floor((1 - utilizationRate) * 150); // Up to 150 points

    // Length of credit history (15% weight)
    const monthsHistory = userData.loanHistory.length;
    score += Math.min(monthsHistory * 10, 100); // Up to 100 points

    // Total loans repaid (10% weight)
    score += Math.min(userData.totalLoansRepaid * 20, 100); // Up to 100 points

    // KYC and BVN verification (10% weight)
    if (userData.kycVerified) score += 50;
    if (userData.bvnVerified) score += 50;

    // Cap at 850 (standard credit score range)
    return Math.min(score, 850);
  };

  const calculateLoanLimits = (score: number) => {
    // Loan limits based on credit score tiers (aligned with Nigerian credit bureau standards)
    if (score < 400) {
      // Poor - First time borrowers
      return { maxAmount: 5000, maxDuration: 7, tier: "basic" as const };
    } else if (score < 550) {
      // Fair - After 1-2 successful repayments
      return { maxAmount: 50000, maxDuration: 30, tier: "bronze" as const };
    } else if (score < 650) {
      // Good - Established borrower
      return { maxAmount: 150000, maxDuration: 60, tier: "silver" as const };
    } else if (score < 750) {
      // Very Good - Excellent payment history
      return { maxAmount: 300000, maxDuration: 90, tier: "gold" as const };
    } else {
      // Excellent - Premium borrower
      return { maxAmount: 500000, maxDuration: 180, tier: "platinum" as const };
    }
  };

  const checkLoanEligibility = (amount: number, duration: number) => {
    // First time borrowers MUST take ₦5,000 for 7 days
    if (userData.isFirstTimeBorrower) {
      if (amount !== 5000) {
        return { 
          eligible: false, 
          reason: "First-time borrowers can only apply for ₦5,000. Complete this loan to unlock higher amounts!" 
        };
      }
      if (duration !== 7) {
        return { 
          eligible: false, 
          reason: "First-time borrowers can only apply for 7 days duration. Complete this loan to unlock longer durations!" 
        };
      }
    }

    // Check if amount exceeds limit
    if (amount > userData.maxLoanAmount) {
      return { 
        eligible: false, 
        reason: `Your current limit is ₦${userData.maxLoanAmount.toLocaleString()}. Repay loans on time to increase your limit!` 
      };
    }

    // Check if duration exceeds limit
    if (duration > userData.maxLoanDuration) {
      return { 
        eligible: false, 
        reason: `Your maximum duration is ${userData.maxLoanDuration} days. Repay loans on time to unlock longer durations!` 
      };
    }

    // Check if user has active loans
    if (userData.hasActiveLoans) {
      return { 
        eligible: false, 
        reason: "Please repay your active loan before applying for a new one." 
      };
    }

    // Check KYC verification for higher amounts
    if (amount > 50000 && !userData.kycVerified) {
      return { 
        eligible: false, 
        reason: "Please complete KYC verification to access higher loan amounts." 
      };
    }

    return { eligible: true };
  };

  const recordLoanRepayment = (loanId: string, onTime: boolean) => {
    const updatedHistory = userData.loanHistory.map(loan => 
      loan.id === loanId 
        ? { ...loan, status: "completed" as const, repaid: true, repaidOnTime: onTime, repaidDate: new Date().toISOString() }
        : loan
    );

    const totalRepaid = userData.totalLoansRepaid + 1;
    const onTimeRepaid = onTime ? userData.loansRepaidOnTime + 1 : userData.loansRepaidOnTime;
    
    // Calculate new credit score
    const tempData = {
      ...userData,
      totalLoansRepaid: totalRepaid,
      loansRepaidOnTime: onTimeRepaid,
      loanHistory: updatedHistory,
      hasActiveLoans: false,
      isFirstTimeBorrower: false,
    };
    
    const newScore = calculateCreditScoreForData(tempData);
    const limits = calculateLoanLimits(newScore);

    setUserData({
      ...tempData,
      creditScore: newScore,
      creditBureauScore: newScore, // Sync with bureau score
      maxLoanAmount: limits.maxAmount,
      maxLoanDuration: limits.maxDuration,
      availableLimit: limits.maxAmount,
      accountTier: limits.tier,
    });
  };

  const calculateCreditScoreForData = (data: UserData): number => {
    let score = 300;

    if (data.totalLoansRepaid > 0) {
      const onTimeRate = data.loansRepaidOnTime / data.totalLoansRepaid;
      score += Math.floor(onTimeRate * 350);
    }

    const utilizationRate = data.hasActiveLoans ? 0.5 : 0;
    score += Math.floor((1 - utilizationRate) * 150);

    const monthsHistory = data.loanHistory.length;
    score += Math.min(monthsHistory * 10, 100);

    score += Math.min(data.totalLoansRepaid * 20, 100);

    if (data.kycVerified) score += 50;
    if (data.bvnVerified) score += 50;

    return Math.min(score, 850);
  };

  const disburseLoan = (amount: number, duration: number) => {
    const newLoan: LoanHistory = {
      id: "LOAN_" + Math.random().toString(36).substr(2, 9),
      amount,
      status: "active",
      repaid: false,
      repaidOnTime: false,
      disbursedDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(),
    };

    setUserData({
      ...userData,
      hasActiveLoans: true,
      loanHistory: [...userData.loanHistory, newLoan],
    });
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      calculateCreditScore,
      checkLoanEligibility,
      recordLoanRepayment,
      disburseLoan
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
