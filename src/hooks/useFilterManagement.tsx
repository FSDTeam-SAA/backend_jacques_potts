import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useFilterManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    revenueRange: [0, 10000000] as [number, number],
    profitMargin: [0, 100] as [number, number],
    employeeCount: "",
    yearsInOperation: "",
    businessType: "",
    locationType: "",
    hasWebsite: false,
    hasSocialMedia: false,
    scalabilityRating: 0,
    isFranchiseAvailable: false,
    verificationType: "",
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    if (!user) {
      toast.error("Please sign in to use advanced filters");
      navigate("/login");
      return;
    }
    setFilters(newFilters);
    toast.success("Filters applied successfully");
  };

  const handleFilterReset = () => {
    setFilters({
      revenueRange: [0, 10000000] as [number, number],
      profitMargin: [0, 100] as [number, number],
      employeeCount: "",
      yearsInOperation: "",
      businessType: "",
      locationType: "",
      hasWebsite: false,
      hasSocialMedia: false,
      scalabilityRating: 0,
      isFranchiseAvailable: false,
      verificationType: "",
    });
    toast.info("Filters have been reset");
  };

  return {
    filters,
    handleFilterChange,
    handleFilterReset,
  };
};