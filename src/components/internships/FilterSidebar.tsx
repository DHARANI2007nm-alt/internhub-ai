import { useState } from 'react';
import type { FilterOptions } from '@/types';
import { domains, locations } from '@/data/internships';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleDomainChange = (domain: string, checked: boolean) => {
    const newDomains = checked
      ? [...localFilters.domain, domain]
      : localFilters.domain.filter(d => d !== domain);
    setLocalFilters({ ...localFilters, domain: newDomains });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...localFilters.location, location]
      : localFilters.location.filter(l => l !== location);
    setLocalFilters({ ...localFilters, location: newLocations });
  };

  const handleLocationTypeChange = (type: 'Remote' | 'Onsite' | 'Hybrid', checked: boolean) => {
    const newTypes = checked
      ? [...localFilters.locationType, type]
      : localFilters.locationType.filter(t => t !== type);
    setLocalFilters({ ...localFilters, locationType: newTypes });
  };

  const handlePaidChange = (value: string) => {
    const isPaid = value === 'paid' ? true : value === 'unpaid' ? false : null;
    setLocalFilters({ ...localFilters, isPaid });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      domain: [],
      location: [],
      locationType: [],
      isPaid: null,
      stipendRange: null,
      eligibility: []
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFiltersCount = 
    localFilters.domain.length +
    localFilters.location.length +
    localFilters.locationType.length +
    (localFilters.isPaid !== null ? 1 : 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-[calc(100vh-6rem)]
        w-80 bg-white border-r lg:border border-[#EFEFF2] 
        overflow-y-auto z-50 lg:z-10
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#131313]" />
              <h2 className="font-semibold text-[#131313]">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-[#4D65FF] text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-[#131313]/5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full mb-4"
            >
              Reset All Filters
            </Button>
          )}

          <Accordion type="multiple" defaultValue={['domain', 'location', 'type', 'stipend']} className="space-y-2">
            {/* Domain Filter */}
            <AccordionItem value="domain" className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                Domain
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pb-2">
                  {domains.filter(d => d !== 'All').map((domain) => (
                    <div key={domain} className="flex items-center space-x-2">
                      <Checkbox
                        id={`domain-${domain}`}
                        checked={localFilters.domain.includes(domain)}
                        onCheckedChange={(checked) => handleDomainChange(domain, checked as boolean)}
                      />
                      <Label
                        htmlFor={`domain-${domain}`}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {domain}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Location Filter */}
            <AccordionItem value="location" className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                Location
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pb-2">
                  {locations.filter(l => l !== 'All').map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={localFilters.location.includes(location)}
                        onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                      />
                      <Label
                        htmlFor={`location-${location}`}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Work Type Filter */}
            <AccordionItem value="type" className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                Work Type
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pb-2">
                  {['Remote', 'Onsite', 'Hybrid'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={localFilters.locationType.includes(type as any)}
                        onCheckedChange={(checked) => handleLocationTypeChange(type as any, checked as boolean)}
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stipend Filter */}
            <AccordionItem value="stipend" className="border rounded-lg px-4">
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                Stipend
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={localFilters.isPaid === null ? 'all' : localFilters.isPaid ? 'paid' : 'unpaid'}
                  onValueChange={handlePaidChange}
                  className="space-y-2 pb-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="stipend-all" />
                    <Label htmlFor="stipend-all" className="text-sm text-muted-foreground cursor-pointer">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="stipend-paid" />
                    <Label htmlFor="stipend-paid" className="text-sm text-muted-foreground cursor-pointer">
                      Paid Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unpaid" id="stipend-unpaid" />
                    <Label htmlFor="stipend-unpaid" className="text-sm text-muted-foreground cursor-pointer">
                      Unpaid
                    </Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Apply Button - Mobile Only */}
          <div className="lg:hidden mt-6">
            <Button onClick={handleApply} className="w-full bg-[#131313]">
              Apply Filters
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
