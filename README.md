# 원티드 프리온보딩 프론트엔드 - 선발 과제

## README.md 필수 작성 사항
- 프로젝트의 실행 방법
- 데모 영상 (배포 링크로 대체 가능)
- 배포 링크

## 과제
### 1. 로그인 / 회원가입
- [x] /signup 경로에 회원가입 기능을 개발
- [ ] /signin 경로에 로그인 기능을 개발
- [x] 이메일 input에 data-testid="email-input" 속성을 부여
- [x] 패스워드 input에 data-testid="password-input" 속성을 부여
- [x] 로그인 button에 data-testid="signin-button" 속성을 부여
- [x] 회원가입 button에 data-testid="signup-button" 속성을 부여

**Assignment 1**
- [x] 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사 
  - 이메일 조건: @ 포함
  - 비밀번호 조건: 8자 이상 
- [x] 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 disabled 속성을 부여


**Assignment 2**
- [x] 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 /signin 경로로 이동

**Assignment 3**
- [ ] 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동
- [ ] 응답받은 JWT를 로컬 스토리지에 저장