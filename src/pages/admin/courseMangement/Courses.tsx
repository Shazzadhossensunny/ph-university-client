import { Button, Table, TableColumnsType } from "antd";
import { TCourse } from "../../../types";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi";

export type TTableData = Pick<TCourse, "title" | "code" | "prefix">;

export default function Courses() {
  const { data: courseData, isFetching } = useGetAllCoursesQuery(undefined);
  const tableData = courseData?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code,
    prefix,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
    },
    {
      title: "Actions",
      render: () => {
        return (
          <div>
            <Button>Assign</Button>
          </div>
        );
      },
      width: "1%",
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
}
