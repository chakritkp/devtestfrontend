import React, { useEffect } from "react";
import {
  fetchData,
  waterCourseSeletor,
} from "../store/slices/waterCourseSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputComponent, {
  InputContainerConmponent,
  InputLabel,
  Select,
} from "../style-component/InputComponent";
import { FontTitle } from "../style-component/FontComponent";
import TableComponent from "../component/TableComponent";
import ButtonComponent from "../style-component/ButtonComponent";
import { IoMdAdd } from "react-icons/io";
import { useAppDispatch } from "../store/store";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border-bottom: 3px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterContainer = styled.div`
  width: 100%;
  padding: 2rem 1.5rem 1rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 1rem;
  align-items: end;
  border-bottom: 1px solid #e0e0e0;
`;

const Home: React.FC = () => {
  const waterCourses = useSelector(waterCourseSeletor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <HeaderContainer>
        <FontTitle>รายการอุปสรรคเส้นทาง</FontTitle>
        <Link style={{ textDecoration: "none" }} to={"/upload"}>
          <ButtonComponent type={"success"}>
            <IoMdAdd size={"1rem"} /> เพิ่ม
          </ButtonComponent>
        </Link>
      </HeaderContainer>
      <FilterContainer>
        <div style={{ gridColumn: `span 6` }}>
          <InputComponent
            type="text"
            name="filter"
            id=""
            placeholder="ค้นหาชื่อหรือประเภทอุปสรรค..."
            inputname={"ค้นหา"}
          />
        </div>
        <div style={{ gridColumn: `span 1` }}>
          <InputContainerConmponent>
            <InputLabel>ประเภทอุปสรรค</InputLabel>
            <Select name="" id="">
              <option defaultValue={""}>ทั้งหมด</option>
              <option value="1">น้ำท่วมถนน</option>
              <option value="2">สะพานขาด</option>
              <option value="3">ถนนขาด</option>
              <option value="4">ดินถล่ม</option>
            </Select>
          </InputContainerConmponent>
        </div>
        <div style={{ gridColumn: `span 1` }}>
          <InputComponent
            type="date"
            name="startdate"
            id="startdate"
            inputname={"วันที่ ตั้งแต่"}
          />
        </div>
        <div style={{ gridColumn: `span 1` }}>
          <InputComponent
            type="date"
            name="enddate"
            id="enddate"
            inputname={"วันที่ ถึง"}
          />
        </div>
        <div
          style={{
            gridColumn: `span 1`,
            display: `flex`,
            justifyContent: `center`,
            paddingBottom: `0.5rem`,
          }}
        >
          <button
            style={{
              backgroundColor: `transparent`,
              border: `none`,
              color: `#00AB55`,
              fontSize: `0.75rem`,
              fontWeight: `700`,
            }}
          >
            Clear
          </button>
        </div>
      </FilterContainer>
      <TableComponent />
    </>
  );
};

export default Home;
