import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam, TRegisteredSemester } from "../../../types";
import { useGetAllRegisteredSemesterQuery } from "../../../redux/features/admin/courseManagementApi";

export type TTableData = Pick<
  TRegisteredSemester,
  "academicSemester" | "status" | "startDate" | "endDate"
>;

export default function RegisteredSemester() {
  //   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: registeredSemesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(undefined);
  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name}-${academicSemester.year}`,
      status,
      startDate,
      endDate,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Actions",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  //* optional
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
}
