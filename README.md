### 진행 상황
- [ ] 코드 리팩토링 및 주석 추가
- [ ] 여유가 된다면, 커뮤니티 게시판 기능 만들기

<details>
  <summary>완료된 작업</summary>

  상단일수록 최신순으로 완료된 작업
- [X] 배너페이지(지구본페이지) 새로고침 및 다시 접속 시 초기카메라설정 풀리는 issue : 대한민국으로 설정해둔 초기위치가 풀림
- [X] 국가별 디페일 페이지에서 '대만' 국기 이미지 추가 : api에서 '대만' 국가만 국기 이미지가 제대로 넘어오지 않음
- [X] 반응형 디자인 적용
- [X] 안전경보지도 및 안전공지 modal 구현
- [X] 검색 기능 미세한 버벅거림 현상 -> 코드리팩토링, useMemo() 이용하기
- [X] react query 이용하여 캐싱된 데이터 이용하도록 리팩토링
- [X] api data fetch 전용 hook 작성
- [X] 국가별 디테일 페이지에서 안전경보지도, 안전공지 및 대사관 정보 fetch
- [X] 입국허가요건 및 대사관정보 페이지 국가이름으로 검색 구현
- [X] 메인페이지 국가 및 대륙별 검색기능 구현
- [x] 지구본 및 메인페이지에서 국가별 디테일 페이지로 이동
- [X] 배너페이지(지구본페이지) 지구본에 국가별 데이터 fetching



</details>


---
# TravelGuard : 국가별 여행 경보·입국·대사관 정보 제공 서비스
  <img src="https://github.com/user-attachments/assets/c2522350-3e16-41d4-a9de-f44faf7dda92" alt="LOGO" style="background-color: #000000" />
  
travelGuard는 국가별 여행경보 단계, 입국 필수 조건, 대사관 정보 및 안전 공지사항을 제공하는 서비스입니다.


## 🔗 배포 주소
https://travelguard.vercel.app/ 


## ☘️ 프로젝트 설명
### **주요 기능** 

**🌍 여행위험 단계 및 여행 위험 지역을 3D 지도에 표현**
- react-globe.gl 라이브러리를 활용해 위험 지역을 3D 지도 상에 시각적으로 표시하였습니다.

  ➡ 기대 효과 : 직관적으로 위험 지역을 인식하고, 지구본에서 국가를 클릭하면 해당 국가의 상세페이지에서 더 자세한 정보를 확인할 수 있습니다.

**🛡️ 여행 안전 수준 파악 및 안전공지 제공**
- **기능:** 국가별 여행 위험경보 확인 및 최신 뉴스와 정보(정치적 이슈, 날씨, 자연재해 등)들을 제공합니다.

  ➡ 기대 효과 : 여행 중 발생할 수 있는 위험 요소를 미리 파악할 수 있습니다.

**📜 국가·지역별 입국 허가 요건 제공**
- 실시간으로 각국의 비자 발급 절차, 입국 제한 사항, 예방 접종 요구 사항 등의 정보를 제공합니다.

  ➡ 기대 효과 : 여행 준비를 간소화하고, 필요한 정보를 신속하게 확인할 수 있습니다.

**📞 대사관 및 비상 연락처 제공**
- 각 국가나 지역의 재외공관에 대해 필요한 정보를 신속하게 확인할 수 있습니다.

  ➡ 기대 효과 : 위기 상황에 신속하게 대처할 수 있도록 지원합니다.

## 페이지 소개

| **지구본 페이지(첫 접속시 화면)** | **국가/지역별 정보 페이지** |
|:----------------:|:----------------:|
| <img src="https://github.com/user-attachments/assets/9f0ffb54-0259-4107-baf7-f2c2b03597e9" alt="image" width="500" /> | <img src="https://github.com/user-attachments/assets/66872202-97f6-4deb-a5c6-f98d21e7dd7c" alt="image" width="500" /> |
| **국가별 세부정보 페이지** |  |
| <img src="https://github.com/user-attachments/assets/281466f4-82a5-42a4-8df1-eec774aa8e09" alt="image" width="500" /> |  |
| **입국허가요건 정보 페이지** | **대사관 정보 페이지** |
| <img src="https://github.com/user-attachments/assets/0145840d-ded7-47ca-abfb-ae6358835ee4" alt="image" width="500" /> | <img src="https://github.com/user-attachments/assets/5467f7e3-4ab5-41b8-9346-4ac87efeee5e" alt="image" width="500" /> |


