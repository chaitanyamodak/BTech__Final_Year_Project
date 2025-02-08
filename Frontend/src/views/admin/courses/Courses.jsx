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

const Courses = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "courseName",
      },
      {
        Header: "Course Code",
        accessor: "courseCode",
      },
      {
        Header: "Maximum Marks",
        accessor: "maximumMarks",
      },
      {
        Header: "Created At",
        accessor: "formattedCreatedAt",
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

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/course/get-courses-by-faculty")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card extra={"w-full mt-12 h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Courses added previously
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
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="text-sm font-bold text-navy-700 dark:text-white pt-5"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Courses;
