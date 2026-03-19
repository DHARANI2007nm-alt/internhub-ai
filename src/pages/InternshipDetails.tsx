
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { internships, resumeTips } from '@/data/internships';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  GraduationCap,
  Wallet,
  Building2,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  Clock,
  Share2,
  Briefcase,
  Code,
  FileText,
  Lightbulb,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { toast } from 'sonner';

export default function InternshipDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isSaved, saveInternship, unsaveInternship, hasApplied, applyToInternship } = useAuth();
  
  const internship = internships.find(i => i.id === id);
  
  if (!internship) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-[#131313]/20 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-[#131313] mb-2">Internship Not Found</h1>
          <p className="text-muted-foreground mb-4">The internship you're looking for doesn't exist.</p>
          <Link to="/internships">
            <AnimatedButton variant="primary">Browse Internships</AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  const isInternshipSaved = isSaved(internship.id);
  const hasAppliedToInternship = hasApplied(internship.id);

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save internships');
      navigate('/login');
      return;
    }

    if (isInternshipSaved) {
      unsaveInternship(internship.id);
      toast.success('Internship removed from saved list');
    } else {
      saveInternship(internship.id);
      toast.success('Internship saved successfully');
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    if (!hasAppliedToInternship) {
      applyToInternship(internship.id);
      toast.success('Application tracked! Redirecting to apply page...');
    }
    
    // Open apply link in new tab
    window.open(internship.applyLink, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${internship.title} at ${internship.company}`,
        text: internship.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(internship.applicationDeadline);
  const isDeadlineNear = daysLeft <= 3 && daysLeft > 0;
  const isDeadlinePassed = daysLeft <= 0;

  // Get relevant resume tips
  const relevantTips = resumeTips.find(t => t.category === internship.category) || resumeTips.find(t => t.category === 'General');

  // Related internships
  const relatedInternships = internships
    .filter(i => i.category === internship.category && i.id !== internship.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#131313] pt-24 pb-12">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/internships" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Internships
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-[#131313]" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-semibold text-white mb-2">
                  {internship.title}
                </h1>
                <p className="text-lg text-white/60 mb-3">{internship.company}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/10 text-white border-0">
                    <MapPin className="w-3 h-3 mr-1" />
                    {internship.locationType}
                  </Badge>
                  <Badge className="bg-white/10 text-white border-0">
                    {internship.category}
                  </Badge>
                  <Badge className={internship.isPaid ? 'bg-green-500/20 text-green-400 border-0' : 'bg-gray-500/20 text-gray-400 border-0'}>
                    <Wallet className="w-3 h-3 mr-1" />
                    {internship.isPaid ? `₹${internship.stipend?.amount.toLocaleString()}/${internship.stipend?.period}` : 'Unpaid'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSave}
                className={`border-white/20 ${isInternshipSaved ? 'bg-[#4D65FF] text-white border-[#4D65FF]' : 'text-white hover:bg-white/10'}`}
              >
                <Bookmark className={`w-5 h-5 ${isInternshipSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-white border border-[#EFEFF2] p-1 mb-6">
                <TabsTrigger value="overview" className="flex-1 lg:flex-none">Overview</TabsTrigger>
                <TabsTrigger value="requirements" className="flex-1 lg:flex-none">Requirements</TabsTrigger>
                <TabsTrigger value="company" className="flex-1 lg:flex-none">Company</TabsTrigger>
                <TabsTrigger value="resume" className="flex-1 lg:flex-none">Resume Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="bg-white rounded-xl border border-[#EFEFF2] p-6">
                  <h2 className="text-xl font-semibold text-[#131313] mb-4">About the Internship</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {internship.description}
                  </p>

                  <h3 className="text-lg font-semibold text-[#131313] mb-3">Responsibilities</h3>
                  <ul className="space-y-2 mb-6">
                    {internship.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-[#131313] mb-3">What You'll Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.eligibility.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        <Code className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="mt-0">
                <div className="bg-white rounded-xl border border-[#EFEFF2] p-6">
                  <h2 className="text-xl font-semibold text-[#131313] mb-4">Eligibility Criteria</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-[#FAFAFA] rounded-lg">
                      <GraduationCap className="w-6 h-6 text-[#4D65FF] mb-2" />
                      <h4 className="font-medium text-[#131313] mb-1">Education</h4>
                      <p className="text-sm text-muted-foreground">{internship.eligibility.degrees.join(', ')}</p>
                    </div>
                    <div className="p-4 bg-[#FAFAFA] rounded-lg">
                      <Calendar className="w-6 h-6 text-[#4D65FF] mb-2" />
                      <h4 className="font-medium text-[#131313] mb-1">Year</h4>
                      <p className="text-sm text-muted-foreground">{internship.eligibility.years.join(', ')}</p>
                    </div>
                    <div className="p-4 bg-[#FAFAFA] rounded-lg">
                      <Clock className="w-6 h-6 text-[#4D65FF] mb-2" />
                      <h4 className="font-medium text-[#131313] mb-1">Duration</h4>
                      <p className="text-sm text-muted-foreground">{internship.duration}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-[#131313] mb-3">Required Skills</h3>
                  <ul className="space-y-2">
                    {internship.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="company" className="mt-0">
                <div className="bg-white rounded-xl border border-[#EFEFF2] p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#131313]/5 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-[#131313]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#131313]">{internship.company}</h2>
                      <p className="text-muted-foreground">{internship.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FAFAFA] rounded-lg">
                      <span className="text-sm text-muted-foreground">Source</span>
                      <p className="font-medium text-[#131313]">{internship.source}</p>
                    </div>
                    <div className="p-4 bg-[#FAFAFA] rounded-lg">
                      <span className="text-sm text-muted-foreground">Posted On</span>
                      <p className="font-medium text-[#131313]">{new Date(internship.postedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resume" className="mt-0">
                <div className="bg-white rounded-xl border border-[#EFEFF2] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#4D65FF]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#4D65FF]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#131313]">Resume Tips</h2>
                      <p className="text-sm text-muted-foreground">Tailored for {internship.category} roles</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {relevantTips?.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                        <Lightbulb className="w-5 h-5 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#4D65FF]/5 rounded-lg border border-[#4D65FF]/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#131313] mb-1">Pro Tip</h4>
                        <p className="text-sm text-muted-foreground">
                          Tailor your resume specifically for this role. Highlight projects and skills 
                          that match the requirements mentioned above.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Related Internships */}
            {relatedInternships.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#131313] mb-4">Similar Internships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedInternships.map((related) => (
                    <Link
                      key={related.id}
                      to={`/internship/${related.id}`}
                      className="p-4 bg-white border border-[#EFEFF2] rounded-xl hover:shadow-lg hover:border-[#131313]/20 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-[#131313]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#131313] truncate">{related.title}</h4>
                          <p className="text-sm text-muted-foreground">{related.company}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span>{related.locationType}</span>
                            <span>•</span>
                            <span>{related.isPaid ? `₹${related.stipend?.amount.toLocaleString()}` : 'Unpaid'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Apply Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-[#EFEFF2] p-6 mb-6">
                {/* Deadline Alert */}
                {isDeadlineNear && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-lg mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{daysLeft} days left to apply!</span>
                  </div>
                )}
                {isDeadlinePassed && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Application deadline has passed</span>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-[#EFEFF2]">
                    <span className="text-muted-foreground">Application Deadline</span>
                    <span className="font-medium">{new Date(internship.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#EFEFF2]">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{internship.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#EFEFF2]">
                    <span className="text-muted-foreground">Stipend</span>
                    <span className="font-medium">
                      {internship.isPaid ? `₹${internship.stipend?.amount.toLocaleString()}/${internship.stipend?.period}` : 'Unpaid'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#EFEFF2]">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{internship.locationType}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{new Date(internship.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <AnimatedButton
                  onClick={handleApply}
                  disabled={isDeadlinePassed}
                  variant="primary"
                  size="lg"
                  className="w-full mb-3"
                >
                  {hasAppliedToInternship ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Applied
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </>
                  )}
                </AnimatedButton>

                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Bookmark className={`w-4 h-4 ${isInternshipSaved ? 'fill-current' : ''}`} />
                  {isInternshipSaved ? 'Saved' : 'Save for Later'}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="bg-[#131313] rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-4">Why Apply?</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                    Gain real-world experience
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                    Learn from industry experts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                    Build your professional network
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D65FF] flex-shrink-0 mt-0.5" />
                    Potential full-time opportunity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}