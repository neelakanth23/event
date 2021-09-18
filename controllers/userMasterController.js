const httpCodes = require('../helper/httpCodes');
const db = require('../db');



exports.addUserMaster = async (req, res) => {
try{

    var created_date = new Date();
        var data=[ 
                    req.body.full_name,
                    req.body.user_name,
                    req.body.password,
                    req.body.coins,
                    created_date
                    ]
                var insertQuery = 'INSERT INTO user (full_name, user_name, password, coins, created_date) VALUES (?,?,md5(?),?,?)';
                db.query(insertQuery, data,(err,result)=>{
                    if (err) throw err;
                    console.log(err)
                    console.log(data)
                    res.status(httpCodes.Created).json({message:"Record added Successfully"})
                })
        
    
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}



exports.getUserMaster = async (req, res) => {
    try {
        await db.query('SELECT * FROM user ORDER BY user_id DESC', (err, result) => {
            if (err) throw err;
            console.log(result)
            res.status(httpCodes.OK).json(result);
        })
    } catch (err) {
        res.status(httpCodes.InternalServerError).json({
            error_message: "could not get all details",
            error: err
        })
    }
    
}



exports.getUserMasterById = async (req, res) => {
    try {
        UserId = [req.params.user_id];
        let sql = "SELECT * FROM user where user_id=?";
        db.query(sql, registrationId, (err, result) => {
            if (err) throw err;
            console.log(err)
            console.log(result)
            if (result == 0) {
                res
                    .status(httpCodes.BadRequest)
                    .json({ message: "Id does not exists" });
            } else {
                res.status(httpCodes.OK).json(result);
                console.log(result)
            }
        })

    } catch (err) {
        console.log(err.message);
        res.status(httpCodes.InternalServerError).json(err.message);
    }

   
}



exports.updateUserMasterByUserId = async (req, res) => {
    try {
        var updated_date = new Date();
        var UserId = req.params.user_id;
        var data = [
                    req.body.full_name,
                    req.body.user_name,
                    req.body.password,
                    req.body.coins,
                    updated_date,
                    UserId
                    ]
                    console.log(data)
        var updateQuery = 'UPDATE user SET full_name=?, user_name=?, password=md5(?), coins=?, updated_date=? WHERE user_id=?';
        await db.query(updateQuery, data, (err, result) => {
            console.log(result)
            res.status(httpCodes.Created).json({ message: "record updated Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

  
}




exports.deleteUserMasterById = async (req, res) => {
    try {
        var UserId = req.params.user_id;
        var data = [
            UserId]
        var deleteQuery = 'DELETE FROM user WHERE user_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log(result)
            console.log("user deleted succesfully");
            res.status(httpCodes.Created).json({ message: "user deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
 
    }
}