import React from "react";
import { useAISuggestions } from "@/hooks/useAISuggestions";
import AISuggestionCard from "./AISuggestionCard";
import { useNavigate } from "react-router-dom";

const AISuggestionsContainer = () => {
  const navigate = useNavigate();
  const { suggestions, markSuggestionDisplayed, markSuggestionClicked } = useAISuggestions();

  const handleSuggestionAction = async (suggestionId: string) => {
    await markSuggestionClicked(suggestionId);
    const suggestion = suggestions.find((s) => s.id === suggestionId);
    
    if (suggestion?.suggestion_type === "complete_profile") {
      navigate("/profile");
    } else if (suggestion?.suggestion_type === "browse_listings") {
      navigate("/browse");
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <AISuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onDisplay={markSuggestionDisplayed}
          onAction={handleSuggestionAction}
        />
      ))}
    </div>
  );
};

export default AISuggestionsContainer;