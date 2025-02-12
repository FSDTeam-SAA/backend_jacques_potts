import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { AISuggestion } from "@/hooks/useAISuggestions";
import { useBehavior } from "@/contexts/BehaviorContext";

interface AISuggestionCardProps {
  suggestion: AISuggestion;
  onDisplay: (id: string) => void;
  onAction: (id: string) => void;
}

const AISuggestionCard = ({ suggestion, onDisplay, onAction }: AISuggestionCardProps) => {
  const { trackEvent } = useBehavior();

  const handleAction = async () => {
    await trackEvent("suggestion_clicked", { suggestion_id: suggestion.id });
    onAction(suggestion.id);
  };

  React.useEffect(() => {
    onDisplay(suggestion.id);
  }, [suggestion.id, onDisplay]);

  return (
    <Card className="w-full mb-4 animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="w-5 h-5 text-blue-500" />
        <CardTitle className="text-lg">Suggested Action</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{suggestion.content}</p>
        <Button onClick={handleAction} variant="outline" className="w-full">
          Take Action
        </Button>
      </CardContent>
    </Card>
  );
};

export default AISuggestionCard;