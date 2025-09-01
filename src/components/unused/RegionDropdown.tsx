/**
 * @fileoverview RegionDropdown component that allows users to select a region
 * and display it in a dropdown.
 * 
 * @deprecated This component is no longer used and should be removed.
 */

import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegionDropdown: React.FC = () => {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-[180px] bg-white border-gray-200 [&>svg]:hidden">
        <SelectValue placeholder="Select Region" />
        <ChevronsUpDown className="h-4 w-4 opacity-50 !block" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Regions</SelectItem>
        <SelectItem value="north">North</SelectItem>
        <SelectItem value="south">South</SelectItem>
        <SelectItem value="east">East</SelectItem>
        <SelectItem value="west">West</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RegionDropdown;
