
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, CheckCircle, Clock, Eye, EyeOff } from 'lucide-react';

interface PaymentSubmission {
  email: string;
  transaction_id: string;
  status: 'pending' | 'verified';
  is_paid: boolean;
  submitted_at: string;
  guides_used: number;
}

const AdminPayments = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [payments, setPayments] = useState<PaymentSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be more secure

  useEffect(() => {
    if (isAuthenticated) {
      loadPayments();
    }
  }, [isAuthenticated]);

  const loadPayments = () => {
    try {
      const userData = localStorage.getItem('projectUsers');
      if (userData) {
        const users = JSON.parse(userData);
        setPayments(users.users || []);
      }
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const handleVerifyPayment = (email: string) => {
    setIsLoading(true);
    try {
      const userData = localStorage.getItem('projectUsers');
      if (userData) {
        const users = JSON.parse(userData);
        const userIndex = users.users.findIndex((user: PaymentSubmission) => user.email === email);
        
        if (userIndex !== -1) {
          users.users[userIndex].status = 'verified';
          users.users[userIndex].is_paid = true;
          
          // Save updated data
          localStorage.setItem('projectUsers', JSON.stringify(users));
          
          // Update current user session if it's the same email
          const currentUser = localStorage.getItem('aiProjectUser');
          if (currentUser) {
            const current = JSON.parse(currentUser);
            if (current.email === email) {
              current.is_paid = true;
              current.status = 'verified';
              localStorage.setItem('aiProjectUser', JSON.stringify(current));
            }
          }
          
          // Reload payments
          loadPayments();
          
          alert(`Payment verified for ${email}. User now has full access.`);
        }
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error verifying payment. Please try again.');
    }
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'verified') {
      return <Badge className="bg-green-100 text-green-700">Verified</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>
              Enter password to access payment dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Password:</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-red-600" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
                    <p className="text-sm text-gray-600">Pending Payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{payments.filter(p => p.status === 'verified').length}</p>
                    <p className="text-sm text-gray-600">Verified Payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{payments.length}</p>
                    <p className="text-sm text-gray-600">Total Submissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Submissions</CardTitle>
              <CardDescription>
                Manage and verify user payment submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No payment submissions yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{payment.email}</TableCell>
                          <TableCell className="font-mono text-sm">{payment.transaction_id}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-sm">{formatDate(payment.submitted_at)}</TableCell>
                          <TableCell>
                            {payment.status === 'pending' ? (
                              <Button
                                size="sm"
                                onClick={() => handleVerifyPayment(payment.email)}
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                            ) : (
                              <Badge className="bg-green-100 text-green-700">
                                ✓ Verified
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 text-blue-900">Verification Process:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Review transaction IDs with your UPI payment history</li>
                <li>• Click "Verify" to approve valid payments</li>
                <li>• Verified users get unlimited access to flow guides and MVP generator</li>
                <li>• Users will see their Pro access activated immediately</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
