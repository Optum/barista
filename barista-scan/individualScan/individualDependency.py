from lxml import html
import requests
from bs4 import BeautifulSoup
import sys
import os
import re
import time

REGEX = '\s*([\d.]+)'
count = 0
#this code prints out information (vulnerability ID, description, severity, and link) for all the vulnerabilities for a given dependency passed in through command line
def usage(code=0):
    print('''Usage: {} [options] component_name version
    Choose a component and version to see any/all vulnerabilities
    '''.format(os.path.basename(sys.argv[0])))
    sys.exit(code)

#returns parsed items with the desired tag from website passed in
def returnSoupItemsDesc(link):
    results = requests.get(link)
    resultsContent = results.content
    #creates a list of website's parsed content
    soup = BeautifulSoup(resultsContent, 'xml')
    return soup

def print_info(soup_items, link):
    print('Potential vulnerabilities found at ' + time.strftime("%Y-%m-%d %H:%M"))
    cvss_versions = soup_items.find_all('span', attrs={'data-testid':'page-header-vuln-id'})
    for version in cvss_versions:
            print('vulnerability id: {}\n'.format(version.text))
    descriptions = soup_items.find_all('p', attrs={'data-testid':'vuln-analysis-description'})
    for description in descriptions:
            print('description: {}\n'.format(description.text))
    version3_severity = soup_items.find_all('span', attrs={'data-testid':'vuln-cvssv3-base-score-severity'})
    if len(version3_severity):
            for severity in version3_severity:
                    print('version 3 severity: {}\n'.format(severity.text))
    version2_severity = soup_items.find_all('span', attrs={'data-testid':'vuln-cvssv2-base-score-severity'})
    if len(version2_severity):
            for severity in version2_severity:
                    print('version 2 severity: {}\n'.format(severity.text))
    print ('link to full description: {}\n'.format(link))

def version_cmp(version1, version2):
    def normalize(v):
        return [int(x) for x in re.sub(r'(\.0+)*$','', v).split(".")]
    return cmp(normalize(version1), normalize(version2))

def cmp(a, b):
    return (a > b) - (a < b)

def do_it_all(link):
    soup_items = returnSoupItemsDesc(link)
    links = soup_items.find_all('a')
    #loops through all lines of html code with the <a> tag
    for item in links:
        if 'CVE' in item.text:
            #constructs link for one of the vulnerabilities
            cve_link = 'https://nvd.nist.gov{}'.format(item.get('href'))
            cve_soup_items = returnSoupItemsDesc(cve_link)
            rows = cve_soup_items.find_all('tr', class_='vulnerable')
            if(len(rows)>0):
                last_columns = rows[len(rows)-1].findChildren('td')
                num_columns = len(last_columns)
                if dependency in last_columns[0].text:
                    #no version
                    if(no_version):
                        print_info(cve_soup_items, cve_link)
                        count = 1
                    #check version from column 1 (no 'up to' or 'from' columns)
                    elif (num_columns<2 or num_columns>3):
                        version_block = last_columns[0].text
                        try:
                            version = re.search('\s*([\d.]+).*?(\s*([\d.]+))', version_block).group(2)
                            if(version_cmp(version,user_version)>=0):  
                                print_info(cve_soup_items, cve_link)
                                count = 1
                        except IndexError: 
                            print_info(cve_soup_items, cve_link)
                            count = 1
                    elif (num_columns ==2):
                        version_block = last_columns[1].text
                        #\s*([\d.]+)
                        version = re.search(REGEX, version_block).group(1)
                        inc_or_exc = re.search('(inc|exc)', version_block).group(1)
                        if (inc_or_exc == 'inc'):
                            if (version_cmp(version,user_version)>=0):
                                print_info(cve_soup_items, cve_link)
                                count = 1
                        elif (inc_or_exc == 'exc'):
                            if (version_cmp(version,user_version)>0):
                                print_info(cve_soup_items, cve_link)
                                count = 1
                    else:
                        version_block = last_columns[2].text
                        #\s*([\d.]+)
                        version_high = re.search(REGEX, version_block).group(1)
                        version_block_first = rows[0].findChildren('td')[1]
                        version_low = re.search(REGEX, version_block_first.text).group(1)                        
                        end = False
                        #if user_version is outside of version range
                        if(version_cmp(version_high,user_version)<0 or version_cmp(version_low, user_version)>0):
                            end = True
                        #not outside of range and only one row
                        elif(len(rows)==1):
                            print_info(cve_soup_items, cve_link)
                            count = 1
                            end = True
                        #more than 1 row
                        current_row = 0
                        current_col = 1
                        # print('2 +rows')
                        while not end:
                            columns = rows[current_row].findChildren('td')
                            #version less than up to of first row
                            if version_cmp(re.search(REGEX,columns[current_col+1].text).group(1),user_version)>0:
                                print_info(cve_soup_items, cve_link)
                                count = 1
                                end = True
                            #version less than from
                            elif version_cmp(re.search(REGEX,rows[current_row+1].findChildren('td')[current_col].text).group(1),user_version)>0:
                                end = True
                            #check next row
                            else:
                                current_row = current_row + 1
    if count == 0:
        print('No potential vulnerabilities found at ' + time.strftime("%Y-%m-%d %H:%M"))

if len(sys.argv[1:]) == 2:
    dependency = sys.argv[1]
    user_version = sys.argv[2]
    link= 'https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query={}&search_type=all'.format(dependency)
    dependency=dependency.replace("+","_")
    no_version = False
elif len(sys.argv[1:])==1:
    dependency = sys.argv[1]
    link= 'https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query={}&search_type=all'.format(dependency)
    dependency=dependency.replace("+","_")
    no_version = True
else:
    usage(1)

if __name__ == '__main__':
    do_it_all(link)
    sys.exit(0)