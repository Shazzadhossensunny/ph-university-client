import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagmentApi";

export type TTableData = Pick<
  TStudent,
  "id" | "fullName" | "email" | "contactNo"
>;

export default function StudentData() {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentQuery(params);
  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
      //   filters: [
      //     {
      //       text: "Autumn",
      //       value: "Autumn",
      //     },
      //     {
      //       text: "Summer",
      //       value: "Summer",
      //     },
      //     {
      //       text: "Fall",
      //       value: "Fall",
      //     },
      //   ],
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
    },
    {
      title: "Actions",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", { filters, extra });
    if (extra.action === "filter") {
      const queryPrams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryPrams.push({ name: "name", value: item })
      );
      setParams(queryPrams);
    }
  };
  //* optional
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
