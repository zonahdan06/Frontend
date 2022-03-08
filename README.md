# Frontend
1. _actions,_reducers
 : 상태관리 라이브러리인 리덕스 관련 파일 
 : _actions - user_action.js에서 node.js 서버와 연결하여 테스트함

2. component : 페이지들을 모아 놓은 폴더
* BOOK1: 토끼와 거북이 관련 페이지 (AI와 연동 후 수정 / 애니메이션 추가 예정 )
* HomePage: 로고 및 시작 페이지
* LoginPage, SignUpPage: 로그인, 회원가입 페이지 (node.js와 연결함)
* MainPage: 책 고르는 페이지 (임의로 같은 책으로 채워놓음)
* MyPage: 사용자 정보 페이지 (수정 중)

3. App.js : 컴포넌트를 라우팅하기 위한 관리 페이지

4. setupProxy.js : 서버와 연결시 포트 주소가 다를 경우 충돌을 막기 위한 페이지
