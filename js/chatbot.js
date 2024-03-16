// .env 파일을 사용하여 환경변수를 설정
require('dotenv').config();

// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector('#chat-messages');
// 사용자 입력 필드
const userInput = document.querySelector('#input');
// 전송 버튼
const sendButton = document.querySelector('#send');
// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = 'apikey';
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';



sendButton.addEventListener('click', async () => {
    // 사용자가 입력한 메시지
    const message = userInput.value;
    // 메시지가 비어 있으면 리턴
    if (!message) return;
    // 사용자 메시지 화면에 추가
    var template = '<div class="line"> <span class="chat-box mine">' + userInput.value + '</span> </div>';
    chatMessages.insertAdjacentHTML('beforeend', template);
    userInput.value = '';

    // ChatGPT API에 메시지를 전송하고 응답 받기
    const aiResponse = await fetchAIResponse(message);
    // AI 응답 메시지 화면에 추가
    var template = '<div class="line"> <span class="chat-box">' + aiResponse + '</span> </div>';
    chatMessages.insertAdjacentHTML('beforeend', template);
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

async function fetchAIResponse(prompt) {
    // API 요청에 사용할 옵션을 정의
    const requestOptions = {
        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        // API 요청의 바디를 설정
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // 사용할 AI 모델
            messages: [
                {
                    role: 'user',   // 메시지 역할을 user로 설정
                    content: prompt
                },
            ],
            temperature : 0.8, // 다양한 응답을 생성하기 위한 옵션
            max_tokens : 96, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p : 1, // 토큰 샘플링 확률 설정
            frequency_penalty : 0.3, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty : 0.5 // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
        }),
    };
    // API 요청 후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        return aiResponse;
    } catch (error) {
        console.error('API 호출 중 오류 발생', error);
        return '챗봇이 응답하지 못했습니다.';
    }
};