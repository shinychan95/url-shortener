# URL-Shortener

### 최소 기능
- URL 입력 폼 제공
- 단축 후 결과 출력
- 동일한 URL을 입력할 경우 항상 동일한 shortening 결과 값이 나와야 함
- Shortening의 결과 값은 8문자 이내로 생성
- 브라우저에서 shortening URL을 입력하면 원래 URL로 리다이렉트
- 도메인은 localhost로 처리

### 참고
- [링크](https://codeburst.io/creating-custom-url-shortener-with-nodejs-de10bbbb89c7)

### 추가한 기능
- NGINX를 통한 URL 리다이렉트
- URL이 유효한 지 검사
- 귀여운 프론트엔드 사진 전환

### 실행
- 실행에 앞서 Node.js, MongoDB, NGINX 설치 필요
  - node: v10.16.0
  - npm: v6.9.0
  - nodemon: v1.19.1
  - MongoDB shell version v4.2.2
  - NGINX: 1.16.1
- client, Server
  - ```npm install```
  - ```npm start```
- MongoDB
  - ```mongod``` (MongoDB 서버 실행)
- NGINX
  - ```nginx.exe```

### 피드백(리팩토링 완료)
- Shortening ID 변환에 있어서 난수 생성이 아닌 base 62 사용
- DB: Default object id generator가 아니라, 오름차순 숫자 index
- DB: shortUrl 데이터 생성 시 localhost 제거 (굳이 필요 없음)
- ID index를 결정할 때, base 62 변환 시 8 글자 되려면 100만부터 하면 됨.
- (이전 프로젝트에서) MySQL 사용 시 TEXT형 데이터 절대 NO
- var, char: 가변 길이
- 데이터 1억개 되었을 때도 효율적이려면: Encoding 된 데이터를 디코드해서 바로 key 접근
- 누가봐도 이해할 수 있는 코드에 대해서는 주석 생략

### 자세한 정리
- [블로그](https://velog.io/@shinychan95)
