import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound({
  title = 'Page not found',
  description = "The page you're looking for doesn't exist or has been moved.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <Button asChild className="mt-6">
        <Link to="/">
          <Home className="size-4" />
          Back home
        </Link>
      </Button>
    </div>
  );
}
