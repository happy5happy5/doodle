// client_id = "rAqyU88N7gWQipiDIGjo"
// client_secret="JqMs8hQnOk"
client_id = "qMJ2CTq8Fmpm_NLbLfSY"
client_secret="PJXKGOEXbl"

const button2 = document.getElementById("translateText");

const api_url = 'https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/papago/n2mt';

// const axios = require('axios').default;
// const clientId = '{애플리케이션 등록 시 발급받은 클라이언트 아이디 값}';
// const clientSecret = '{애플리케이션 등록 시 발급받은 클라이언트 시크릿 값}';

console.log('axios start')



axios({
    method: 'post',
    url: api_url,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
        // 'Host':'openapi.naver.com',
        // 'Postman-Token':'dcb60e02-8c89-42d0-baa5-73204a0dc153',
        // 'Cache-Control':'no-cache'

    },
    data: 'source=ko&target=en&text=안녕하세요',
})
    .then((response) => {
        console.log(1)
        console.log(response.data.message.result.translatedText);
    })
    .catch((error) => {
        console.error(error);
    });
