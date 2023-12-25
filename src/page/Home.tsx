import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import {
  WaterCourse,
  deleteData,
  fetchData,
  setEndDate,
  setSearchTerm,
  setSelectedTypeID,
  setStartDate,
  waterCourseSeletor,
} from "../store/slices/waterCourseSlice";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTermLocal] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
    setReload(false);
  }, [dispatch, reload]);

  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, [dispatch, searchTerm]);

  const handleChangeFilterType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSelectedTypeID(Number(event.target.value)));
  };

  const handleChangeFilterStartDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setStartDate(new Date(event.target.value)));
  };

  const handleChangeFilterEndDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setEndDate(new Date(event.target.value)))
  }

  const handleResetFilter = () => {
    setSearchTermLocal('')
    dispatch(setSearchTerm(''));
    dispatch(setSelectedTypeID(Number(0)));
    dispatch(setStartDate(new Date()));
    dispatch(setStartDate(new Date()));
  }

  const getPaginatedData = (pageNumber: number) => {
    const pageSize = 15;
    const maxPage = Math.ceil(waterCourses.length / pageSize);

    if (pageNumber <= 0) {
      return waterCourses.slice(0, pageSize);
    }

    if (pageNumber > maxPage) {
      return waterCourses.slice((maxPage - 1) * pageSize, maxPage * pageSize);
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return waterCourses.slice(startIndex, endIndex);
  };

  const currentData = getPaginatedData(currentPage);

  const handleDetele = (id: number) => {
    const isFoundID = waterCourses.some((item) => item.obstacle_id === id);

    if (isFoundID) {
      if (window.confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
        dispatch(deleteData(id));
        setReload(true);
      }
    } else {
      alert("ไม่พบรายการที่ต้องการลบในฐานข้อมูล");
    }
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTermLocal(e.target.value)}
          />
        </div>
        <div style={{ gridColumn: `span 1` }}>
          <InputContainerConmponent>
            <InputLabel>ประเภทอุปสรรค</InputLabel>
            <Select name="" id="" onChange={handleChangeFilterType}>
              <option value="0">ทั้งหมด</option>
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
            value={undefined}
            onChange={handleChangeFilterStartDate}
          />
        </div>
        <div style={{ gridColumn: `span 1` }}>
          <InputComponent
            type="date"
            name="enddate"
            id="enddate"
            inputname={"วันที่ ถึง"}
            value={undefined}
            onChange={handleChangeFilterEndDate}
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
            onClick={handleResetFilter}
          >
            Clear
          </button>
        </div>
      </FilterContainer>
      <TableComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        waterCourses={waterCourses}
        currentData={currentData}
        handleDetele={handleDetele}
      />
    </>
  );
};

export default Home;
