const httpCodes = require('../helper/httpCodes');
const db = require('../db');


/************************************************************************************************************
Method Name: addEvent
Parameter list: name, start_date, end_date, status, price, created_date
Purpose: Add record to events table
Created By and Date: Neelakanth 17-Sep-2021
*************************************************************************************************************/
exports.addEventMaster = async (req, res) => {
try{

    var created_date = new Date();
        var data=[ 
                    req.body.name,
                    req.body.start_date,
                    req.body.end_date,
                    req.body.status,
                    req.body.price,
                    created_date
                    ]
                var insertQuery = 'INSERT INTO event (name, start_date, end_date, status, price, created_date) VALUES (?,?,?,?,?,?)';
                db.query(insertQuery, data,(err,result)=>{
                    if (err) throw err;
                    console.log(err)
                    console.log(data)
                    res.status(httpCodes.Created).json({message:"Event added Successfully"})
                })
        
    
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

}


/************************************************************************************************************ 
Method Type: getEvent
Purpose: Get all Event Details
Created By and Date: Neelakanth 17-sep-2021
************************************************************************************************************/
exports.getEventMaster = async (req, res) => {
    try {
        await db.query('SELECT * FROM event ORDER BY event_id DESC', (err, result) => {
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


/************************************************************************************************************ 
Method Type: getEventById
Parameter list: event_id
Purpose: Get Events Detail By Id
Created By and Date: Neelakanth Jain 17-Sep-2021
************************************************************************************************************/
exports.getEventMasterByEventId = async (req, res) => {
    try {
        EventId = [req.params.event_id];
        let sql = "SELECT * FROM event where event_id=?";
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




/************************************************************************************************************
Method Name: updateEventById
Parameter list: name, start_date, end_date, status, price, updated_date
Purpose: Update record to Events table
Created By and Date: Neelakanth 17-Sep-2021
*************************************************************************************************************/

exports.updateEventMasterByEventId = async (req, res) => {
    try {
        var updated_date = new Date();
        var EventId = req.params.event_id;
        var data = [
                    req.body.name,
                    req.body.start_date,
                    req.body.end_date,
                    req.body.status,
                    req.body.price,
                    updated_date,
                    EventId
                    ]
                    console.log(data)
        var updateQuery = 'UPDATE event SET name=?, start_date=?, end_date=?, status=?, price=?, updated_date=? WHERE event_id=?';
        await db.query(updateQuery, data, (err, result) => {
            console.log(result)
            res.status(httpCodes.Created).json({ message: "Event record updated Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
    }

  
}


/************************************************************************************************************
Method Name: deleteEventById
Parameter list: event_id
Purpose: Delete record from Events
Created By and Date: Neelakanth 17-Sep-2021
*************************************************************************************************************/

exports.deleteEventMasterByEventId = async (req, res) => {
    try {
        var EventId = req.params.event_id;
        var data = [
            EventId]
        var deleteQuery = 'DELETE FROM event WHERE event_id=?';
        await db.query(deleteQuery, data, (err, result) => {
            console.log(result)
            console.log("Event deleted succesfully");
            res.status(httpCodes.Created).json({ message: "Event deleted Successfully" })
        })
    } catch (err) {
        console.log(err.message)
        res.status(httpCodes.InternalServerError).json(err.message)
 
    }
}