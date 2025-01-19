import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";

export type TTableData = Pick<TAcademicFaculty, "name">;

export default function AcademicFaculties() {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultiesQuery(params);

  const tableData = facultyData?.data?.map(({ _id, name }, index: number) => ({
    key: _id,
    name,
    SL: index + 1,
  }));

  // Generate dynamic filters for the "Name" column
  const nameFilters =
    facultyData?.data?.map(({ name }) => ({
      text: name,
      value: name,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "SL",
      dataIndex: "SL",
    },
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: nameFilters,
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
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
