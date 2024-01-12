import fs from "fs";
import path from "path";

const logFilePath = path.resolve(__dirname, '../../LOGFILE');

let count = 0;
export function LogUserActivity(req: any, res: any, next: any) {
    count++;

    let user = req.body.user || req.query.user || req.body.username

    console.log((user !== undefined ? "USER " + "[" + user + "]" : "USER") + " requested: " + "[" + req.method + "] " + req.originalUrl + " ; requests: " + count)

    let data_to_log: string = (user !== undefined ? "USER " + "[" + user + "]" : "USER") + " requested: " + "[" + req.method + "] " + req.originalUrl + " ; requests: " + count + "\n"

    fs.appendFile(logFilePath, data_to_log, function (err: any) {
        if (err) throw err;
        // console.log('Saved!');
    });

    next();
}
