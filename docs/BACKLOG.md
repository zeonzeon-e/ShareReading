# 책소풍 구현 백로그

확인일: 2026-11-13. 대상 저장소: [zeonzeon-e/ShareReading](https://github.com/zeonzeon-e/ShareReading).

## 등록 상태

**GitHub 미등록 — Issues 기능 비활성화, 현재 연결 계정은 push/triage 권한만 보유하고 admin/maintain 권한이 없음.**

GitHub 연결 도구로 전체 추적 이슈 생성을 시도했으나 `403 Resource not accessible by integration`이 반환되었다. 실제 생성된 이슈는 없다. 소유자가 저장소 Settings → General → Features → Issues를 활성화한 뒤 등록을 재시도해야 하며, 연결 도구의 생성 권한이 계속 부족하면 GitHub CLI의 쓰기 권한을 이용한다. 등록 전 기존 이슈를 다시 조회해 중복 여부를 확인한다.

아래 29개 작업과 전체 추적 이슈 1개를 등록할 준비가 되어 있다. `BK-xx`는 이 문서의 관리 ID이며 GitHub 이슈 번호가 아니다. 등록용 제목/본문은 [issues.json](backlog/issues.json)에 있다. 기존 이슈를 만든 적이 없다고 단정하지 않는다. 코드 `app/globals.css`에 디자인 이슈 `#28` 참조가 있으나 현재 저장소에서 직접 조회하면 404이고, Issues가 비활성화되어 있어 과거 존재 여부는 확인할 수 없다.

## 근거와 현황

- [Pixel · Screens](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=10-4)의 A1~E3 **21개 화면/팝업**과 각 화면의 Spec 텍스트를 확인했다.
- [Pixel · Flow & Spec](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)의 흐름도, 라우트 표, 개발 메모를 확인했다. Figma 댓글은 조회 결과 0개였다.
- 현재 코드: Next.js App Router/TypeScript/React, `pg`, 모바일 화면 골격, DB health, CI와 배포 문서. 실제 인증/도메인 스키마/기능은 미구현이다.
- 디자인의 API 경로는 계약 초안이다. URL 변경·라이브러리 도입·인증 공급자는 BK-01/BK-03에서 확정한다.
- 목업 텍스트의 숫자·인명·주소·날짜·표 수·이동 시간은 예시 데이터이며 제품 상수로 고정하지 않는다.
- 공통 데이터 모델·권한 검사·중복 처리·실물 도서 구분·PWA/검증은 화면 구현을 위해 도출한 기술 작업이다.

## 우선순위와 권장 순서

- **P0**: 정책/데이터/인증 기반과 핵심 교환 흐름을 막는 선행 작업.
- **P1**: 목업의 주요 사용자 경험, 기록·알림 및 검증.
- **P2**: 핵심 순환 이후 만남 기능 또는 별도 범위 결정. 제외를 의미하지 않는다.
- 1단계: BK-01 → 데이터/공통 UI/경로/주소 → 인증·가입.
- 2단계: 모임 생성·참여 → 책 등록 → 순환 엔진 → 발송·수령·반환 → 상세·목록·서재·홈.
- 3단계: 알림 저장/팝업·PWA → 목록·설정·푸시, 독서 기록·마이.
- 4단계: 장소 후보 → 투표/확정 → 일정·지도·후기, 통합 검증.
- 캐릭터/알림/만남 등은 개별 이슈의 선행 작업을 만족하면 병행 가능하다. 각 이슈 검증은 구현 시 수행하고 BK-28에서 전체 여정을 검증한다.

## 선행 결정이 필요한 차이

| 항목 | 확인한 차이 | 처리 |
|---|---|---|
| 인증 | README Supabase Auth 계획 vs Figma Auth.js 제안, 이메일/비밀번호 UI vs 소셜 로그인 명세 | BK-01/BK-05 |
| 인원·책 수 | README 2~4명 vs 5명 예시, '5권 완료' 고정 문구 | BK-01/BK-13 |
| 경로·탭 | 현재 /tabs/rooms·알림 탭 vs 목업 /groups·서재 탭 | BK-03 |
| 탭 표시 | D1/D3 라우트 표에는 탭바, 개발 메모는 4개 최상위 경로만 명시 | BK-01/BK-03 |
| 캐릭터 | 실제 12종 vs Spec의 5×2 | BK-01/BK-07 |
| 주소 | 배송지 관리 UI와 중간지점 추천 요구 공존 | BK-08/BK-23 |
| 배송·예정일 | 목업 예시는 있지만 택배 연동 계약/송장 입력 화면 없음 | BK-01/BK-15 |
| 후기 | D4 Spec에 Rating, 화면에는 한줄평만 있음 | BK-01/BK-22 |
| 참석 | 투표/확정 화면은 있으나 별도 참석 확인 흐름 없음 | BK-24/BK-25 |
| 발제 책갈피 | README에는 있으나 이번 목업에 없음 | BK-29 |

## 기능 단위로 협업하고 병합하는 방법

**한 기능에는 한 명의 feature lead를 둡니다.** lead는 계약과 통합을 조정하고 최종 사용자 흐름이 되는지 확인합니다. 기능의 코드를 독점하는 사람이 아니며, 다른 참여자는 기능을 이루는 조각을 맡아 병렬로 작업합니다. 기능은 그 조각이 합쳐져 시작부터 완료까지 동작할 때 끝납니다.

| 기능 | 완료되는 사용자 결과 | 작업 이슈 |
|---|---|---|
| F00 공통 기반과 결정 | 여러 사용자 기능이 함께 쓰는 정책, 디자인, 경로, 데이터, 인증 기반이 준비된다. | BK-01, BK-02, BK-03, BK-04, BK-05, BK-27 |
| F01 가입과 내 프로필 | 사용자가 가입하고 프로필·주소·설정을 관리한다. | BK-06, BK-07, BK-08, BK-26 |
| F02 모임 만들기와 참여 | 사용자가 모임을 만들고 초대 코드로 참여해 모임 목록을 본다. | BK-09, BK-10, BK-11 |
| F03 책 순환과 배송 확인 | 도서 등록부터 발송·수령·순환 완료·원소유자 반환까지 이어진다. | BK-12, BK-13, BK-14, BK-15 |
| F04 홈과 알림 | 홈에서 현재 진행을 보고, 발송·도착·순환 이벤트를 알림으로 확인하고 설정한다. | BK-16, BK-17, BK-18, BK-19 |
| F05 서재와 독서 기록 | 사용자가 현재 책과 완료한 책을 찾아 읽은 기록과 후기를 남긴다. | BK-20, BK-21, BK-22 |
| F06 순환 후 만남 정하기 | 모임이 장소를 제안·투표하고 일정을 확정해 공유한다. | BK-23, BK-24, BK-25 |
| F07 전체 흐름 통합 검증 | 가입부터 책 반환과 만남까지 한 사용 흐름이 끊김 없이 동작한다. | BK-28 |
| F08 발제 책갈피 범위 결정 | 기존 README 요구를 MVP에 포함할지와 포함할 경우 필요한 구현 화면이 정해진다. | BK-29 |


작업을 시작할 때 요청·응답·오류 형식, 데이터와 상태 전이, 권한, 수정할 파일, 최종 사용자 흐름을 짧게 합의합니다. 예를 들어 **F03 책 순환과 배송 확인**에서는 BK-13 담당자가 발송/수령 상태 전이와 API 계약을 먼저 제안하고, BK-14 담당자는 그 계약에 맞춘 화면을 fixture 데이터로 병렬 구현하며, BK-15 담당자는 배송 상세와 수령 화면을 구현할 수 있습니다. 계약이 불명확한 상태로 서로 기다리지 않도록 먼저 합의하고, 같은 상태 로직이 얽히면 둘이 함께 작업합니다.

PR 병합 방식은 변경이 main에 안전하게 들어갈 수 있는지로 고릅니다.

- **독립된 조각:** 각자 브랜치에서 main 대상 PR을 작게 자주 올리고, 리뷰가 끝난 것을 main에 차례로 합칩니다. 먼저 합쳐진 코드가 있으면 나머지 브랜치에 최신 main을 반영합니다.
- **아직 단독으로 넣을 수 없는 조각:** 임시 기능 통합 브랜치를 두고 하위 PR들을 그 브랜치에 합칩니다. 화면부터 API까지 전체 흐름이 된 뒤 feature lead가 main 대상으로 통합 PR을 올립니다.
- **파일이나 규칙이 강하게 얽힌 경우:** 누가 그 파일을 소유할지 다투거나 상대방을 재촉하지 않고 페어 작업으로 함께 수정합니다. 다른 사람 브랜치를 강제로 덮어쓰지 않습니다.

선행 이슈는 필요한 결과가 무엇인지 알려줍니다. 선행 작업이 미완료여도 계약에 합의했다면 fixture/mock으로 진행 가능한 부분을 먼저 만들 수 있습니다. 막힌 경우에는 필요한 결정, 산출물, 파일을 구체적으로 공유하고 독립 작업을 이어갑니다. 완료는 이슈가 닫힌 수가 아니라 기능의 end-to-end 완료 조건으로 판단합니다.

## 이슈 목록

| ID | 기능 | 우선순위 | 단계 | 제목 | 선행 작업 |
|---|---|---|---|---|---|
| [BK-01](#bk-01) | F00 공통 기반과 결정 | P0 | 01 기반 | 목업과 기존 요구사항의 충돌을 정리하고 MVP 정책을 확정한다 | — |
| [BK-02](#bk-02) | F00 공통 기반과 결정 | P0 | 01 기반 | 픽셀 디자인 토큰과 공통 UI 및 캐릭터 자산을 구축한다 | BK-01 |
| [BK-03](#bk-03) | F00 공통 기반과 결정 | P0 | 01 기반 | 목업의 화면 경로와 홈·모임·서재·마이 내비게이션을 맞춘다 | BK-01, BK-02 |
| [BK-04](#bk-04) | F00 공통 기반과 결정 | P0 | 01 기반 | 사용자·모임·실물 도서·순환 기록의 데이터 모델과 접근 제어를 구축한다 | BK-01 |
| [BK-05](#bk-05) | F00 공통 기반과 결정 | P0 | 01 기반 | 로그인과 세션 관리 및 보호된 화면 접근을 구현한다 | BK-01, BK-04 |
| [BK-06](#bk-06) | F01 가입과 내 프로필 | P0 | 01 기반 | 회원가입과 프로필·주소·동의 입력 흐름을 구현한다 | BK-02, BK-04, BK-05, BK-08 |
| [BK-07](#bk-07) | F01 가입과 내 프로필 | P1 | 01 기반 | 가입과 마이페이지에서 12종 프로필 캐릭터를 선택하고 저장한다 | BK-02, BK-04, BK-05 |
| [BK-08](#bk-08) | F01 가입과 내 프로필 | P0 | 01 기반 | 주소 검색과 배송지 정보 저장·수정을 구현한다 | BK-01, BK-02, BK-04 |
| [BK-09](#bk-09) | F02 모임 만들기와 참여 | P0 | 02 교환독서 | 모임 생성과 이름·주기·읽는 순서 설정을 구현한다 | BK-02, BK-03, BK-04, BK-05 |
| [BK-10](#bk-10) | F02 모임 만들기와 참여 | P0 | 02 교환독서 | 6자리 초대 코드와 링크로 모임을 미리 보고 참여한다 | BK-03, BK-04, BK-05, BK-09 |
| [BK-11](#bk-11) | F02 모임 만들기와 참여 | P1 | 02 교환독서 | 내 모임 목록과 상태 필터 및 생성·참여 진입을 구현한다 | BK-02, BK-03, BK-04, BK-09, BK-10 |
| [BK-12](#bk-12) | F03 책 순환과 배송 확인 | P0 | 02 교환독서 | 도서 검색과 실물 책 등록 및 모임 연결을 구현한다 | BK-01, BK-02, BK-04, BK-05, BK-09 |
| [BK-13](#bk-13) | F03 책 순환과 배송 확인 | P0 | 02 교환독서 | 교환독서의 발송·수령·반환 상태 전이와 순환 완료 판정을 구현한다 | BK-01, BK-04, BK-09, BK-12 |
| [BK-14](#bk-14) | F03 책 순환과 배송 확인 | P1 | 02 교환독서 | 모임 상세의 픽셀 순환 장면과 멤버별 독서 진도를 구현한다 | BK-02, BK-03, BK-09, BK-12, BK-13 |
| [BK-15](#bk-15) | F03 책 순환과 배송 확인 | P0 | 02 교환독서 | 배송 상세와 책 수령 확인 및 다음 독자 안내를 구현한다 | BK-02, BK-03, BK-05, BK-13 |
| [BK-16](#bk-16) | F04 홈과 알림 | P1 | 02 교환독서 | 홈에서 진행 중 모임과 읽는 책 및 배송 소식을 조회한다 | BK-02, BK-03, BK-11, BK-13, BK-20 |
| [BK-17](#bk-17) | F04 홈과 알림 | P1 | 03 기록·알림 | 발송과 순환 완료 이벤트를 알림으로 저장하고 앱 내 팝업을 표시한다 | BK-02, BK-04, BK-05, BK-13 |
| [BK-18](#bk-18) | F04 홈과 알림 | P1 | 03 기록·알림 | 알림 목록의 필터·읽음 처리·보관 기간을 구현한다 | BK-03, BK-04, BK-05, BK-17 |
| [BK-19](#bk-19) | F04 홈과 알림 | P1 | 03 기록·알림 | 종류별 알림 설정과 웹 푸시 및 리마인더를 구현한다 | BK-01, BK-04, BK-05, BK-17, BK-27 |
| [BK-20](#bk-20) | F05 서재와 독서 기록 | P1 | 03 기록·알림 | 내 서재에서 읽는 중·배송 중·완료 도서를 조회한다 | BK-02, BK-03, BK-04, BK-05, BK-12, BK-13 |
| [BK-21](#bk-21) | F05 서재와 독서 기록 | P1 | 03 기록·알림 | 읽은 책을 책장 형태로 모으고 연도·모임 필터와 통계를 제공한다 | BK-02, BK-03, BK-04, BK-20 |
| [BK-22](#bk-22) | F05 서재와 독서 기록 | P1 | 03 기록·알림 | 책별 독서 기록과 나·친구의 한줄평 및 다시 교환하기를 구현한다 | BK-02, BK-03, BK-04, BK-05, BK-13, BK-20 |
| [BK-23](#bk-23) | F06 순환 후 만남 정하기 | P2 | 04 만남 | 멤버 위치를 바탕으로 만남 장소 후보를 추천하고 추가한다 | BK-01, BK-04, BK-08, BK-13 |
| [BK-24](#bk-24) | F06 순환 후 만남 정하기 | P2 | 04 만남 | 만남 장소 투표와 날짜 선택 및 모임장 확정을 구현한다 | BK-02, BK-03, BK-04, BK-05, BK-23 |
| [BK-25](#bk-25) | F06 순환 후 만남 정하기 | P2 | 04 만남 | 확정 모임의 일정·참석 요약과 캘린더·지도 연결을 구현한다 | BK-02, BK-03, BK-17, BK-24 |
| [BK-26](#bk-26) | F01 가입과 내 프로필 | P1 | 03 기록·알림 | 마이페이지에서 프로필·독서 통계·설정·로그아웃을 연결한다 | BK-02, BK-03, BK-05, BK-07, BK-08, BK-09, BK-20 |
| [BK-27](#bk-27) | F00 공통 기반과 결정 | P1 | 03 기록·알림 | 모바일 PWA 설치와 알림 구독에 필요한 앱 기반을 구성한다 | BK-01, BK-03, BK-05 |
| [BK-28](#bk-28) | F07 전체 흐름 통합 검증 | P1 | 05 검증 | 가입부터 책 반환·만남까지 주요 흐름을 자동 검증하고 출시 조건을 점검한다 | BK-06, BK-10, BK-13, BK-15, BK-18, BK-19, BK-21, BK-22, BK-25, BK-26 |
| [BK-29](#bk-29) | F08 발제 책갈피 범위 결정 | P2 | 범위 결정 | 기존 발제 책갈피 요구사항의 유지 여부와 화면·데이터 범위를 정한다 | BK-01 |

## 화면별 대응표

| Figma 화면 | 담당 이슈 |
|---|---|
| [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2) | BK-01, BK-02, BK-03, BK-05, BK-28 |
| [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628) | BK-01, BK-03, BK-04, BK-06, BK-08, BK-19, BK-28 |
| [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598) | BK-01, BK-02, BK-03, BK-06, BK-07, BK-28 |
| [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826) | BK-02, BK-03, BK-05, BK-16, BK-27, BK-28 |
| [B2 알림 팝업 · 책 도착](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15573) | BK-17, BK-19, BK-28 |
| [B3 도착 확인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15730) | BK-03, BK-13, BK-15, BK-28 |
| [B4 알림 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20137) | BK-03, BK-17, BK-18, BK-28 |
| [C1 모임 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-3983) | BK-03, BK-11, BK-28 |
| [C2 모임 참여 · 초대 코드](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20323) | BK-03, BK-09, BK-10, BK-28 |
| [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953) | BK-01, BK-02, BK-03, BK-04, BK-12, BK-13, BK-14, BK-15, BK-28 |
| [C4 알림 팝업 · 5권 순환 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-18007) | BK-01, BK-13, BK-17, BK-28 |
| [C5 만날 장소 정하기](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-19920) | BK-03, BK-23, BK-24, BK-28 |
| [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040) | BK-03, BK-19, BK-22, BK-25, BK-28 |
| [C7 교환독서 모임 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6175) | BK-01, BK-03, BK-09, BK-28 |
| [D1 책 검색 (도서 API)](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-6887) | BK-01, BK-03, BK-12, BK-28 |
| [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719) | BK-02, BK-03, BK-04, BK-12, BK-13, BK-20, BK-28 |
| [D3 읽은 책 모음](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21646) | BK-01, BK-03, BK-21, BK-28 |
| [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886) | BK-01, BK-03, BK-04, BK-22, BK-25, BK-28 |
| [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921) | BK-02, BK-03, BK-05, BK-07, BK-09, BK-26, BK-28 |
| [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121) | BK-01, BK-03, BK-04, BK-08, BK-23, BK-28 |
| [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576) | BK-03, BK-06, BK-19, BK-27, BK-28 |

## 상세 본문

<a id="bk-01"></a>

### BK-01 · 목업과 기존 요구사항의 충돌을 정리하고 MVP 정책을 확정한다

<!-- sharereading-backlog:BK-01 -->
#### 목적

후속 구현이 서로 다른 정책을 가정하지 않도록 결정 기록을 남긴다.

#### 분류와 선행 작업

- 관리 ID: BK-01 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: 없음

#### 근거

- [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2)
- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [C4 알림 팝업 · 5권 순환 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-18007)
- [C7 교환독서 모임 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6175)
- [D1 책 검색 (도서 API)](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-6887)
- [D3 읽은 책 모음](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21646)
- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 인증: README의 Supabase Auth 계획과 목업의 Auth.js 제안을 비교하고 선택한다. 이메일/비밀번호 UI와 소셜 전용 명세의 지원 범위를 결정한다.
- [ ] 모임: README의 2~4명, 목업의 3~5명 예시, 고정된 '5권 완료' 문구를 정리하고 최소·최대 인원, 1인 도서 수, 원소유자 반환을 포함한 순환 완료 조건을 결정한다.
- [ ] 진행 중 순서 변경·책 변경·모임 탈퇴·모임장 위임·주기 변경의 허용 시점과 처리 방식을 결정한다.
- [ ] 배송: 앱의 수동 발송/수령 기록과 실제 택배 추적·도착 예정일 연동 범위를 구분한다.
- [ ] 가입 필수 주소·배송 정보 공개 범위·장소 추천용 위치 사용, 알림·마케팅 동의를 구분한다.
- [ ] 캐릭터 12종과 '5×2' 명세, D1/D3 탭바 유무의 라우트 표와 개발 메모 차이, 평점 UI 유무를 정리한다.
- [ ] 도서 검색·주소 검색·지도·위치 추천 공급자 및 발제 책갈피의 MVP 포함 여부를 결정한다.

#### 완료 조건

- [ ] 각 항목에 선택안·근거·영향받는 화면·미결정 사항이 기록되어 있다.
- [ ] 모임 인원/도서 수가 달라도 성립하는 순환 및 반환 예시가 있다.
- [ ] 확정되지 않은 기능은 구현 완료 기준에 섞이지 않고 후속 이슈에 연결된다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-02"></a>

### BK-02 · 픽셀 디자인 토큰과 공통 UI 및 캐릭터 자산을 구축한다

<!-- sharereading-backlog:BK-02 -->
#### 목적

현재 중립 스타일과 자리 표시 UI를 목업의 재사용 가능한 시각 체계로 교체한다.

#### 분류와 선행 작업

- 관리 ID: BK-02 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-01

#### 근거

- [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2)
- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] Pixel Foundations/Components의 자산·색상·폰트를 확인하고 토큰을 정리한다. 목업 제안은 배경 #F6F4DC, 카드 #FFFEF5, 강조 #4A6046, 본문 #2F3B2D, 메인 #91C76B이다.
- [ ] Button, Input, Chip, Badge, Switch, Avatar, BookCover, HudChip, Progress, Skeleton, AlertDialog를 구현한다.
- [ ] 12종 캐릭터를 식별자와 자산으로 매핑하고 API 도서 표지가 없을 때만 대체 표지를 표시한다.
- [ ] 390px 기준·safe area·키보드 포커스·터치 조작·긴 한국어 문구를 고려한다. 기기 목업 테두리/상태바는 웹 UI 자산과 구분한다.

#### 완료 조건

- [ ] 공통 상태 default/disabled/loading/error 및 독서 reading/shipping/done/waiting을 확인할 수 있다.
- [ ] 대표 로그인·모임 상세·서재 화면에 같은 토큰과 자산을 적용할 수 있다.
- [ ] 모바일에서 넘침이나 하단 가림이 없고 대체 텍스트와 포커스가 제공된다.

#### 결정할 사항과 경계

- Tailwind/shadcn 도입은 목업의 제안이므로 기존 CSS와 비교해 결정한다.
- 픽셀 확대 배율 문구의 '정수 배율'과 1.5× 예시는 충돌하므로 실제 자산 렌더링으로 검증한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-03"></a>

### BK-03 · 목업의 화면 경로와 홈·모임·서재·마이 내비게이션을 맞춘다

<!-- sharereading-backlog:BK-03 -->
#### 목적

현재 /tabs·/tabs/rooms 중심의 골격과 목업 경로 차이를 명시적으로 해소한다.

#### 분류와 선행 작업

- 관리 ID: BK-03 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-01, BK-02

#### 근거

- [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2)
- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [B3 도착 확인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15730)
- [B4 알림 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20137)
- [C1 모임 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-3983)
- [C2 모임 참여 · 초대 코드](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20323)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [C5 만날 장소 정하기](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-19920)
- [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040)
- [C7 교환독서 모임 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6175)
- [D1 책 검색 (도서 API)](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-6887)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [D3 읽은 책 모음](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21646)
- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 현재 경로와 목업의 /, /groups, /library, /me 경로를 대응시키고 유지/이관/리다이렉트 방식을 결정한다.
- [ ] 하단 탭을 홈·모임·서재·마이로 구성하고 알림은 홈 종 아이콘으로 진입시킨다.
- [ ] 가입/프로필, 배송 상세, 모임 참여/설정/만남, 도서 검색/기록, 주소/알림 설정 경로를 추가한다.
- [ ] /onboarding과 /invite/[code] 기존 진입점의 역할을 정리하고 초대 딥링크를 유지한다.
- [ ] 화면별 탭 표시, 뒤로 가기, 로그인 복귀 경로, 404/권한 오류를 정의한다.

#### 완료 조건

- [ ] 21개 화면·팝업의 진입점이 경로 매핑표에 있고 연결이 끊기지 않는다.
- [ ] 모임 상세와 설정 등 탭이 없는 화면에 탭이 노출되지 않는다.
- [ ] 직접 URL 접근·새로고침·기존 초대 링크를 검증한다.

#### 결정할 사항과 경계

- D1/D3 탭바 유무는 BK-01 결정에 따른다. 기존 /tabs 제거를 사전 확정하지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-04"></a>

### BK-04 · 사용자·모임·실물 도서·순환 기록의 데이터 모델과 접근 제어를 구축한다

<!-- sharereading-backlog:BK-04 -->
#### 목적

현재 health 쿼리만 있는 DB에 실제 서비스 데이터와 소유 관계를 도입한다.

#### 분류와 선행 작업

- 관리 ID: BK-04 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-01

#### 근거

- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 프로필, 주소, 모임/멤버/역할, 도서 메타데이터, 사용자의 실물 도서, 순환/읽기 배정, 발송/수령, 독서 기록, 알림의 관계를 설계한다.
- [ ] 도서 ISBN과 실물 책 ID를 구분하고 원소유자·현재 보유자·순환 이력을 별도로 보존한다.
- [ ] 마이그레이션, 개발용 시드, 키/중복/상태 제약을 작성하고 읽기/쓰기 API의 공통 오류와 입력 검증을 정한다.
- [ ] 본인 프로필/주소, 모임 멤버 데이터, 모임장 작업에 서버 측 권한 검사를 적용한다.

#### 완료 조건

- [ ] 빈 DB에서 마이그레이션과 샘플 교환독서 흐름을 재현할 수 있다.
- [ ] 다른 사용자의 주소와 비참여 모임 정보가 무단 조회/수정되지 않는다.
- [ ] 같은 도서의 다른 실물 책과 서로 다른 모임의 독서 이력이 섞이지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-05"></a>

### BK-05 · 로그인과 세션 관리 및 보호된 화면 접근을 구현한다

<!-- sharereading-backlog:BK-05 -->
#### 목적

모든 모임·도서·알림 작업을 인증된 사용자 기준으로 처리한다.

#### 분류와 선행 작업

- 관리 ID: BK-05 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-01, BK-04

#### 근거

- [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2)
- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 확정한 인증 제공자로 로그인/콜백/세션 만료/로그아웃을 구현한다.
- [ ] 목업의 카카오·구글·네이버 버튼은 실제 지원 공급자와 일치시키고 이메일 인증 포함 여부는 결정 기록을 따른다.
- [ ] 신규 사용자는 프로필 입력으로, 기존 사용자는 홈 또는 검증된 복귀 경로로 이동시킨다.
- [ ] 로그인 취소·공급자 오류·중복 제출·세션 만료 안내를 구현한다.

#### 완료 조건

- [ ] 비로그인 사용자가 보호된 API를 호출할 수 없다.
- [ ] 초대 링크로 들어와 로그인한 뒤 원래 참여 흐름으로 돌아온다.
- [ ] 로그아웃과 만료 후 보호된 데이터가 다시 노출되지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-06"></a>

### BK-06 · 회원가입과 프로필·주소·동의 입력 흐름을 구현한다

<!-- sharereading-backlog:BK-06 -->
#### 목적

목업의 가입 정보를 저장하고 이후 주소 추천과 알림 설정 초기값에 연결한다.

#### 분류와 선행 작업

- 관리 ID: BK-06 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-02, BK-04, BK-05, BK-08

#### 근거

- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 닉네임·캐릭터·이메일·주소와 확정된 필수 입력의 폼 및 검증을 구현한다.
- [ ] 약관 동의와 선택 알림/마케팅 수신 여부를 구분해 저장한다.
- [ ] 가입 초안에서 캐릭터 선택 후 입력 내용이 유지되도록 한다.
- [ ] 목업 POST /api/users 계약을 인증/프로필 모델과 맞추고 완료 후 홈으로 이동한다.

#### 완료 조건

- [ ] 검증 실패 시 입력을 보존하고 오류 위치를 안내한다.
- [ ] 중복 제출로 프로필이 두 번 생성되지 않는다.
- [ ] 가입 주소와 pushOptIn이 E2/E3의 초기 상태에 반영된다.

#### 결정할 사항과 경계

- 비밀번호 지원 여부·주소 필수 여부·동의 문안은 BK-01에서 확정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-07"></a>

### BK-07 · 가입과 마이페이지에서 12종 프로필 캐릭터를 선택하고 저장한다

<!-- sharereading-backlog:BK-07 -->
#### 목적

캐릭터 선택을 가입 전 초안과 가입 후 프로필 변경에 재사용한다.

#### 분류와 선행 작업

- 관리 ID: BK-07 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 01 기반
- 선행 작업: BK-02, BK-04, BK-05

#### 근거

- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] cat/dog/duck/bunny/bear/frog/panda/penguin/fox/sheep/mouse/squirrel의 단일 선택과 미리보기를 구현한다.
- [ ] 가입 중에는 초안을 수정하고, 마이에서는 PATCH /api/me로 본인 캐릭터를 저장한다.
- [ ] 저장 후 이전 화면으로 복귀하고 취소·저장 실패를 처리한다.

#### 완료 조건

- [ ] 정확히 한 캐릭터만 선택되며 키보드로도 선택할 수 있다.
- [ ] 가입 전 미인증 사용자에게 기존 프로필 PATCH를 요구하지 않는다.
- [ ] 저장한 캐릭터가 홈·모임·마이에 일관되게 표시된다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-08"></a>

### BK-08 · 주소 검색과 배송지 정보 저장·수정을 구현한다

<!-- sharereading-backlog:BK-08 -->
#### 목적

가입과 주소 설정에서 같은 주소 입력을 사용하고 장소 추천용 위치와 배송 정보를 관리한다.

#### 분류와 선행 작업

- 관리 ID: BK-08 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 01 기반
- 선행 작업: BK-01, BK-02, BK-04

#### 근거

- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 도로명/지번 검색, 상세 주소, 받는 분, 연락처, 기본 배송지 입력을 구성한다.
- [ ] PATCH /api/me/address와 본인 주소 조회를 구현한다.
- [ ] 장소 추천에 필요한 좌표 변환과 원본 주소의 관계를 설계하고 실패를 처리한다.
- [ ] 배송 담당자에게 필요한 범위와 일반 모임 멤버에게 노출할 범위를 분리한다.

#### 완료 조건

- [ ] 가입과 마이에서 검색/선택/저장/재조회가 일치한다.
- [ ] 누락되거나 잘못된 필드를 안내하고 검색 실패 시 복구할 수 있다.
- [ ] 주소가 변경되어도 과거 배송 기록에 사용할 주소 처리 정책이 유지된다.

#### 결정할 사항과 경계

- 주소 공급자는 목업의 Daum API 제안을 검토한다. 주소 수정 시 진행 중 배송 반영 여부는 명시적으로 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-09"></a>

### BK-09 · 모임 생성과 이름·주기·읽는 순서 설정을 구현한다

<!-- sharereading-backlog:BK-09 -->
#### 목적

새 모임 생성과 모임장 설정을 연결하고 1~4주 주기 및 멤버 순서를 관리한다.

#### 분류와 선행 작업

- 관리 ID: BK-09 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 02 교환독서
- 선행 작업: BK-02, BK-03, BK-04, BK-05

#### 근거

- [C2 모임 참여 · 초대 코드](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20323)
- [C7 교환독서 모임 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6175)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] C7 폼을 생성/수정 모드로 구성하고 이름·1/2/3/4주 주기·멤버 순서를 저장한다.
- [ ] 드래그 재정렬과 접근 가능한 대체 조작을 제공한다.
- [ ] 모임장 설정 권한, 초대 링크 복사, 일반 멤버 탈퇴 진입을 구현한다.
- [ ] 진행 중 설정 변경·탈퇴·위임은 BK-01의 확정 정책에 따라 제한하거나 처리한다.

#### 완료 조건

- [ ] 모임 생성 후 C3으로 이동하고 C1에 표시된다.
- [ ] 권한 없는 사용자의 설정 변경을 서버가 거절한다.
- [ ] 순서 저장 후 중복/누락 멤버가 없으며 진행 중 순환을 손상시키지 않는다.

#### 결정할 사항과 경계

- 생성 시 도서 선택과 순환 시작 시점은 BK-12/BK-13과 연결한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-10"></a>

### BK-10 · 6자리 초대 코드와 링크로 모임을 미리 보고 참여한다

<!-- sharereading-backlog:BK-10 -->
#### 목적

초대 코드를 받은 사용자가 모임 정보 확인 후 참여할 수 있도록 한다.

#### 분류와 선행 작업

- 관리 ID: BK-10 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 02 교환독서
- 선행 작업: BK-03, BK-04, BK-05, BK-09

#### 근거

- [C2 모임 참여 · 초대 코드](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20323)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 6자리 입력과 붙여넣기, GET /api/groups/preview?code=, POST /api/groups/join을 구현한다.
- [ ] 기존 /invite/[code]를 같은 참여 흐름으로 연결한다.
- [ ] 잘못된/만료된 코드, 이미 참여한 사용자, 정원 초과, 진행 중 참여 제한을 처리한다.
- [ ] 미리보기에는 참여 판단에 필요한 최소 정보만 표시한다.

#### 완료 조건

- [ ] 한 번의 참여로 멤버십이 하나만 생성되고 C3으로 이동한다.
- [ ] 동시 참여로 정원이 초과되지 않는다.
- [ ] 비로그인 상태에서 인증 후 코드와 참여 의도가 유지된다.

#### 결정할 사항과 경계

- 코드 만료/재발급과 진행 중 가입 허용 정책은 BK-01에서 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-11"></a>

### BK-11 · 내 모임 목록과 상태 필터 및 생성·참여 진입을 구현한다

<!-- sharereading-backlog:BK-11 -->
#### 목적

본인이 참여한 모임의 상태와 다음 행동을 보여준다.

#### 분류와 선행 작업

- 관리 ID: BK-11 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 02 교환독서
- 선행 작업: BK-02, BK-03, BK-04, BK-09, BK-10

#### 근거

- [C1 모임 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-3983)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/groups로 모임 카드, 인원, 현재 책, 다음 순서, 배송/완료 정보를 조회한다.
- [ ] 전체·진행 중·완료 필터와 C3 상세 진입을 구현한다.
- [ ] 모임이 없을 때 초대 코드 참여와 새 모임 만들기를 안내한다.

#### 완료 조건

- [ ] 다른 사용자의 비참여 모임은 목록에 나타나지 않는다.
- [ ] 필터 결과와 상태 배지가 서버 데이터와 일치한다.
- [ ] 로딩·빈 목록·실패/재시도 상태가 제공된다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-12"></a>

### BK-12 · 도서 검색과 실물 책 등록 및 모임 연결을 구현한다

<!-- sharereading-backlog:BK-12 -->
#### 목적

외부 도서 정보를 검색하고 사용자가 돌려 읽을 실제 책을 모임에 등록한다.

#### 분류와 선행 작업

- 관리 ID: BK-12 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 02 교환독서
- 선행 작업: BK-01, BK-02, BK-04, BK-05, BK-09

#### 근거

- [D1 책 검색 (도서 API)](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-6887)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/books?q=로 선택한 공급자의 도서 검색을 중계한다.
- [ ] 검색 결과의 표지·제목·저자·출판사·식별자를 표시하고 선택/등록을 구현한다.
- [ ] 표지/쪽수 누락·빈 검색·요청 실패를 처리하고 공급자 비밀키는 서버에 보관한다.
- [ ] 도서 메타데이터와 본인 소유 실물 책 및 모임 참여 기록을 구분해 저장한다.
- [ ] C3 책 변경과 D4 다시 교환 진입에서 선택 문맥을 유지한다.

#### 완료 조건

- [ ] 검색한 책이 소유자 및 모임에 연결되고 서재에서 확인된다.
- [ ] 동일 ISBN의 여러 실물 책이 충돌하지 않는다.
- [ ] 진행 중 책 교체는 확정 정책에 따라 처리되며 과거 기록을 덮어쓰지 않는다.

#### 결정할 사항과 경계

- 외부 API 쪽수 미제공 시 수동 입력/진도 비활성화 방식을 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-13"></a>

### BK-13 · 교환독서의 발송·수령·반환 상태 전이와 순환 완료 판정을 구현한다

<!-- sharereading-backlog:BK-13 -->
#### 목적

각 실물 책이 지정 순서대로 이동하고 마지막에 원소유자에게 돌아가는 과정을 서버가 관리한다.

#### 분류와 선행 작업

- 관리 ID: BK-13 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 02 교환독서
- 선행 작업: BK-01, BK-04, BK-09, BK-12

#### 근거

- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [C4 알림 팝업 · 5권 순환 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-18007)
- [B3 도착 확인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15730)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 책별 소유자·보유자·다음 독자·라운드·읽기/배송/수령/완료 상태 전이를 정의한다.
- [ ] POST /api/groups/[id]/send와 배송 receive 처리를 트랜잭션 및 중복 요청 방어와 연결한다.
- [ ] 도서 전체의 순환과 반환 조건을 계산하고 group.rotation_completed 이벤트를 생성한다.
- [ ] 주기 변경과 진행 중 순서 변경 등 예외는 BK-01의 정책으로 처리한다.

#### 완료 조건

- [ ] 정해진 인원·도서 수의 시나리오에서 모든 책이 빠짐없이 원소유자에게 반환된다.
- [ ] 발송/수령 중복 클릭과 동시 요청으로 보유자가 둘이 되거나 순서가 건너뛰지 않는다.
- [ ] 현재 보유자 외 발송과 수령 대상 외 수령이 거절된다.
- [ ] '5권' 하드코딩 없이 실제 등록 도서 기준으로 완료가 한 번만 발생한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-14"></a>

### BK-14 · 모임 상세의 픽셀 순환 장면과 멤버별 독서 진도를 구현한다

<!-- sharereading-backlog:BK-14 -->
#### 목적

캐릭터와 책의 이동 방향을 통해 모임 진행을 보여준다.

#### 분류와 선행 작업

- 관리 ID: BK-14 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 02 교환독서
- 선행 작업: BK-02, BK-03, BK-09, BK-12, BK-13

#### 근거

- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] RotationScene에서 캐릭터·이름·상태·라운드·읽는 방향을 서버 데이터로 표시한다.
- [ ] 멤버별 책/현재 페이지/전체 페이지/상태와 진도 입력 진입점을 구현한다.
- [ ] 본인의 상태에 맞는 '다 읽었어요! 다음 사람에게 보내기' 버튼과 책 변경/설정 진입을 연결한다.
- [ ] 설정된 인원 범위에 맞춰 장면 배치와 긴 이름을 처리한다.

#### 완료 조건

- [ ] 화면의 다음 사람과 서버가 계산한 발송 대상이 일치한다.
- [ ] 배송 중이거나 본인 차례가 아닐 때 발송을 잘못 허용하지 않는다.
- [ ] 페이지 진도는 0~전체 쪽수 범위로 검증되고 전체 쪽수 미상도 처리된다.

#### 결정할 사항과 경계

- 진도 입력 전용 화면은 목업에 없으므로 최소 폼/시트 형태를 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-15"></a>

### BK-15 · 배송 상세와 책 수령 확인 및 다음 독자 안내를 구현한다

<!-- sharereading-backlog:BK-15 -->
#### 목적

발송된 책의 상태를 확인하고 실제 수령자가 수령을 기록한다.

#### 분류와 선행 작업

- 관리 ID: BK-15 (GitHub 이슈 번호 아님)
- 우선순위: P0
- 단계: 02 교환독서
- 선행 작업: BK-02, BK-03, BK-05, BK-13

#### 근거

- [B3 도착 확인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15730)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/deliveries/[id]에서 책·모임·보낸 사람·발송 시각·배송 상태를 조회한다.
- [ ] 발송/배송/수령 확인 단계와 '책 받았어요' 및 '아직 도착하지 않았어요' 행동을 구현한다.
- [ ] POST …/receive 성공 후 토스트와 모임 상세 이동, 관련 알림 이벤트를 연결한다.

#### 완료 조건

- [ ] 수령 전까지 읽기 시작/다음 단계가 확정 정책대로 유지된다.
- [ ] 수령을 반복 요청해도 상태와 알림이 중복되지 않는다.
- [ ] 수령 대상이 아닌 사용자의 접근/변경을 거절한다.

#### 결정할 사항과 경계

- 택배사·송장·도착 예정일은 실제 연동/입력 데이터가 있을 때만 표시한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-16"></a>

### BK-16 · 홈에서 진행 중 모임과 읽는 책 및 배송 소식을 조회한다

<!-- sharereading-backlog:BK-16 -->
#### 목적

홈의 예시 카드와 숫자를 실제 사용자 데이터로 구성한다.

#### 분류와 선행 작업

- 관리 ID: BK-16 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 02 교환독서
- 선행 작업: BK-02, BK-03, BK-11, BK-13, BK-20

#### 근거

- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/home에서 사용자 인사, HUD 집계, 배송 배너, 진행 중 모임, 읽는 책을 구성한다.
- [ ] 전체보기·서재 보기·모임 카드·종 아이콘을 올바른 화면으로 연결한다.
- [ ] 모임/책이 없는 첫 사용자에게 다음 행동을 안내한다.

#### 완료 조건

- [ ] 홈의 집계가 모임/서재/알림 상세와 일치한다.
- [ ] 읽는 책과 배송 배너는 본인의 현재 상태를 반영한다.
- [ ] 느린 응답과 오류 시 화면이 비거나 잘못된 예시 데이터를 표시하지 않는다.

#### 결정할 사항과 경계

- HUD 숫자의 정확한 의미는 아이콘/컴포넌트와 함께 확정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-17"></a>

### BK-17 · 발송과 순환 완료 이벤트를 알림으로 저장하고 앱 내 팝업을 표시한다

<!-- sharereading-backlog:BK-17 -->
#### 목적

delivery.sent와 group.rotation_completed를 사용자별 지속 알림과 앱 내 안내로 연결한다.

#### 분류와 선행 작업

- 관리 ID: BK-17 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-02, BK-04, BK-05, BK-13

#### 근거

- [B2 알림 팝업 · 책 도착](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15573)
- [C4 알림 팝업 · 5권 순환 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-18007)
- [B4 알림 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20137)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 이벤트별 대상 수신자를 정의하고 영속 알림을 생성한다.
- [ ] SSE 또는 선택한 Realtime 방식으로 앱 실행 중 이벤트를 전달한다.
- [ ] B2 발송 팝업의 확인/나중에, C4 완료 팝업의 장소 정하기/나중에를 구현한다.
- [ ] 재연결·중복 이벤트·팝업 대기열과 접근 가능한 다이얼로그 동작을 처리한다.

#### 완료 조건

- [ ] 나중에 닫아도 알림 목록에 기록이 남는다.
- [ ] 같은 이벤트 재전달로 알림이나 팝업이 무한히 중복되지 않는다.
- [ ] 비참여 사용자에게 모임 이벤트가 전달되지 않는다.
- [ ] 완료 팝업의 도서 수가 실제 완료 결과와 일치한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-18"></a>

### BK-18 · 알림 목록의 필터·읽음 처리·보관 기간을 구현한다

<!-- sharereading-backlog:BK-18 -->
#### 목적

앱을 닫아 놓았을 때의 소식을 다시 확인할 수 있게 한다.

#### 분류와 선행 작업

- 관리 ID: BK-18 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-03, BK-04, BK-05, BK-17

#### 근거

- [B4 알림 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20137)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/notifications와 PATCH …/read로 전체/읽지 않음 필터 및 개별/모두 읽음 처리를 구현한다.
- [ ] 발송·도착 알림은 배송 상세로, 순환 완료는 모임 장소 화면으로 연결한다.
- [ ] 목업의 30일 보관 기준에 맞춰 조회/정리 정책을 구현하고 페이지네이션 또는 추가 로딩을 제공한다.

#### 완료 조건

- [ ] 읽지 않은 개수와 목록/홈 배지가 일치한다.
- [ ] 다른 사용자의 알림을 읽음 처리할 수 없다.
- [ ] 대상 삭제·접근 권한 변경 시 안내 후 안전한 화면으로 이동한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-19"></a>

### BK-19 · 종류별 알림 설정과 웹 푸시 및 리마인더를 구현한다

<!-- sharereading-backlog:BK-19 -->
#### 목적

앱 내 알림과 브라우저 푸시 권한을 구분하고 사용자의 수신 선택을 반영한다.

#### 분류와 선행 작업

- 관리 ID: BK-19 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-01, BK-04, BK-05, BK-17, BK-27

#### 근거

- [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576)
- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [B2 알림 팝업 · 책 도착](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15573)
- [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] PATCH /api/me/notification-settings로 전체·발송·도착·내 차례·모임 소식·주간 리마인더·마케팅 선택을 저장한다.
- [ ] pushOptIn 초기값과 브라우저 허용/거절/미지원 상태를 구분한다.
- [ ] 사용자 조작에 따라 푸시 구독을 등록/해제하고 서버 전달 실패 및 만료 구독을 처리한다.
- [ ] 주 1회 독서 진도 및 확정 모임 2시간 전 알림을 시간대와 중복 방지를 포함해 예약한다.

#### 완료 조건

- [ ] 가입 후 설정값이 보존되며 실패한 토글 변경을 성공처럼 표시하지 않는다.
- [ ] 전체/종류별 끄기와 마케팅 별도 동의를 발송에 반영한다.
- [ ] 권한 거절/미지원 기기에서도 인앱 알림을 확인할 수 있다.
- [ ] 예약 재실행으로 동일 알림이 반복 발송되지 않는다.

#### 결정할 사항과 경계

- 마케팅 발송 기능 자체는 목업에서 정의되지 않아 수신 설정 범위를 넘겨 만들지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-20"></a>

### BK-20 · 내 서재에서 읽는 중·배송 중·완료 도서를 조회한다

<!-- sharereading-backlog:BK-20 -->
#### 목적

개인의 도서 상태와 현재 교환독서 진행을 한곳에서 확인한다.

#### 분류와 선행 작업

- 관리 ID: BK-20 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-02, BK-03, BK-04, BK-05, BK-12, BK-13

#### 근거

- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/library?status=로 상태별 탭과 개수, 책/모임/진도/배송 안내를 표시한다.
- [ ] 책 기록·배송 상세·도서 검색 및 읽은 책 전체보기로 이동시킨다.
- [ ] 표지 누락·빈 상태·다수 모임의 동일 책을 처리한다.

#### 완료 조건

- [ ] 읽는 중/배송 중/완료 분류가 서버 순환 상태와 일치한다.
- [ ] 다른 모임의 같은 책을 구별할 수 있다.
- [ ] 탭 전환·새로고침 후에도 실제 데이터가 유지된다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-21"></a>

### BK-21 · 읽은 책을 책장 형태로 모으고 연도·모임 필터와 통계를 제공한다

<!-- sharereading-backlog:BK-21 -->
#### 목적

완료된 독서 경험을 기록 단위로 탐색할 수 있게 한다.

#### 분류와 선행 작업

- 관리 ID: BK-21 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-02, BK-03, BK-04, BK-20

#### 근거

- [D3 읽은 책 모음](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21646)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/library/finished?year= 및 모임 필터 계약을 정한다.
- [ ] 읽은 책 수·함께한 모임·함께 읽은 친구 집계와 3열 책장 그리드를 구현한다.
- [ ] 전체/연도/모임 필터, 책 선택 후 D4 이동, 누락 표지 대체를 구현한다.

#### 완료 조건

- [ ] 재독/동일 책의 여러 모임 참여에 대한 집계 규칙이 명시되어 있다.
- [ ] 연도 경계는 사용자에게 표시하는 기준 시간대와 일치한다.
- [ ] 필터 없는/결과 없는 상태와 긴 책 제목을 처리한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-22"></a>

### BK-22 · 책별 독서 기록과 나·친구의 한줄평 및 다시 교환하기를 구현한다

<!-- sharereading-backlog:BK-22 -->
#### 목적

책의 독서 기간과 순환 이력을 보존하고 모임 구성원 간 후기를 공유한다.

#### 분류와 선행 작업

- 관리 ID: BK-22 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-02, BK-03, BK-04, BK-05, BK-13, BK-20

#### 근거

- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/books/[id]/record에서 기간·모임·읽는 순서·내/친구 한줄평을 조회한다.
- [ ] PUT …/review로 본인 한줄평 작성/수정, 길이 검증, 빈 후기 상태를 구현한다.
- [ ] 책 ID만으로 모임/회차 기록이 모호한 경우 명시적인 record 식별자를 계약에 포함한다.
- [ ] '이 책 다시 교환하기'에서 C2로 도서 문맥을 전달하고 C6 이후 후기 진입을 연결한다.

#### 완료 조건

- [ ] 다른 사용자의 후기를 수정할 수 없다.
- [ ] 재교환해도 과거 독서 기간/순서/후기가 덮어써지지 않는다.
- [ ] 친구 후기 조회 범위가 모임 권한 정책과 일치한다.

#### 결정할 사항과 경계

- Rating은 컴포넌트 명세에만 있고 화면에 평점이 없어 포함 여부를 BK-01에서 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-23"></a>

### BK-23 · 멤버 위치를 바탕으로 만남 장소 후보를 추천하고 추가한다

<!-- sharereading-backlog:BK-23 -->
#### 목적

순환 완료 후 모임 구성원이 만날 장소 후보를 얻고 직접 추가할 수 있도록 한다.

#### 분류와 선행 작업

- 관리 ID: BK-23 (GitHub 이슈 번호 아님)
- 우선순위: P2
- 단계: 04 만남
- 선행 작업: BK-01, BK-04, BK-08, BK-13

#### 근거

- [C5 만날 장소 정하기](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-19920)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 멤버 주소를 필요한 위치 정보로 변환하고 합의한 중간지점 계산 방식으로 후보를 검색한다.
- [ ] GET/POST /api/groups/[id]/meetup/candidates와 직접 후보 추가를 구현한다.
- [ ] 추천 불가·주소/좌표 누락·공급자 장애일 때 수동 후보 추가 경로를 제공한다.
- [ ] 평균 이동 시간은 경로 계산 근거가 있을 때만 제공한다.

#### 완료 조건

- [ ] 멤버 개인의 상세 주소가 다른 멤버에게 노출되지 않는다.
- [ ] 추천 결과와 직접 후보가 동일한 후보 목록에서 사용 가능하다.
- [ ] 정확한 이동 시간을 계산하지 않았다면 목업의 예시 '평균 18분'을 표시하지 않는다.

#### 결정할 사항과 경계

- 중간지점/이동 시간 계산은 목업에 알고리즘이 없어 결정이 필요하다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-24"></a>

### BK-24 · 만남 장소 투표와 날짜 선택 및 모임장 확정을 구현한다

<!-- sharereading-backlog:BK-24 -->
#### 목적

후보별 투표를 모으고 모임장이 장소와 시간을 확정한다.

#### 분류와 선행 작업

- 관리 ID: BK-24 (GitHub 이슈 번호 아님)
- 우선순위: P2
- 단계: 04 만남
- 선행 작업: BK-02, BK-03, BK-04, BK-05, BK-23

#### 근거

- [C5 만날 장소 정하기](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-19920)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 후보별 표 수·본인 선택을 표시하고 투표/변경 API를 구현한다.
- [ ] 날짜와 시간 입력 및 확정 API를 구현하고 모임장 권한을 검사한다.
- [ ] 투표 동시 요청, 후보 삭제/수정, 이미 확정된 모임을 처리한다.
- [ ] 투표와 참석 의사를 별도로 모델링하거나 동일시할 정책을 명시적으로 결정한다.

#### 완료 조건

- [ ] 중복 요청으로 사용자의 표 수가 증가하지 않는다.
- [ ] 모임장 외 확정을 거절하며 동시 확정에도 하나의 일정만 남는다.
- [ ] 장소/일시 누락을 검증하고 모든 멤버가 같은 확정 결과를 본다.

#### 결정할 사항과 경계

- 단일/복수 투표, 투표 변경/마감, 동률, 일정 수정/취소와 참석 확인 방식은 확정 전 결정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-25"></a>

### BK-25 · 확정 모임의 일정·참석 요약과 캘린더·지도 연결을 구현한다

<!-- sharereading-backlog:BK-25 -->
#### 목적

확정한 만남을 확인하고 외부 캘린더/지도에서 사용할 수 있게 한다.

#### 분류와 선행 작업

- 관리 ID: BK-25 (GitHub 이슈 번호 아님)
- 우선순위: P2
- 단계: 04 만남
- 선행 작업: BK-02, BK-03, BK-17, BK-24

#### 근거

- [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040)
- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET …/meetup으로 장소·일시·참석 정보를 표시하고 멤버에게 확정 알림을 생성한다.
- [ ] .ics 다운로드와 지도 링크를 제공하고 시간대·장소·제목을 일치시킨다.
- [ ] 2시간 전 알림 예약을 BK-19와 연결하고 만남 후 책 후기 진입을 제공한다.

#### 완료 조건

- [ ] 다운로드한 일정의 날짜/시간/장소가 화면과 일치한다.
- [ ] 투표 참여를 근거 없이 '모두 참석'으로 표시하지 않는다.
- [ ] 확정되지 않은 모임이나 비참여 사용자 접근을 처리한다.

#### 결정할 사항과 경계

- 지도 앱 공급자와 일정 수정/취소 시 알림·캘린더 갱신 정책을 정한다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-26"></a>

### BK-26 · 마이페이지에서 프로필·독서 통계·설정·로그아웃을 연결한다

<!-- sharereading-backlog:BK-26 -->
#### 목적

사용자의 프로필과 설정 진입점을 한곳에 모은다.

#### 분류와 선행 작업

- 관리 ID: BK-26 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-02, BK-03, BK-05, BK-07, BK-08, BK-09, BK-20

#### 근거

- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] GET /api/me로 캐릭터·닉네임·이메일·읽은 책/참여 모임/배송 중 집계를 표시한다.
- [ ] 캐릭터·주소·모임 설정·알림 설정·로그아웃을 연결한다.
- [ ] 여러 모임에 참여했을 때 설정할 모임 선택과 일반 멤버의 접근을 처리한다.

#### 완료 조건

- [ ] 표시한 통계가 서재와 모임 목록의 집계 기준과 일치한다.
- [ ] 설정 저장 후 마이에 최신 프로필이 반영된다.
- [ ] 모임이 없거나 모임장이 아닐 때 설정 진입이 막히지 않고 적절히 안내된다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-27"></a>

### BK-27 · 모바일 PWA 설치와 알림 구독에 필요한 앱 기반을 구성한다

<!-- sharereading-backlog:BK-27 -->
#### 목적

README의 PWA 목표와 목업의 푸시 기능에 필요한 웹 앱 기반을 구축한다.

#### 분류와 선행 작업

- 관리 ID: BK-27 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 03 기록·알림
- 선행 작업: BK-01, BK-03, BK-05

#### 근거

- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 앱 manifest·아이콘·이름·시작 URL·표시 모드를 구성한다.
- [ ] 선택한 푸시 방식에 필요한 service worker와 알림 클릭 딥링크를 구성한다.
- [ ] 오프라인 안내와 네트워크 복귀를 처리하고 인증 데이터의 캐시 범위를 명시한다.

#### 완료 조건

- [ ] 지원 환경에서 설치 후 올바른 시작 화면과 내비게이션을 사용할 수 있다.
- [ ] 푸시 클릭 시 로그인 상태를 확인하고 해당 배송/모임으로 이동한다.
- [ ] 오프라인에서 발송/수령을 완료한 것처럼 표시하거나 다른 사용자의 데이터를 캐시로 노출하지 않는다.

#### 결정할 사항과 경계

- 완전한 오프라인 편집·동기화는 목업 요구가 아니므로 별도 범위 결정 없이 추가하지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-28"></a>

### BK-28 · 가입부터 책 반환·만남까지 주요 흐름을 자동 검증하고 출시 조건을 점검한다

<!-- sharereading-backlog:BK-28 -->
#### 목적

현재 정적 검사/health 중심 검증을 실제 다중 사용자 교환독서 흐름까지 확장한다.

#### 분류와 선행 작업

- 관리 ID: BK-28 (GitHub 이슈 번호 아님)
- 우선순위: P1
- 단계: 05 검증
- 선행 작업: BK-06, BK-10, BK-13, BK-15, BK-18, BK-19, BK-21, BK-22, BK-25, BK-26

#### 근거

- [A1 시작 · 로그인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2)
- [A2 회원가입](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-628)
- [A3 프로필 캐릭터 선택](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-1598)
- [B1 홈](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=13-2826)
- [B2 알림 팝업 · 책 도착](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15573)
- [B3 도착 확인](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=34-15730)
- [B4 알림 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20137)
- [C1 모임 목록](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-3983)
- [C2 모임 참여 · 초대 코드](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-20323)
- [C3 모임 상세 · 피크닉 순환](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-4953)
- [C4 알림 팝업 · 5권 순환 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-18007)
- [C5 만날 장소 정하기](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=35-19920)
- [C6 장소 확정 완료](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=38-21040)
- [C7 교환독서 모임 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6175)
- [D1 책 검색 (도서 API)](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=14-6887)
- [D2 내 서재](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5719)
- [D3 읽은 책 모음](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21646)
- [D4 읽은 책 상세](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=39-21886)
- [E1 마이페이지](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-5921)
- [E2 주소 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6121)
- [E3 알림 설정](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=16-6576)
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 가입→모임 생성/초대→책 등록→발송/수령→전체 순환/반환→서재 기록을 자동 검증한다.
- [ ] 순환 완료→후보/투표→모임장 확정→일정/후기 흐름을 검증한다.
- [ ] 권한 없는 접근·중복 발송/수령·동시 참여/투표·인증 만료·공급자 장애를 포함한다.
- [ ] 390px·작은 화면·safe area·키보드·다이얼로그·빈/오류/로딩 상태와 실제 기기 푸시를 확인한다.
- [ ] lint/typecheck/build 및 DB smoke test를 유지하고 주요 기능 검증을 CI에 연결한다.

#### 완료 조건

- [ ] 순환 과정에서 실물 책 분실/중복 보유/반환 누락이 없음을 자동으로 확인한다.
- [ ] 목업의 모든 화면이 적어도 한 사용자 흐름에 연결된다.
- [ ] 외부 공급자 설정, 마이그레이션, 운영 알림 작업과 알려진 제한이 배포 문서에 남아 있다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.

---

<a id="bk-29"></a>

### BK-29 · 기존 발제 책갈피 요구사항의 유지 여부와 화면·데이터 범위를 정한다

<!-- sharereading-backlog:BK-29 -->
#### 목적

README에 있는 발제 책갈피가 이번 목업에서는 빠져 있어 누락인지 후속 기능인지 확정한다.

#### 분류와 선행 작업

- 관리 ID: BK-29 (GitHub 이슈 번호 아님)
- 우선순위: P2
- 단계: 범위 결정
- 선행 작업: BK-01

#### 근거

- README의 발제 책갈피 요구사항. 이번 Figma 목업에는 대응 화면 없음.
- [Flow Map · 라우트 표 · 개발 메모](https://www.figma.com/design/1d7HcgcplWxg2JdcXoHv1N?node-id=41-2)
- 기준: 현재 코드에는 모바일 경로/자리 표시 화면, PostgreSQL health API와 CI만 있음. 이 이슈는 구현 작업이며 미완료 상태임.

#### 구현 범위

- [ ] 현재 README의 '책마다 발제 책갈피를 남긴다' 요구와 D4 한줄평의 차이를 정리한다.
- [ ] 포함한다면 작성자·연결 책/순환·페이지·발제 내용·열람 범위·수정 권한과 진입 화면을 정의한다.
- [ ] 후속 범위라면 이유와 추후 작업을 기록하고 MVP 완료 조건과 구분한다.

#### 완료 조건

- [ ] 발제 책갈피가 MVP 포함/후속/제외 중 어느 상태인지 명확하다.
- [ ] 포함 결정 시 화면과 API 완료 조건이 있는 후속 구현 이슈로 분리된다.

#### 결정할 사항과 경계

- 목업에 없는 기능이므로 임의로 한줄평과 동일한 것으로 취급하지 않는다.

#### 검증

- 위 완료 조건의 정상 흐름 및 권한/실패/중복 요청 중 해당되는 경계를 검증한다.
- 코드 변경 시 lint/typecheck/build를 실행하고, 화면 변경 시 해당 Figma 화면과 모바일 상태를 비교한다.
