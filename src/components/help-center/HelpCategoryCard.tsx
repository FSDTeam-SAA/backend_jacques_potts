import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";

interface HelpSection {
  title: string;
  description: string;
  steps?: string[];
  tips?: string[];
}

interface HelpCategoryProps {
  icon: LucideIcon;
  title: string;
  sections: HelpSection[];
}

const HelpCategoryCard = ({ icon: Icon, title, sections }: HelpCategoryProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="bg-[#1a365d] p-2 rounded-full mr-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-gray-600">{section.description}</p>
                {section.steps && (
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                )}
                {section.tips && (
                  <div className="bg-blue-50 p-4 rounded-md mt-4">
                    <p className="font-semibold text-[#1a365d] mb-2">Pro Tips:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-gray-600">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HelpCategoryCard;