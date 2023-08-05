import axios from 'axios';

// let SendSMS = (userName, userPhone) => {
//     axios.post('/sendSMS', {
//         phone: userPhone,
//         content: `[가야랜드달빛야영장] ${userName}님의 예약이 완료되었습니다.`
//     })
// }

let SendSMS = () => {
    return (
        <button onClick={() => {
            axios.post('/sendSMS', {
                phone: `01037225398`,
                content: `test`
            })
        }}> sms 보내기</button>
    );
};

export default SendSMS; 