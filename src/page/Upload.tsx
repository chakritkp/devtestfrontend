import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
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
import { Link } from "react-router-dom";
import GoogleMapComponent from "../component/GoogleMapComponent ";
import {
  createData,
  waterCourseSeletor,
} from "../store/slices/waterCourseSlice";
import { useSelector } from "react-redux";
// import { ThailandDatabase } from "../json/raw_database.json";

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #fafbfd;
`;

const FormLeft = styled.div`
  width: 50%;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const FormRight = styled.div`
  width: 50%;
  background-color: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 1rem;
`;

interface prevFormData {
  obstacle_id: number;
  status: number;
  obstacle_type_id: number;
  start_date: Date;
  create_date: Date;
  end_date: Date;
  title: string;
  note: string;
  mooban_name: string;
  mooban_code: number;
  tambon_name: string;
  tambon_code: number;
  amphoe_name: string | string[];
  amphoe_code: number;
  province_name: string | string[];
  province_code: number;
  latitude: number;
  longitude: number;
}

const Upload: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tambonValue, setTambonValue] = useState<string>("");
  const [thailandDatabase, setThailandDatabase] = useState<object[]>([
    {
      district: "",
    },
  ]);
  const dispatch = useAppDispatch();
  const waterCourses = useSelector(waterCourseSeletor);

  // const Database: object[] = ThailandDatabase;

  const Database: object[] = [
    {
      district: "คลองท่อมเหนือ",
      amphoe: "คลองท่อม",
      province: "กระบี่",
      zipcode: 81120,
      district_code: 810402,
      amphoe_code: 8104,
      province_code: 81,
    },
    {
      district: "คลองท่อมใต้",
      amphoe: "คลองท่อม",
      province: "กระบี่",
      zipcode: 81120,
      district_code: 810401,
      amphoe_code: 8104,
      province_code: 81,
    },
    {
      district: "คลองพน",
      amphoe: "คลองท่อม",
      province: "กระบี่",
      zipcode: 81170,
      district_code: 810403,
      amphoe_code: 8104,
      province_code: 81,
    },
  ];

  const [prevFormData, setPrevFormData] = useState<prevFormData>({
    obstacle_id: 0,
    status: 1,
    obstacle_type_id: 0,
    start_date: new Date(),
    create_date: new Date(),
    end_date: new Date(),
    title: "",
    note: "",
    mooban_name: "",
    mooban_code: 0,
    tambon_name: "",
    tambon_code: 0,
    amphoe_name: "",
    amphoe_code: 0,
    province_name: "",
    province_code: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    console.log(searchText)
    if (searchText === "") {
      setThailandDatabase([]);
    } else {
      const filteredTambon = Database.filter((item) =>
        item.district.includes(searchText)
      );
      setThailandDatabase(filteredTambon);
    }
  }, [searchText]);

  const handleSelect = (value: string) => {
    console.log(thailandDatabase);

    const filteredData = thailandDatabase.filter(
      (item) => item.district === value
    );

    console.log(filteredData);

    setPrevFormData((prev: prevFormData) => ({
      ...prev,
      tambon_name: value,
      tambon_code: filteredData[0].district_code,
      amphoe_name: filteredData[0].amphoe,
      amphoe_code: filteredData[0].amphoe_code,
      province_name: filteredData[0].province,
      province_code: filteredData[0].province_code,
    }));
    setSearchText("");
    // const filteredAmphoe = thailandDatabase
    //   .filter((item) => item.district === value)
    //   .map((item) => item.amphoe);

    // const filteredProvinces = thailandDatabase
    //   .filter((item) => item.district === value)
    //   .map((item) => item.province);

    // setPrevFormData((prev: prevFormData) => ({
    //   ...prev,
    //   tambon_name: value,
    //   amphoe_name: filteredAmphoe,
    //   province_name: filteredProvinces,
    // }));
    // setSearchText(value);
  };

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

  console.log(prevFormData);

  const handleSubmit = () => {
    dispatch(createData(prevFormData));
  };

  return (
    <>
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
          <ButtonComponent type={"primary"} onClick={handleSubmit}>
            <FaSave size={"1rem"} />
            บันทึก
          </ButtonComponent>
        </div>
      </HeaderContainer>

      <FormContainer action="" method="post">
        <FormLeft>
          <Row>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="obstacle_id"
                id=""
                placeholder=""
                inputname={"หมายเลขรหัส"}
                onChange={handleInputChange}
                value={prevFormData.obstacle_id}
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>สถานะ *</InputLabel>
                <Select name="status" onChange={handleInputChange}>
                  <option value="0">ยังพบอุปสรรค</option>
                  <option value="1">ไม่พบอุปสรรค</option>
                </Select>
              </InputContainerConmponent>
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>ประเภทอุปสรรค *</InputLabel>
                <Select name="obstacle_type_id" onChange={handleInputChange}>
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
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="date"
                name="end_date"
                inputname={"วันที่ ถึง *"}
                onChange={handleInputChange}
              />
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 9` }}>
              <InputContainerConmponent>
                <InputLabel>ชื่อ *</InputLabel>
                <TextArea name="title" onChange={handleInputChange} />
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
                id=""
                placeholder=""
                inputname={"หมู่บ้าน *"}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="tambon_name"
                id=""
                placeholder=""
                inputname={"ตำบล *"}
                onChange={(e) => setSearchText(e.target.value)}
                value={
                  prevFormData.tambon_name === ""
                    ? undefined
                    : prevFormData.tambon_name
                }
              />
              <div
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
                    width: `100%`
                  }}
                >
                  {thailandDatabase
                    .filter((item) => item.district.includes(searchText))
                    .map((item) => (
                      <li
                        key={item.district_code}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelect(item.district)}
                      >
                        {item.district}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </Row>
          <Row style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="amphoe_name"
                id=""
                placeholder=""
                inputname={"อำเภอ *"}
                onChange={handleInputChange}
                value={prevFormData.amphoe_name}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="mooban_name"
                id=""
                placeholder=""
                inputname={"จังหวัด"}
                onChange={handleInputChange}
                value={prevFormData.province_name}
              />
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="latitude"
                id=""
                placeholder=""
                inputname={"ละติจูด"}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="longitude"
                id=""
                placeholder=""
                inputname={"ลองจิจูด"}
                onChange={handleInputChange}
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
                  color={"#00AB55"}
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
    </>
  );
};

export default Upload;
