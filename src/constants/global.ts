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
