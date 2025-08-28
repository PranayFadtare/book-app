import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, Mail } from 'lucide-react';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">BookShelf</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover your next favorite book with our curated collection of literature from around the world.
            </p>
          </div>

        
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 BookShelf. All rights reserved.
          </p>
          
    
        </div>
      </div>
    </footer>
  );
};

export default Footer;
