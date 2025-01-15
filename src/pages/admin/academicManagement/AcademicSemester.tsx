import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagementApi";

interface DataType {
  key?: React.Key;
  _id: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

export default function AcademicSemester() {
  const { data: semesterData } = useGetAllSemesterQuery(undefined);
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }: DataType) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );
  console.log(tableData);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, extra);
  };
  return (
    <Table<DataType>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
