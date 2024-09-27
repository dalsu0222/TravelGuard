import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as D from "../styles/DetailPageStyle";
import { usePermissionEnterData } from "../utils/hooks/usePermissionEnterData";
import {
  CountryData,
  PermissionData,
  EmbassyData,
} from "../utils/types/countryTypes";
import Modal from "../components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faPaperclip,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = import.meta.env.VITE_API_KEY_SAFE;

const fetchCountryData = async (country_nm: string) => {
  try {
    const [safetyResponse, alarmResponse, embassyResponse] = await Promise.all([
      axios.get(
        `https://apis.data.go.kr/1262000/CountrySafetyService6/getCountrySafetyList6?serviceKey=${API_KEY}&numOfRows=3&cond[country_nm::EQ]=${country_nm}&pageNo=1`
      ),
      axios.get(
        `https://apis.data.go.kr/1262000/TravelAlarmService0404/getTravelAlarm0404List?serviceKey=${API_KEY}&returnType=JSON&cond[country_nm::EQ]=${country_nm}`
      ),
      axios.get(
        `https://apis.data.go.kr/1262000/EmbassyService2/getEmbassyList2?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&returnType=JSON&cond[country_nm::EQ]=${country_nm}`
      ),
    ]);

    return {
      safety: safetyResponse.data.data,
      alarm: alarmResponse.data.data[0],
      embassy: embassyResponse.data.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const CountryInfo = ({ countryData }: { countryData: CountryData }) => {
  return (
    <M.Box className="countryName" style={{ marginTop: 16 }}>
      <div>
        {countryData?.alarm?.flag_download_url ? (
          <D.FlagImg src={countryData?.alarm?.flag_download_url} alt="국기" />
        ) : (
          ""
        )}
      </div>
      <div>
        <h2>
          {countryData?.alarm?.country_nm} ({countryData?.alarm?.country_eng_nm}
          )
        </h2>
        <p>{countryData?.alarm?.continent_nm || "대륙 정보 없음"}</p>
      </div>
    </M.Box>
  );
};

const SafetyNotices = ({ safety }: { safety: CountryData["safety"] }) => {
  const [selectedNotice, setSelectedNotice] = useState<
    CountryData["safety"][0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (notice: CountryData["safety"][0]) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };
  const handleDownload = (e: React.MouseEvent<SVGSVGElement>, url: string) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    window.open(url, "_blank");
  };

  return (
    <M.Box>
      <D.TableTitle>안전공지</D.TableTitle>
      <table style={{ width: "100%" }}>
        <tbody>
          {safety?.map((notice, index) => (
            <D.TableTr
              key={index}
              onClick={() => openModal(notice)}
              style={{ cursor: "pointer" }}
            >
              <D.TableTd>
                {notice.title}{" "}
                {notice.file_download_url && (
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    onClick={(e) => handleDownload(e, notice.file_download_url)}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                  />
                )}
              </D.TableTd>
              <td>{notice.wrt_dt}</td>
            </D.TableTr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedNotice && (
          <div>
            <h2>{selectedNotice.title}</h2>
            <p>
              작성일: {selectedNotice.wrt_dt}{" "}
              {selectedNotice.file_download_url && (
                <FontAwesomeIcon
                  icon={faPaperclip}
                  onClick={(e) =>
                    handleDownload(e, selectedNotice.file_download_url)
                  }
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              )}
            </p>
            <D.NoticeContent
              dangerouslySetInnerHTML={{ __html: selectedNotice.txt_origin_cn }}
            />
          </div>
        )}
      </Modal>
    </M.Box>
  );
};

const EntryRequirements = ({
  countryPermission,
  isLoading,
  country_nm,
}: {
  countryPermission: PermissionData | null;
  isLoading: boolean;
  country_nm: string;
}) => {
  return (
    <M.Box>
      <D.TableTitle>입국허가요건</D.TableTitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : countryPermission ? (
        <table style={{ width: "100%" }}>
          <tbody>
            {countryPermission["비고"] && (
              <D.InfoTr>
                <D.InfoTd>비고</D.InfoTd>
                <td>{countryPermission["비고"]}</td>
              </D.InfoTr>
            )}
            <D.InfoTr>
              <D.InfoTd>입국가능기간</D.InfoTd>
              <td>{countryPermission["일반여권소지자-입국가능기간"]}</td>
            </D.InfoTr>
            <D.InfoTr>
              <D.InfoTd>입국가능여부</D.InfoTd>
              <td>{countryPermission["일반여권소지자-입국가능여부"]}</td>
            </D.InfoTr>
            <D.InfoTr>
              <D.InfoTd>입국시 소지여부</D.InfoTd>
              <td>{countryPermission["입국시 소지여부"]}</td>
            </D.InfoTr>
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: 16, marginLeft: 5 }}>
          {country_nm}의 입국허가요건 정보가 없습니다.
        </p>
      )}
    </M.Box>
  );
};

const EmbassyInfo = ({
  embassyDataList,
  isLoading,
  country_nm,
}: {
  embassyDataList: EmbassyData[];
  isLoading: boolean;
  country_nm: string;
}) => {
  return (
    <>
      <D.TableTitle
        style={{ marginTop: "1rem", paddingBottom: 0, border: "none" }}
      >
        재외공관 정보 ({embassyDataList.length})
      </D.TableTitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : embassyDataList.length > 0 ? (
        embassyDataList.map((embassy, index) => (
          <M.Box key={index} style={{ marginTop: 16 }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <D.InfoTr>
                  <D.InfoTd>대사관 이름</D.InfoTd>
                  <td>{embassy.embassy_kor_nm}</td>
                </D.InfoTr>
                <D.InfoTr>
                  <D.InfoTd>주소</D.InfoTd>
                  <td>{embassy.emblgbd_addr}</td>
                </D.InfoTr>
                <D.InfoTr>
                  <D.InfoTd>전화번호</D.InfoTd>
                  <td>{embassy.tel_no}</td>
                </D.InfoTr>
                <D.InfoTr>
                  <D.InfoTd>긴급 연락처</D.InfoTd>
                  <td>{embassy.urgency_tel_no}</td>
                </D.InfoTr>
              </tbody>
            </table>
          </M.Box>
        ))
      ) : (
        <M.Box style={{ marginTop: 16, marginLeft: 5 }}>
          <p>{country_nm}의 대사관 정보가 없습니다.</p>
        </M.Box>
      )}
    </>
  );
};

export default function CountryDetail() {
  const { country_nm } = useParams<{ country_nm: string }>();
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const { data: permissionData, isLoading: permissionLoading } =
    usePermissionEnterData();
  const [countryPermission, setCountryPermission] =
    useState<PermissionData | null>(null);
  const [embassyDataList, setEmbassyDataList] = useState<EmbassyData[]>([]);
  const [embassyLoading, setEmbassyLoading] = useState<boolean>(true);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    if (country_nm) {
      fetchCountryData(country_nm)
        .then((data) => {
          setCountryData({ safety: data.safety, alarm: data.alarm });
          setEmbassyDataList(data.embassy || []);
        })
        .catch((error) => console.error("Error setting data:", error))
        .finally(() => setEmbassyLoading(false));
    }
  }, [country_nm]);

  useEffect(() => {
    if (permissionData && country_nm) {
      const countryPermissionData = permissionData.find(
        (country) => country.국가 === country_nm
      );
      setCountryPermission(countryPermissionData || null);
    }
  }, [permissionData, country_nm]);

  const navigate = useNavigate();
  if (!countryData) return <div>Loading...</div>;
  const goBack = () => navigate(-1);

  return (
    <G.Container>
      <G.mw>
        <D.backBtn
          style={{
            margin: "5px",
            position: "absolute",
            transform: "translate(-100%)",
            left: "-16px",
          }}
          onClick={goBack}
        >
          <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
        </D.backBtn>
        <h1 style={{ fontSize: 32 }}>국가별 상세정보</h1>
        <p style={{ fontSize: 20 }}>
          국가별 안전공지, 여행경보지도, 입국 허가요건, 재외공관 정보를 확인할
          수 있습니다.
        </p>
        {countryData.alarm ? (
          <>
            <CountryInfo countryData={countryData} />
            <div style={{ display: "flex", marginTop: 16, gap: 16 }}>
              <M.Box style={{ flex: 0.7, aspectRatio: "4/3" }}>
                <D.MapContainer>
                  <D.MapImage
                    src={countryData?.alarm?.dang_map_download_url}
                    alt="여행경보지도"
                  />
                  <D.MapButton onClick={() => setIsMapModalOpen(true)}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlassPlus}
                      color="#fff"
                      size="lg"
                    />
                  </D.MapButton>
                </D.MapContainer>
              </M.Box>
              <D.SafetyCon>
                <SafetyNotices safety={countryData.safety} />
                <EntryRequirements
                  countryPermission={countryPermission}
                  isLoading={permissionLoading}
                  country_nm={country_nm || ""}
                />
              </D.SafetyCon>
            </div>
            <EmbassyInfo
              embassyDataList={embassyDataList}
              isLoading={embassyLoading}
              country_nm={country_nm || ""}
            />
          </>
        ) : (
          <M.Box style={{ marginTop: 16 }}>
            해당 국가({country_nm})에 대한 상세 정보가 없습니다.
          </M.Box>
        )}

        <Modal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          name="map"
        >
          <img
            src={countryData?.alarm?.dang_map_download_url}
            alt="여행경보지도"
            style={{ width: "98%", height: "auto" }}
          />
        </Modal>
      </G.mw>
    </G.Container>
  );
}
