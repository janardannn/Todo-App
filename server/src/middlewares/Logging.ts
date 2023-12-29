let count = 0;
export function LogUserActivity(req: any, res: any, next: any) {
    count++;
    console.log("User requested: " + " [" + req.method + "] " + req.originalUrl + " ; requests: " + count)
    next();
}
