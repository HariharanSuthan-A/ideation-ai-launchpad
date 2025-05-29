import ideasDatabase from '../data/ideas.json';

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  developmentGuide: string;
  mvpPlan: string;
}

export class IdeasService {
  private ideas: Record<string, ProjectIdea[]>;

  constructor() {
    // Type assertion to properly cast the imported JSON data
    this.ideas = ideasDatabase as Record<string, ProjectIdea[]>;
  }

  // Get ideas by department and category
  getIdeasByDepartmentAndCategory(department: string, category: string): ProjectIdea[] {
    const departmentIdeas = this.ideas[department] || [];
    return departmentIdeas.filter(idea => idea.category === category);
  }

  // Get random idea by department and category
  getRandomIdea(department: string, category: string): ProjectIdea | null {
    const filteredIdeas = this.getIdeasByDepartmentAndCategory(department, category);
    if (filteredIdeas.length === 0) {
      // Fallback to any idea from the department
      const departmentIdeas = this.ideas[department] || [];
      if (departmentIdeas.length === 0) return null;
      return departmentIdeas[Math.floor(Math.random() * departmentIdeas.length)];
    }
    return filteredIdeas[Math.floor(Math.random() * filteredIdeas.length)];
  }

  // Get idea by ID
  getIdeaById(ideaId: string): ProjectIdea | null {
    for (const department in this.ideas) {
      const idea = this.ideas[department].find(idea => idea.id === ideaId);
      if (idea) return idea;
    }
    return null;
  }

  // Get all ideas for a department
  getIdeasByDepartment(department: string): ProjectIdea[] {
    return this.ideas[department] || [];
  }

  // Get ideas by difficulty
  getIdeasByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ProjectIdea[] {
    const allIdeas: ProjectIdea[] = [];
    for (const department in this.ideas) {
      allIdeas.push(...this.ideas[department].filter(idea => idea.difficulty === difficulty));
    }
    return allIdeas;
  }

  // Get ideas by technology
  getIdeasByTechnology(technology: string): ProjectIdea[] {
    const allIdeas: ProjectIdea[] = [];
    for (const department in this.ideas) {
      allIdeas.push(...this.ideas[department].filter(idea => 
        idea.technologies.some(tech => tech.toLowerCase().includes(technology.toLowerCase()))
      ));
    }
    return allIdeas;
  }

  // Get statistics
  getStatistics() {
    let totalIdeas = 0;
    const departmentCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    const difficultyCounts: Record<string, number> = {};

    for (const department in this.ideas) {
      const departmentIdeas = this.ideas[department];
      departmentCounts[department] = departmentIdeas.length;
      totalIdeas += departmentIdeas.length;

      departmentIdeas.forEach(idea => {
        categoryCounts[idea.category] = (categoryCounts[idea.category] || 0) + 1;
        difficultyCounts[idea.difficulty] = (difficultyCounts[idea.difficulty] || 0) + 1;
      });
    }

    return {
      totalIdeas,
      departmentCounts,
      categoryCounts,
      difficultyCounts
    };
  }

  // Generate development guide for an idea
  generateDevelopmentGuide(idea: ProjectIdea): string {
    return idea.developmentGuide;
  }

  // Generate MVP plan for an idea
  generateMvpPlan(idea: ProjectIdea): string {
    return idea.mvpPlan;
  }

  // Search ideas by query
  searchIdeas(query: string): ProjectIdea[] {
    const allIdeas: ProjectIdea[] = [];
    const searchTerm = query.toLowerCase();

    for (const department in this.ideas) {
      allIdeas.push(...this.ideas[department].filter(idea => 
        idea.title.toLowerCase().includes(searchTerm) ||
        idea.description.toLowerCase().includes(searchTerm) ||
        idea.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
      ));
    }

    return allIdeas;
  }
}

export const ideasService = new IdeasService();
