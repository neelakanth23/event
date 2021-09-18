const httpCodes = require('../helper/httpCodes');
const db = require('../db');



exports.addEventParticipates = async (req, res) => {
try{
    var created_date = new Date();
        var data=[ 
                    req.body.user_id,
                    req.body.event_id,
                    created_date
                    ]
                var insertQuery = 'INSERT INTO event_participates (user_id, event_id, created_date) VALUES (?,?,?)';
                db.query(insertQuery, data,(err,result)=>{
                    if (err) throw err;
                    var selectEvent='select price from event where event_id=?'
                    db.query(selectEvent,[req.body.event_id],(err,result)=>{
                        if (err) return res.send(err);
                        let amount=result[0].price
                        db.query('select coins from user where user_id=?',[req.body.user_id],(err,result)=>{
                            if(err) res.send(err)
                            let coins=result[0].coins
                            let deductAmount=parseInt(coins)-parseInt(amount)
                            db.query('update user set coins=? where user_id=?',[deductAmount,req.body.user_id],(err,result)=>{
                                if(err) return res.send(err)
                                console.log(result)
                                res.status(httpCodes.Created).json({message:"Event_Participates added Successfully"})
                            })
                        })
                    })
                    // console.log(err)
                    // console.log(data)
                    
                })
        } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}



exports.getEventParticipates = async (req, res) => {
    try {
        await db.query('SELECT e.name, u.full_name from event_participates as ep inner join event as e on ep.event_id=e.event_id inner join user as u on ep.user_id=u.user_id', (err, result) => {
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

// exports.getEventMasterByEventId = async (req, res) => {
//     try {
//         EventId = [req.params.event_id];
//         let sql = "SELECT * FROM event where event_id=?";
//         db.query(sql, registrationId, (err, result) => {
//             if (err) throw err;
//             console.log(err)
//             console.log(result)
//             if (result == 0) {
//                 res
//                     .status(httpCodes.BadRequest)
//                     .json({ message: "Id does not exists" });
//             } else {
//                 res.status(httpCodes.OK).json(result);
//                 console.log(result)
//             }
//         })

//     } catch (err) {
//         console.log(err.message);
//         res.status(httpCodes.InternalServerError).json(err.message);
//     }

   
// }

// exports.updateEventMasterByEventId = async (req, res) => {
//     try {
//         var updated_date = new Date();
//         var EventId = req.params.event_id;
//         var data = [
//                     req.body.name,
//                     req.body.start_date,
//                     req.body.end_date,
//                     req.body.status,
//                     req.body.price,
//                     updated_date,
//                     EventId
//                     ]
//                     console.log(data)
//         var updateQuery = 'UPDATE event SET name=?, start_date=?, end_date=?, status=?, price=?, updated_date=? WHERE event_id=?';
//         await db.query(updateQuery, data, (err, result) => {
//             console.log(result)
//             res.status(httpCodes.Created).json({ message: "Event record updated Successfully" })
//         })
//     } catch (err) {
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)
//     }

  
// }

// exports.deleteEventMasterByEventId = async (req, res) => {
//     try {
//         var EventId = req.params.event_id;
//         var data = [
//             EventId]
//         var deleteQuery = 'DELETE FROM event WHERE event_id=?';
//         await db.query(deleteQuery, data, (err, result) => {
//             console.log(result)
//             console.log("Event deleted succesfully");
//             res.status(httpCodes.Created).json({ message: "Event deleted Successfully" })
//         })
//     } catch (err) {
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)
 
//     }
// }