export interface TutorData {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  degree: string;
  institution: string;
  secondaryEducation?: { institution: string; degree: string };
  rate: number;
  rating: number;
  reviews: number;
  hoursTaught: number;
  subjects: string[];
  approvedSubjects: string[];
  bio: string;
  location: string;
  province: string;
  onlineAvailable: boolean;
  schedule: { day: string; time: string | null }[];
  backgroundCheckDate: string;
  reviewsList: {
    initials: string;
    name: string;
    role: string;
    stars: number;
    date: string;
    text: string;
    avatarBg: string;
  }[];
}

export const ALL_TUTORS: TutorData[] = [
  {
    id: "aaryav-sharma",
    name: "Aaryav Sharma",
    initials: "AS",
    avatarBg: "bg-secondary",
    avatarText: "text-secondary-foreground",
    degree: "B.Sc. Physics",
    institution: "Tribhuvan University",
    secondaryEducation: { institution: "St. Xavier's College", degree: "Higher Secondary (NEB) — Science" },
    rate: 800,
    rating: 4.9,
    reviews: 38,
    hoursTaught: 142,
    subjects: ["Physics", "Math"],
    approvedSubjects: ["Physics", "Mathematics", "Thermodynamics", "Mechanics", "Optics", "Algebra", "Trigonometry", "SEE Science"],
    bio: "Physics and Mathematics tutor based in Lalitpur, specializing in NEB Grade 11 & 12 and SEE preparation. I focus on building conceptual clarity rather than rote learning. Courses taught: Mechanics, Thermodynamics, Optics, Algebra, and Trigonometry. My students have consistently improved their scores by at least one grade within 2 months of regular lessons. I use visual aids, real-world examples, and past paper practice to make learning effective and enjoyable.",
    location: "Lalitpur",
    province: "Bagmati Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: null },
      { day: "Mon", time: "4:00 PM – 8:00 PM" },
      { day: "Tue", time: "4:00 PM – 8:00 PM" },
      { day: "Wed", time: null },
      { day: "Thu", time: "4:00 PM – 9:00 PM" },
      { day: "Fri", time: "4:00 PM – 9:00 PM" },
      { day: "Sat", time: "10:00 AM – 2:00 PM" },
    ],
    backgroundCheckDate: "July 1, 2023",
    reviewsList: [
      {
        initials: "ST",
        name: "Sushant T.",
        role: "Grade 11 Student",
        stars: 5,
        date: "July 15, 2023",
        text: "Aaryav sir explains concepts very clearly. My Physics marks improved from C+ to A in just 6 weeks. Highly recommend for NEB students.",
        avatarBg: "bg-secondary",
      },
      {
        initials: "PM",
        name: "Priya M.",
        role: "Grade 12 Student",
        stars: 5,
        date: "Magh 28, 2023",
        text: "Best Physics tutor in Lalitpur. Very patient and always available for doubt clearing sessions.",
        avatarBg: "bg-primary",
      },
      {
        initials: "RK",
        name: "Rohan K.",
        role: "University Student",
        stars: 4,
        date: "Magh 10, 2023",
        text: "Good teaching style. Explains thermodynamics very well. Would have given 5 stars but sometimes starts a few minutes late.",
        avatarBg: "bg-secondary",
      },
    ],
  },
  {
    id: "priya-shrestha",
    name: "Priya Shrestha",
    initials: "PS",
    avatarBg: "bg-secondary",
    avatarText: "text-secondary-foreground",
    degree: "B.Ed. Mathematics",
    institution: "Tribhuvan University",
    secondaryEducation: { institution: "Padma Kanya Campus", degree: "Higher Secondary (NEB) — Science" },
    rate: 700,
    rating: 4.8,
    reviews: 31,
    hoursTaught: 98,
    subjects: ["Math", "Statistics"],
    approvedSubjects: ["Math", "Statistics", "Algebra", "Calculus"],
    bio: "Mathematics tutor with a passion for making numbers simple. I specialize in NEB Grade 11 & 12 Mathematics, Statistics, and SEE Math preparation. My teaching approach focuses on step-by-step problem solving and building strong fundamentals.",
    location: "Kathmandu",
    province: "Bagmati Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: null },
      { day: "Mon", time: "3:00 PM – 7:00 PM" },
      { day: "Tue", time: null },
      { day: "Wed", time: "3:00 PM – 7:00 PM" },
      { day: "Thu", time: null },
      { day: "Fri", time: "3:00 PM – 7:00 PM" },
      { day: "Sat", time: "10:00 AM – 1:00 PM" },
    ],
    backgroundCheckDate: "June 15, 2023",
    reviewsList: [
      { initials: "AK", name: "Anita K.", role: "Grade 12 Student", stars: 5, date: "August 10, 2023", text: "Priya didi makes math so easy to understand. My grades improved significantly.", avatarBg: "bg-secondary" },
      { initials: "RB", name: "Rajesh B.", role: "Grade 11 Student", stars: 5, date: "July 20, 2023", text: "Very patient teacher. Explains every step clearly.", avatarBg: "bg-primary" },
      { initials: "SM", name: "Sita M.", role: "SEE Student", stars: 4, date: "June 5, 2023", text: "Good teaching but sometimes class timing changes.", avatarBg: "bg-secondary" },
    ],
  },
  {
    id: "rohan-adhikari",
    name: "Rohan Adhikari",
    initials: "RA",
    avatarBg: "bg-primary",
    avatarText: "text-primary-foreground",
    degree: "M.Sc. Physics",
    institution: "Kathmandu University",
    secondaryEducation: { institution: "Budhanilkantha School", degree: "Higher Secondary (NEB) — Science" },
    rate: 900,
    rating: 4.9,
    reviews: 41,
    hoursTaught: 201,
    subjects: ["Physics", "Chemistry"],
    approvedSubjects: ["Physics", "Chemistry", "Thermodynamics", "Quantum Mechanics", "Organic Chemistry"],
    bio: "Experienced Physics and Chemistry tutor with a Master's degree from Kathmandu University. I have taught over 200 hours across NEB and university level courses. My specialty is making complex topics like Quantum Mechanics and Organic Chemistry accessible through visual explanations.",
    location: "Kirtipur",
    province: "Bagmati Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: "10:00 AM – 3:00 PM" },
      { day: "Mon", time: null },
      { day: "Tue", time: "5:00 PM – 9:00 PM" },
      { day: "Wed", time: null },
      { day: "Thu", time: "5:00 PM – 9:00 PM" },
      { day: "Fri", time: null },
      { day: "Sat", time: "5:00 PM – 9:00 PM" },
    ],
    backgroundCheckDate: "May 20, 2023",
    reviewsList: [
      { initials: "BG", name: "Bikash G.", role: "University Student", stars: 5, date: "September 1, 2023", text: "Rohan sir is the best Physics tutor I've had. His explanations are crystal clear.", avatarBg: "bg-secondary" },
      { initials: "NK", name: "Nirmala K.", role: "Grade 12 Student", stars: 5, date: "August 15, 2023", text: "Amazing teacher for Chemistry. Made Organic Chemistry actually fun.", avatarBg: "bg-primary" },
      { initials: "DT", name: "Dipesh T.", role: "Grade 11 Student", stars: 4, date: "July 28, 2023", text: "Great knowledge and teaching style. Highly recommended.", avatarBg: "bg-secondary" },
    ],
  },
  {
    id: "sneha-maharjan",
    name: "Sneha Maharjan",
    initials: "SM",
    avatarBg: "bg-secondary",
    avatarText: "text-secondary-foreground",
    degree: "B.Ed. English",
    institution: "Tribhuvan University",
    secondaryEducation: { institution: "Nepal Commerce Campus", degree: "Higher Secondary (NEB) — Management" },
    rate: 650,
    rating: 4.7,
    reviews: 18,
    hoursTaught: 67,
    subjects: ["English", "Grammar"],
    approvedSubjects: ["English", "Grammar", "Essay Writing", "Reading Comprehension", "SEE English"],
    bio: "English language tutor specializing in grammar, essay writing, and reading comprehension. I help students build confidence in spoken and written English through interactive lessons and regular practice sessions.",
    location: "Bhaktapur",
    province: "Bagmati Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: null },
      { day: "Mon", time: "4:00 PM – 7:00 PM" },
      { day: "Tue", time: "4:00 PM – 7:00 PM" },
      { day: "Wed", time: "4:00 PM – 7:00 PM" },
      { day: "Thu", time: "4:00 PM – 7:00 PM" },
      { day: "Fri", time: "4:00 PM – 7:00 PM" },
      { day: "Sat", time: null },
    ],
    backgroundCheckDate: "August 10, 2023",
    reviewsList: [
      { initials: "KR", name: "Kabita R.", role: "SEE Student", stars: 5, date: "September 5, 2023", text: "Sneha didi helped me improve my English writing so much!", avatarBg: "bg-secondary" },
      { initials: "AP", name: "Arun P.", role: "Grade 10 Student", stars: 4, date: "August 20, 2023", text: "Good teacher for grammar and essay writing.", avatarBg: "bg-primary" },
      { initials: "MG", name: "Maya G.", role: "Grade 11 Student", stars: 5, date: "July 10, 2023", text: "Very helpful for reading comprehension skills.", avatarBg: "bg-secondary" },
    ],
  },
  {
    id: "aakash-thapa",
    name: "Aakash Thapa",
    initials: "AT",
    avatarBg: "bg-primary",
    avatarText: "text-primary-foreground",
    degree: "B.Sc. Physics",
    institution: "Pokhara University",
    secondaryEducation: { institution: "Prithvi Narayan Campus", degree: "Higher Secondary (NEB) — Science" },
    rate: 800,
    rating: 5.0,
    reviews: 9,
    hoursTaught: 31,
    subjects: ["Physics", "Math"],
    approvedSubjects: ["Physics", "Math", "SEE Science", "SEE Math"],
    bio: "New but highly rated Physics and Math tutor from Pokhara. I bring energy and enthusiasm to every lesson. My focus is on SEE preparation and Grade 11 Physics and Math foundations.",
    location: "Pokhara",
    province: "Gandaki Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: "6:00 PM – 9:00 PM" },
      { day: "Mon", time: "6:00 PM – 9:00 PM" },
      { day: "Tue", time: "6:00 PM – 9:00 PM" },
      { day: "Wed", time: "6:00 PM – 9:00 PM" },
      { day: "Thu", time: "6:00 PM – 9:00 PM" },
      { day: "Fri", time: "6:00 PM – 9:00 PM" },
      { day: "Sat", time: "6:00 PM – 9:00 PM" },
    ],
    backgroundCheckDate: "September 1, 2023",
    reviewsList: [
      { initials: "SG", name: "Suraj G.", role: "SEE Student", stars: 5, date: "October 1, 2023", text: "Aakash dai is very energetic and makes learning fun!", avatarBg: "bg-secondary" },
      { initials: "LP", name: "Laxmi P.", role: "Grade 10 Student", stars: 5, date: "September 20, 2023", text: "Best tutor for SEE Science preparation.", avatarBg: "bg-primary" },
      { initials: "BT", name: "Binod T.", role: "Grade 11 Student", stars: 5, date: "September 10, 2023", text: "Clear explanations and very patient.", avatarBg: "bg-secondary" },
    ],
  },
  {
    id: "nisha-pandey",
    name: "Nisha Pandey",
    initials: "NP",
    avatarBg: "bg-secondary",
    avatarText: "text-secondary-foreground",
    degree: "M.Ed. Physics",
    institution: "Tribhuvan University",
    secondaryEducation: { institution: "Amrit Science Campus", degree: "B.Sc. Physics" },
    rate: 750,
    rating: 4.9,
    reviews: 33,
    hoursTaught: 118,
    subjects: ["Physics", "Chemistry"],
    approvedSubjects: ["Physics", "Chemistry", "Biology", "SEE Science"],
    bio: "Experienced science tutor with a Master's in Education. I specialize in Physics, Chemistry, and Biology for NEB and SEE levels. My approach combines theory with practical examples to make science concepts stick.",
    location: "Chitwan",
    province: "Bagmati Province",
    onlineAvailable: true,
    schedule: [
      { day: "Sun", time: null },
      { day: "Mon", time: "3:00 PM – 8:00 PM" },
      { day: "Tue", time: null },
      { day: "Wed", time: "3:00 PM – 8:00 PM" },
      { day: "Thu", time: null },
      { day: "Fri", time: "3:00 PM – 8:00 PM" },
      { day: "Sat", time: "9:00 AM – 12:00 PM" },
    ],
    backgroundCheckDate: "July 15, 2023",
    reviewsList: [
      { initials: "RT", name: "Ravi T.", role: "Grade 12 Student", stars: 5, date: "August 25, 2023", text: "Nisha ma'am is excellent at explaining complex Physics concepts.", avatarBg: "bg-secondary" },
      { initials: "KS", name: "Kamala S.", role: "Grade 11 Student", stars: 5, date: "August 10, 2023", text: "Very thorough teaching. Great for Chemistry too.", avatarBg: "bg-primary" },
      { initials: "AD", name: "Aman D.", role: "SEE Student", stars: 4, date: "July 30, 2023", text: "Helpful for SEE Science preparation. Good notes provided.", avatarBg: "bg-secondary" },
    ],
  },
];

export function getTutorById(id: string): TutorData | undefined {
  return ALL_TUTORS.find((t) => t.id === id);
}
