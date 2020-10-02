# 소개
향후 5일 간의 날씨를 확인하는 사이트입니다. 

# 설치 방법
이 사이트를 구축에는 Open Weather Map의 API 키와 Node.js가 필요합니다. 

먼저 저장소를 복제하거나 압축 파일로 내려 받으시기 바랍니다.

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/biud436/biud436.github.com/tree/master/weather">링크</a>에 접속하면 이 저장소를 ZIP 압축 파일로 내려 받을 수 있습니다.

그 다음에는 ```js/App.js``` 파일에서 다음 라인을 수정해야 합니다.

```diff
- 57: const API = window.atob(`ZjVmOTYzOTAxYmM3YTdkZjU2YjczMzIzY2EwMGFlNDc=`);
+ 57: const API = "YOUR_API_KEY";
```

위 라인의 API 키를 획득하려면 Open Weather Map에 가입하신 다음에 API를 취득하셔야 합니다.

Node.js는 웹팩 번들링을 위해 사용됩니다.

본 사이트는 자바스크립트 파일이 모듈화 되어있기 때문에 불 필요한 네트워크 사용을 줄이기 위한 기술이 적용되어있습니다.

웹팩은 복잡하기 때문에 설정을 다음과 같이 정확히 해주시기 바랍니다. 먼저 Node.js 설치 후, 저장소가 있는 디렉토리에서 다음 명령을 호출하시기 바랍니다.

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