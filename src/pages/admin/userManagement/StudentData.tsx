import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import {
  useChangeUserStatusMutation,
  useGetAllStudentQuery,
} from "../../../redux/features/admin/userManagmentApi";
import { Link } from "react-router";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { userStatusOptions } from "../../../constants/global";
import { toast } from "sonner";

export type TTableData = Pick<
  TStudent,
  "id" | "fullName" | "email" | "contactNo"
>;

export default function StudentData() {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(
    ({ _id, id, fullName, user, email, contactNo }) => ({
      key: _id,
      id,
      fullName,
      email,
      contactNo,
      user,
    })
  );

  const [changeUserStatus, { isLoading: isChangingStatus }] =
    useChangeUserStatusMutation();

  const handleClick = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    const toastId = toast.loading("Status...");
    const changeStatus = {
      id: selectedUserId,
      ...payload,
    };

    try {
      const res = await changeUserStatus(changeStatus).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(`Student ${payload.status} successfully`, {
          id: toastId,
          duration: 2000,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No.",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      //   showSorterTooltip: { target: "full-header" },
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
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/students/${item?.key}`}>
              <Button>Update</Button>
            </Link>
            <Button onClick={() => handleClick(`${item?.user?._id}`)}>
              Block
            </Button>
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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
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
      <Modal
        title="Change User Status"
        open={isModalOpen}
        confirmLoading={isChangingStatus}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect name="status" label="Status" options={userStatusOptions} />
          <Button htmlType="submit" loading={isChangingStatus}>
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
}
