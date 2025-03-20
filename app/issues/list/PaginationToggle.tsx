"use client";

import { Switch } from "@radix-ui/themes";

interface Props {
  onToggle: (enabled: boolean) => void;
}

const PaginationToggle = ({ onToggle }: Props) => {
  const handleToggle = (checked: boolean) => {
    onToggle(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="font-medium text-sm">Enable Pagination</label>
      <Switch onCheckedChange={handleToggle} size="2" defaultChecked />
    </div>
  );
};

export default PaginationToggle;
