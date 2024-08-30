export interface User {
    _id: number; // Adjust the type based on your API response
    name: string;
    email: string;
    password: string; // Handle with caution in real applications
  }