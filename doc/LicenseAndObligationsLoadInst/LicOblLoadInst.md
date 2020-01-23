# Licenses and Obligations Tables Scripts and Instructions

## Licenses Table

To create and load the Licenses table run the following PosgresQL script:

```sql
CREATE TABLE licenses
(
  license_id serial PRIMARY KEY,
  license_code varchar(255),
  license_name varchar(255),
  license_desc varchar(255)
);
```
`\copy licenses(license_code, license_name, license_desc) FROM '/PATH/TO/FILE/licenses_2.csv' DELIMITER ',' CSV HEADER;`

**Note: licenses_2.csv can be found in the LicenseAndObligationsLoadInst folder.

## Obligations Table

```sql
CREATE TABLE obligations
(
  obligation_id SERIAL PRIMARY KEY,
  obligation_type TEXT,
  obligation_description TEXT
);
```
`\copy obligations(obligationstype, obligationsdescription) FROM '/PATH/TO/FILE/obligations.csv' DELIMITER ',' CSV HEADER;`


**Note: in Excel obligation_category refers to obligation_type and obligation_text refers to obligation_description

**Note: watch out for the apostrophes when copying the second command line (apostrophes might be different than what is expected, you might have to type it in yourself) 

## Approved Comp Migration Table

```sql
CREATE TABLE approvedcomponentsmigration
(
  application_id int, 
  application_name text, 
  application_desc text, 
  application_deployment text, 
  application_owner_msid text, 
  application_owner_email text, 
  component_id int, 
  component_name text, 
  component_version text, 
  component_approval_timestamp text, 
  component_licenseid text, 
  component_license text, 
  data_source text
); 
```
`\copy approvedcomponentsmigration FROM '/PATH/TO/FILE/approvedcomponentsmigrationdata.csv' DELIMITER ',' CSV HEADER;`

## LicenceObligations Table

```sql
CREATE TABLE licenseobligations
(
  licenseid int references licenses(license_id), 
  obligationsid int references obligations(obligation_id)
); 
```
`\copy licenseobligations(licenseid, obligationsid) from '/PATH/TO/FILE/licenseobligationsid.csv' delimiter ',' csv header;
`
