import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  Briefcase,
  User,
  Bell,
  Menu,
  X,
  LogOut,
  Bookmark,
  LayoutDashboard
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const unreadCount = user?.notifications.filter(n => !n.read).length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Find Internships', href: '/internships' },
    ...(isAuthenticated ? [{ label: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#131313] rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#131313]">
              InternHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.href)
                    ? 'text-[#131313]'
                    : 'text-[#131313]/60 hover:text-[#131313]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#131313] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2 hover:bg-[#131313]/5 rounded-full transition-colors">
                      <Bell className="w-5 h-5 text-[#131313]" />
                      {unreadCount > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#4D65FF] text-white text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="px-3 py-2 font-medium border-b">Notifications</div>
                    {user?.notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id}
                        className="flex flex-col items-start p-3 cursor-pointer"
                        onClick={() => navigate(`/internship/${notification.internshipId}`)}
                      >
                        <span className="font-medium text-sm">{notification.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-2">{notification.message}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </DropdownMenuItem>
                    ))}
                    {(!user?.notifications || user.notifications.length === 0) && (
                      <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                        No notifications yet
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pr-3 hover:bg-[#131313]/5 rounded-full transition-colors">
                      <div className="w-8 h-8 bg-[#131313] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard?tab=saved')}>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Saved Internships
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <AnimatedButton variant="secondary" size="sm">
                    Log In
                  </AnimatedButton>
                </Link>
                <Link to="/signup">
                  <AnimatedButton variant="primary" size="sm">
                    Sign Up
                  </AnimatedButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-[#131313]/5 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#131313]" />
            ) : (
              <Menu className="w-6 h-6 text-[#131313]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-[#131313] text-white'
                  : 'hover:bg-[#131313]/5 text-[#131313]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="border-t pt-4 mt-4">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Signed in as <span className="font-medium text-[#131313]">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 px-4 py-3 text-center text-sm font-medium border border-[#131313] rounded-lg hover:bg-[#131313]/5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 px-4 py-3 text-center text-sm font-medium bg-[#131313] text-white rounded-lg hover:bg-[#131313]/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
