import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PLATFORMS = [
  { id: "craigslist", name: "Craigslist" },
  { id: "facebook", name: "Facebook Marketplace" },
  { id: "zillow", name: "Zillow" },
];

interface PlatformSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const PlatformSelect = ({ value, onValueChange }: PlatformSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a platform" />
      </SelectTrigger>
      <SelectContent>
        {PLATFORMS.map((platform) => (
          <SelectItem key={platform.id} value={platform.id}>
            {platform.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};