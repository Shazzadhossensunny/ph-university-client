import { useGetAllSemesterQuery } from "../../../redux/features/academicSemister/academicSemisterApi";

export default function AcademicSemester() {
  const { data } = useGetAllSemesterQuery({});
  console.log(data);
  return <div>AcademicSemester</div>;
}
