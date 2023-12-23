import React from "react";
import styled from "styled-components";
import { FontHeader, FontMedium } from "../style-component/FontComponent";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLastPage } from "react-icons/md";

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
`;

const TableComponent: React.FC = () => {
  return (
    <TableContainer>
      <PageContainer>
        <FontMedium>จำนวนแถวต่อหน้า:</FontMedium>
        <select
          style={{ padding: `0 0.75rem`, border: `none` }}
          name="page"
          id="page"
        >
          <option value=""></option>
          <option value="1">1</option>
        </select>
        <FontMedium>1-15 จาก 29</FontMedium>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            gap: `0.5rem`,
          }}
        >
          <MdFirstPage size={"1.25rem"} />
          <MdNavigateBefore size={"1.25rem"} />{" "}
          <MdNavigateNext size={"1.25rem"} />
          <MdLastPage size={"1.25rem"} />
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
          <TableRow>
            <TableCell>
              <FontMedium>1</FontMedium>
            </TableCell>
            <TableCell style={{ gridColumn: `span 2`, textAlign: `start` }}>
              <FontMedium>title</FontMedium>
            </TableCell>
            <TableCell>
              <FontMedium>น้ำท่วมถนน</FontMedium>
            </TableCell>
            <TableCell>
              <FontMedium>start date</FontMedium>
            </TableCell>
            <TableCell>
              <FontMedium>end date</FontMedium>
            </TableCell>
            <TableCell style={{ gridColumn: `span 2`, textAlign: `start` }}>
              <FontMedium>position</FontMedium>
            </TableCell>
            <TableCell>
              <FontMedium>status</FontMedium>
            </TableCell>
            <TableCell
              style={{
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                gap: `0.5rem`,
              }}
            >
              <MdModeEditOutline size={"1.25rem"} color={"#00AB55"} />
              <MdDeleteOutline size={"1.25rem"} color={"#FF7F7B"} />
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
