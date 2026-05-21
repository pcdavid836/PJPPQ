# PJPPQ

Documentacion Util:

react native firebase: https://rnfirebase.io/auth/social-auth

react native google signin: https://react-native-google-signin.github.io/docs/original

react native dropdown: https://www.npmjs.com/package/react-native-element-dropdown

react email: https://resend.com/api-keys

VARIABLES DE ENTORNO:

DEBE HABER VARIABLES DE ENTORNO DENTRO DE app-web/apqweb

.env

DATABASE_URL="mysql://root:usuario@localhost:3306/pqdb"

NEXTAUTH_URL="http://localhost:3000"

NEXTAUTH_SECRET="APISECRETA"

RESEND_API_KEY="APISECRETA"

# react email (ahi se manejan los dominios).

NEXT_PUBLIC_MAPS_API_KEY="APISECRETA

DEBE HABER VARIABLES DE ENTORNO DENTRO DE /myapp

.env

GOOGLE_MAPS_KEY = API SECRETA DE GOOGLEMAPS

--------------------------------------------

COMANDOS DE INSTALACION app-web-/apq-web

npm install

//COMANDO DE EJECUCION
npm run dev

COMANDOS DE INSTALACION /myapp

npm install

npm build

npx expo run:android -d " (escanear primero dispositivos moviles o emuladores) "

se requiere android SDK, ADK y lcomponentes que requiera la consola al momento de realizar una build.

//COMANDO DE EJECUCION
npm start