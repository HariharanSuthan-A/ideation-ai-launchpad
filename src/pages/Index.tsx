
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Rocket, Crown, ArrowRight, Zap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const departments = [
  { value: 'cse', label: 'Computer Science & Engineering' },
  { value: 'ece', label: 'Electronics & Communication' },
  { value: 'it', label: 'Information Technology' },
  { value: 'mech', label: 'Mechanical Engineering' },
  { value: 'civil', label: 'Civil Engineering' },
  { value: 'eee', label: 'Electrical & Electronics' }
];

const categories = [
  { value: 'ai-ml', label: 'AI/ML & Data Science' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'mobile-dev', label: 'Mobile App Development' },
  { value: 'iot', label: 'Internet of Things' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'automation', label: 'Automation & Robotics' },
  { value: 'cloud', label: 'Cloud Computing' }
];

const Index = () => {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('aiProjectUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const generateIdea = async () => {
    if (!selectedDept || !selectedCategory) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleIdeas = [
        "Smart Campus Navigation System with AR - Develop an augmented reality-based indoor navigation system for college campuses using computer vision and mobile sensors.",
        "AI-Powered Code Review Assistant - Create an intelligent code review system that uses machine learning to detect bugs, suggest optimizations, and enforce coding standards.",
        "Blockchain-Based Student Credential Verification - Build a decentralized system for issuing and verifying academic certificates using blockchain technology.",
        "IoT-Based Smart Agriculture Monitoring - Design an intelligent farming system using sensors, drones, and ML algorithms to optimize crop yield and resource usage."
      ];
      
      const randomIdea = sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)];
      setGeneratedIdea(randomIdea);
    } catch (error) {
      console.error('Error generating idea:', error);
    }
    setIsGenerating(false);
  };

  const handleGetFlowGuide = () => {
    if (!user) {
      // Prompt for email
      const email = prompt('Enter your email to continue:');
      if (email) {
        const newUser = { email, guides_used: 0, is_paid: false };
        localStorage.setItem('aiProjectUser', JSON.stringify(newUser));
        setUser(newUser);
      }
      return;
    }

    if (user.guides_used >= 3 && !user.is_paid) {
      navigate('/subscribe');
      return;
    }

    navigate('/flow-guide', { state: { idea: generatedIdea, dept: selectedDept, category: selectedCategory } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Project Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-2">
                  <Badge variant={user.is_paid ? "default" : "secondary"}>
                    {user.is_paid ? (
                      <>
                        <Crown className="w-3 h-3 mr-1" />
                        Pro User
                      </>
                    ) : (
                      <>Free ({3 - user.guides_used} guides left)</>
                    )}
                  </Badge>
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
              )}
              <Button variant="outline" onClick={() => navigate('/subscribe')}>
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Final Year Project Ideas
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized project ideas, development roadmaps, and MVP plans tailored to your engineering domain
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">AI-Generated Ideas</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Step-by-Step Guides</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">MVP Planning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Generate Your Project Idea</CardTitle>
                <CardDescription className="text-center">
                  Select your department and preferred category to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={generateIdea}
                  disabled={!selectedDept || !selectedCategory || isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Idea...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Project Idea
                    </>
                  )}
                </Button>

                {generatedIdea && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                    <h3 className="font-semibold mb-3 text-lg">Your Project Idea:</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{generatedIdea}</p>
                    <div className="flex space-x-3">
                      <Button onClick={handleGetFlowGuide} className="flex items-center">
                        Get Development Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/mvp-generator', { state: { idea: generatedIdea } })}
                        disabled={!user?.is_paid}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Generate MVP Plan {!user?.is_paid && '(Pro Only)'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Everything You Need to Build Your Project</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">AI Project Ideas</h4>
              <p className="text-gray-600 text-sm">Get unlimited unique project ideas tailored to your department</p>
              <Badge className="mt-3 bg-green-100 text-green-700">Always Free</Badge>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Development Roadmap</h4>
              <p className="text-gray-600 text-sm">Step-by-step guides to implement your project successfully</p>
              <Badge className="mt-3 bg-blue-100 text-blue-700">3 Free Guides</Badge>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">MVP Planning</h4>
              <p className="text-gray-600 text-sm">Complete MVP blueprints with tech stack and architecture</p>
              <Badge className="mt-3 bg-purple-100 text-purple-700">Pro Only</Badge>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
