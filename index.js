const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT||5000;// khai bao 1 hang so
// mở cổng để vào
app.listen(port,function () {
    console.log("Server is running...");
})
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// kêt nối với SQL SERVER và DB để truy vấn dữ liệu
const config = {
    server:"118.70.125.210",
    database:"test",
    user:"sa",
    password:"z@GH7ytQ",
    "options":{
        "encrypt":false,
        "enableArithAbort":true
    }

}
mssql.connect(config,function (err) {
    if(err) console.log(err);
    else console.log("Connected..");    
})

var rq = new mssql.Request();// tao bien truy van du lieu
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// tạo 1 routing để nghe yêu cầu và xử lý
app.get("/danh-muc-san-pham",function (req,res) {
    // tim cac dong xe trogng db va tra cho nguoi dung
    rq.query("select * from T2008M_MDHT_MenuDen ",function (err,rows) {
        if(err) res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/Collections",function (req,res){
    rq.query("select * from T2008M_MDHT_SanphamDen where MaLoaiSp like('Loai01%')",function (err,rows){
        if (err)res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/Products",function (req,res){
    rq.query("select * from T2008M_MDHT_SanphamDen where MaLoaiSp like('Loai02%')",function (err,rows){
        if (err) res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/Demand-product",function (req,res){
    rq.query("select * from T2008M_MDHT_SanphamDen where MaLoaiSp like('Loai03%')",function (err,rows){
        if (err) res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/timkiemSp",function(req,res){
    var thamso= req.query.id;
    rq.query("select  *  from T2008M_MDHT_SanphamDen where ID_Sp = "+thamso+" ",function (err,rows){
        if(err) res.send("Khong the lay du lieu");
        else if (rows.recordset.length>0)
            res.send(rows.recordset);
            else res.send(false);
    })
})
app.get("/Blog",function (req,res){
    rq.query("select * from T2008M_MDHT_Blog",function (err,rows){
        if (err) res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/ChitietBlog",function (req,res){
    var thamsoBlog=req.query.id;
    rq.query("select * from T2008M_MDHT_Blog where ID_Blog="+thamsoBlog+"",function (err,rows){
        if (err) res.send("Khong the lay du lieu");
        else if (rows.recordset.length>0) res.send(rows.recordset);
            else res.send(false);
    })
})