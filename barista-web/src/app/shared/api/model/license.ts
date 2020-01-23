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
import { Obligation } from './obligation';
import { LicenseScanResultItem } from './license-scan-result-item';


export interface License { 
    createdAt: object;
    id: number;
    metaData: object;
    tag: string;
    updatedAt: object;
    code: string;
    desc: string;
    homepageUrl: string;
    isCpdx: boolean;
    licenseScanResultItems: Array<LicenseScanResultItem>;
    name: string;
    obligations: Array<Obligation>;
    referenceUrl: string;
    textUrl: string;
    unknownLicense: boolean;
}

