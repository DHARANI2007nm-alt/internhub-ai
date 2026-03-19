import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome
} from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('student@example.com');
    setPassword('password');
    setIsLoading(true);
    
    try {
      const success = await login('student@example.com', 'password');
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#131313] rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-semibold text-[#131313]">InternHub</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#131313] mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#4D65FF] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </AnimatedButton>

            {/* Demo Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Try Demo Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EFEFF2]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#FAFAFA] text-muted-foreground">Or continue with</span>
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

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4D65FF] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#131313] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#4D65FF] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0082F3] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
              <span className="text-sm text-white/80">Trusted by 50,000+ students</span>
            </div>
            <h2 className="text-4xl font-semibold text-white mb-4">
              Find your dream internship
            </h2>
            <p className="text-white/60 text-lg">
              Join thousands of students who found their perfect internship through InternHub.
            </p>
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <p className="text-white/80 mb-4">
              "InternHub helped me land my dream internship at Google. The AI recommendations were spot on!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">RS</span>
              </div>
              <div>
                <p className="text-white font-medium">Rahul Sharma</p>
                <p className="text-white/60 text-sm">Software Engineering Intern at Google</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-3xl font-semibold text-white">500+</p>
              <p className="text-white/60 text-sm">Internships</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">200+</p>
              <p className="text-white/60 text-sm">Companies</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">95%</p>
              <p className="text-white/60 text-sm">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
