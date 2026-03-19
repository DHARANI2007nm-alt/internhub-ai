import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { Internship } from '@/types';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  MapPin,
  Calendar,
  GraduationCap,
  Wallet,
  Bookmark,
  ExternalLink,
  Building2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface InternshipCardProps {
  internship: Internship;
  variant?: 'default' | 'compact' | 'featured';
}

export function InternshipCard({ internship, variant = 'default' }: InternshipCardProps) {
  const { isAuthenticated, isSaved, saveInternship, unsaveInternship, hasApplied, getApplicationStatus } = useAuth();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to save internships');
      return;
    }

    if (isSaved(internship.id)) {
      unsaveInternship(internship.id);
      toast.success('Internship removed from saved list');
    } else {
      saveInternship(internship.id);
      toast.success('Internship saved successfully');
    }
  };

  const isInternshipSaved = isSaved(internship.id);
  const hasAppliedToInternship = hasApplied(internship.id);
  const applicationStatus = getApplicationStatus(internship.id);

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(internship.applicationDeadline);

  if (variant === 'compact') {
    return (
      <Link
        to={`/internship/${internship.id}`}
        className="block p-4 bg-white border border-[#EFEFF2] rounded-xl hover:shadow-lg hover:border-[#131313]/20 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-[#131313]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[#131313] truncate">{internship.title}</h3>
            <p className="text-sm text-muted-foreground">{internship.company}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {internship.locationType}
              </span>
              {internship.stipend ? (
                <span className="flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  ₹{internship.stipend.amount.toLocaleString()}/{internship.stipend.period}
                </span>
              ) : (
                <span className="text-muted-foreground">Unpaid</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to={`/internship/${internship.id}`}
        className="block group relative overflow-hidden bg-gradient-to-br from-[#131313] to-[#1D1D1D] rounded-2xl p-6 hover:shadow-2xl transition-all duration-500"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4D65FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">{internship.title}</h3>
                <p className="text-white/60">{internship.company}</p>
              </div>
            </div>
            <Badge className="bg-[#4D65FF] text-white border-0">
              Featured
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              <MapPin className="w-3 h-3 mr-1" />
              {internship.locationType}
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              <Wallet className="w-3 h-3 mr-1" />
              {internship.stipend ? `₹${internship.stipend.amount.toLocaleString()}/${internship.stipend.period}` : 'Unpaid'}
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              <Calendar className="w-3 h-3 mr-1" />
              {internship.duration}
            </Badge>
          </div>

          <p className="text-white/70 text-sm line-clamp-2 mb-4">
            {internship.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              {daysLeft > 0 ? `${daysLeft} days left to apply` : 'Deadline passed'}
            </div>
            <AnimatedButton variant="primary" size="sm" className="bg-white text-[#131313] hover:bg-white/90">
              View Details
            </AnimatedButton>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-[#EFEFF2] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#131313]/10 transition-all duration-300">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#131313]/5 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#131313]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#131313] group-hover:text-[#4D65FF] transition-colors">
                {internship.title}
              </h3>
              <p className="text-sm text-muted-foreground">{internship.company}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${
              isInternshipSaved
                ? 'bg-[#4D65FF]/10 text-[#4D65FF]'
                : 'hover:bg-[#131313]/5 text-[#131313]/40'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isInternshipSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {internship.locationType}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {internship.category}
          </Badge>
          {internship.isPaid ? (
            <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
              <Wallet className="w-3 h-3 mr-1" />
              ₹{internship.stipend?.amount.toLocaleString()}/{internship.stipend?.period}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
              Unpaid
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="w-4 h-4" />
            <span>{internship.eligibility.degrees.slice(0, 2).join(', ')}{internship.eligibility.degrees.length > 2 ? '...' : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{internship.duration} • Deadline: {new Date(internship.applicationDeadline).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {internship.eligibility.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-[#131313]/5 rounded text-xs text-[#131313]/70"
            >
              {skill}
            </span>
          ))}
          {internship.eligibility.skills.length > 4 && (
            <span className="px-2 py-1 bg-[#131313]/5 rounded text-xs text-[#131313]/70">
              +{internship.eligibility.skills.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#EFEFF2]">
          <Link to={`/internship/${internship.id}`} className="flex-1">
            <AnimatedButton variant="primary" size="sm" className="w-full">
              View Details
            </AnimatedButton>
          </Link>
          
          {hasAppliedToInternship ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{applicationStatus?.replace('_', ' ')}</span>
            </div>
          ) : (
            <a
              href={internship.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[#131313] rounded-lg text-sm font-medium hover:bg-[#131313] hover:text-white transition-colors"
            >
              Apply
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
