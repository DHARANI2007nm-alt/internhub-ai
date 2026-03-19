import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Code,
  CheckCircle2,
  Github,
  Chrome
} from 'lucide-react';
import { skillsList, degreeOptions, yearOptions } from '@/data/internships';
import { toast } from 'sonner';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    degree: '',
    year: '',
    location: '',
    skills: [] as string[],
    interests: [] as string[]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.degree || !formData.year) {
      toast.error('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await signup(formData.email, formData.password, formData.name, {
        degree: formData.degree,
        year: formData.year,
        location: formData.location,
        skills: formData.skills,
        interests: formData.interests
      });
      
      if (success) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const interestOptions = [
    'AI/ML', 'Web Development', 'Mobile Development', 'Data Science', 
    'Cybersecurity', 'Cloud Computing', 'Blockchain', 'Design', 
    'Product Management', 'Marketing'
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#131313] rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-semibold text-[#131313]">InternHub</span>
          </Link>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? 'bg-[#4D65FF]' : 'bg-[#EFEFF2]'
                }`}
              />
            ))}
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#131313] mb-2">
              {step === 1 && 'Create your account'}
              {step === 2 && 'Tell us about yourself'}
              {step === 3 && 'Select your skills'}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 && 'Start your journey to finding the perfect internship'}
              {step === 2 && 'This helps us personalize your experience'}
              {step === 3 && 'Choose skills that match your expertise'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="pl-10 pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#131313]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 h-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#131313]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <AnimatedButton
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleNext}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </AnimatedButton>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EFEFF2]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#FAFAFA] text-muted-foreground">Or sign up with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12">
                    <Chrome className="w-5 h-5 mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Education & Profile */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree *</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      id="degree"
                      value={formData.degree}
                      onChange={(e) => handleChange('degree', e.target.value)}
                      className="w-full h-12 pl-10 pr-4 border border-[#EFEFF2] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4D65FF]"
                    >
                      <option value="">Select your degree</option>
                      {degreeOptions.map(deg => (
                        <option key={deg} value={deg}>{deg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Current Year *</Label>
                  <select
                    id="year"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    className="w-full h-12 px-4 border border-[#EFEFF2] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4D65FF]"
                  >
                    <option value="">Select your year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Bangalore, Mumbai"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Areas of Interest</Label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          formData.interests.includes(interest)
                            ? 'bg-[#131313] text-white'
                            : 'bg-white border border-[#EFEFF2] text-[#131313] hover:bg-[#FAFAFA]'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <AnimatedButton
                    type="button"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleNext}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </AnimatedButton>
                </div>
              </div>
            )}

            {/* Step 3: Skills */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Select Your Skills *</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose skills that match your expertise. This helps us recommend relevant internships.
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-4 bg-white border border-[#EFEFF2] rounded-lg">
                    {skillsList.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                          formData.skills.includes(skill)
                            ? 'bg-[#4D65FF] text-white'
                            : 'bg-[#FAFAFA] text-[#131313] hover:bg-[#EFEFF2]'
                        }`}
                      >
                        {formData.skills.includes(skill) && <CheckCircle2 className="w-3 h-3" />}
                        {skill}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.skills.length} skills selected
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </AnimatedButton>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4D65FF] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#131313] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#4D65FF] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0082F3] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
              <Code className="w-4 h-4 text-white" />
              <span className="text-sm text-white/80">Free for students</span>
            </div>
            <h2 className="text-4xl font-semibold text-white mb-4">
              Start your career journey today
            </h2>
            <p className="text-white/60 text-lg">
              Create your profile and get matched with internships that fit your skills and interests.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              'Personalized internship recommendations',
              'Track your applications in one place',
              'Get notified about new opportunities',
              'Resume tips tailored to each role'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#4D65FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
