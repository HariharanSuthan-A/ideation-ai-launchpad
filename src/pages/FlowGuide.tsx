
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock, Crown, Sparkles } from 'lucide-react';
import { ideasService } from '../services/ideasService';
import { useIsMobile } from '../hooks/use-mobile';

const FlowGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flowGuide, setFlowGuide] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);
  const isMobile = useIsMobile();

  const { idea, ideaId, dept, category, title, technologies } = location.state || {};

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let guide = '';
      
      if (ideaId) {
        // Get the detailed development guide from the database
        const projectIdea = ideasService.getIdeaById(ideaId);
        if (projectIdea) {
          guide = ideasService.generateDevelopmentGuide(projectIdea);
        }
      }
      
      // Fallback to a generic guide if no specific guide found
      if (!guide) {
        guide = `
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
      }

      setFlowGuide(guide);
      
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
              {isMobile ? 'Back' : 'Back to Generator'}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isMobile ? 'Dev Guide' : 'Development Guide'}
              </h1>
            </div>
            {user && (
              <Badge variant={user.is_paid ? "default" : "secondary"} className="hidden sm:flex">
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

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Idea Recap */}
          <Card className="mb-6 lg:mb-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Your Project Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              {title && <h3 className="font-semibold text-lg mb-2 text-purple-900">{title}</h3>}
              <p className="text-gray-700 mb-4">{idea}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{dept}</Badge>
                <Badge variant="outline">{category}</Badge>
                {technologies && technologies.slice(0, isMobile ? 3 : 5).map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-100 text-blue-700">
                    {tech}
                  </Badge>
                ))}
                {technologies && technologies.length > (isMobile ? 3 : 5) && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    +{technologies.length - (isMobile ? 3 : 5)} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Flow Guide */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl">
                {isGenerating ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    {isMobile ? 'Generating...' : 'Generating Development Roadmap...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    {isMobile ? 'Roadmap' : 'Development Roadmap'}
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
                    <p className="text-gray-600 text-sm md:text-base">
                      AI is crafting your personalized development roadmap...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base">
                    {flowGuide}
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      onClick={() => navigate('/mvp-generator', { 
                        state: { 
                          idea, 
                          ideaId, 
                          title 
                        } 
                      })}
                      disabled={!user?.is_paid}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      {isMobile ? 'MVP Plan' : 'Generate MVP Plan'} {!user?.is_paid && '(Upgrade Required)'}
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
                  <span className="font-medium text-sm md:text-base">
                    {user.guides_used === 2 ? 'This is your last free guide!' : 'You\'ve used all free guides!'}
                  </span>
                </div>
                <p className="text-orange-600 mt-2 text-sm md:text-base">
                  Upgrade to Pro for unlimited guides and MVP generation.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100 w-full sm:w-auto"
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
