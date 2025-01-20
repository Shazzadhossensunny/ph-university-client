export type TStudent = {
  id: string;
  user: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: TAdmissionSemester;
  isDeleted: boolean;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  _id: string;
  __v: number;
  fullName: string;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

export type TAdmissionSemester = {
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  _id: string;
};

export type TAcademicDepartment = {
  name: string;
  academicFaculty: string;
  _id: string;
};

export type TAcademicFaculty = {
  name: string;
  _id: string;
};

//! admin
export type TAdmin = {
  id: string;
  user: string;
  designation: string;
  name: TAName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
  _id: string;
  __v: number;
  fullName: string;
};

export type TAName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// ! faculty
export type TFaculty = {
  id: string;
  user: string;
  designation: string;
  name: TFName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  _id: string;
  __v: number;
  fullName: string;
};

export type TFName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
