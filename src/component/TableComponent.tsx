import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FontHeader, FontMedium } from "../style-component/FontComponent";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { WaterCourse } from "../store/slices/waterCourseSlice";
import { Link } from "react-router-dom";

const TableContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const PageContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: end;
  align-items: center;
  padding-right: 1rem;
`;

const Table = styled.table`
  width: 100%;
  height: 5rem;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #efefef;
`;

const TableRow = styled.tr`
  height: 5rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  place-items: center;

`;

const TableCell = styled.td`
  grid-column: span 1;
  text-align: center;
  width: 100%;
  padding: 1rem;
`;

interface TableComponentProps {
  waterCourses: WaterCourse[];
  currentData: WaterCourse[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleDetele: (id: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  waterCourses,
  currentPage,
  setCurrentPage,
  currentData,
  handleDetele,
}) => {
  const pageOptions = Array.from({length: Math.ceil(waterCourses.length / 15)})

  return (
    <TableContainer>
      <PageContainer>
        <FontMedium>จำนวนแถวต่อหน้า:</FontMedium>
        <select
          style={{ padding: `0 0.75rem`, border: `none` }}
          name="page"
          id="page"
          value={currentPage}
          onChange={(e) => setCurrentPage(+e.target.value)}
        >
          {pageOptions.map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
        </select>
        <FontMedium>
          {currentPage > 1 ? (currentPage - 1) * 15 + 1 : 1} -
          {currentPage * 15 < waterCourses.length
            ? currentPage * 15
            : waterCourses.length}{" "}
          จาก {waterCourses.length}
        </FontMedium>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            gap: `0.5rem`,
          }}
        >
          <MdFirstPage
            onClick={() => setCurrentPage(1)}
            cursor={"pointer"}
            size={"1.25rem"}
          />
          <MdNavigateBefore
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage - 1 < 1 ? 1 : prevPage - 1
              )
            }
            cursor={"pointer"}
            size={"1.25rem"}
          />{" "}
          <MdNavigateNext
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage + 1 > Math.ceil(waterCourses.length / 15)
                  ? Math.ceil(waterCourses.length / 15)
                  : prevPage + 1
              )
            }
            cursor={"pointer"}
            size={"1.25rem"}
          />
          <MdLastPage
            onClick={() => {
              setCurrentPage(Math.ceil(waterCourses.length / 15));
            }}
            cursor={"pointer"}
            size={"1.25rem"}
          />
        </div>
      </PageContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <FontHeader>ลำดับ</FontHeader>
            </TableCell>
            <TableCell style={{ gridColumn: `span 2` }}>
              <FontHeader>ชื่อ</FontHeader>
            </TableCell>
            <TableCell>
              <FontHeader>ประเภทอุปสรรค</FontHeader>
            </TableCell>
            <TableCell>
              <FontHeader>วันที่ตั้งแต่</FontHeader>
            </TableCell>
            <TableCell>
              <FontHeader>วันที่ถึง</FontHeader>
            </TableCell>
            <TableCell style={{ gridColumn: `span 2` }}>
              <FontHeader>พิกัด</FontHeader>
            </TableCell>
            <TableCell>
              <FontHeader>สถานะ</FontHeader>
            </TableCell>
            <TableCell>
              <FontHeader>แก้ไข</FontHeader>
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {currentData.map((item, index) => (
            <TableRow key={item.obstacle_id}>
              <TableCell>
                <FontMedium>{index + 1 + (currentPage - 1) * 15}</FontMedium>
              </TableCell>
              <TableCell style={{ gridColumn: `span 2`, textAlign: `start` }}>
                <FontMedium>{item.title}</FontMedium>
              </TableCell>
              <TableCell>
                <FontMedium>{item.obstacle_type_name}</FontMedium>
              </TableCell>
              <TableCell>
                <FontMedium>{item.start_date}</FontMedium>
              </TableCell>
              <TableCell>
                <FontMedium>{item.end_date}</FontMedium>
              </TableCell>
              <TableCell style={{ gridColumn: `span 2`, textAlign: `start` }}>
                <FontMedium>{`
                ${
                  item.province_name !== null ? "จ. " + item.province_name : ""
                } 
                ${item.amphoe_name !== null ? "อ. " + item.amphoe_name : ""} 
                ${item.tambon_name !== null ? "ต. " + item.tambon_name : ""} 
                ${
                  item.mooban_name !== null
                    ? "หมู่บ้าน " + item.mooban_name
                    : ""
                }
                `}</FontMedium>
              </TableCell>
              <TableCell>
                <FontMedium>{item.status}</FontMedium>
              </TableCell>
              <TableCell
                style={{
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  gap: `0.5rem`,
                }}
              >
                <Link to={`/edit/${item.obstacle_id}`}>
                <MdModeEditOutline size={"1.25rem"} color={"#00AB55"} />
                </Link>
                
                <MdDeleteOutline
                  size={"1.25rem"}
                  color={"#FF7F7B"}
                  onClick={() => handleDetele(item.obstacle_id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
