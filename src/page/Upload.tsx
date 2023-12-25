import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderContainer } from "./Home";
import InputComponent, {
  InputContainerConmponent,
  InputLabel,
  Select,
  TextArea,
} from "../style-component/InputComponent";
import { FontTitle } from "../style-component/FontComponent";
import ButtonComponent from "../style-component/ButtonComponent";
import { IoArrowBack } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import { MdAddLocationAlt } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import GoogleMapComponent from "../component/GoogleMapComponent ";
import {
  createData,
  fetchData,
  waterCourseSeletor,
} from "../store/slices/waterCourseSlice";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #fafbfd;
`;

export const FormLeft = styled.div`
  width: 50%;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const FormRight = styled.div`
  width: 50%;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 1rem;
`;

const Upload: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const waterCourses = useSelector(waterCourseSeletor);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [searchText, setSearchText] = useState<string>("");
  // const [thailandDatabase, setThailandDatabase] = useState<object[]>([
  //   {
  //     district: "",
  //   },
  // ]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const existingIds = waterCourses.map((item) => item.obstacle_id);

  const missingIds = [];
  for (let i = 1; i <= existingIds[existingIds.length - 1]; i++) {
    if (!existingIds.includes(i)) {
      missingIds.push(i);
    }
  }

  const [prevFormData, setPrevFormData] = useState({
    obstacle_id: existingIds[existingIds.length - 1] + 1,
    obstacle_type_id: 0,
    title: "",
    start_date: new Date(),
    obstacle_status: 0,
    latitude: 0,
    longitude: 0,
    note: "",
    status: 0,
    create_by: "",
    create_date: new Date(),
    end_date: new Date(),
    province_name: "",
    amphoe_name: "",
    tambon_name: "",
    mooban_name: "",
    // province_code: 0,
    // amphoe_code: 0,
    // tambon_code: 0,
    // mooban_code: 0,
  });

  // const uniqueProvinces = [...new Set(Database.map((item) => item.province))];
  // const uniqueDatabase = uniqueProvinces.map((province) => ({
  //   province,
  //   amphoe: Database.filter((item) => item.province === province),
  // }));

  // useEffect(() => {
  //   if (searchText === "") {
  //     setThailandDatabase([]);
  //   } else {
  //     const filteredProvince = uniqueDatabase.filter((item) =>
  //       item.province.includes(searchText)
  //     );
  //     console.log(filteredProvince);
  //     setThailandDatabase(filteredProvince);
  //   }
  // }, [searchText]);

  // const handleSelect = (value: string) => {
  //   console.log(thailandDatabase);

  //   const filteredData: any[] = thailandDatabase.filter(
  //     (item) => item.district === value
  //   );

  //   console.log(filteredData);

  //   setPrevFormData((prev: prevFormData) => ({
  //     ...prev,
  //     tambon_name: value,
  //     tambon_code: filteredData[0].district_code,
  //     amphoe_name: filteredData[0].amphoe,
  //     amphoe_code: filteredData[0].amphoe_code,
  //     province_name: filteredData[0].province,
  //     province_code: filteredData[0].province_code,
  //   }));
  //   setSearchText("");
  // };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setPrevFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      obstacle_id,
      obstacle_type_id,
      title,
      province_name,
      amphoe_name,
      tambon_name,
    } = prevFormData;

    if (
      obstacle_id !== 0 &&
      obstacle_type_id !== 0 &&
      title !== "" &&
      province_name !== "" &&
      amphoe_name !== "" &&
      tambon_name !== ""
    ) {
      dispatch(createData(prevFormData));
      alert("บันทึกเสร็จสิ้น");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      <HeaderContainer>
        <FontTitle>บันทึกอุปสรรคเส้นทาง</FontTitle>
        <div
          style={{
            display: "flex",
            justifyContent: `center`,
            alignItems: `center`,
            gap: `1rem`,
          }}
        >
          <Link to={"/"}>
            <IoArrowBack size={"1.5rem"} color={"#2869CE"} />
          </Link>
          <ButtonComponent color={"primary"} type="submit">
            <FaSave size={"1rem"} />
            บันทึก
          </ButtonComponent>
        </div>
      </HeaderContainer>

      <FormContainer>
        <FormLeft>
          <Row>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="obstacle_id"
                inputname={"หมายเลขรหัส"}
                onChange={handleInputChange}
                value={prevFormData.obstacle_id}
                disabled
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>สถานะ *</InputLabel>
                <Select
                  name="status"
                  required
                  onChange={handleInputChange}
                  value={prevFormData.status}
                >
                  <option value="0">ยังพบอุปสรรค</option>
                  <option value="1">ไม่พบอุปสรรค</option>
                </Select>
              </InputContainerConmponent>
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>ประเภทอุปสรรค *</InputLabel>
                <Select
                  name="obstacle_type_id"
                  required
                  onChange={handleInputChange}
                  value={prevFormData.obstacle_type_id}
                >
                  <option value="0"></option>
                  <option value="1">น้ำท่วมถนน</option>
                  <option value="2">สะพานขาด</option>
                  <option value="3">ถนนขาด</option>
                  <option value="4">ดินถล่ม</option>
                </Select>
              </InputContainerConmponent>
            </div>
          </Row>
          <Row
            style={{ gridTemplateColumns: `repeat(8, 1fr)`, gridGap: `0.5rem` }}
          >
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="date"
                name="start_date"
                inputname={"วันที่ ตั้งแต่ *"}
                placeholder="เลือกวัน"
                onChange={handleInputChange}
                required
                value={undefined}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="date"
                name="end_date"
                inputname={"วันที่ ถึง *"}
                onChange={handleInputChange}
                value={undefined}
              />
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 9` }}>
              <InputContainerConmponent>
                <InputLabel>ชื่อ *</InputLabel>
                <TextArea
                  name="title"
                  required
                  onChange={handleInputChange}
                  value={prevFormData.title}
                />
              </InputContainerConmponent>
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 9` }}>
              <InputContainerConmponent>
                <InputLabel>หมายเหตุ</InputLabel>
                <TextArea
                  style={{ height: `120px` }}
                  name="note"
                  onChange={handleInputChange}
                  value={prevFormData.note}
                />
              </InputContainerConmponent>
            </div>
          </Row>
        </FormLeft>

        <FormRight>
          <h3>พื้นที่/พิกัด</h3>
          <Row style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="province_name"
                inputname={"จังหวัด *"}
                required
                // onChange={(e) => setSearchText(e.target.value)}
                onChange={handleInputChange}
                value={prevFormData.province_name}
              />
              {/* <div
                style={{
                  position: `relative`,
                }}
              >
                <ul
                  style={{
                    backgroundColor: `#FFF`,
                    position: `absolute`,
                    zIndex: `99`,
                    top: `0`,
                    marginBlock: `0`,
                    width: `100%`,
                  }}
                >
                  {thailandDatabase.map((item) => (
                    <li
                      style={{ cursor: "pointer" }}
                      // onClick={() => handleSelect()}
                    >
                      {item.province}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
            <div style={{ gridColumn: `span 4` }}>
              {/* <InputContainerConmponent>
                <InputLabel>อำเภอ *</InputLabel>
                <Select
                  name="amphoe_name"
                  onChange={handleInputChange}
                ></Select>
              </InputContainerConmponent> */}
              <InputComponent
                type="text"
                name="amphoe_name"
                inputname={"อำเภอ *"}
                required
                onChange={handleInputChange}
                value={prevFormData.amphoe_name}
              />
            </div>
          </Row>
          <Row style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
            <div style={{ gridColumn: `span 4` }}>
              {/* <InputContainerConmponent>
                <InputLabel>ตำบล *</InputLabel>
                <Select
                  name="tambon_name"
                  onChange={handleInputChange}
                ></Select>
              </InputContainerConmponent> */}
              <InputComponent
                type="text"
                name="tambon_name"
                inputname={"ตำบล *"}
                required
                onChange={handleInputChange}
                value={prevFormData.tambon_name}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="mooban_name"
                inputname={"หมู่บ้าน"}
                onChange={handleInputChange}
                value={prevFormData.mooban_name}
              />
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="latitude"
                inputname={"ละติจูด"}
                onChange={handleInputChange}
                value={prevFormData.latitude}
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="longitude"
                inputname={"ลองจิจูด"}
                onChange={handleInputChange}
                value={prevFormData.longitude}
              />
            </div>

            {isOpen ? (
              <div
                style={{
                  gridColumn: `span 3`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                <IoIosCloseCircle
                  style={{ cursor: `pointer` }}
                  size={"1.5rem"}
                  color={"#ff0000"}
                  onClick={() => setIsOpen(false)}
                />
              </div>
            ) : (
              <div
                style={{
                  gridColumn: `span 3`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                <MdAddLocationAlt
                  style={{ cursor: `pointer` }}
                  size={"1.5rem"}
                  color={"#00AB55"}
                  onClick={() => setIsOpen(true)}
                />
              </div>
            )}
          </Row>
        </FormRight>
      </FormContainer>
      {isOpen ? <GoogleMapComponent /> : null}
    </form>
  );
};

export default Upload;
