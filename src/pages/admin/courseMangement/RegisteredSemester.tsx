import {
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";

import { TRegisteredSemester, TResponse } from "../../../types";
import {
  useAcademicSemesterRegisteredStatusUpdateMutation,
  useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
// import { DownOutlined } from "@ant-design/icons";

export type TTableData = Pick<
  TRegisteredSemester,
  "status" | "startDate" | "endDate"
>;

const items: MenuProps["items"] = [
  {
    label: "UPCOMING",
    key: "UPCOMING",
  },
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "ENDED",
    key: "ENDED",
  },
];

export default function RegisteredSemester() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [academicSemesterRegisteredStatusUpdate] =
    useAcademicSemesterRegisteredStatusUpdateMutation();
  const { data: registeredSemesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name}-${academicSemester?.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusUpdate: MenuProps["onClick"] = async (data) => {
    const toastId = toast.loading("Updating...");
    const updateStatus = {
      id: selectedId,
      status: data.key,
    };
    try {
      const res = (await academicSemesterRegisteredStatusUpdate(
        updateStatus
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(`Successfully ${res.data?.status}  update`, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]} arrow>
            <Space>
              <Button onClick={() => setSelectedId(item.key)}>Update</Button>
              {/* <DownOutlined /> */}
            </Space>
          </Dropdown>
        );
      },
      width: "1%",
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
}
