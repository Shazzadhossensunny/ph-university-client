import { Button, Pagination, Table, TableColumnsType } from "antd";
import { TCourse } from "../../../types";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";

export type TTableData = Pick<TCourse, "title" | "code" | "prefix">;

export default function Courses() {
  const [page, setPage] = useState(1);
  const { data: courseData, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);
  const metaData = courseData?.meta;
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
            <Button>Assign To</Button>
          </div>
        );
      },
      width: "1%",
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: "15px" }}
        align="end"
        current={page}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
        total={metaData?.totalPage}
      />
    </>
  );
}
