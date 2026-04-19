import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  ArrowLeft, 
  CreditCard,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Card {
  id: string;
  type: "visa" | "mastercard" | "verve";
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isPrimary: boolean;
}

export function Cards() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState<{ [key: string]: boolean }>({});
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "visa",
      last4: "4532",
      expiryMonth: "12",
      expiryYear: "25",
      holderName: "Chukwudi Okafor",
      isPrimary: true,
    },
    {
      id: "2",
      type: "mastercard",
      last4: "7890",
      expiryMonth: "08",
      expiryYear: "26",
      holderName: "Chukwudi Okafor",
      isPrimary: false,
    },
  ]);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    holderName: "",
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock card type detection
    const firstDigit = formData.cardNumber[0];
    let cardType: "visa" | "mastercard" | "verve" = "visa";
    if (firstDigit === "5") cardType = "mastercard";
    if (firstDigit === "6") cardType = "verve";

    const newCard: Card = {
      id: Date.now().toString(),
      type: cardType,
      last4: formData.cardNumber.slice(-4),
      expiryMonth: formData.expiryMonth,
      expiryYear: formData.expiryYear,
      holderName: formData.holderName,
      isPrimary: cards.length === 0,
    };

    setCards([...cards, newCard]);
    setShowAddForm(false);
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
    });
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm("Are you sure you want to remove this card?")) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const handleSetPrimary = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isPrimary: card.id === id,
    })));
  };

  const getCardGradient = (type: string) => {
    switch (type) {
      case "visa":
        return "from-blue-500 to-blue-700";
      case "mastercard":
        return "from-red-500 to-orange-600";
      case "verve":
        return "from-purple-500 to-pink-600";
      default:
        return "from-slate-600 to-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/wallet")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <CreditCard className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">My Cards</h1>
        </div>

        <p className="text-blue-100">Manage your payment cards</p>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-4">
        {/* Add Card Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 rounded-3xl flex items-center justify-center gap-2 font-bold shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </Button>
        )}

        {/* Add Card Form */}
        {showAddForm && (
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Add New Card</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-slate-700">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\s/g, "") })}
                  className="h-12 text-lg bg-slate-50 border-slate-300 rounded-xl"
                  maxLength={16}
                  required
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth" className="text-slate-700">Month</Label>
                  <Input
                    id="expiryMonth"
                    type="text"
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                    className="h-12 text-lg bg-slate-50 border-slate-300 rounded-xl"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear" className="text-slate-700">Year</Label>
                  <Input
                    id="expiryYear"
                    type="text"
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                    className="h-12 text-lg bg-slate-50 border-slate-300 rounded-xl"
                    maxLength={2}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-slate-700">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="h-12 text-lg bg-slate-50 border-slate-300 rounded-xl"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="space-y-2">
                <Label htmlFor="holderName" className="text-slate-700">Cardholder Name</Label>
                <Input
                  id="holderName"
                  type="text"
                  placeholder="Name on card"
                  value={formData.holderName}
                  onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                  className="h-12 text-lg bg-slate-50 border-slate-300 rounded-xl"
                  required
                />
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Your card details are encrypted and stored securely. We never share your information.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-12 rounded-2xl font-bold"
              >
                Add Card
              </Button>
            </form>
          </div>
        )}

        {/* Saved Cards */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Saved Cards ({cards.length})</h3>
          
          {cards.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border-2 border-slate-200">
              <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No cards added yet</p>
            </div>
          ) : (
            cards.map((card) => (
              <div key={card.id} className="relative">
                {/* Card Display */}
                <div className={`bg-gradient-to-br ${getCardGradient(card.type)} rounded-3xl p-6 text-white shadow-xl border-2 ${card.isPrimary ? "border-yellow-400" : "border-white/20"}`}>
                  {card.isPrimary && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-white shadow-lg">
                      Primary
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-8">
                    <div className="text-lg font-bold uppercase">{card.type}</div>
                    <CreditCard className="w-10 h-10 text-white/50" />
                  </div>

                  <div className="mb-6">
                    <div className="text-2xl font-bold tracking-wider">
                      •••• •••• •••• {card.last4}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-white/70 mb-1">Cardholder</div>
                      <div className="font-medium">{card.holderName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Expires</div>
                      <div className="font-medium">{card.expiryMonth}/{card.expiryYear}</div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 mt-3">
                  {!card.isPrimary && (
                    <Button
                      onClick={() => handleSetPrimary(card.id)}
                      variant="outline"
                      className="flex-1 h-10 rounded-xl border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Set as Primary
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteCard(card.id)}
                    variant="outline"
                    className="h-10 px-4 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 flex gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-900 mb-1">Secure Card Storage</p>
            <p className="text-sm text-blue-700">
              Your cards are stored with bank-level encryption. Use your primary card for faster checkouts and automatic loan disbursements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
