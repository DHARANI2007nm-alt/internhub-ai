import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { internships } from '@/data/internships';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { FilterSidebar } from '@/components/internships/FilterSidebar';
import type { FilterOptions } from '@/types';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  Briefcase
} from 'lucide-react';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'deadline' | 'stipend_high' | 'stipend_low'>('relevance');
  
  const [filters, setFilters] = useState<FilterOptions>({
    domain: [],
    location: [],
    locationType: [],
    isPaid: null,
    stipendRange: null,
    eligibility: []
  });

  // Filter and search internships
  const filteredInternships = useMemo(() => {
    let result = [...internships];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(internship =>
        internship.title.toLowerCase().includes(query) ||
        internship.company.toLowerCase().includes(query) ||
        internship.category.toLowerCase().includes(query) ||
        internship.eligibility.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Domain filter
    if (filters.domain.length > 0) {
      result = result.filter(internship => 
        filters.domain.includes(internship.category)
      );
    }

    // Location filter
    if (filters.location.length > 0) {
      result = result.filter(internship =>
        filters.location.some(loc => 
          internship.location.includes(loc) || 
          (loc === 'Remote' && internship.locationType === 'Remote')
        )
      );
    }

    // Location type filter
    if (filters.locationType.length > 0) {
      result = result.filter(internship =>
        filters.locationType.includes(internship.locationType)
      );
    }

    // Paid/Unpaid filter
    if (filters.isPaid !== null) {
      result = result.filter(internship =>
        filters.isPaid ? internship.isPaid : !internship.isPaid
      );
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'deadline':
        result.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
        break;
      case 'stipend_high':
        result.sort((a, b) => (b.stipend?.amount || 0) - (a.stipend?.amount || 0));
        break;
      case 'stipend_low':
        result.sort((a, b) => (a.stipend?.amount || 0) - (b.stipend?.amount || 0));
        break;
      default:
        // Relevance - keep original order
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setFilters({
      domain: [],
      location: [],
      locationType: [],
      isPaid: null,
      stipendRange: null,
      eligibility: []
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFiltersCount = 
    filters.domain.length +
    filters.location.length +
    filters.locationType.length +
    (filters.isPaid !== null ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#131313] pt-24 pb-12">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-white mb-2">
                Find Your Perfect Internship
              </h1>
              <p className="text-white/60">
                {filteredInternships.length} opportunities waiting for you
              </p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full lg:w-auto lg:min-w-[400px]">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 bg-white/10 backdrop-blur rounded-xl border border-white/10">
                  <Search className="w-5 h-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder="Search internships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0"
                  />
                </div>
                <AnimatedButton type="submit" variant="primary" className="bg-[#4D65FF]">
                  Search
                </AnimatedButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Results */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl border border-[#EFEFF2]">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">{activeFiltersCount}</Badge>
                  )}
                </Button>

                {/* Results Count */}
                <span className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-[#131313]">{filteredInternships.length}</span> results
                </span>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                  <SelectTrigger className="w-[160px]">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="stipend_high">Stipend: High to Low</SelectItem>
                    <SelectItem value="stipend_low">Stipend: Low to High</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-[#131313] text-white' : 'hover:bg-[#131313]/5'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-[#131313] text-white' : 'hover:bg-[#131313]/5'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Internships Grid/List */}
            {filteredInternships.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredInternships.map((internship) => (
                  <InternshipCard 
                    key={internship.id} 
                    internship={internship}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#EFEFF2]">
                <div className="w-16 h-16 bg-[#131313]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-[#131313]/30" />
                </div>
                <h3 className="text-lg font-medium text-[#131313] mb-2">
                  No internships found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
