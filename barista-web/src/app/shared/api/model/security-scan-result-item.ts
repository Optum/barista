/**
 * Barista API
 * REST API documentation for the Barista system
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProjectScanStatusType } from './project-scan-status-type';
import { SecurityScanResultItemStatusType } from './security-scan-result-item-status-type';
import { SecurityScanResult } from './security-scan-result';


export interface SecurityScanResultItem { 
    createdAt: object;
    id: number;
    metaData: object;
    tag: string;
    updatedAt: object;
    description: string;
    displayIdentifier: string;
    itemType: string;
    path: string;
    cveId: string;
    projectScanStatus: ProjectScanStatusType;
    referenceUrl: string;
    securityScan: SecurityScanResult;
    securityScanResultItemStatus: SecurityScanResultItemStatusType;
    severity: string;
}

