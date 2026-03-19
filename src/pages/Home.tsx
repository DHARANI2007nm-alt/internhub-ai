import { useState } from 'react';
import { Link } from 'react-router-dom';
import { internships } from '@/data/internships';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { AIRecommendations } from '@/components/internships/AIRecommendations';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Search,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
  Star,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [latestInternships] = useState(internships.slice(0, 6));
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  // Get featured internships (highest stipend)
  const featuredInternships = [...internships]
    .filter(i => i.stipend)
    .sort((a, b) => (b.stipend?.amount || 0) - (a.stipend?.amount || 0))
    .slice(0, 3);

  const stats = [
    { value: '500+', label: 'Active Internships', icon: Briefcase },
    { value: '200+', label: 'Partner Companies', icon: Building2 },
    { value: '50K+', label: 'Students Helped', icon: Users },
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find internships that match your skills, location, and preferences with our powerful search filters.'
    },
    {
      icon: Star,
      title: 'AI Recommendations',
      description: 'Get personalized internship suggestions based on your profile and career interests.'
    },
    {
      icon: CheckCircle2,
      title: 'Easy Tracking',
      description: 'Save and track your applications in one place. Never miss a deadline again.'
    },
    {
      icon: GraduationCap,
      title: 'Resume Tips',
      description: 'Get tailored resume advice for each internship to increase your chances of selection.'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/internships?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#131313]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#4D65FF] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0082F3] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#4D65FF]" />
            <span className="text-sm text-white/80">#1 Internship Platform for Indian Students</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-white mb-6 leading-tight">
            Find Your Dream
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D65FF] to-[#0082F3]">
              Internship Today
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Discover 500+ internships from top companies like Google, Microsoft, Flipkart, and more. 
            Your career starts here.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur rounded-2xl border border-white/10">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search by role, company, or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0"
                />
              </div>
              <AnimatedButton type="submit" variant="primary" size="lg" className="bg-[#4D65FF]">
                Search
              </AnimatedButton>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>500+ Internships</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>200+ Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>All Major Cities</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#131313]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#4D65FF]" />
                </div>
                <div className="text-3xl lg:text-4xl font-semibold text-[#131313] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#4D65FF]" />
                <span className="text-sm font-medium text-[#4D65FF]">Top Picks</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#131313]">
                Featured Internships
              </h2>
              <p className="text-muted-foreground mt-2">
                Highest paying opportunities from top companies
              </p>
            </div>
            <Link to="/internships">
              <AnimatedButton variant="secondary">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredInternships.map((internship) => (
              <InternshipCard 
                key={internship.id} 
                internship={internship} 
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#131313] mb-4">
              Why Choose InternHub?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make finding internships easier with powerful tools and personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 bg-[#FAFAFA] rounded-2xl hover:shadow-lg transition-all duration-500 ${
                  featuresVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#4D65FF]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#4D65FF]" />
                </div>
                <h3 className="text-lg font-semibold text-[#131313] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Internships */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-600">Live Updates</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#131313]">
                Latest Internships
              </h2>
              <p className="text-muted-foreground mt-2">
                Fresh opportunities posted in the last 7 days
              </p>
            </div>
            <Link to="/internships">
              <AnimatedButton variant="secondary">
                Browse All
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#131313] to-[#1D1D1D] rounded-3xl p-8 lg:p-16">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4D65FF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0082F3]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                  Ready to Start Your Career?
                </h2>
                <p className="text-white/60 max-w-xl">
                  Join thousands of students who found their dream internships through InternHub. 
                  Create your profile and get personalized recommendations today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <AnimatedButton variant="primary" size="lg" className="bg-[#4D65FF]">
                    Get Started Free
                  </AnimatedButton>
                </Link>
                <Link to="/internships">
                  <AnimatedButton variant="secondary" size="lg">
                    Explore Internships
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#131313] text-white py-16">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[#131313]" />
                </div>
                <span className="text-xl font-semibold">InternHub</span>
              </div>
              <p className="text-white/60 text-sm mb-4">
                India's #1 platform for finding internships. Connecting students with top companies.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Linkedin', 'Instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/60 rounded" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Find Internships', 'Dashboard', 'About Us'].map((link) => (
                  <li key={link}>
                    <Link 
                      to={link === 'Home' ? '/' : link === 'Find Internships' ? '/internships' : link === 'Dashboard' ? '/dashboard' : '/'} 
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {['Software Development', 'Data Science', 'Design', 'Marketing'].map((cat) => (
                  <li key={cat}>
                    <Link 
                      to={`/internships?category=${cat}`}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>support@internhub.in</li>
                <li>+91 98765 43210</li>
                <li>Bangalore, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 InternHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sparkles icon component
function Sparkles({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
