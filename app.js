const express = require('express');
const app = express(); 
const logEvents = require('./middleware/logEvents'); 
const dotenv = require('dotenv');
dotenv.config();


/* 포트 설정 */
app.set('port', process.env.PORT || 3000);
// 4500 || 3000
// or  || : 연산자 앞쪽의 피연산자를 선택하고 싶을 때
// and && : 연산자 뒤쪽의 피연산자를 선택하고 싶을 때

/* 공통 미들웨어 */ 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // qs, queryString


app.use((req, res, next)=>{
    console.log( Date.now(), req.method, req.url );
    logEvents(`${req.method}, ${req.url}`)
    // logger 삽입
    next();
})

// app.use('/', require('./routes/root')); // .js 생략가능
app.use('/users', require('./routes/users')); // .js 생략가능
app.use('/cart', require('./routes/cart')); // .js 생략가능

// 필요한 데이터로 변경하여 사용
app.get('/user', (req,res)=>{
    res.send('user')
})

// 그 외의 라우트 처리


app.use((err, req, res, next)=>{
    console.error( err.message );
    res.send('잠시 후 다시 접속해주세요')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});