import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, Rocket, Code, Database, Palette, Lock } from 'lucide-react';
import { ideasService } from '../services/ideasService';

const MvpGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mvpPlan, setMvpPlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState(null);

  const { idea, ideaId, title } = location.state || {};

  useEffect(() => {
    const userData = localStorage.getItem('aiProjectUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (!parsedUser.is_paid) {
        // Redirect to subscribe if not paid
        return;
      }
      
      if (idea) {
        generateMvpPlan();
      }
    } else {
      navigate('/subscribe');
    }
  }, [idea, navigate]);

  const generateMvpPlan = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      let plan = '';
      
      if (ideaId) {
        // Get the detailed MVP plan from the database
        const projectIdea = ideasService.getIdeaById(ideaId);
        if (projectIdea) {
          plan = ideasService.generateMvpPlan(projectIdea);
        }
      }
      
      // Fallback to a generic MVP plan if no specific plan found
      if (!plan) {
        plan = `
## MVP Development Plan

### Core Features (Must-Have)
1. **User Authentication**
   - Simple login/signup system
   - Basic profile management
   
2. **Main Functionality**
   - Core feature implementation
   - Basic data processing
   - Essential user interactions

3. **Data Management**
   - Minimal database schema
   - Basic CRUD operations
   - Data validation

### Technology Stack Recommendation

#### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Context API or Zustand
- **UI Components**: shadcn/ui or Material-UI

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT with bcrypt

#### Development Tools
- **Version Control**: Git with GitHub
- **Package Manager**: npm or yarn
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (Frontend) + Railway (Backend)

### Architecture Overview
\`\`\`
Frontend (React) ↔ REST API ↔ Database
         ↓
    Authentication Service
         ↓
    Core Business Logic
\`\`\`

### MVP Timeline (4-6 weeks)

**Week 1: Setup & Authentication**
- Project initialization
- Database setup
- User authentication system

**Week 2-3: Core Features**
- Main functionality implementation
- API development
- Frontend components

**Week 4: Integration & Testing**
- Frontend-backend integration
- Basic testing
- Bug fixes

**Week 5-6: Polish & Deploy**
- UI/UX improvements
- Performance optimization
- Deployment setup

### UI/UX Recommendations

#### Key Pages
1. **Landing Page**
   - Clear value proposition
   - Call-to-action buttons
   - Feature highlights

2. **Dashboard**
   - Clean, minimal interface
   - Key metrics display
   - Quick actions

3. **Main Feature Pages**
   - Intuitive navigation
   - Responsive design
   - Loading states

#### Design Principles
- **Simplicity**: Focus on core functionality
- **Consistency**: Uniform color scheme and typography
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile-First**: Responsive design approach

### Security Considerations
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration
- Environment variables for secrets
- HTTPS in production

### Performance Optimization
- Image optimization and lazy loading
- Code splitting and lazy imports
- Database indexing
- Caching strategies
- CDN for static assets

### Deployment Checklist
- [ ] Environment configuration
- [ ] Database migration scripts
- [ ] SSL certificate setup
- [ ] Domain configuration
- [ ] Monitoring and logging
- [ ] Backup strategies

### Next Steps After MVP
1. User feedback collection
2. Analytics implementation
3. Performance monitoring
4. Feature prioritization
5. Scaling considerations
`;
      }

      setMvpPlan(plan);
    } catch (error) {
      console.error('Error generating MVP plan:', error);
    }
    setIsGenerating(false);
  };

  if (!user?.is_paid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle>Pro Feature</CardTitle>
            <CardDescription>
              MVP Generator is available for Pro users only
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Upgrade to Pro to access comprehensive MVP planning with tech stack recommendations and architecture guidance.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/subscribe')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro - ₹99
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!idea) {
    navigate('/');
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
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MVP Generator
              </h1>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              <Crown className="w-3 h-3 mr-1" />
              Pro Feature
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Idea Recap */}
          <Card className="mb-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-purple-600" />
                Project Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              {title && <h3 className="font-semibold text-lg mb-2 text-purple-900">{title}</h3>}
              <p className="text-gray-700">{idea}</p>
            </CardContent>
          </Card>

          {/* MVP Plan */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    Generating MVP Plan...
                  </>
                ) : (
                  <>
                    <Code className="w-5 h-5 mr-2 text-purple-600" />
                    MVP Development Plan
                  </>
                )}
              </CardTitle>
              <CardDescription>
                Comprehensive plan with tech stack, architecture, and implementation guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-6 h-6 text-white animate-bounce" />
                    </div>
                    <p className="text-gray-600">AI is creating your comprehensive MVP blueprint...</p>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {mvpPlan}
                  </div>
                  
                  {/* Feature Highlight Cards */}
                  <div className="grid md:grid-cols-3 gap-4 mt-8 not-prose">
                    <Card className="border-purple-200 bg-purple-50">
                      <CardContent className="pt-6 text-center">
                        <Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-purple-900">Tech Stack</h3>
                        <p className="text-sm text-purple-700">Curated technology recommendations</p>
                      </CardContent>
                    </Card>
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-6 text-center">
                        <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-blue-900">Architecture</h3>
                        <p className="text-sm text-blue-700">System design and database schema</p>
                      </CardContent>
                    </Card>
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-6 text-center">
                        <Palette className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-green-900">UI/UX Guide</h3>
                        <p className="text-sm text-green-700">Design principles and user flow</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MvpGenerator;
