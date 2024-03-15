// 채팅 메시지를 표시할 DOM
const chatMessages = document.querySelector('#chat-messages');
// 사용자 입력 필드
const userInput = document.querySelector('#input');
// 전송 버튼
const sendButton = document.querySelector('#send');
// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = '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';
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
});