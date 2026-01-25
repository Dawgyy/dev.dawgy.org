import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProjectItem = {
  slug: string;
  title: string;
  date?: string;
  resume: string;
};

interface ProjectSectionProps {
  title: string;
  items: ProjectItem[];
}

export function ProjectSection({ title, items }: ProjectSectionProps) {
  return (
    <section className="space-y-8">
      <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {items.map((item, index) => (
          <Link
            key={index}
            to={`/projects/${item.slug}`}
            className="block group"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  {item.date && (
                    <Badge variant="outline" className="shrink-0 font-normal">
                      {item.date}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.resume}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
