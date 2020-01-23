# Bill of Materials Tech Design

## BillOfMaterials
* A "container" object that relates other bill of materials items at the project level. 
* The current BillOfMaterials for any project is a combination of manually entered items and the license/security results from the latest scan.
  * Security exceptions will "override" and cause security results matching the corresponding CVE Vulnerability to be filtered from results. 
  * License exceptions will "override" and cause license results matching the corresponding License to be filtered from results.

### Relationships of the BillOfMaterials include:
#### Project 
* (One:One, Required)

#### BomSecurityException 
* (One:Many, Optional)
* Corresponds to a SecurityScanResult via a CVE ID

#### BomLicenseException 
* (One:Many, Optional)

#### BomManualLicense
* (One:Many, Optional)

## BillOfMaterialItemBase
* An abstract/common base class for individual bill of materials items
* Properties:
  * Notes: text
  * Owner: string

## License / Vulterability Status Items
* Objects in this category allow a status to be assigned to scan results in the bill of materials interface.
  * All Internally Deployed Licenses are Green and generally not hindered by open source license obligations.
  * Externally Facing Internal Hosted applications have some restricted license, but in many cases are not hindered by open source licenses.
  * Distributed projects have the most license restrictions and are frequently hindered by open source license obligations.

### ProjectScanStatusType (Option Value)
* Used to indicate the relative status for a License/Vulnerability result in the system.
* This type is used to report for security, license, package, as well as general project state.
- Red / Green / Yellow

### SecurityScanResultItemStatusType (OptionValue)
* The output associated with a dependency check scan for a certain item.
- Low/Medium/High/Critical

### LicenseStatusDeploymentType
* A join object that associates licensesn with a deployment type, and a License Status.
* This will allow projects with a certain deployment type to report a license status for a given library/license combination.
* A License/DeploymentType combination will be deemed "green" in the absence of an entry in this table.
#### Properties:
- License
- DeploymentType
- ProjectScanStatusType

### VulnerabilityStatusDeploymentType
* A join object that associates a SecurityScanResultItemStatusValue with a Vulnerability status for a Deployment type.
- SecurityScanResultItemStatusValue
- ProjectScanStatusType
- DeploymentType

