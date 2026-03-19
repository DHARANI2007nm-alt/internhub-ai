import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { internships } from '@/data/internships';
import { InternshipCard } from '@/components/internships/InternshipCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  LayoutDashboard,
  Bookmark,
  Briefcase,
  Bell,
  User,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  Building2,
  MapPin,
  Wallet,
  ChevronRight,
  Sparkles,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, isAuthenticated, markNotificationAsRead, unsaveInternship } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#131313]/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#131313]/30" />
          </div>
          <h1 className="text-2xl font-semibold text-[#131313] mb-2">Please Login</h1>
          <p className="text-muted-foreground mb-4">You need to be logged in to view your dashboard.</p>
          <Link to="/login">
            <AnimatedButton variant="primary">Login</AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  // Get saved internships
  const savedInternships = internships.filter(i => user?.savedInternships.includes(i.id));

  // Get applied internships with details
  const appliedInternships = user?.appliedInternships.map(app => ({
    ...app,
    internship: internships.find(i => i.id === app.internshipId)
  })).filter(app => app.internship) || [];

  // Get unread notifications
  const unreadNotifications = user?.notifications.filter(n => !n.read) || [];

  // Stats
  const stats = {
    saved: savedInternships.length,
    applied: appliedInternships.length,
    shortlisted: appliedInternships.filter(a => a.status === 'shortlisted' || a.status === 'selected').length,
    notifications: unreadNotifications.length
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const handleRemoveSaved = (internshipId: string) => {
    unsaveInternship(internshipId);
    toast.success('Internship removed from saved list');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-700';
      case 'under_review': return 'bg-amber-100 text-amber-700';
      case 'shortlisted': return 'bg-green-100 text-green-700';
      case 'selected': return 'bg-[#4D65FF]/10 text-[#4D65FF]';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#131313] pt-24 pb-12">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-[#131313]" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-white">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-white/60">
                  {user?.profile.degree} • {user?.profile.year}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/internships">
                <AnimatedButton variant="primary" className="bg-[#4D65FF]">
                  Find Internships
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved</p>
                  <p className="text-2xl font-semibold">{stats.saved}</p>
                </div>
                <div className="w-10 h-10 bg-[#4D65FF]/10 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-[#4D65FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applied</p>
                  <p className="text-2xl font-semibold">{stats.applied}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                  <p className="text-2xl font-semibold">{stats.shortlisted}</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Notifications</p>
                  <p className="text-2xl font-semibold">{stats.notifications}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start bg-white border border-[#EFEFF2] p-1 mb-6 overflow-x-auto">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Saved
              {stats.saved > 0 && <Badge variant="secondary" className="ml-1">{stats.saved}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Applications
              {stats.applied > 0 && <Badge variant="secondary" className="ml-1">{stats.applied}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
              {stats.notifications > 0 && <Badge className="ml-1 bg-red-500 text-white">{stats.notifications}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 space-y-6">
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Recent Applications</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleTabChange('applications')}>
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {appliedInternships.length > 0 ? (
                    <div className="space-y-3">
                      {appliedInternships.slice(0, 3).map((app) => (
                        <div key={app.internshipId} className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg">
                          <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-[#131313]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#131313] truncate">{app.internship?.title}</p>
                            <p className="text-sm text-muted-foreground">{app.internship?.company}</p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            {getStatusLabel(app.status)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-[#131313]/20 mx-auto mb-3" />
                      <p className="text-muted-foreground">No applications yet</p>
                      <Link to="/internships">
                        <Button variant="link" className="mt-2">Browse internships</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Saved Internships Preview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Saved Internships</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleTabChange('saved')}>
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {savedInternships.length > 0 ? (
                    <div className="space-y-3">
                      {savedInternships.slice(0, 3).map((internship) => (
                        <Link
                          key={internship.id}
                          to={`/internship/${internship.id}`}
                          className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-lg hover:bg-[#131313]/5 transition-colors"
                        >
                          <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-[#131313]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[#131313] truncate">{internship.title}</p>
                            <p className="text-sm text-muted-foreground">{internship.company}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bookmark className="w-12 h-12 text-[#131313]/20 mx-auto mb-3" />
                      <p className="text-muted-foreground">No saved internships</p>
                      <Link to="/internships">
                        <Button variant="link" className="mt-2">Browse internships</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#131313]">Profile Completion</h3>
                    <p className="text-sm text-muted-foreground">Complete your profile to get better recommendations</p>
                  </div>
                  <span className="text-2xl font-semibold text-[#4D65FF]">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Basic Info
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Education
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Resume
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Skills
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-0">
            {savedInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedInternships.map((internship) => (
                  <div key={internship.id} className="relative group">
                    <button
                      onClick={() => handleRemoveSaved(internship.id)}
                      className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <InternshipCard internship={internship} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#EFEFF2]">
                <Bookmark className="w-16 h-16 text-[#131313]/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#131313] mb-2">No saved internships</h3>
                <p className="text-muted-foreground mb-4">Save internships to apply later</p>
                <Link to="/internships">
                  <AnimatedButton variant="primary">Browse Internships</AnimatedButton>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-0">
            {appliedInternships.length > 0 ? (
              <div className="space-y-4">
                {appliedInternships.map((app) => (
                  <Card key={app.internshipId}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-[#131313]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-7 h-7 text-[#131313]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#131313] text-lg">{app.internship?.title}</h3>
                            <p className="text-muted-foreground">{app.internship?.company}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {app.internship?.locationType}
                              </span>
                              <span className="flex items-center gap-1">
                                <Wallet className="w-4 h-4" />
                                {app.internship?.isPaid ? `₹${app.internship?.stipend?.amount.toLocaleString()}` : 'Unpaid'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Applied {new Date(app.appliedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(app.status)} px-3 py-1`}>
                            {getStatusLabel(app.status)}
                          </Badge>
                          <Link to={`/internship/${app.internshipId}`}>
                            <Button variant="outline" size="sm">
                              View
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#EFEFF2]">
                <Briefcase className="w-16 h-16 text-[#131313]/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#131313] mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">Start applying to internships</p>
                <Link to="/internships">
                  <AnimatedButton variant="primary">Browse Internships</AnimatedButton>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0">
            {user?.notifications && user.notifications.length > 0 ? (
              <div className="space-y-3">
                {user.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      notification.read 
                        ? 'bg-white border-[#EFEFF2]' 
                        : 'bg-[#4D65FF]/5 border-[#4D65FF]/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        notification.read ? 'bg-[#131313]/5' : 'bg-[#4D65FF]/10'
                      }`}>
                        {notification.type === 'new_internship' && <Briefcase className={`w-5 h-5 ${notification.read ? 'text-[#131313]' : 'text-[#4D65FF]'}`} />}
                        {notification.type === 'deadline_reminder' && <Clock className={`w-5 h-5 ${notification.read ? 'text-[#131313]' : 'text-[#4D65FF]'}`} />}
                        {notification.type === 'status_update' && <CheckCircle2 className={`w-5 h-5 ${notification.read ? 'text-[#131313]' : 'text-[#4D65FF]'}`} />}
                        {notification.type === 'recommendation' && <Sparkles className={`w-5 h-5 ${notification.read ? 'text-[#131313]' : 'text-[#4D65FF]'}`} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-[#131313]">{notification.title}</h4>
                          {!notification.read && (
                            <Badge className="bg-[#4D65FF] text-white text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()} at {new Date(notification.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {notification.internshipId && (
                        <Link to={`/internship/${notification.internshipId}`}>
                          <Button variant="ghost" size="sm">
                            View
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#EFEFF2]">
                <Bell className="w-16 h-16 text-[#131313]/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#131313] mb-2">No notifications</h3>
                <p className="text-muted-foreground">We'll notify you about new internships and updates</p>
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Full Name</label>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Degree</label>
                      <p className="font-medium">{user?.profile.degree || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Year</label>
                      <p className="font-medium">{user?.profile.year || 'Not specified'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Location</label>
                    <p className="font-medium">{user?.profile.location || 'Not specified'}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="text-sm text-muted-foreground mb-2 block">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {user?.profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                      {(!user?.profile.skills || user.profile.skills.length === 0) && (
                        <p className="text-sm text-muted-foreground">No skills added</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {user?.profile.interests.map((interest) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                      {(!user?.profile.interests || user.profile.interests.length === 0) && (
                        <p className="text-sm text-muted-foreground">No interests added</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
