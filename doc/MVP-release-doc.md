# MVP Release Documentation
#### Key capabilities providing highest value above minimum requirements indicated in *italics*.

## UI Requirements

1. basic authentication via active directory
1. user is associated with projects they create so they see them by default upon login
1. user can update project details for their own projects
1. any user can search for and view project details for any project in the system, but cannot initiate a scan for a project they do not own
1. user can see current Bill of Materials `BOM` including current status on any component listed
1. user can drill down to scan details which produced an entry on `BOM`
1. user can view licenses found to apply to project
1. user can view obligations associated with licenses found to apply to project
1. user can view vulnerability specifics for any reported concern with live URL links to relevant NVD data
1. user can manually enter any component into their project `BOM`
    1. license check rules will run immediately upon save, indicating compatibility with deployment model
    1. manual entry will at a minimum provide vulnerability search results for the combination of component name and version via the nvd.nist.gov data source - no hits on NVD = green status
    1. user is responsible for data quality for all elements of a manual entry, including applicable license
1. *user may upload a set of compressed files for a project to be scanned if a GitHub repo is not practical - this will result in a single scan iteration upon upload*
1. Each `BOM` license entry will have a simple approved or not approved indicator based on compatibility with the stated deployment model of the project.  a `?` status will indicate a situation not coded for such as a new license type
1. each `BOM` vulnerability entry will indicate high, medium or low based on NVD data and an approved or warning indicator based on Enterprise Security Standards - right now anything above a low is considered a warning
1. each project will have a summary page with a "roll-up" of all the license and vulnerability status indicators
  1. if all license indicators are approved for the current `BOM` then the project license summary is approved
  1. if there are no vulnerabilities above "low" for the current `BOM`, then then project vulnerability summary is approved
1. admin users can override any particular status for a `BOM` entry with an explanation - any such override will not be replaced by a subsequent scan with the same finding for the same component and version combination
1. admin users can override obligation(s) which apply to a specific project and its `BOM`- any such override will take precedence over standard obligations and will not be overridden by subsequent scan findings or other activity
1. admin users can override summary license and or vulnerability status on the project summary page with an explanation in the project notes - any such override will not be replaced by subsequent scan or other system activity




## Scanning Requirements

1. For MVP, user initiated scanning via the UI will be the delivered capability
1. each scan event shall record any new findings in the `BOM` for the relevant project - duplicate findings are in scan detail but not updated on the `BOM`
1. license type scan result(s) resulting in an unrecognized license will be mapped to the special "unidentified" license and loaded in the `BOM` - admin user can then make appropriate entries in the license and obligations tables so that the component(s) with unidentified licenses will be properly mapped upon the next scan and or manually updated in the `BOM` for a particular scan result
1. scantypes which will populate the `BOM` for MVP are:
    1. Licenses by package specific tools supporting NPM, Maven or NuGet
    1. Dependency Vulnerability using OWASP tools
    1. Manual entry
    1. Data conversion
    1.  *Copyright scanning using TBD tool*


## Data Conversion

1. all approved projects, associated components and owners from legacy system loaded with a scantype/source of "data conversion"
1. all core license rules and obligations loaded
