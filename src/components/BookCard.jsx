// src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const BookCard = ({ book }) => {
  const { isDark } = useTheme();

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-border">
        <CardHeader className="p-0">
          <div className="relative flex justify-center items-center bg-muted" style={{height: '160px'}}>
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="object-contain h-36 w-24"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                {book.authors.join(', ')}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {book.publishedYear}
              </Badge>
              <div className="text-xs text-muted-foreground">
                Published
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;