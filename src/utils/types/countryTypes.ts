export interface AlarmData {
  country_nm: string;
  continent_nm: string;
  country_eng_nm: string;
  dang_map_download_url: string;
  flag_download_url: string;
  alarm_lvl: number;
  //country_iso_alp2: string;
}

export interface CountryData {
  safety: Array<{
    txt_origin_cn: string | TrustedHTML;
    file_download_url: string;
    title: string;
    wrt_dt: string;
  }>;
  alarm: AlarmData;
}

export interface PermissionData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
  비고: string;
}

export interface EmbassyData {
  embassy_kor_nm: string;
  emblgbd_addr: string;
  tel_no: string;
  urgency_tel_no: string;
}
