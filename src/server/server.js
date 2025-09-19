// node.js 관련 모든 코드

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

// 웹 서버 실행, 라우팅 생성, 미들웨어 등록 가능
const app = express();

app.use(cors());
app.use(express.json()); // json을 파싱해주는 메서드. req를 사용 할 수 있게함

const PORT = 5000;

// 웹 서버 실행
app.listen(PORT, () => {
    console.log(`web server running at http://localhost:${PORT}`);
});

// DB 접속 정보
const db = mysql.createConnection({
    host: 'localhost',
    user: 'react',
    password: 'Mysql1234!!',
    port: '3306',
    database: 'db_board'
});

// db 연결 테스트
db.connect((err) => {
    console.log('err: ', err);
    
    if (!err) {
        console.log('DB 연결 성공');
    } else {
        console.log('DB 연결 실패');
    };
});

// 라우팅 설정
// 클라우드 요청 처리
app.get('/', (req,res) => { // 핸들러 메서드
    console.log('call get /');
    
    res.send('<h1>Welcome to my home page</h1>');
});


// 게시글 목록 조회
app.get('/api/articles', (req,res) => {
    console.log('게시글 목록 조회 요청');

    const sql = `
        SELECT id, title, writer, DATE_FORMAT(reg_date, '%Y-%m-%d %H:%i') as reg_date
        FROM article
        ORDER BY id DESC`;

    db.query(sql, (err, data) => {
        if (!err) {
            console.log('data: ', data);
            res.json(data);
        } else {
            console.log('error: ', err);
            res.status(500).json({error: 'DB query error'});
        };
    });
});


// 게시글 상세 조회
app.get('/api/articles/:id', (req,res) => {
    const id = req.params.id; // req.params는 url 경로에 포함된 동적인 매개변수를 가져오는 데 사용
    console.log('게시글 상세 조회');

    const sql= `
        SELECT id, title, contents, writer, DATE_FORMAT(reg_date, '%Y-%m-%d %H:%i') as reg_date
        FROM article
        WHERE id = ?`;
    
    db.query(sql, [id], (err, data) => {
        if (!err) {
            console.log('data:', data);
            res.json(data);
        } else {
            console.log('err:', err);
            res.status(500).json({err: 'DB query error'});
        };
    });
});


// 게시글 삭제
app.delete('/api/articles/:id', (req,res) => {
    const id = req.params.id;
    console.log('id:', id);
    

    const sql = `
        DELETE FROM article
        WHERE id = ?
    `;;

    db.query(sql, [id], (err, data) => {
        if (!err) {
            console.log('data:',data);
            res.json({msg: '게시글 삭제 성공'});
            res.sendStatus(200);
        } else {
            console.log('err:', err);
            res.status(500).json({err: 'DB query error'});
        };
    })

})


// 게시글 등록
app.post('/api/articles', (req,res) => {
    const title = req.body.title;
    const writer = req.body.writer;
    const contents = req.body.contents;

    const sql =`
        INSERT INTO article(title, writer, contents)
        VALUES (?, ?, ?)
    `;

    db.query(sql,[title, writer, contents], (err, data) => {
        if (!err) {
            console.log('data:',data);
            res.sendStatus(201).json({id: data.insertId});
        } else {
            console.log('err:', err);
            res.status(500).json({err: 'DB query error'});
        };
    })
})


// 게시글 수정
app.put('/api/articles/:id', (req,res) => {
    const id = req.params.id;
    const title = req.body.title;
    const contents = req.body.contents;

    const sql =`
        UPDATE article SET
            title = ?,
            contents = ?
        WHERE id =?
    `;

    db.query(sql, [title, contents, id], (err, data) => {
        if (!err) {
            console.log('data:',data);
            res.json({msg: '게시글 수정 성공'});
        } else {
            console.log('err:', err);
            res.status(500).json({err: 'DB query error'});
        };
    })
})