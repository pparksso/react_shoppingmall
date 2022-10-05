# react_shoppingmall

![main](https://user-images.githubusercontent.com/100568355/194115902-0d44de6b-eec4-4793-8c81-55393c725b3e.gif)

---

### 목적 
 - react를 더 공부하고, server와 접목해보기 위해 만든 간단한 쇼핑몰 웹페이지입니다.
 
### 사용언어
 - javascript
 
### 서버 
 - nodejs express
 
### 데이터베이스
 - mongoDB(mongoose)
 
### 개발 인원
 - 1인
 
### 개발 기간
 - 17일
 
### 라우터 구조
| 메소드 | 주소                | 라우터     |              역할               |
| ------ | :------------------ | :--------- | :-----------------------------: |
| POST   | /isLogined          | user.js    |           로그인 인증            |
| POST   | /join               | ''         | 회원가입 페이지를 통한 회원가입   |
| POST    | /emailCheck         | ''         |    이메일 중복 체크              |
| POST   | /login              | ''         |회원가입 페이지를 통한 회원의 로그인|
| POST   | /kakaologin         | ''         |카카오를 통한 회원가입, 로그인    |
| POST   | /logout             | ''         |            로그아웃             |
| POST   | /withdrawal         | ''         |           회원 탈퇴             |
| POST   | /mypage             | ''         |          회원 정보              |
| POST    | /editinfo           | ''         |    수정된 회원정보 저장          |
| GET    | /                   | item.js    |        상품 정보 제공           |
| GET    | /category/:category | ''         |   카테고리 별 상품 제공         |
| GET   | /best               | ''         |        weekly best 상품 제공   |
| POST    | /                   | cart.js    | cart 품목에 담기              |
| POST   | /cartview           | ''         |  cart에 담긴 상품 제공         |
| POST    | /del                | ''         | 장바구니에 담긴 상품 삭제       |
| POST   | /pay                | ''         |       카카오페이 결제       |


### 컴포넌트 구조

```
/components
  ├── Cart
    ├── /CanclePay.js
    ├── /CartPage.js
    ├── /FailPay.js
    ├── /PayBox.js
    ├── /PayBtn.js
    └── /SuccessPay
  ├── Err
    ├── /NotFound.js
    └── /ServerErr.js
  ├── Footer
    └── /Footer.js
  ├── Header
    ├── /Header.js
    └── /UtilMenu.js
  ├── Items
    ├── /CartBtn.js
    ├── /Item.js
    └── /Weekly.js
  ├── Main
    ├── /Category.js
    ├── /Main.js
    └── /Pagination.js
  ├── Product
    ├── /Detail.js
    └── /Product.js
  └── User
    ├── /IsLogined.js
    ├── /KakaoLoginBtn.js
    ├── /KakaoRedirect.js
    ├── /Login.js
    ├── /LogoutBtn.js
    ├── /Mypage.js
    └── /Register.js
```

### 주요 기능

![login](https://user-images.githubusercontent.com/100568355/194115754-89afa454-83ef-4b24-a45b-00ed74b619c7.gif)
- 카카오 로그인
 1. REST API를 이용해 카카오 로그인(회원가입), 로그아웃 구현
 
![pay](https://user-images.githubusercontent.com/100568355/194115823-39c2d60a-d189-43f3-8a7d-2c92efe84767.gif)
- 장바구니 페이지
 1. 상품 페이지에서 장바구니를 클릭하면 장바구니에 품목이 반영
 2. 장바구니 페이지에서 물품 삭제 가능
 3. 장바구니에 담긴 상품들 총 구매금액 실시간 확인 가능
- 카카오 페이
 1. 장바구니에서 카카오페이 결제 가능
 
 ### 아쉬웠던 부분
 - 결제내역 페이지 만들기, 장바구니페이지에서 수량 수정 로직 고민 중.. 수량 수정 마다 서버로 전송하는 게 좋은지, 리덕스에 저장해서 다른페이지로 이동 시 로그인 인증을 통해 수정하게 하는게 좋을 지 고민중
 - 배포 시 랜더링 시간 최대한 짧게 만들기
 


### <a href="https://ilbisonte.herokuapp.com/">배포</a>
### <a href="https://velog.io/@pparksso/react-nodejs-Toy-Project-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%87%BC%ED%95%91%EB%AA%B0-%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8" >error</a>

<<<<<<< Updated upstream
=======
8. heroku 에서 배포를 진행하는데 모듈을 찾을 수 없다고 계속 뜨는 이유! 폴더명을 바꿔도 깃허브에서는 인식하지 못한다... 하... 일일히 다시 바꿔줘야됨

9. 개발 단계에서는 문제가 없었는데 배포하고 난 후, 직접 url로 코드 등을 받아오는 카카오 api에서 문제가 있었다. 이리저리 테스트를 해보니 주소창에 직접 url를 입력하니 같은 오류가 나는것을 발견하고 검색해보았다. 찾아보았더니 주소창에 직접 입력하는 url은 클라이언트가 아닌 서버로 요청이 가는데, 서버에 그 url이 없으면 응답해 줄 파일이 없고, 이에 따라 클라이언트가 오류가 발생하는것이었다.

10. 카카오페이 결제가 완료 됐는데도 500페이지로 이동되는 이슈가 있었다. 정상적으로 동작하여 메인페이지로 이동될 때도 있고, 완료 후 500페이지로 이동될 때도 있었는데 도저히 이유를 모르겠음...
>>>>>>> Stashed changes
