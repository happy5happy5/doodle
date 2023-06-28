import requests
import json
import os
import urllib

# API 인증 정보
client_id = "qMJ2CTq8Fmpm_NLbLfSY"
client_secret = "PJXKGOEXbl"

# 검색어 설정
query = "강아지"

# API 요청 URL 설정
url = "https://openapi.naver.com/v1/search/image?query=" + query

# API 요청 헤더 정보 설정
headers = {"X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret}

# API 요청 보내기
response = requests.get(url, headers=headers)

# API 응답 결과 확인
if response.status_code == 200:
    data = json.loads(response.text)
    print("Total:", data['total'])
    for item in data['items']:
        print("Title:", item['title'])
        print("Link:", item['link'])
        print("Thumbnail:", item['thumbnail'])
        print("Sizeheight:", item['sizeheight'])
        print("Sizewidth:", item['sizewidth'])
        print()

        # 이미지 다운로드
        if not os.path.exists(query):
            os.makedirs(query)
        urllib.request.urlretrieve(item['link'], query + "/" + item['title'] + ".jpg")
else:
    print("Error Code:", response.status_code)
