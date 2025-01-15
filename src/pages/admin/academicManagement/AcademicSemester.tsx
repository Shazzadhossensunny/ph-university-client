import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";

export default function AcademicSemester() {
  const data = useGetAllSemesterQuery;
  console.log(data);
  return <div>AcademicSemester</div>;
}
