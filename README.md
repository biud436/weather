# 소개
향후 5일 간의 날씨를 확인하는 사이트입니다. 

# 설치 방법
이 사이트 구축에는 Open Weather Map의 API 키와 Node.js가 필요합니다. 

먼저 저장소를 복제하거나 압축 파일로 내려 받으시기 바랍니다.

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/biud436/biud436.github.com/tree/master/weather">링크</a>에 접속하면 이 저장소를 ZIP 압축 파일로 내려 받을 수 있습니다.

그 다음에는 ```js/App.js``` 파일에서 다음 라인을 수정해야 합니다.

```diff
- 57: const API = window.atob(`ZjVmOTYzOTAxYmM3YTdkZjU2YjczMzIzY2EwMGFlNDc=`);
+ 57: const API = "YOUR_API_KEY";
```

위 라인의 API 키를 획득하려면 Open Weather Map에 가입하신 다음에 API를 취득하셔야 합니다.

Node.js는 웹팩 번들링을 위해 사용됩니다.

본 사이트는 자바스크립트 파일을 객체 별로 모듈화 해놓았기 때문에 불 필요한 네트워크 트래픽이 늘어납니다. 따라서 이를 제거하기 위해 웹팩 번들러를 추가하였습니다.

그러나 웹팩은 덩치가 크고 복잡하기 때문에 사용하시려면 설정을 다음과 같이 정확히 해주시기 바랍니다. 먼저 Node.js 설치 후, 저장소가 있는 디렉토리에서 다음 명령을 호출하시기 바랍니다.

```bat
npm intall -D
```

이렇게 하면 필요한 라이브러리가 모두 설치됩니다. 또는 다음과 같이 수동으로 진행하시기 바랍니다.

```bat
npm intall -y
npm install -D webpack webpack-cli
npm install --save-dev style-loader css-loader
npm install --save-dev file-loader
```

본 사용법은 향후 웹팩 버전이 바뀌면 유효하지 않을 수도 있으니 주의 바랍니다.

웹팩을 사용하지 않으려면 다음과 같이 ```index.html``` 파일을 열고, 맨 아래 쪽에 있는 ```<script src="./dist/bundle.js"></script>``` 라인을 지우고, 대신 ```<script type="module" src="./js/index.js"></script>``` 라인을 추가해주시기 바랍니다.

```diff
- <script src="./dist/bundle.js"></script>
+ <script type="module" src="./js/index.js"></script>
```

번들러를 사용하지 않을 경우, 최신 브라우저에서만 동작합니다. 또한 이 경우에는 안드로이드 킷캣 같은 오래된 브라우저에서는 무한 로딩 문제가 생길 수도 있습니다. 