import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputComponent, {
  InputContainerConmponent,
  InputLabel,
  Select,
  TextArea,
} from "../style-component/InputComponent";
import { FormLeft, FormRight, Row } from "./Upload";
import { FontTitle } from "../style-component/FontComponent";
import { MdModeEditOutline } from "react-icons/md";
import { HeaderContainer } from "./Home";
import { IoIosCloseCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import GoogleMapComponent from "../component/GoogleMapComponent ";
import { MdAddLocationAlt } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import {
  fetchSelectData,
  waterCoursefindSeletor,
} from "../store/slices/waterCoursefindSlice";
import ButtonComponent from "../style-component/ButtonComponent";
import { editData } from "../store/slices/waterCourseSlice";

const UpdateForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #fafbfd;
`;

const Edit: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const waterCoursefind = useSelector(waterCoursefindSeletor);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const [prevFormData, setPrevFormData] = useState({
    obstacle_id: 0,
    obstacle_type_id: 0,
    title: "",
    start_date: new Date(),
    obstacle_status: 0,
    latitude: 0,
    longitude: 0,
    note: "",
    status: 0,
    create_by: null,
    create_date: null,
    update_by: "",
    update_date: new Date(),
    delete_by: "",
    delete_date: null,
    end_date: new Date(),
    province_name: "",
    amphoe_name: "",
    tambon_name: "",
    mooban_name: "",
    province_code: 0,
    amphoe_code: 0,
    tambon_code: 0,
    mooban_code: 0,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSelectData(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (waterCoursefind) {
      setPrevFormData({
        obstacle_id: waterCoursefind.obstacle_id || 0,
        obstacle_type_id: waterCoursefind.obstacle_status || 0,
        title: waterCoursefind.title || "",
        start_date:
          waterCoursefind.start_date.toString().split("T")[0] || new Date(),
        obstacle_status: waterCoursefind.obstacle_status || 0,
        latitude: waterCoursefind.latitude || 0,
        longitude: waterCoursefind.longitude || 0,
        note: waterCoursefind.note || "",
        status: waterCoursefind.status || 0,
        create_by: null,
        create_date: null,
        update_by: waterCoursefind.update_by || "",
        update_date: new Date(),
        delete_by: waterCoursefind.delete_by || "",
        delete_date: null,
        end_date:
          waterCoursefind.end_date.toString().split("T")[0] || new Date(),
        province_name: waterCoursefind.province_name || "",
        amphoe_name: waterCoursefind.amphoe_name || "",
        tambon_name: waterCoursefind.tambon_name || "",
        mooban_name: waterCoursefind.mooban_name || "",
        province_code: waterCoursefind.province_code || 0,
        amphoe_code: waterCoursefind.amphoe_code || 0,
        tambon_code: waterCoursefind.tambon_code || 0,
        mooban_code: waterCoursefind.mooban_code || 0,
      });
    }
  }, [waterCoursefind]);

  const handleChange = (
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

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      obstacle_id,
      obstacle_type_id,
      title,
      start_date,
      obstacle_status,
      latitude,
      longitude,
      note,
      status,
      create_by,
      create_date,
      update_by,
      end_date,
      province_name,
      amphoe_name,
      tambon_name,
      mooban_name,
      province_code,
      amphoe_code,
      tambon_code,
      mooban_code,
    } = prevFormData;

    if (
      obstacle_id !== 0 &&
      obstacle_type_id !== 0 &&
      title !== "" &&
      province_name !== "" &&
      amphoe_name !== "" &&
      tambon_name !== ""
    ) {
      const updateData = {
        id: obstacle_id,
        data: {
          obstacle_type_id,
          title,
          start_date: new Date(start_date),
          obstacle_status,
          latitude,
          longitude,
          note,
          status,
          create_by,
          create_date,
          update_by,
          update_date: new Date(),
          end_date: new Date(end_date),
          province_name,
          amphoe_name,
          tambon_name,
          mooban_name,
          province_code,
          amphoe_code,
          tambon_code,
          mooban_code,
        },
      };

      dispatch(editData({ id: updateData.id, data: updateData.data }));

      alert("บันทึกเสร็จสิ้น");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      alert("โปรดกรอกข้อมูลให้ครบทุกช่อง");
    }
  };

  return (
    <form method="patch" onSubmit={handleEdit}>
      <HeaderContainer>
        <FontTitle>อัพเดทข้อมูล</FontTitle>
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
            <MdModeEditOutline size={"1.25rem"} color={"#FFF"} />
            บันทึก
          </ButtonComponent>
        </div>
      </HeaderContainer>
      <UpdateForm>
        <FormLeft>
          <Row>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type={"number"}
                inputname={"หมายเลขรหัส"}
                value={prevFormData.obstacle_id}
                disabled
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>สถานะ</InputLabel>
                <Select
                  name="status"
                  onChange={handleChange}
                  value={prevFormData.status}
                >
                  <option value="0">ยังพบอุปสรรค</option>
                  <option value="1">ไม่พบอุปสรรค</option>
                </Select>
              </InputContainerConmponent>
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputContainerConmponent>
                <InputLabel>ประเภทอุปสรรค</InputLabel>
                <Select
                  name="obstacle_type_id"
                  onChange={handleChange}
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
          <Row style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="date"
                name="start_date"
                inputname={"วันที่ ตั้งแต่"}
                onChange={handleChange}
                value={String(prevFormData.start_date)}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                name="end_date"
                type="date"
                inputname={"วันที่ ถึง"}
                onChange={handleChange}
                value={String(prevFormData.end_date)}
              />
            </div>
          </Row>
          <Row>
            <div style={{ gridColumn: `span 9` }}>
              <InputContainerConmponent>
                <InputLabel>ชื่อ</InputLabel>
                <TextArea
                  name="title"
                  value={prevFormData.title}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  name="note"
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
                inputname={"จังหวัด"}
                onChange={handleChange}
                value={prevFormData.province_name}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="amphoe_name"
                inputname={"อำเภอ *"}
                onChange={handleChange}
                value={prevFormData.amphoe_name}
              />
            </div>
          </Row>
          <Row style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="tambon_name"
                inputname={"ตำบล *"}
                onChange={handleChange}
                value={prevFormData.tambon_name}
              />
            </div>
            <div style={{ gridColumn: `span 4` }}>
              <InputComponent
                type="text"
                name="mooban_name"
                inputname={"หมู่บ้าน *"}
                onChange={handleChange}
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
                onChange={handleChange}
                value={prevFormData.latitude}
              />
            </div>
            <div style={{ gridColumn: `span 3` }}>
              <InputComponent
                type="number"
                name="longitude"
                inputname={"ลองจิจูด"}
                onChange={handleChange}
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
      </UpdateForm>
      {isOpen ? <GoogleMapComponent /> : null}
    </form>
  );
};

export default Edit;
