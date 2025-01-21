import { Button, Modal, Pagination, Table, TableColumnsType } from "antd";
import { TCourse, TResponse } from "../../../types";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagmentApi";

export type TTableData = Pick<TCourse, "title" | "code" | "prefix">;

export default function Courses() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
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

  // get all faculty for options
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const facultyOptions = facultyData?.data?.map((option) => ({
    value: option._id,
    label: option.fullName,
  }));

  const [assignFaculties, { isLoading: isChangingStatus }] =
    useAssignFacultiesMutation();

  // !modal query
  const handleClick = (id: string) => {
    setSelectedCourseId(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    const toastId = toast.loading("Assign To...");
    const assignFaculty = {
      courseId: selectedCourseId,
      ...payload,
    };
    try {
      const res = (await assignFaculties(
        assignFaculty
      )) as TResponse<FieldValues>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(`Faculty assign successfully`, {
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
      render: (item) => {
        return (
          <div>
            <Button onClick={() => handleClick(`${item?.key}`)}>
              Assign To
            </Button>
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
      <Modal
        title="Assign Course To Faculty"
        open={isModalOpen}
        confirmLoading={isChangingStatus}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="faculties"
            label="Faculties"
            options={facultyOptions}
            mode="multiple"
          />
          <Button htmlType="submit" loading={isChangingStatus}>
            Submit
          </Button>
        </PHForm>
      </Modal>
    </>
  );
}
