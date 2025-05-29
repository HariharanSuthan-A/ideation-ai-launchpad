import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Rocket, Crown, ArrowRight, Zap, BookOpen, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ideasService, ProjectIdea } from '../services/ideasService';
import { useIsMobile } from '../hooks/use-mobile';

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
  const [generatedIdea, setGeneratedIdea] = useState<ProjectIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const idea = ideasService.getRandomIdea(selectedDept, selectedCategory);
      setGeneratedIdea(idea);
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

    navigate('/flow-guide', { 
      state: { 
        idea: generatedIdea?.description, 
        ideaId: generatedIdea?.id,
        dept: selectedDept, 
        category: selectedCategory,
        title: generatedIdea?.title,
        technologies: generatedIdea?.technologies
      } 
    });
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
                ProGen
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            {!isMobile && (
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
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMobile && mobileMenuOpen && (
            <div className="mt-4 pb-4 border-t pt-4">
              {user && (
                <div className="mb-3">
                  <Badge variant={user.is_paid ? "default" : "secondary"} className="mb-2">
                    {user.is_paid ? (
                      <>
                        <Crown className="w-3 h-3 mr-1" />
                        Pro User
                      </>
                    ) : (
                      <>Free ({3 - user.guides_used} guides left)</>
                    )}
                  </Badge>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/subscribe')}
              >
                Upgrade to Pro
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Final Year Project Ideas
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 px-4">
              Get personalized project ideas, development roadmaps, and MVP plans tailored to your engineering domain
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">AI-Generated Ideas</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Step-by-Step Guides</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">MVP Planning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Generator */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold text-center">Generate Your Project Idea</CardTitle>
                <CardDescription className="text-center">
                  Select your department and preferred category to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                  <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                    <h3 className="font-semibold mb-2 text-lg text-purple-900">{generatedIdea.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{generatedIdea.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-green-100 text-green-700">
                        {generatedIdea.difficulty}
                      </Badge>
                      {generatedIdea.technologies.slice(0, isMobile ? 2 : 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-100 text-blue-700">
                          {tech}
                        </Badge>
                      ))}
                      {generatedIdea.technologies.length > (isMobile ? 2 : 3) && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-700">
                          +{generatedIdea.technologies.length - (isMobile ? 2 : 3)} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleGetFlowGuide} className="flex items-center justify-center">
                        Get Development Guide
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/mvp-generator', { 
                          state: { 
                            idea: generatedIdea.description,
                            ideaId: generatedIdea.id,
                            title: generatedIdea.title
                          } 
                        })}
                        disabled={!user?.is_paid}
                        className="flex items-center justify-center"
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
      <section className="py-12 lg:py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 lg:mb-12">Everything You Need to Build Your Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-4 lg:p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">AI Project Ideas</h4>
              <p className="text-gray-600 text-sm">Get unlimited unique project ideas tailored to your department</p>
              <Badge className="mt-3 bg-green-100 text-green-700">Always Free</Badge>
            </Card>
            <Card className="text-center p-4 lg:p-6 border-0 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Development Roadmap</h4>
              <p className="text-gray-600 text-sm">Step-by-step guides to implement your project successfully</p>
              <Badge className="mt-3 bg-blue-100 text-blue-700">3 Free Guides</Badge>
            </Card>
            <Card className="text-center p-4 lg:p-6 border-0 shadow-lg">
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
