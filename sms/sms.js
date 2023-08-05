var request = require('request');
var CryptoJS = require('crypto-js');

let send_message = (phone, text) => {
    var user_phone_number = phone;//수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = 'ncp:sms:kr:283399960131:store_reservation_system'; //서비스 ID
    const secretKey = 'vGPparPQbl5O4hStXb9ProhOWE7XdhFsuo3mQz1k';// Secret Key
    const accessKey = 'cIwMSA071UAG5IhJ3VGG';//Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
        method: method,
        json: true,
        uri: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        body: {
            type: "SMS",
            countryCode: "82",
            from: "01037225398", // 발신 전화번호
            content: text,//문자내용 기입,
            messages: [
                { to: `${user_phone_number}`, },],
        },
    },
        function (err, res, html) {
            if (err) console.log(err);
            else { resultCode = 200; console.log(html); }
        }
    );
    return resultCode;
}

module.exports = send_message;
