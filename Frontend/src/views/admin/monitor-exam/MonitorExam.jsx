import React, { useState, useEffect, useMemo } from "react";
import Card from "../../../components/Card/Card";
import CardMenu from "../../../components/CardMenu/CardMenu";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import SubmissionModal from "../../../components/Modal/SubmissionModal";

const MonitorExam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const { examcode } = useParams();
  console.log(examcode);

  const handleViewSubmission = (prn) => {
    setOpen(true);
    console.log("Student id ", prn);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          `/monitor/view-exam-submission/${examcode}/${prn}`
      )
      .then(({ data }) => {
        console.log(data);
        setCode(data.resultCode);
        setOutput(data.resultOutput);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "studentName",
      },
      {
        Header: "PRN",
        accessor: "studentPrn",
      },
      {
        Header: "Start Time",
        accessor: "startTime",
      },
      {
        Header: "Tab Change",
        accessor: "tabChangeCount",
      },
      {
        Header: "Copy Paste",
        accessor: "copyPasteCount",
      },
      {
        Header: "Hardware Detected",
        accessor: "hardwareDetectedCount",
      },
      {
        Header: "Submission Status",
        accessor: "submissionStatus",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const fetchData = () => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3000/exam/get-exam-by-code/${examcode}`)
      .then((res) => {
        console.log(res.data.exam.monitoringData);
        setData(res.data.exam.monitoringData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card extra={"w-full mt-12 h-full p-4 sm:overflow-x-auto"}>
      <SubmissionModal open={open} onClose={() => setOpen(false)}>
        {/* Content of your modal */}
        <div className="text-center w-full z-50 flex justify-center items-center flex-col mt-16">
          <h3 className="text-lg font-black text-gray-800 mt-10">
            Student Submission
          </h3>
          <div className="mx-auto pt-5 w-full grid grid-cols-2 justify-between items-start">
            <div className="text-lg font-black text-gray-800 border-r-2 border-gray-700 ">
              <h3>Code</h3>
              <pre className="text-md text-gray-800 font-semibold text-start">
                {code}
              </pre>
            </div>
            <div className="text-lg font-black text-gray-800">
              <h3>Output</h3>
              <pre className="text-md text-gray-900 font-semibold text-start">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </SubmissionModal>
      <div className="relative flex items-center justify-between">
        <div className="flex justify-center items-center space-x-6">
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            Students appearing for the exam
          </p>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 bg-blueSecondary text-white rounded-md shadow-md font-semibold"
          >
            {loading ? (
              <ThreeDots
                visible={true}
                height="24"
                width="100"
                color="#F4F7FE"
                radius="2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Refresh Data"
            )}
          </button>
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr className="my-2" {...row.getRowProps} key={index}>
                  {row.cells.map((cell) => {
                    let data = "";
                    if (cell.column.Header === "Start Time") {
                      if (cell.value) {
                        let starttime = new Date(cell.value);
                        starttime = starttime.toLocaleTimeString();
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {starttime || "Not Started"}
                          </p>
                        );
                      } else {
                        data = (
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value || "Not Started"}
                          </p>
                        );
                      }
                    } else if (cell.column.Header === "Submission Status") {
                      data = (
                        <div className="flex items-center gap-1">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === true ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : (
                              <MdCancel className="text-red-500" />
                            )}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value === true ? "Submitted" : "Pending"}
                          </p>
                          {cell.value === true && ( // Check if submission status is true
                            <button
                              className="ml-2 px-2 py-1 bg-blueSecondary text-white rounded-md shadow-md font-semibold"
                              onClick={() =>
                                handleViewSubmission(row.original.studentPrn)
                              }
                            >
                              View Submission
                            </button>
                          )}
                        </div>
                      );
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-sm font-bold text-navy-700 dark:text-white pt-5"
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MonitorExam;
