import { useState } from 'react';
import { Link } from 'react-router-dom';
import { internships, domains } from '@/data/internships';
import { AnimatedButton } from '@/components/AnimatedButton';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Building2,
  MapPin,
  Wallet,
  Calendar,
  ChevronLeft,
  CheckCircle2,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function Admin() {
  const [internshipList, setInternshipList] = useState(internships);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<any>(null);

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    locationType: 'Remote' as 'Remote' | 'Onsite' | 'Hybrid',
    stipendAmount: '',
    stipendPeriod: 'month' as 'month' | 'week' | 'total',
    isPaid: true,
    category: '',
    duration: '',
    deadline: '',
    description: '',
    applyLink: '',
    source: 'Company' as 'LinkedIn' | 'Internshala' | 'Government' | 'Company' | 'Other'
  });

  const filteredInternships = internshipList.filter(internship =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this internship?')) {
      setInternshipList(prev => prev.filter(i => i.id !== id));
      toast.success('Internship deleted successfully');
    }
  };

  const handleEdit = (internship: any) => {
    setEditingInternship(internship);
    setFormData({
      title: internship.title,
      company: internship.company,
      location: internship.location,
      locationType: internship.locationType,
      stipendAmount: internship.stipend?.amount?.toString() || '',
      stipendPeriod: internship.stipend?.period || 'month',
      isPaid: internship.isPaid,
      category: internship.category,
      duration: internship.duration,
      deadline: internship.applicationDeadline,
      description: internship.description,
      applyLink: internship.applyLink,
      source: internship.source
    });
    setIsAddDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInternship = {
      id: editingInternship ? editingInternship.id : Date.now().toString(),
      title: formData.title,
      company: formData.company,
      location: formData.location,
      locationType: formData.locationType,
      stipend: formData.isPaid ? {
        amount: parseInt(formData.stipendAmount) || 0,
        currency: 'INR',
        period: formData.stipendPeriod
      } : null,
      eligibility: {
        degrees: ['Any Degree'],
        years: ['Any Year'],
        skills: []
      },
      description: formData.description,
      responsibilities: [],
      requirements: [],
      applicationDeadline: formData.deadline,
      duration: formData.duration,
      applyLink: formData.applyLink,
      source: formData.source,
      postedDate: new Date().toISOString().split('T')[0],
      category: formData.category,
      isPaid: formData.isPaid
    };

    if (editingInternship) {
      setInternshipList(prev => prev.map(i => i.id === editingInternship.id ? newInternship : i));
      toast.success('Internship updated successfully');
    } else {
      setInternshipList(prev => [newInternship, ...prev]);
      toast.success('Internship added successfully');
    }

    setIsAddDialogOpen(false);
    setEditingInternship(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      locationType: 'Remote',
      stipendAmount: '',
      stipendPeriod: 'month',
      isPaid: true,
      category: '',
      duration: '',
      deadline: '',
      description: '',
      applyLink: '',
      source: 'Company'
    });
  };

  const stats = [
    { label: 'Total Internships', value: internshipList.length, icon: Briefcase },
    { label: 'Paid Internships', value: internshipList.filter(i => i.isPaid).length, icon: Wallet },
    { label: 'Remote', value: internshipList.filter(i => i.locationType === 'Remote').length, icon: MapPin },
    { label: 'This Week', value: internshipList.filter(i => {
      const posted = new Date(i.postedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return posted >= weekAgo;
    }).length, icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#131313] pt-24 pb-12">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl lg:text-4xl font-semibold text-white">
                Admin Dashboard
              </h1>
              <p className="text-white/60">
                Manage internships and monitor applications
              </p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <AnimatedButton variant="primary" className="bg-[#4D65FF] gap-2">
                  <Plus className="w-4 h-4" />
                  Add Internship
                </AnimatedButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingInternship ? 'Edit Internship' : 'Add New Internship'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Software Engineering Intern"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company *</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g., Google"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location *</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Bangalore, Karnataka"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Work Type *</Label>
                      <Select 
                        value={formData.locationType} 
                        onValueChange={(v) => setFormData({ ...formData, locationType: v as any })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="Onsite">Onsite</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(v) => setFormData({ ...formData, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {domains.filter(d => d !== 'All').map(d => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration *</Label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 6 months"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Stipend</Label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPaid}
                        onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Paid Internship</span>
                    </div>
                    {formData.isPaid && (
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <Input
                          type="number"
                          value={formData.stipendAmount}
                          onChange={(e) => setFormData({ ...formData, stipendAmount: e.target.value })}
                          placeholder="Amount in INR"
                        />
                        <Select 
                          value={formData.stipendPeriod} 
                          onValueChange={(v) => setFormData({ ...formData, stipendPeriod: v as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Per Month</SelectItem>
                            <SelectItem value="week">Per Week</SelectItem>
                            <SelectItem value="total">Total</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Application Deadline *</Label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the internship..."
                      className="w-full px-3 py-2 border border-[#EFEFF2] rounded-lg text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#4D65FF]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Apply Link *</Label>
                    <Input
                      type="url"
                      value={formData.applyLink}
                      onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                      placeholder="https://..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Source *</Label>
                    <Select 
                      value={formData.source} 
                      onValueChange={(v) => setFormData({ ...formData, source: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Internshala">Internshala</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        setEditingInternship(null);
                        resetForm();
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#131313]">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {editingInternship ? 'Update' : 'Add'} Internship
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-[#EFEFF2]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[#131313]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search internships..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Internships Table */}
        <div className="bg-white rounded-xl border border-[#EFEFF2] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Internship</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Stipend</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInternships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#131313]/5 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#131313]" />
                      </div>
                      <div>
                        <p className="font-medium">{internship.title}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {internship.category}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{internship.locationType}</Badge>
                  </TableCell>
                  <TableCell>
                    {internship.isPaid ? (
                      <span className="text-green-600">
                        ₹{internship.stipend?.amount.toLocaleString()}/{internship.stipend?.period}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Unpaid</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(internship.applicationDeadline).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/internship/${internship.id}`}>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(internship)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(internship.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-[#131313]/20 mx-auto mb-3" />
              <p className="text-muted-foreground">No internships found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

