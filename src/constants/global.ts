export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = months.map((month) => ({
  value: month,
  label: month,
}));

export const faculties = [
  { name: "Engineering" },
  { name: "Business Administration" },
  { name: "Arts and Humanities" },
  { name: "Medicine" },
  { name: "Law" },
  { name: "Education" },
  { name: "Computer Science" },
  { name: "Natural Sciences" },
  { name: "Social Sciences" },
  { name: "Agriculture" },
  { name: "Environmental Studies" },
  { name: "Architecture" },
  { name: "Mathematics" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Biology" },
  { name: "Nursing" },
  { name: "Pharmacy" },
  { name: "Veterinary Medicine" },
  { name: "Media and Communication" },
];

export const facultiesOptions = faculties.map((faculty) => ({
  value: faculty.name,
  label: faculty.name,
}));

export const academicDepartments = [
  { name: "Civil Engineering", faculty: "Engineering" },
  { name: "Mechanical Engineering", faculty: "Engineering" },
  { name: "Electrical Engineering", faculty: "Engineering" },
  { name: "Marketing", faculty: "Business Administration" },
  { name: "Finance", faculty: "Business Administration" },
  { name: "Human Resource Management", faculty: "Business Administration" },
  { name: "History", faculty: "Arts and Humanities" },
  { name: "Philosophy", faculty: "Arts and Humanities" },
  { name: "Linguistics", faculty: "Arts and Humanities" },
  { name: "General Medicine", faculty: "Medicine" },
  { name: "Surgery", faculty: "Medicine" },
  { name: "Pediatrics", faculty: "Medicine" },
  { name: "Criminal Law", faculty: "Law" },
  { name: "Corporate Law", faculty: "Law" },
  { name: "Constitutional Law", faculty: "Law" },
  { name: "Educational Leadership", faculty: "Education" },
  { name: "Curriculum Development", faculty: "Education" },
  { name: "Early Childhood Education", faculty: "Education" },
  { name: "Artificial Intelligence", faculty: "Computer Science" },
  { name: "Cybersecurity", faculty: "Computer Science" },
  { name: "Data Science", faculty: "Computer Science" },
  { name: "Biochemistry", faculty: "Natural Sciences" },
  { name: "Geology", faculty: "Natural Sciences" },
  { name: "Environmental Science", faculty: "Natural Sciences" },
  { name: "Sociology", faculty: "Social Sciences" },
  { name: "Psychology", faculty: "Social Sciences" },
  { name: "Political Science", faculty: "Social Sciences" },
  { name: "Agronomy", faculty: "Agriculture" },
  { name: "Horticulture", faculty: "Agriculture" },
  { name: "Soil Science", faculty: "Agriculture" },
  { name: "Environmental Policy", faculty: "Environmental Studies" },
  { name: "Sustainable Development", faculty: "Environmental Studies" },
  { name: "Urban Planning", faculty: "Environmental Studies" },
  { name: "Architectural Design", faculty: "Architecture" },
  { name: "Urban Design", faculty: "Architecture" },
  { name: "Structural Engineering", faculty: "Architecture" },
  { name: "Pure Mathematics", faculty: "Mathematics" },
  { name: "Applied Mathematics", faculty: "Mathematics" },
  { name: "Statistics", faculty: "Mathematics" },
  { name: "Quantum Physics", faculty: "Physics" },
  { name: "Thermodynamics", faculty: "Physics" },
  { name: "Astrophysics", faculty: "Physics" },
  { name: "Organic Chemistry", faculty: "Chemistry" },
  { name: "Inorganic Chemistry", faculty: "Chemistry" },
  { name: "Physical Chemistry", faculty: "Chemistry" },
  { name: "Molecular Biology", faculty: "Biology" },
  { name: "Microbiology", faculty: "Biology" },
  { name: "Genetics", faculty: "Biology" },
  { name: "Nursing Administration", faculty: "Nursing" },
  { name: "Clinical Nursing", faculty: "Nursing" },
  { name: "Community Health Nursing", faculty: "Nursing" },
  { name: "Pharmaceutical Chemistry", faculty: "Pharmacy" },
  { name: "Pharmacology", faculty: "Pharmacy" },
  { name: "Pharmaceutics", faculty: "Pharmacy" },
  { name: "Animal Science", faculty: "Veterinary Medicine" },
  { name: "Veterinary Surgery", faculty: "Veterinary Medicine" },
  { name: "Animal Nutrition", faculty: "Veterinary Medicine" },
  { name: "Journalism", faculty: "Media and Communication" },
  { name: "Public Relations", faculty: "Media and Communication" },
  { name: "Digital Media", faculty: "Media and Communication" },
];

export const academicDepartmentOptions = academicDepartments.map(
  (department) => ({
    value: department.name,
    label: department.name,
  })
);

export const genders = ["Male", "Female", "Others"];

export const genderOption = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const userStatus = ["in-progress", "blocked"];

export const userStatusOptions = userStatus.map((item) => ({
  value: item,
  label: item.toUpperCase(),
}));

export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];
export const semesterRegistrationStatusOptions = semesterRegistrationStatus.map(
  (item) => ({
    value: item,
    label: item,
  })
);

export const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const dayOptions = days.map((day) => ({
  value: day,
  label: day,
}));
