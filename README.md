# 소개
향후 5일 간의 날씨를 확인합니다.

# 설치 방법
이 사이트 구축에는 ```Open Weather Map```의 API 키와 ```Node.js```가 필요합니다. 

먼저 저장소를 복제하거나 압축 파일로 내려 받으시기 바랍니다.

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/biud436/biud436.github.com/tree/master/weather">링크</a>에 접속하면 이 저장소를 ZIP 압축 파일로 내려 받을 수 있습니다.

그 다음에는 ```js/App.js``` 파일에서 다음 라인을 수정해야 합니다.

```diff
- 57: const API = window.atob(`ZjVmOTYzOTAxYmM3YTdkZjU2YjczMzIzY2EwMGFlNDc=`);
+ 57: const API = "YOUR_API_KEY";
```

위 라인의 API 키를 획득하려면 Open Weather Map에 가입하신 다음에 API를 취득하셔야 합니다.

Node.js는 웹팩 번들링을 위한 것으로 모듈화된 자바스크립트 파일을 하나의 파일로 만들기 위해 사용됩니다.

먼저 Node.js 설치 후, 저장소가 있는 디렉토리에서 다음 명령을 호출하시기 바랍니다.

```bat
npm intall -D
```

이렇게 하면 필요한 라이브러리가 모두 설치됩니다. 아니면 다음과 같이 수동으로 설치할 수도 있습니다.

```bat
npm intall -y
npm install -D webpack webpack-cli
npm install --save-dev style-loader css-loader
npm install --save-dev file-loader
```

본 사용법은 향후 웹팩 버전이 바뀌면 유효하지 않을 수도 있습니다.

웹팩을 사용하지 않으려면 다음과 같이 ```index.html``` 파일을 열고, 

맨 아래 쪽에 있는 ```<script src="./dist/bundle.js"></script>``` 라인을 지우고,
```<script type="module" src="./js/index.js"></script>``` 라인으로 대체해주시기 바랍니다.

```diff
- <script src="./dist/bundle.js"></script>
+ <script type="module" src="./js/index.js"></script>
```

번들러를 사용하지 않을 경우 최신 브라우저에서만 동작합니다. 

또한 이 경우에는 ```안드로이드 킷캣``` 같은 오래된 브라우저에서는 무한 로딩 문제가 생길 수도 있습니다.

또한 이 앱은 세로 모드에서는 적합하지 않습니다.

# 단일 프로그램 및 앱 구축
```Electron```이나 ```NW.js```를 사용하면 PC 프로그램으로 빌드를 하실 수 있으며, ```iOS```나 ```Android```에서 돌아가는 패키지를 만들고 싶다면 ```WebView```를 사용하여 웹앱을 만들 수가 있습니다. ```Cordova```를 사용한다면 빠른 빌드가 가능합니다. 이때 JDK가 필요합니다. ```JDK 8``` 이상을 설치하고 환경 변수에 ```JAVA_HOME``` 변수를 설정하셔야 합니다.

```bat
npm install -g cordova 
```

위 명령으로 ```Cordova```를 설치하시고 다음 명령을 실행하면 패키지 폴더가 생성되며 패키지 폴더로 이동하실 수 있습니다.

```bat
cordova create <폴더명> <패키지명> <게임명>
cd <폴더명>
```

필요한 파일들을 모두 <폴더명>/www 폴더에 복사해주신 후 다음 명령을 호출합니다.

```bat
cordova platform add android
```

다음 과정은 서명된 패키지를 만드는 과정입니다. 이 과정은 꽤나 복잡합니다. 우선 ```JDK``` 폴더에 키스토어 도구가 있습니다. 안드로이드의 경우, 패키지 파일을 만드려면 이 키스토어를 이용하여 키저장소 파일을 생성해내야 합니다. 키스토어 파일을 만들 수 있는 방법은 다음과 같습니다.

```bat
SET PACKAGE=me.biud436.testgame
SET KS_PATH=android.jks
SET KS_ALIAS=biud436
SET KS_PASSCODE=android
SET KS_ALIAS_PASSCODE=android
SET CN=%PACKAGE%
SET OU=biud436
SET O=biud436
SET L=Siheung
SET S=Gyeonggi
SET C=KR
keytool -genkey -v -keystore %KS_PATH% -alias %KS_ALIAS% -keyalg RSA -keysize 2048 -validity 10000 -keypass %KS_PASSCODE% -storepass %KS_ALIAS_PASSCODE% -dname "CN=%CN%,OU=%OU%,O=%O%,L=%L%,S=%S%,C=%C%"
```

명령이 꽤나 길기 때문에 위 명령을 배치 파일로 저장하시는 것이 좋습니다. 배치 파일을 실행하여 관련 질문에 답을 하게 되면 ```android.jks``` 파일을 얻을 수 있으며 최종적으로 다음 명령을 통해 APK 파일을 만들어낼 수 있습니다.

```bat
cordova build android --release -- --keystore=android.jks --storePassword=android --alias=biud436 --password=android
```

그러나 위 명령도 너무 길어서 기억할 수가 없습니다. 다음과 같이 ```build.json 파일```을 만들어두면 쉽게 빌드가 가능해집니다.

```json
{ /* build.json */
  "android": {
      "debug": {
          "keystore": "android.jks",
          "storePassword": "android",
          "alias": "biud436",
          "password" : "android",
          "keystoreType": ""
      },
      "release": {
          "keystore": "android.jks",
          "storePassword": "android",
          "alias": "biud436",
          "password" : "android",                
          "keystoreType": ""
      }
  }
}

```

이 경우에 빌드 명령은 다음과 같습니다.

```bat
cordova build android --release --buildConfig=build.json
```

본 웹앱은 세로 방향은 지원하지 않습니다. 따라서 코르도바에서 설정을 강제로 변경해주셔야 합니다. ```config.xml``` 파일을 열고, ```<widget></widget>``` 요소 안에 다음과 같이 새로운 자식 요소를 추가하시기 바랍니다. 

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="me.biud436.testgame" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>TestGame</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
    <author email="biud436@gmail.com" href="https://biud436.blog.me">
        RS Games.
    </author>
    <content src="index.html" />
	<preference name="Orientation" value="landscape"/>
	<preference name="Fullscreen" value="true" />
	<preference name="AllowInlineMediaPlayback" value="true"/>
	<preference name="android-minSdkVersion" value="19"/>
	<preference name="android-targetSdkVersion" value="29"/>	
    <plugin name="cordova-plugin-whitelist" spec="1" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
    <engine name="android" spec="^7.1.4" />
</widget>
```