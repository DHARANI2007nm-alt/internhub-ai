import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { internships } from '@/data/internships';
import { InternshipCard } from './InternshipCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { skillsList, degreeOptions, yearOptions } from '@/data/internships';
import { toast } from 'sonner';

export function AIRecommendations() {
  const { user, isAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    degree: user?.profile.degree || '',
    year: user?.profile.year || '',
    skills: user?.profile.skills || [],
    interests: user?.profile.interests || []
  });

  // Calculate match score for each internship
  const recommendations = useMemo(() => {
    const userSkills = preferences.skills.map(s => s.toLowerCase());
    const userInterests = preferences.interests.map(i => i.toLowerCase());

    return internships.map(internship => {
      let score = 0;
      const reasons: string[] = [];

      // Skill match (40% weight)
      const internshipSkills = internship.eligibility.skills.map(s => s.toLowerCase());
      const skillMatches = userSkills.filter(skill => 
        internshipSkills.some(is => is.includes(skill) || skill.includes(is))
      );
      const skillScore = (skillMatches.length / Math.max(internshipSkills.length, 1)) * 40;
      score += skillScore;
      if (skillMatches.length > 0) {
        reasons.push(`Matches ${skillMatches.length} of your skills`);
      }

      // Interest/Category match (30% weight)
      const category = internship.category.toLowerCase();
      const interestMatches = userInterests.filter(interest => 
        category.includes(interest) || interest.includes(category)
      );
      if (interestMatches.length > 0) {
        score += 30;
        reasons.push(`Aligns with your interest in ${interestMatches[0]}`);
      }

      // Degree match (15% weight)
      if (internship.eligibility.degrees.includes(preferences.degree) || 
          internship.eligibility.degrees.includes('Any Degree')) {
        score += 15;
        reasons.push('Matches your degree');
      }

      // Year match (15% weight)
      if (internship.eligibility.years.includes(preferences.year)) {
        score += 15;
        reasons.push('Suitable for your year');
      }

      return {
        internship,
        score: Math.round(score),
        reasons: reasons.slice(0, 2)
      };
    })
    .filter(r => r.score > 30)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
  }, [preferences]);

  const handleSkillToggle = (skill: string) => {
    setPreferences(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSavePreferences = () => {
    toast.success('Preferences updated! Refreshing recommendations...');
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#131313] to-[#1D1D1D] rounded-3xl mx-4 lg:mx-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[#4D65FF]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#4D65FF]" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
            AI-Powered Recommendations
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Get personalized internship suggestions based on your skills, interests, and academic background. 
            Our AI matches you with the perfect opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup">
              <AnimatedButton variant="primary" size="lg" className="bg-[#4D65FF]">
                Get Started
              </AnimatedButton>
            </a>
            <a href="/internships">
              <AnimatedButton variant="secondary" size="lg">
                Browse All Internships
              </AnimatedButton>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#4D65FF]" />
              <span className="text-sm font-medium text-[#4D65FF]">AI Powered</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#131313]">
              Recommended For You
            </h2>
            <p className="text-muted-foreground mt-2">
              Personalized internships based on your profile
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Target className="w-4 h-4" />
                  Update Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Update Your Preferences</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Degree & Year */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <select
                        value={preferences.degree}
                        onChange={(e) => setPreferences({ ...preferences, degree: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="">Select Degree</option>
                        {degreeOptions.map(deg => (
                          <option key={deg} value={deg}>{deg}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <select
                        value={preferences.year}
                        onChange={(e) => setPreferences({ ...preferences, year: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="">Select Year</option>
                        {yearOptions.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Your Skills
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.slice(0, 15).map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            preferences.skills.includes(skill)
                              ? 'bg-[#4D65FF] text-white'
                              : 'bg-[#131313]/5 text-[#131313] hover:bg-[#131313]/10'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Your Interests
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {['AI/ML', 'Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'Blockchain', 'Design'].map((interest) => (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            preferences.interests.includes(interest)
                              ? 'bg-[#131313] text-white'
                              : 'bg-[#131313]/5 text-[#131313] hover:bg-[#131313]/10'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSavePreferences} className="w-full bg-[#131313]">
                    Save Preferences
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.success('Recommendations refreshed!')}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Recommendations Grid */}
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(({ internship, score, reasons }) => (
              <div key={internship.id} className="relative">
                <div className="absolute -top-3 left-4 z-10">
                  <Badge className="bg-[#4D65FF] text-white gap-1">
                    <Sparkles className="w-3 h-3" />
                    {score}% Match
                  </Badge>
                </div>
                <InternshipCard internship={internship} />
                {reasons.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 px-1">
                    {reasons.map((reason, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Target className="w-3 h-3 text-[#4D65FF]" />
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#131313]/5 rounded-2xl">
            <GraduationCap className="w-12 h-12 text-[#131313]/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#131313] mb-2">
              No recommendations yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Update your preferences to get personalized recommendations
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
              Update Preferences
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
