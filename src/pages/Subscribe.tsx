
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, CheckCircle, Smartphone, CreditCard, Copy, Check } from 'lucide-react';

const Subscribe = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const upiId = 'kshorts805@oksbi';
  const amount = '99';
  const description = 'AI Project Access';
  const upiDeepLink = `intent://pay?pa=${upiId}&pn=${encodeURIComponent(description)}&mc=0000&mode=02&purpose=00&am=${amount}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`;

  const handlePayWithGPay = () => {
    window.open(upiDeepLink, '_blank');
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerifyPayment = async () => {
    if (!email.trim() || !transactionId.trim()) {
      alert('Please enter both email and transaction ID');
      return;
    }

    setIsVerifying(true);
    try {
      // Save user data to localStorage (simulating backend)
      const newUser = {
        email: email.trim(),
        transaction_id: transactionId.trim(),
        is_paid: false, // Changed to false by default, needs admin verification
        guides_used: 3,
        status: 'pending',
        submitted_at: new Date().toISOString()
      };

      // Get existing users or initialize empty array
      const existingUsersData = localStorage.getItem('projectUsers');
      const users = existingUsersData ? JSON.parse(existingUsersData) : { users: [] };
      
      // Check if user already exists
      const existingUserIndex = users.users.findIndex(user => user.email === newUser.email);
      
      if (existingUserIndex !== -1) {
        // Update existing user
        users.users[existingUserIndex] = { ...users.users[existingUserIndex], ...newUser };
      } else {
        // Add new user
        users.users.push(newUser);
      }

      // Save back to localStorage
      localStorage.setItem('projectUsers', JSON.stringify(users));
      
      console.log('Payment submission saved:', newUser);
      alert('Payment submission received! Your payment will be verified within 24 hours.');
      setEmail('');
      setTransactionId('');
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Payment submission failed. Please try again.');
    }
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Upgrade to Pro
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Plan Details */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">Pro Plan</CardTitle>
              <CardDescription className="text-lg">
                One-time payment • Lifetime access
              </CardDescription>
              <div className="text-4xl font-bold text-purple-600 mt-4">₹99</div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">What you get:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Unlimited AI project ideas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Unlimited development guides</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>MVP generator with tech stack</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Architecture recommendations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Priority AI processing</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-lg">Perfect for:</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Final year students</div>
                    <div>• Capstone project teams</div>
                    <div>• Engineering departments</div>
                    <div>• Academic institutions</div>
                  </div>
                  <Badge className="mt-4 bg-green-100 text-green-700">Best Value</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* GPay Method */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                  Pay with Google Pay
                </CardTitle>
                <CardDescription>
                  Quick and secure UPI payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handlePayWithGPay}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Open Google Pay (₹99)
                </Button>
                
                <div className="text-center text-gray-500">or</div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">UPI ID:</label>
                  <div className="flex items-center space-x-2">
                    <Input value={upiId} readOnly className="flex-1" />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyUpiId}
                      className="px-3"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto border rounded-lg overflow-hidden">
                    <img 
                      src="/lovable-uploads/d096ca56-21e8-4e11-998f-7be41f1f0a70.png" 
                      alt="Google Pay QR Code - Pay ₹99" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Scan to pay ₹99</p>
                </div>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  Submit Payment Details
                </CardTitle>
                <CardDescription>
                  Enter your details after payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address:</label>
                  <Input 
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction ID:</label>
                  <Input 
                    placeholder="Enter UPI transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    You'll receive this ID after successful payment
                  </p>
                </div>
                
                <Button 
                  onClick={handleVerifyPayment}
                  disabled={!email.trim() || !transactionId.trim() || isVerifying}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Payment Details
                    </>
                  )}
                </Button>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Payment Instructions:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Scan QR code or click "Open Google Pay"</li>
                    <li>2. Complete the UPI payment of ₹99</li>
                    <li>3. Enter your email and transaction ID above</li>
                    <li>4. Wait for verification (within 24 hours)</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Note */}
          <Card className="mt-6 bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center text-gray-600">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm">Your payment is processed through India's secure UPI system</p>
                <p className="text-xs text-gray-500 mt-2">UPI ID: {upiId}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
