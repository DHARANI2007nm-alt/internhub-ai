import type { Internship, User, ResumeTip } from '@/types';

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Software Engineering Intern',
    company: 'Google India',
    companyLogo: '/images/companies/google.svg',
    location: 'Bangalore, Karnataka',
    locationType: 'Hybrid',
    stipend: {
      amount: 80000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms']
    },
    description: 'Join Google India as a Software Engineering Intern and work on cutting-edge projects that impact millions of users worldwide. You will collaborate with experienced engineers and contribute to real products.',
    responsibilities: [
      'Develop and maintain software applications',
      'Write clean, efficient, and well-documented code',
      'Collaborate with cross-functional teams',
      'Participate in code reviews and design discussions'
    ],
    requirements: [
      'Strong programming skills in Python, Java, or C++',
      'Knowledge of data structures and algorithms',
      'Good problem-solving abilities',
      'Currently pursuing B.Tech/M.Tech in CS or related field'
    ],
    applicationDeadline: '2026-04-15',
    duration: '6 months',
    applyLink: 'https://careers.google.com',
    source: 'LinkedIn',
    postedDate: '2026-03-10',
    category: 'Software Development',
    isPaid: true
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'Microsoft India',
    companyLogo: '/images/companies/microsoft.svg',
    location: 'Hyderabad, Telangana',
    locationType: 'Onsite',
    stipend: {
      amount: 60000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Pandas']
    },
    description: 'Microsoft India is looking for passionate Data Science Interns to work on machine learning models and data analytics projects. Gain hands-on experience with Azure ML and big data technologies.',
    responsibilities: [
      'Build and deploy machine learning models',
      'Analyze large datasets to extract insights',
      'Create data visualizations and reports',
      'Collaborate with data engineers and scientists'
    ],
    requirements: [
      'Strong foundation in statistics and mathematics',
      'Experience with Python and ML libraries',
      'Knowledge of SQL and data manipulation',
      'Pursuing degree in CS, Statistics, or related field'
    ],
    applicationDeadline: '2026-04-20',
    duration: '3 months',
    applyLink: 'https://careers.microsoft.com',
    source: 'LinkedIn',
    postedDate: '2026-03-12',
    category: 'Data Science',
    isPaid: true
  },
  {
    id: '3',
    title: 'Web Development Intern',
    company: 'Flipkart',
    companyLogo: '/images/companies/flipkart.svg',
    location: 'Bangalore, Karnataka',
    locationType: 'Remote',
    stipend: {
      amount: 35000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'BCA', 'MCA', 'B.Sc'],
      years: ['2nd Year', '3rd Year', '4th Year'],
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js']
    },
    description: 'Flipkart is seeking talented Web Development Interns to build and enhance our e-commerce platform. Work with modern technologies like React, Node.js, and microservices architecture.',
    responsibilities: [
      'Develop responsive web applications',
      'Implement new features and fix bugs',
      'Optimize application performance',
      'Work with design teams to implement UI/UX'
    ],
    requirements: [
      'Proficiency in React and JavaScript',
      'Understanding of REST APIs',
      'Knowledge of version control (Git)',
      'Basic understanding of backend development'
    ],
    applicationDeadline: '2026-03-30',
    duration: '6 months',
    applyLink: 'https://www.flipkartcareers.com',
    source: 'Internshala',
    postedDate: '2026-03-15',
    category: 'Web Development',
    isPaid: true
  },
  {
    id: '4',
    title: 'Cybersecurity Intern',
    company: 'Wipro',
    companyLogo: '/images/companies/wipro.svg',
    location: 'Pune, Maharashtra',
    locationType: 'Onsite',
    stipend: {
      amount: 25000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Network Security', 'Linux', 'Python', 'Ethical Hacking', 'SIEM']
    },
    description: 'Join Wipro cybersecurity team to learn about enterprise security practices, threat detection, and vulnerability assessment. Work on real security projects and gain industry certifications.',
    responsibilities: [
      'Monitor security alerts and incidents',
      'Perform vulnerability assessments',
      'Assist in security audits',
      'Document security procedures'
    ],
    requirements: [
      'Basic knowledge of networking concepts',
      'Understanding of operating systems',
      'Interest in cybersecurity',
      'Any security certification is a plus'
    ],
    applicationDeadline: '2026-04-05',
    duration: '6 months',
    applyLink: 'https://careers.wipro.com',
    source: 'Company',
    postedDate: '2026-03-14',
    category: 'Cybersecurity',
    isPaid: true
  },
  {
    id: '5',
    title: 'AI/ML Research Intern',
    company: 'Adobe India',
    companyLogo: '/images/companies/adobe.svg',
    location: 'Noida, Uttar Pradesh',
    locationType: 'Hybrid',
    stipend: {
      amount: 70000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'PhD'],
      years: ['Final Year', 'Post Graduate'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP']
    },
    description: 'Adobe Research India is looking for AI/ML Research Interns to work on cutting-edge projects in computer vision, natural language processing, and generative AI.',
    responsibilities: [
      'Research and implement ML algorithms',
      'Experiment with deep learning models',
      'Publish research papers',
      'Collaborate with research scientists'
    ],
    requirements: [
      'Strong mathematical foundation',
      'Experience with deep learning frameworks',
      'Research aptitude',
      'Pursuing advanced degree in AI/ML'
    ],
    applicationDeadline: '2026-04-25',
    duration: '6 months',
    applyLink: 'https://research.adobe.com/careers',
    source: 'LinkedIn',
    postedDate: '2026-03-08',
    category: 'AI/ML',
    isPaid: true
  },
  {
    id: '6',
    title: 'Mobile App Development Intern',
    company: 'Paytm',
    companyLogo: '/images/companies/paytm.svg',
    location: 'Delhi NCR',
    locationType: 'Onsite',
    stipend: {
      amount: 40000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year'],
      skills: ['Flutter', 'React Native', 'Android', 'iOS', 'Dart']
    },
    description: 'Paytm is hiring Mobile App Development Interns to build and maintain our fintech applications. Work on apps used by millions of Indians daily.',
    responsibilities: [
      'Develop mobile applications',
      'Implement UI components',
      'Integrate APIs and services',
      'Fix bugs and improve performance'
    ],
    requirements: [
      'Experience with Flutter or React Native',
      'Understanding of mobile app lifecycle',
      'Knowledge of REST APIs',
      'Portfolio of mobile apps is a plus'
    ],
    applicationDeadline: '2026-03-28',
    duration: '6 months',
    applyLink: 'https://paytm.com/careers',
    source: 'Internshala',
    postedDate: '2026-03-16',
    category: 'Mobile Development',
    isPaid: true
  },
  {
    id: '7',
    title: 'Cloud Computing Intern',
    company: 'Amazon Web Services',
    companyLogo: '/images/companies/aws.svg',
    location: 'Mumbai, Maharashtra',
    locationType: 'Hybrid',
    stipend: {
      amount: 55000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['AWS', 'Cloud Architecture', 'Docker', 'Kubernetes', 'DevOps']
    },
    description: 'AWS India is seeking Cloud Computing Interns to help customers design and implement cloud solutions. Learn from the leaders in cloud computing.',
    responsibilities: [
      'Design cloud architectures',
      'Implement cloud solutions',
      'Optimize cloud costs',
      'Document best practices'
    ],
    requirements: [
      'Knowledge of AWS services',
      'Understanding of cloud concepts',
      'Basic scripting skills',
      'AWS certification is a plus'
    ],
    applicationDeadline: '2026-04-10',
    duration: '6 months',
    applyLink: 'https://aws.amazon.com/careers',
    source: 'LinkedIn',
    postedDate: '2026-03-11',
    category: 'Cloud Computing',
    isPaid: true
  },
  {
    id: '8',
    title: 'UI/UX Design Intern',
    company: 'Zomato',
    companyLogo: '/images/companies/zomato.svg',
    location: 'Gurgaon, Haryana',
    locationType: 'Onsite',
    stipend: {
      amount: 30000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Des', 'M.Des', 'B.Tech', 'Any Design'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing']
    },
    description: 'Zomato is looking for creative UI/UX Design Interns to help create delightful food ordering experiences. Work on products used by millions of users.',
    responsibilities: [
      'Create user interfaces and prototypes',
      'Conduct user research',
      'Design responsive layouts',
      'Collaborate with product teams'
    ],
    requirements: [
      'Proficiency in Figma or Adobe XD',
      'Understanding of design principles',
      'Portfolio showcasing design work',
      'Knowledge of user-centered design'
    ],
    applicationDeadline: '2026-03-25',
    duration: '3 months',
    applyLink: 'https://www.zomato.com/careers',
    source: 'Internshala',
    postedDate: '2026-03-13',
    category: 'Design',
    isPaid: true
  },
  {
    id: '9',
    title: 'Blockchain Development Intern',
    company: 'CoinDCX',
    companyLogo: '/images/companies/coindcx.svg',
    location: 'Remote',
    locationType: 'Remote',
    stipend: {
      amount: 45000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'JavaScript']
    },
    description: 'CoinDCX is seeking Blockchain Development Interns to work on decentralized finance (DeFi) applications and smart contract development.',
    responsibilities: [
      'Develop smart contracts',
      'Build DeFi applications',
      'Implement Web3 integrations',
      'Conduct security audits'
    ],
    requirements: [
      'Knowledge of blockchain fundamentals',
      'Experience with Solidity',
      'Understanding of Ethereum',
      'Passion for crypto and DeFi'
    ],
    applicationDeadline: '2026-04-08',
    duration: '6 months',
    applyLink: 'https://coindcx.com/careers',
    source: 'LinkedIn',
    postedDate: '2026-03-09',
    category: 'Blockchain',
    isPaid: true
  },
  {
    id: '10',
    title: 'Content Writing Intern',
    company: 'BYJU\'S',
    companyLogo: '/images/companies/byjus.svg',
    location: 'Bangalore, Karnataka',
    locationType: 'Remote',
    stipend: {
      amount: 15000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['Any Degree'],
      years: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Research', 'Editing']
    },
    description: 'BYJU\'S is looking for Content Writing Interns to create engaging educational content. Perfect for students passionate about writing and education.',
    responsibilities: [
      'Write educational content',
      'Create blog posts and articles',
      'Edit and proofread content',
      'Research educational topics'
    ],
    requirements: [
      'Excellent writing skills',
      'Good command of English',
      'Research abilities',
      'Basic SEO knowledge is a plus'
    ],
    applicationDeadline: '2026-03-22',
    duration: '3 months',
    applyLink: 'https://byjus.com/careers',
    source: 'Internshala',
    postedDate: '2026-03-17',
    category: 'Content Writing',
    isPaid: true
  },
  {
    id: '11',
    title: 'Digital Marketing Intern',
    company: 'Swiggy',
    companyLogo: '/images/companies/swiggy.svg',
    location: 'Bangalore, Karnataka',
    locationType: 'Hybrid',
    stipend: {
      amount: 20000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['BBA', 'MBA', 'Any Degree'],
      years: ['2nd Year', '3rd Year', '4th Year'],
      skills: ['Social Media Marketing', 'SEO', 'Google Ads', 'Analytics', 'Content Marketing']
    },
    description: 'Swiggy is hiring Digital Marketing Interns to help grow our brand presence. Learn from industry experts in food tech marketing.',
    responsibilities: [
      'Manage social media campaigns',
      'Analyze marketing metrics',
      'Create marketing content',
      'Assist in campaign planning'
    ],
    requirements: [
      'Understanding of digital marketing',
      'Knowledge of social media platforms',
      'Analytical mindset',
      'Creative thinking'
    ],
    applicationDeadline: '2026-03-29',
    duration: '3 months',
    applyLink: 'https://www.swiggy.com/careers',
    source: 'Internshala',
    postedDate: '2026-03-15',
    category: 'Marketing',
    isPaid: true
  },
  {
    id: '12',
    title: 'Government IT Intern',
    company: 'National Informatics Centre',
    companyLogo: '/images/companies/nic.svg',
    location: 'New Delhi',
    locationType: 'Onsite',
    stipend: null,
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Java', 'Python', 'Web Development', 'Database Management']
    },
    description: 'NIC offers unpaid internships for students interested in government IT projects. Gain experience in e-governance and digital India initiatives.',
    responsibilities: [
      'Work on government IT projects',
      'Develop e-governance solutions',
      'Maintain government portals',
      'Assist in technical documentation'
    ],
    requirements: [
      'Strong academic record',
      'Knowledge of web technologies',
      'Interest in public service',
      'Letter from college required'
    ],
    applicationDeadline: '2026-04-30',
    duration: '6 months',
    applyLink: 'https://www.nic.in',
    source: 'Government',
    postedDate: '2026-03-05',
    category: 'Government',
    isPaid: false
  },
  {
    id: '13',
    title: 'Product Management Intern',
    company: 'Ola',
    companyLogo: '/images/companies/ola.svg',
    location: 'Bangalore, Karnataka',
    locationType: 'Onsite',
    stipend: {
      amount: 50000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'MBA', 'BBA'],
      years: ['Final Year', 'Post Graduate'],
      skills: ['Product Strategy', 'Data Analysis', 'User Research', 'Agile', 'SQL']
    },
    description: 'Ola is seeking Product Management Interns to help build the future of mobility in India. Work on products that impact millions of rides daily.',
    responsibilities: [
      'Assist in product strategy',
      'Conduct market research',
      'Analyze user data',
      'Coordinate with engineering teams'
    ],
    requirements: [
      'Strong analytical skills',
      'Understanding of product lifecycle',
      'Good communication skills',
      'MBA or engineering background preferred'
    ],
    applicationDeadline: '2026-04-12',
    duration: '6 months',
    applyLink: 'https://www.olacabs.com/careers',
    source: 'LinkedIn',
    postedDate: '2026-03-14',
    category: 'Product Management',
    isPaid: true
  },
  {
    id: '14',
    title: 'DevOps Engineer Intern',
    company: 'Infosys',
    companyLogo: '/images/companies/infosys.svg',
    location: 'Pune, Maharashtra',
    locationType: 'Hybrid',
    stipend: {
      amount: 28000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'M.Tech', 'BCA', 'MCA'],
      years: ['3rd Year', '4th Year', 'Final Year'],
      skills: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform']
    },
    description: 'Infosys is looking for DevOps Engineer Interns to work on CI/CD pipelines and infrastructure automation. Learn enterprise DevOps practices.',
    responsibilities: [
      'Build and maintain CI/CD pipelines',
      'Automate infrastructure deployment',
      'Monitor system performance',
      'Troubleshoot deployment issues'
    ],
    requirements: [
      'Knowledge of Linux systems',
      'Understanding of containerization',
      'Basic scripting skills',
      'Familiarity with cloud platforms'
    ],
    applicationDeadline: '2026-04-05',
    duration: '6 months',
    applyLink: 'https://www.infosys.com/careers',
    source: 'Company',
    postedDate: '2026-03-12',
    category: 'DevOps',
    isPaid: true
  },
  {
    id: '15',
    title: 'Game Development Intern',
    company: 'Dream11',
    companyLogo: '/images/companies/dream11.svg',
    location: 'Mumbai, Maharashtra',
    locationType: 'Onsite',
    stipend: {
      amount: 45000,
      currency: 'INR',
      period: 'month'
    },
    eligibility: {
      degrees: ['B.Tech', 'BCA', 'B.Sc'],
      years: ['3rd Year', '4th Year'],
      skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Physics']
    },
    description: 'Dream11 is hiring Game Development Interns to work on fantasy sports games. Join India\'s leading fantasy sports platform.',
    responsibilities: [
      'Develop game features',
      'Optimize game performance',
      'Implement game mechanics',
      'Collaborate with game designers'
    ],
    requirements: [
      'Experience with Unity or Unreal',
      'Strong C# or C++ skills',
      'Passion for gaming',
      'Portfolio of game projects'
    ],
    applicationDeadline: '2026-04-18',
    duration: '6 months',
    applyLink: 'https://www.dream11.com/careers',
    source: 'LinkedIn',
    postedDate: '2026-03-10',
    category: 'Game Development',
    isPaid: true
  }
];

export const mockUser: User = {
  id: '1',
  email: 'student@example.com',
  name: 'Rahul Sharma',
  avatar: '/images/avatars/user1.jpg',
  profile: {
    degree: 'B.Tech',
    year: '3rd Year',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning'],
    interests: ['AI/ML', 'Web Development', 'Data Science'],
    location: 'Bangalore'
  },
  savedInternships: ['1', '3', '7'],
  appliedInternships: [
    {
      internshipId: '2',
      appliedDate: '2026-03-14',
      status: 'under_review'
    },
    {
      internshipId: '5',
      appliedDate: '2026-03-16',
      status: 'shortlisted'
    }
  ],
  notifications: [
    {
      id: '1',
      title: 'New Internship Match!',
      message: 'A new AI/ML internship at Adobe matches your profile.',
      type: 'recommendation',
      read: false,
      createdAt: '2026-03-17T10:00:00Z',
      internshipId: '5'
    },
    {
      id: '2',
      title: 'Application Status Update',
      message: 'Your application for Data Science Intern at Microsoft has been shortlisted!',
      type: 'status_update',
      read: false,
      createdAt: '2026-03-16T14:30:00Z',
      internshipId: '2'
    },
    {
      id: '3',
      title: 'Deadline Reminder',
      message: 'Web Development Intern at Flipkart deadline is approaching in 3 days.',
      type: 'deadline_reminder',
      read: true,
      createdAt: '2026-03-15T09:00:00Z',
      internshipId: '3'
    }
  ]
};

export const resumeTips: ResumeTip[] = [
  {
    category: 'Software Development',
    tips: [
      'Highlight your GitHub profile with active repositories',
      'Include links to live projects and deployments',
      'Mention competitive programming achievements',
      'List relevant coursework and technical skills',
      'Include contributions to open source projects'
    ]
  },
  {
    category: 'Data Science',
    tips: [
      'Showcase Kaggle competition rankings',
      'Include links to data analysis notebooks',
      'Mention relevant statistics and mathematics courses',
      'List machine learning frameworks you know',
      'Include any research papers or publications'
    ]
  },
  {
    category: 'Web Development',
    tips: [
      'Provide portfolio website link',
      'List frontend and backend technologies separately',
      'Include responsive design projects',
      'Mention any freelance or client work',
      'Showcase full-stack project experience'
    ]
  },
  {
    category: 'Design',
    tips: [
      'Include Behance or Dribbble portfolio link',
      'Showcase UI/UX case studies',
      'Mention design tools proficiency',
      'Include before/after design improvements',
      'Show variety in design styles'
    ]
  },
  {
    category: 'General',
    tips: [
      'Keep resume to 1 page for internships',
      'Use action verbs to describe achievements',
      'Quantify results where possible',
      'Tailor resume for each application',
      'Proofread for spelling and grammar errors'
    ]
  }
];

export const domains = [
  'All',
  'Software Development',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'AI/ML',
  'Cybersecurity',
  'Cloud Computing',
  'DevOps',
  'Blockchain',
  'Design',
  'Product Management',
  'Marketing',
  'Content Writing',
  'Game Development',
  'Government'
];

export const locations = [
  'All',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'Delhi NCR',
  'Chennai',
  'Kolkata',
  'Remote'
];

export const degreeOptions = [
  'B.Tech',
  'M.Tech',
  'BCA',
  'MCA',
  'B.Sc',
  'M.Sc',
  'BBA',
  'MBA',
  'B.Des',
  'M.Des',
  'PhD',
  'Any Degree'
];

export const yearOptions = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Final Year',
  'Post Graduate'
];

export const skillsList = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'React',
  'Node.js',
  'Machine Learning',
  'Deep Learning',
  'Data Structures',
  'Algorithms',
  'SQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'Figma',
  'HTML',
  'CSS',
  'Flutter',
  'React Native',
  'Solidity',
  'TensorFlow',
  'PyTorch',
  'Linux',
  'Git'
];
