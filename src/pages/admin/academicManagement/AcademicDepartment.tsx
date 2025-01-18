import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { useState } from "react";
import { TAcademicDepartment, TQueryParam } from "../../../types";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;
// export type TTableData = {
//   key: string;
//   name: string;
//   faculty: string;
// };

export default function AcademicDepartment() {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepartmentQuery(params);
  console.log(departmentData);
  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      faculty: academicFaculty.name,
    })
  );

  // Generate dynamic filters for department names
  // const departmentFilters =
  //   departmentData?.data?.map(({ name }) => ({
  //     text: name,
  //     value: name,
  //   })) || [];

  const departmentFilters = tableData
    ? Array.from(new Set(tableData.map((item) => item.name))).map((name) => ({
        text: name,
        value: name,
      }))
    : [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: departmentFilters,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
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
      console.log(queryPrams);
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
