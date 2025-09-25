import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Calendar, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

interface ChannelCardProps {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  studentCount: number;
  assignmentCount: number;
  nextClass?: string;
  color: string;
}

const ChannelCard = ({ 
  id, 
  title, 
  subject, 
  teacher, 
  studentCount, 
  assignmentCount, 
  nextClass,
  color 
}: ChannelCardProps) => {
  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/95">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div 
              className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3"
              style={{ backgroundColor: color }}
            >
              {title.charAt(0)}
            </div>
            <Link to={`/channel/${id}`} className="block">
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">{subject}</p>
            <p className="text-muted-foreground text-xs">by {teacher}</p>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{studentCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{assignmentCount}</span>
            </div>
          </div>
        </div>
        
        {nextClass && (
          <div className="flex items-center space-x-2 text-xs bg-muted/50 rounded-lg p-2">
            <Calendar className="h-3 w-3 text-primary" />
            <span className="text-muted-foreground">Next: {nextClass}</span>
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t">
          <Link to={`/channel/${id}`}>
            <Button variant="ghost" size="sm" className="w-full justify-start text-primary hover:bg-primary/10">
              Open Channel
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelCard;