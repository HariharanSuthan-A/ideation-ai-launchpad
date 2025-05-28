
export interface User {
  email: string;
  transaction_id: string;
  is_paid: boolean;
  guides_used: number;
}

export interface UserDatabase {
  users: User[];
}

export const saveUserToDatabase = (user: User): void => {
  try {
    // Get existing users data
    const existingData = localStorage.getItem('projectUsers');
    const database: UserDatabase = existingData ? JSON.parse(existingData) : { users: [] };
    
    // Check if user already exists
    const existingUserIndex = database.users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex !== -1) {
      // Update existing user
      database.users[existingUserIndex] = user;
      console.log('Updated existing user:', user.email);
    } else {
      // Add new user
      database.users.push(user);
      console.log('Added new user:', user.email);
    }
    
    // Save back to localStorage
    localStorage.setItem('projectUsers', JSON.stringify(database));
    
    // Also update current session
    localStorage.setItem('aiProjectUser', JSON.stringify(user));
    
    console.log('User database updated:', database);
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
};

export const getUserFromDatabase = (email: string): User | null => {
  try {
    const data = localStorage.getItem('projectUsers');
    if (!data) return null;
    
    const database: UserDatabase = JSON.parse(data);
    return database.users.find(user => user.email === email) || null;
  } catch (error) {
    console.error('Error getting user from database:', error);
    return null;
  }
};

export const getAllUsers = (): User[] => {
  try {
    const data = localStorage.getItem('projectUsers');
    if (!data) return [];
    
    const database: UserDatabase = JSON.parse(data);
    return database.users;
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};

export const initializeUser = (email?: string): User => {
  const defaultUser: User = {
    email: email || '',
    transaction_id: '',
    is_paid: false,
    guides_used: 0
  };
  
  if (email) {
    const existingUser = getUserFromDatabase(email);
    if (existingUser) {
      localStorage.setItem('aiProjectUser', JSON.stringify(existingUser));
      return existingUser;
    }
  }
  
  localStorage.setItem('aiProjectUser', JSON.stringify(defaultUser));
  return defaultUser;
};
