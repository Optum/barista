const puppeteer = require('puppeteer'); 

/*
 * Setup: 
 * 1. npm install puppeteer
 * 2. npm install puppeteer.core
 * 
 * What the program does: 
 * this code prints out information (vulnerability ID, description, severity, and link)
 * for all the vulnerabilities for a given dependency passed in through command line
 * 
 * To run:
 * node individual_dependency.js [component] [version]
 * version is optional
 */

var REGEX = /\s*([\d.]+)/; 

var dependency = process.argv[2];
var url = `https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=${dependency}&search_type=all`;
dependency = dependency.replace(/\+/, '_');
var version = null;
var count = 0;
var is_CVE = false;

var currentdate = new Date(); 
var datetime = (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

if(process.argv.length == 4){
    version = process.argv[3]; 
} 

(async function main(){
    try{
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage(); 
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36');  

        await page.goto(url); 
        await page.waitFor(750);  
        const CVEs = await page.$$('tbody > tr');  

        for (let i = 0; i < CVEs.length; i++){
          await page.goto(url); 
          await page.waitFor(750);  
          const CVEs = await page.$$('tbody > tr');  
        
          const CVE = CVEs[i];  
          const specific_CVE  = await CVE.$('tr > th > strong > a');
          var CVE_name = null; 
          if (specific_CVE != null){
            CVE_name = await page.evaluate(specific_CVE => specific_CVE.innerText, specific_CVE); 
            await specific_CVE.click(); 
          }
          else {
              continue; 
          }
          await page.waitFor(750);
          var rows = await page.$$('.vulnerable');
          var row = 0;
          while (row < rows.length && !is_CVE){
            var checker = await rows[row].$('b');
            var checker_text = ''; 
            if(checker != null){
             checker_text = await page.evaluate(checker => checker.innerText, checker);
                if(checker_text.includes(dependency)){ is_CVE = true;}
            }
            else {
                continue; 
            }
            row++;
          }
          if(is_CVE){
            const CVE_description_directive = await page.$('tbody > tr > td > div > div > p'); 
            const CVE_description = await page.evaluate(CVE_description_directive => CVE_description_directive.innerText, CVE_description_directive); 
            var CVE_v3_div = await page.$('#p_lt_WebPartZone1_zoneCenter_pageplaceholder_p_lt_WebPartZone1_zoneCenter_VulnerabilityDetail_VulnFormView_Vuln3CvssPanel'); 
            var CVE_v2_div = await page.$('#p_lt_WebPartZone1_zoneCenter_pageplaceholder_p_lt_WebPartZone1_zoneCenter_VulnerabilityDetail_VulnFormView_Vuln2CvssPanel'); 
            var CVE_v2_text = null; 
            var CVE_v3_text = null; 
            if(CVE_v3_div != null){
                var CVE_v3_strong = await CVE_v3_div.$('strong'); 
                CVE_v3_text = await page.evaluate(CVE_v3_strong => CVE_v3_strong.innerText, CVE_v3_strong); 
                CVE_v3_text = CVE_v3_text.substr(5,5);
                var severity = await page.$('[data-testid = "vuln-cvssv3-base-score-severity"]'); 
                var severity_text = await page.evaluate(severity => severity.innerText, severity); 
                CVE_v3_text = CVE_v3_text + ": " + severity_text;           
            }
            if(CVE_v2_div != null){
                var CVE_v2_strong = await CVE_v2_div.$('strong'); 
                CVE_v2_text = await page.evaluate(CVE_v2_strong => CVE_v2_strong.innerText, CVE_v2_strong); 
                CVE_v2_text = CVE_v2_text.substr(5,5);
                var severity = await page.$('[data-testid = "vuln-cvssv2-base-score-severity"]'); 
                var severity_text = await page.evaluate(severity => severity.innerText, severity); 
                CVE_v2_text = await CVE_v2_text + ": " + severity_text; 
            }
            if(version !=null){
                var rows = await page.$$('.vulnerable');
                var row = 0;  
                var vulnerable = false; 
                while (row < rows.length && !vulnerable){
                    var columns = await rows[row].$$('td'); 
                    if(columns.length == 1 || columns.length > 3){
                        var version_checker = columns[0]; 
                        version_checker = await page.evaluate(version_checker => version_checker.innerText, version_checker); 
                        version_checker = version_checker.split(':'); 
                        version_checker = version_checker[5]; 
                        if(compare_version(version, version_checker) <= 0){
                            print_vulnerabilities(CVE_name, CVE_description, CVE_v2_text, CVE_v3_text); 
                            vulnerable = true;
                            count++; 
                        }
                    } else if (columns.length == 2){
                        var version_checker = columns[1]; 
                        version_checker = await version_checker.$('b'); 
                        version_checker = await page.evaluate(version_checker => version_checker.innerText, version_checker); 
                        version_checker = version_checker.match(REGEX);
                        if(compare_version(version, version_checker[0]) < 0){
                            print_vulnerabilities(CVE_name, CVE_description, CVE_v2_text, CVE_v3_text);
                            vulnerable = true;
                            count++;
                        }
                    } else {
                        var version_start_range = columns[1]; 
                        var version_end_range = columns[2]; 
                        version_start_range = await version_start_range.$('b');
                        version_start_range = await page.evaluate(version_start_range => version_start_range.innerText, version_start_range); 
                        version_start_range = version_start_range.match(REGEX);
                        version_end_range = await version_end_range.$('b');
                        version_end_range = await page.evaluate(version_end_range => version_end_range.innerText, version_end_range); 
                        version_end_range = version_end_range.match(REGEX);
                        if(compare_version(version, version_start_range[0]) > 0 && compare_version(version, version_end_range[0]) < 0){
                            print_vulnerabilities(CVE_name, CVE_description, CVE_v2_text, CVE_v3_text); 
                            vulnerable = true;
                            count++;
                        }
                    }
                    row++; 
                }
                if(!vulnerable){
                    continue; 
                }
            }
            else{
                print_vulnerabilities(CVE_name, CVE_description, CVE_v2_text, CVE_v3_text);
                count++; 
            }
            console.log('\n'); 
          }
        }
    } catch (e){
      console.log('our error', e);  
      process.exit(1); // exited with a failure
    }  
    if(count == 0) {
        console.log('No potential vulnerabilities found at ' + datetime);
    }
    process.exit(0); //exited successfully 
})(); 

function compare_version(v1, v2) {
    var i, diff;
    var regExStrip0 = /(\.0+)+$/;
    var segmentsA = v1.replace(regExStrip0, '').split('.');
    var segmentsB = v2.replace(regExStrip0, '').split('.');
    var l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff) {
            return diff;
        }
    }
    return segmentsA.length - segmentsB.length;
}

function print_vulnerabilities(CVE_name, CVE_description, CVE_v2_text, CVE_v3_text){
    console.log('Found potential vulnerability at ' + datetime + '\n');
    if(CVE_description != null){
        console.log(CVE_name + ':' + '\n' + CVE_description); 
    } 
    if(CVE_v2_text != null){
        console.log(CVE_v2_text); 
    }
    if(CVE_v3_text != null){
        console.log(CVE_v3_text); 
    }
    console.log('Link to full description https://nvd.nist.gov/vuln/detail/' + CVE_name);
}
