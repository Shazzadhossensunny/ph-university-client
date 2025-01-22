import { useGetMyOfferedCourseQuery } from "../../redux/features/student/courseApi";

export default function OfferedCourse() {
  const { data } = useGetMyOfferedCourseQuery(undefined);
  console.log(data);
  return <div>OfferedCourse</div>;
}
