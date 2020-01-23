# Jasper Reports definition for Barista

Japer Reports is an open source report generator that can do simple reporting from a database, and render it into a file or other
object for display.

An example can be found at the [node-jasper](https://www.npmjs.com/package/node-jasper) page.

Coding example (with some of our options)  Shamelessly stolen from the above node-jasper page.

Install the package, or include it in package.json
```
npm install --save node-jasper
```

Create an object for the report...
```
var jasper = require('node-jasper')(options);
```
Options would look something likethis.

```
options: {
    path: "/usr/src/app/barista-reports/jasperreports-6.10.0", //Download from https://sourceforge.net/projects/jasperreports/),
    reports: {
 		// Report Definition
 		"v1": {
     			"jasper": "/usr/src/app/barista-reports/Vuln-Severity.jasper" ,
          "conn": false
 		}
 	},
 	drivers: {
 		// Driver Definition
 		"name": {
 			"path": "/usr/src/app/barista-reports/driver/postgresql-42.2.8.jar",
 			"class": "org.postgresql.Driver", //Class name of the driver
 			"type": "postgres" //Type of database (mysql, postgres)
 		}
 	},
 	conns: {
 		// Connection Definition (Would need to de-reference these from the environment)
 		"baristadb": {
 			"host": $DB_HOST,
 			"port": $DB_PORT ,
 			"dbname": $DB_DATABASE,
 			"user": $DB_USER ,
 			"pass": $DB_PASSWORD,
 			"driver": "pg"
 		}
 	},
 	"defaultConn": "baristadb"
 }
```
Invoking the reports (Assuming Express framework)
```
var jasper = require('node-jasper')(options);

var report = {
    report: "v1",   // Name of option set defined above...
    data: {
        "scanParameter": 56  //example, report on scan 56
        }
    }
    "dataset": //main dataset
};
var pdf = jasper.pdf(report);  //renders in memory

res.set({
            'Content-type': 'application/pdf',
            'Content-Length': pdf.length
        });
res.send(pdf);


```
