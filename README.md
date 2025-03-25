# Moodi-pie 🎧

### 사용자의 기분에 따라 음악을 추천해 주는 AI 추천 서비스

사용자의 **음성**을 통해 현재 감정을 전달하면, AI가 이를 분석해 **기분에 맞는 음악**을 추천해주는 서비스입니다.  
과제를 하거나, 등·하교, 출·퇴근 등 다양한 상황에서 음악 스트리밍 서비스를 사용할 때, 감정에 꼭 맞는 음악을 듣고 싶었던 경험에서 아이디어가 출발했습니다.  
기존 서비스의 감정 카테고리에서는 원하는 분위기의 음악이 섞여 있어 아쉬움이 있었고, 이를 **AI 기반 플레이리스트**로 보완하고자 본 프로젝트를 기획하게 되었습니다.

- **선정 아이템** : 감정 기반 음악 플레이리스트 추천 서비스
- **목표** : 사용자의 음성을 기반으로 감정을 분석하고, 그에 맞는 음악을 추천하는 서비스 구현

## 🎨 Figma 디자인

[👉 Figma 바로가기](https://www.figma.com/design/JCyjEDwZUaVivr4MAiCCtz/moodi-pie?node-id=0-1&t=3OThAMcqUQQHspOG-1)

## How to Start? ✨

```
# Step 0 : 처음 시작한 경우
npm install

# Step 1 : 실행
npm run dev
```

## 🛠 사용 기술 스택

- React
- JavaScript
- Tailwind CSS

## 📦 주요 라이브러리

- axios
- react-router-dom
- react-media-recorder
- react-redux

## 🔧 주요 API

- **Clova STT** – 사용자의 음성을 텍스트로 변환
- **Clova Studio** – 사용자 입력에서 감정을 추출 및 플레이리스트 구성
- **Spotify API** – 감정에 맞는 음악 저장

<br>

<details>
<summary>📁 프로젝트 구조 보기 (클릭)</summary>

<br>

moodi-pie/  
├── dist/ # 번들링 결과물  
├── node_modules/
├── public/

├── src/  
│ ├── api/ # API 호출  
│ │ ├── Playlist.js  
│ │ ├── Report.js  
│ │ ├── User.js  
│ │ └── Voice.js

│ ├── assets/ # 이미지, 폰트 등 정적 리소스  
│ │ ├── fonts/  
│ │ ├── EngLogo.png  
│ │ └── ...

│ ├── components/ # 재사용 가능한 컴포넌트  
│ │ ├── Report/  
│ │ │ ├── Emotion.jsx  
│ │ │ └── Playlist.jsx  
│ │ ├── VoiceRecording/  
│ │ │ ├── BeforeRecording.jsx  
│ │ │ ├── Recording.jsx  
│ │ │ ├── RecordingComplete.jsx  
│ │ │ └── ...  
│ │ └── MainUI/

│ ├── pages/ # 페이지 단위 컴포넌트  
│ │ ├── Join.jsx  
│ │ ├── Landing.jsx  
│ │ ├── Main.jsx  
│ │ ├── MyPage.jsx  
│ │ ├── NotFound.jsx  
│ │ ├── RecordingPage.jsx  
│ │ └── ResultReport.jsx

│ ├── PIPage/ # 플레이리스트 페이지 관련  
│ │ ├── Playlist.jsx  
│ │ ├── PlaylistBackground.jsx  
│ │ ├── PlaylistPage.jsx  
│ │ ├── TrackItem.jsx  
│ │ ├── TrackList.jsx  
│ │ └── TrackListPage.jsx

│ ├── redux/ # Redux 관련 모듈  
│ │ ├── store.js  
│ │ └── UserSlice.js

│ ├── routes/ # 라우팅 관련 설정  
│ │ └── ProtectedRoute.jsx

│ ├── App.jsx # 앱 진입점  
│ ├── data.js # 데이터 관련 설정  
│ ├── globals.css # 글로벌 스타일  
│ └── main.js # React 앱 엔트리 포인트

├── .env # 환경 변수  
├── .gitignore  
├── prettier.config.js  
└── README.md

</details>

## Git branch & Git Flow

| 브랜치명          | 작업 내용                  |
| ----------------- | -------------------------- |
| main              | 최종 브랜치                |
| develop (default) | 개발 브랜치                |
| feature           | 기능 작업 브랜치           |
| hotfix            | 배포 이후 문제 수정 브랜치 |

## Git Commit Message

| 헤더     | 내용                                     |
| -------- | ---------------------------------------- |
| feat     | 새로운 기능 추가                         |
| refactor | 코드 리팩토링                            |
| fix      | 버그 수정                                |
| style    | 스타일 변경, 주석 제거 등                |
| setting  | 빌드수행, 패키지 설치, 환경 설정 수정 등 |
| docs     | 문서 작업                                |

## Member

![팀이미지](https://github.com/user-attachments/assets/40856fb1-2091-4e2b-88e2-44bfa5eb189c)
