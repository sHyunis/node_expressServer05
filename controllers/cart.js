const connection = require('../model/db.js');

const pool = connection();

const getCart = async (req, res) => {
    
    let conn = await pool.getConnection();

    try {
        const sql = `select * from cart;`

        if(conn){
            const result = await conn.query(sql);
            console.log('result', result);
            res.send('장바구니 목록')
        }else{
            res.send('장바구니 목록을 찾을 수 없습니다.')
        }
    } catch (err) {
        console.log('err');
    }finally {
        if(conn) conn.close();
    }

}
const createCart = async (req, res) => {

    const {pname, amount, pprice} = req.body;
    let conn = await pool.getConnection();

    // 같은 회사인지 확인 과정 한번 더 있고,
    // 같은 회사이면 카테고리가 같은지 확인
    try {
        if(conn){
            const sql = `insert into cart(pname, amount, pprice)values (?, ?, ?);`
            //OkPacket { affectedRows: 1, insertId: 5n, warningStatus: 0 }
            const result = await conn.query(sql, [pname, amount, pprice]) 

            console.log(result);
            if(result.affectedRows){
                res.send('장바구니에 넣었습니다.')
            }else{
                res.send('장바구니에 넣을 수 없습니다.')
            }
        }else{
            res.send('장바구니에 넣을 수 없습니다.')
        }
        
    } catch (err) {
        console.log('err');
    }
}

// delete, update : 어차피 body에 넘기기 때문에 전부 post 처리 할 수 있다.
const deleteCart = async (req, res) => {
    const {pname} = req.body;
    
    let conn = await pool.getConnection();
    try {
        const sql = `delete from cart where pname = ?;`
        if(conn){
            const result = await conn.query(sql, [pname]); // 배열로 넘긴다
            if(result.affectedRows){
                res.send('장바구니를 삭제했습니다')
            }else{
                res.send('장바구니를 삭제할 수 없습니다.')
            }
        }else{
            res.send('장바구니 목록을 찾을 수 없습니다.')
        }
    } catch (err) {
        console.log('err');
    }
}
const updateCart = async (req, res) => {
    const {pname, amount, pprice} = req.body;
    let conn = await pool.getConnection();
    
    try {
        const sql = `update cart 
                        set amount = ?, 
                            pprice = ? 
                        where pname = ?;`
                        
        
        if(conn){
            const result = await conn.query(sql, [amount, pprice, pname])

            // 재고 여부와 이벤트 여부를 한 번 더 생각하기
            if(result.affectedRows){
                res.send('장바구니 수정완료')
            }else{
                res.send('재고가 부족합니다.')
            }
        }else{
            res.send('장바구니 목록을 수정할 수 없습니다.')
        }
    } catch (err) {
        console.log('err');
    }
}
// 하나만 자세히 보기
const getParamPname = async (req, res) => {
    try {
        let conn = connection();
        let pool = await conn.getConnection();
        // let conn = await connection().getConnection();
        if(pool){
            res.send('검색한 데이터 리턴')
        }else{
            res.send('장바구니 목록을 찾을 수 없습니다.')
        }
    } catch (err) {
        console.log('err');
    }
}


module.exports = {
    getCart,
    createCart,
    deleteCart,
    updateCart,
    getParamPname
}