const http = require("http");
const path = require("path");

process.report.directory = path.join(__dirname, "reports");
process.report.filename = "01-diagnostic-report.json";
// process.report.writeReport();

http.get("hello://localhost:3000", (response) => {
    console.log("Http server ")
});
