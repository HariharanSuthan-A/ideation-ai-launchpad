
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, Crown, Sparkles } from 'lucide-react';

const FlowGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flowGuide, setFlowGuide] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);

  const { idea, dept, category } = location.state || {};

  useEffect(() => {
    if (!idea) {
      navigate('/');
      return;
    }

    const userData = localStorage.getItem('aiProjectUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    generateFlowGuide();
  }, [idea, navigate]);

  const generateFlowGuide = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleGuide = `
## Project Development Roadmap

### Phase 1: Research & Planning (Week 1-2)
- **Literature Review**: Research existing solutions and identify gaps
- **Requirements Analysis**: Define functional and non-functional requirements
- **Technology Stack Selection**: Choose appropriate frameworks and tools
- **Project Timeline**: Create detailed milestone-based timeline

### Phase 2: System Design (Week 3-4)
- **Architecture Design**: Create high-level system architecture
- **Database Design**: Design data models and relationships
- **UI/UX Wireframes**: Create user interface mockups
- **API Design**: Define endpoints and data flow

### Phase 3: Development Setup (Week 5)
- **Environment Setup**: Configure development environment
- **Repository Setup**: Initialize version control with Git
- **Basic Project Structure**: Set up folder structure and dependencies
- **Database Setup**: Initialize database and create tables

### Phase 4: Core Development (Week 6-12)
- **Backend Development**: Implement core business logic
- **Frontend Development**: Build user interfaces
- **API Integration**: Connect frontend with backend
- **Testing**: Unit testing and integration testing

### Phase 5: Advanced Features (Week 13-16)
- **Feature Enhancement**: Add advanced functionalities
- **Performance Optimization**: Optimize for speed and efficiency
- **Security Implementation**: Add authentication and authorization
- **Error Handling**: Implement comprehensive error management

### Phase 6: Testing & Deployment (Week 17-18)
- **System Testing**: End-to-end testing
- **User Acceptance Testing**: Get feedback from potential users
- **Deployment**: Deploy to production environment
- **Documentation**: Create user and technical documentation

### Key Deliverables:
1. Technical Documentation
2. Source Code with Comments
3. User Manual
4. Presentation/Demo
5. Project Report

### Recommended Tools:
- **Frontend**: React.js, Vue.js, or Angular
- **Backend**: Node.js, Python Django, or Java Spring
- **Database**: MySQL, PostgreSQL, or MongoDB
- **Version Control**: Git with GitHub/GitLab
- **Deployment**: AWS, Heroku, or Vercel
`;

      setFlowGuide(sampleGuide);
      
      // Update user's guide usage
      if (user) {
        const updatedUser = { ...user, guides_used: user.guides_used + 1 };
        localStorage.setItem('aiProjectUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error generating flow guide:', error);
    }
    setIsGenerating(false);
  };

  if (!idea) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generator
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Development Guide
              </h1>
            </div>
            {user && (
              <Badge variant={user.is_paid ? "default" : "secondary"}>
                {user.is_paid ? (
                  <>
                    <Crown className="w-3 h-3 mr-1" />
                    Pro User
                  </>
                ) : (
                  <>Guides used: {user.guides_used}/3</>
                )}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Idea Recap */}
          <Card className="mb-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Your Project Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{idea}</p>
              <div className="flex space-x-2 mt-4">
                <Badge variant="outline">{dept}</Badge>
                <Badge variant="outline">{category}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Flow Guide */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                {isGenerating ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Generating Development Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Development Roadmap
                  </>
                )}
              </CardTitle>
              <CardDescription>
                Comprehensive step-by-step guide to build your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-white animate-spin" />
                    </div>
                    <p className="text-gray-600">AI is crafting your personalized development roadmap...</p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {flowGuide}
                  </div>
                  <div className="mt-8 flex space-x-4">
                    <Button 
                      onClick={() => navigate('/mvp-generator', { state: { idea } })}
                      disabled={!user?.is_paid}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Generate MVP Plan {!user?.is_paid && '(Upgrade Required)'}
                    </Button>
                    {!user?.is_paid && user?.guides_used >= 3 && (
                      <Button variant="outline" onClick={() => navigate('/subscribe')}>
                        Upgrade to Continue
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Warning */}
          {user && !user.is_paid && user.guides_used >= 2 && (
            <Card className="mt-6 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-orange-700">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    {user.guides_used === 2 ? 'This is your last free guide!' : 'You\'ve used all free guides!'}
                  </span>
                </div>
                <p className="text-orange-600 mt-2">
                  Upgrade to Pro for unlimited guides and MVP generation.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                  onClick={() => navigate('/subscribe')}
                >
                  Upgrade Now - ₹99 only
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowGuide;
