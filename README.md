# react_shoppingmall

## 진행상황

- 위클리베스트 디테일 주소 정해지면 링크 넣어야됨
- 장바구니 thunk 이용 해야됨
- 아이패드 참고

## 서버쪽 해야할 것

- 카카오페이API, 결제, 상세페이지(회원과 비회원 구분)

## error

1. Expected `onClick` listener to be a function, instead got a value of `object` type.

- redux-toolkit을 사용하다 만난 에러, 페이지 번호를 누르면 페이지번호와 카테고리를 리덕스로 넘겨주는 함수를 onclick에 담았는데 그냥 dispatch로 보내서 난 에러, ()=>이렇게 함수 형태로 보내야한다!

2. 페이지를 눌렀을 때 깜빡이는 현상

- useEffect의 실행조건에 대해서 더 공부할 수 있었다

3. 페이지네이션 클릭 리듀서를 같이 사용하다보니 다른 탭에서 누른 페이로드가 그대로 변하지않고 사용됨.. 어떡하지..?ㅋㅋㅋ
