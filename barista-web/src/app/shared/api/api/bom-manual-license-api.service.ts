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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { BomManualLicense } from '../model/bom-manual-license';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class BomManualLicenseApiService {

    protected basePath = 'http://localhost/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Create many BomManualLicense
     * @param bulkDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseBulkPost(bulkDto: object, observe?: 'body', reportProgress?: boolean): Observable<Array<BomManualLicense>>;
    public bomManualLicenseBulkPost(bulkDto: object, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BomManualLicense>>>;
    public bomManualLicenseBulkPost(bulkDto: object, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BomManualLicense>>>;
    public bomManualLicenseBulkPost(bulkDto: object, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (bulkDto === null || bulkDto === undefined) {
            throw new Error('Required parameter bulkDto was null or undefined when calling bomManualLicenseBulkPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Array<BomManualLicense>>(`${this.configuration.basePath}/bom-manual-license/bulk`,
            bulkDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve many BomManualLicense
     * @param fields &lt;h4&gt;Selects fields that should be returned in the reponse body.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?fields&#x3D;field1,field2,...&lt;/strong&gt; &lt;br/&gt;&lt;i&gt;Example:&lt;/i&gt; &lt;strong&gt;?fields&#x3D;email,name&lt;/strong&gt;
     * @param filter &lt;h4&gt;Adds fields request condition (multiple conditions) to the request.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?filter[]&#x3D;field||condition||value&lt;/strong&gt;&lt;br/&gt;&lt;i&gt;Examples:&lt;/i&gt; &lt;ul&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;name||eq||batman&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;isVillain||eq||false&amp;filter[]&#x3D;city||eq||Arkham&lt;/strong&gt; (multiple filters are treated as a combination of AND type of conditions)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;shots||in||12,26&lt;/strong&gt; (some conditions accept multiple values separated by commas)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;power||isnull&lt;/strong&gt; (some conditions don\&#39;t accept value)&lt;/li&gt;&lt;/ul&gt;&lt;br/&gt;Filter Conditions:&lt;ul&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;eq&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;&#x3D;&lt;/code&gt;, equal)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;ne&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;!&#x3D;&lt;/code&gt;, not equal)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;gt&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;&amp;gt;&lt;/code&gt;, greater than)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;lt&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;&amp;lt;&lt;/code&gt;, lower that)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;gte&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;&amp;gt;&#x3D;&lt;/code&gt;, greater than or equal)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;lte&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;&amp;lt;&#x3D;&lt;/code&gt;, lower than or equal)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;starts&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;LIKE val%&lt;/code&gt;, starts with)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;ends&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;LIKE %val&lt;/code&gt;, ends with)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;cont&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;LIKE %val%&lt;/code&gt;, contains)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;excl&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;NOT LIKE %val%&lt;/code&gt;, not contains)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;in&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;IN&lt;/code&gt;, in range, &lt;strong&gt;&lt;em&gt;accepts multiple values&lt;/em&gt;&lt;/strong&gt;)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;notin&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;NOT IN&lt;/code&gt;, not in range, &lt;strong&gt;&lt;em&gt;accepts multiple values&lt;/em&gt;&lt;/strong&gt;)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;isnull&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;IS NULL&lt;/code&gt;, is NULL, &lt;strong&gt;&lt;em&gt;doesn\&#39;t accept value&lt;/em&gt;&lt;/strong&gt;)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;notnull&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;IS NOT NULL&lt;/code&gt;, not NULL, &lt;strong&gt;&lt;em&gt;doesn\&#39;t accept value&lt;/em&gt;&lt;/strong&gt;)&lt;/li&gt;&lt;li&gt;&lt;strong&gt;&lt;code&gt;between&lt;/code&gt;&lt;/strong&gt; (&lt;code&gt;BETWEEN&lt;/code&gt;, between, &lt;strong&gt;&lt;em&gt;accepts two values&lt;/em&gt;&lt;/strong&gt;)&lt;/li&gt;&lt;/ul&gt;
     * @param or &lt;h4&gt;Adds &lt;code&gt;OR&lt;/code&gt; conditions to the request.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?or[]&#x3D;field||condition||value&lt;/strong&gt;&lt;br/&gt;It uses the same conditions as the filter parameter&lt;br/&gt;&lt;i&gt;Rules and &lt;i&gt;Examples:&lt;/i&gt;&lt;/i&gt;&lt;ul&gt;&lt;li&gt;If there is only &lt;strong&gt;one&lt;/strong&gt; &lt;code&gt;or&lt;/code&gt; present (without &lt;code&gt;filter&lt;/code&gt;) then it will be interpreted as simple filter:&lt;/li&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?or[]&#x3D;name||eq||batman&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;If there are &lt;strong&gt;multiple&lt;/strong&gt; &lt;code&gt;or&lt;/code&gt; present (without &lt;code&gt;filter&lt;/code&gt;) then it will be interpreted as a compination of &lt;code&gt;OR&lt;/code&gt; conditions, as follows:&lt;br&gt;&lt;code&gt;WHERE {or} OR {or} OR ...&lt;/code&gt;&lt;/li&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?or[]&#x3D;name||eq||batman&amp;or[]&#x3D;name||eq||joker&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;If there are &lt;strong&gt;one&lt;/strong&gt; &lt;code&gt;or&lt;/code&gt; and &lt;strong&gt;one&lt;/strong&gt; &lt;code&gt;filter&lt;/code&gt; then it will be interpreted as &lt;code&gt;OR&lt;/code&gt; condition, as follows:&lt;br&gt;&lt;code&gt;WHERE {filter} OR {or}&lt;/code&gt;&lt;/li&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;name||eq||batman&amp;or[]&#x3D;name||eq||joker&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;If present &lt;strong&gt;both&lt;/strong&gt; &lt;code&gt;or&lt;/code&gt; and &lt;code&gt;filter&lt;/code&gt; in any amount (&lt;strong&gt;one&lt;/strong&gt; or &lt;strong&gt;miltiple&lt;/strong&gt; each) then both interpreted as a combitation of &lt;code&gt;AND&lt;/code&gt; conditions and compared with each other by &lt;code&gt;OR&lt;/code&gt; condition, as follows:&lt;br&gt;&lt;code&gt;WHERE ({filter} AND {filter} AND ...) OR ({or} AND {or} AND ...)&lt;/code&gt;&lt;/li&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?filter[]&#x3D;type||eq||hero&amp;filter[]&#x3D;status||eq||alive&amp;or[]&#x3D;type||eq||villain&amp;or[]&#x3D;status||eq||dead&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/ul&gt;
     * @param sort &lt;h4&gt;Adds sort by field (by multiple fields) and order to query result.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?sort[]&#x3D;field,ASC|DESC&lt;/strong&gt;&lt;br/&gt;&lt;i&gt;Examples:&lt;/i&gt;&lt;/i&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?sort[]&#x3D;name,ASC&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?sort[]&#x3D;name,ASC&amp;sort[]&#x3D;id,DESC&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;
     * @param join &lt;h4&gt;Receive joined relational objects in GET result (with all or selected fields).&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation||field1,field2,...&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation1||field11,field12,...&amp;join[]&#x3D;relation1.nested||field21,field22,...&amp;join[]&#x3D;...&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;br/&gt;&lt;i&gt;Examples:&lt;/i&gt;&lt;/i&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile||firstName,email&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile||firstName,email&amp;join[]&#x3D;notifications||content&amp;join[]&#x3D;tasks&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation1&amp;join[]&#x3D;relation1.nested&amp;join[]&#x3D;relation1.nested.deepnested&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;strong&gt;&lt;i&gt;Notice:&lt;/i&gt;&lt;/strong&gt; &lt;code&gt;id&lt;/code&gt; field always persists in relational objects. To use nested relations, the parent level MUST be set before the child level like example above.
     * @param perPage &lt;h4&gt;Receive &lt;code&gt;N&lt;/code&gt; amount of entities.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?per_page&#x3D;number&lt;/strong&gt;&lt;br/&gt;&lt;i&gt;Example:&lt;/i&gt; &lt;strong&gt;?per_page&#x3D;10&lt;/strong&gt;
     * @param offset &lt;h4&gt;Offset &lt;code&gt;N&lt;/code&gt; amount of entities.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?offset&#x3D;number&lt;/strong&gt;&lt;br/&gt;&lt;i&gt;Example:&lt;/i&gt; &lt;strong&gt;?offset&#x3D;10&lt;/strong&gt;
     * @param page &lt;h4&gt;Receive a portion of &lt;code&gt;limit&lt;/code&gt; entities (alternative to &lt;code&gt;offset&lt;/code&gt;). Will be applied if &lt;code&gt;limit&lt;/code&gt; is set up.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?page&#x3D;number&lt;/strong&gt;&lt;br/&gt;&lt;i&gt;Example:&lt;/i&gt; &lt;strong&gt;?page&#x3D;2&lt;/strong&gt;
     * @param cache &lt;h4&gt;Reset cache (if was enabled) and receive entities from the DB.&lt;/h4&gt;&lt;i&gt;Usage:&lt;/i&gt; &lt;strong&gt;?cache&#x3D;0&lt;/strong&gt;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseGet(fields?: string, filter?: string, or?: string, sort?: string, join?: string, perPage?: number, offset?: number, page?: number, cache?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<BomManualLicense>>;
    public bomManualLicenseGet(fields?: string, filter?: string, or?: string, sort?: string, join?: string, perPage?: number, offset?: number, page?: number, cache?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BomManualLicense>>>;
    public bomManualLicenseGet(fields?: string, filter?: string, or?: string, sort?: string, join?: string, perPage?: number, offset?: number, page?: number, cache?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BomManualLicense>>>;
    public bomManualLicenseGet(fields?: string, filter?: string, or?: string, sort?: string, join?: string, perPage?: number, offset?: number, page?: number, cache?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (fields !== undefined && fields !== null) {
            queryParameters = queryParameters.set('fields', <any>fields);
        }
        if (filter !== undefined && filter !== null) {
            queryParameters = queryParameters.set('filter[]', <any>filter);
        }
        if (or !== undefined && or !== null) {
            queryParameters = queryParameters.set('or[]', <any>or);
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort[]', <any>sort);
        }
        if (join !== undefined && join !== null) {
            queryParameters = queryParameters.set('join[]', <any>join);
        }
        if (perPage !== undefined && perPage !== null) {
            queryParameters = queryParameters.set('per_page', <any>perPage);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (cache !== undefined && cache !== null) {
            queryParameters = queryParameters.set('cache', <any>cache);
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<BomManualLicense>>(`${this.configuration.basePath}/bom-manual-license`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete one BomManualLicense
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<BomManualLicense>;
    public bomManualLicenseIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BomManualLicense>>;
    public bomManualLicenseIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BomManualLicense>>;
    public bomManualLicenseIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling bomManualLicenseIdDelete.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<BomManualLicense>(`${this.configuration.basePath}/bom-manual-license/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieve one BomManualLicense
     * @param id 
     * @param fields &lt;h4&gt;Selects fields that should be returned in the reponse body.&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt; &lt;strong&gt;?fields&#x3D;field1,field2,...&lt;/strong&gt; &lt;br/&gt;&lt;i&gt;Example:&lt;/i&gt; &lt;strong&gt;?fields&#x3D;email,name&lt;/strong&gt;
     * @param join &lt;h4&gt;Receive joined relational objects in GET result (with all or selected fields).&lt;/h4&gt;&lt;i&gt;Syntax:&lt;/i&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation||field1,field2,...&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation1||field11,field12,...&amp;join[]&#x3D;relation1.nested||field21,field22,...&amp;join[]&#x3D;...&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;br/&gt;&lt;i&gt;Examples:&lt;/i&gt;&lt;/i&gt;&lt;ul&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile||firstName,email&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;profile||firstName,email&amp;join[]&#x3D;notifications||content&amp;join[]&#x3D;tasks&lt;/strong&gt;&lt;/li&gt;&lt;li&gt;&lt;strong&gt;?join[]&#x3D;relation1&amp;join[]&#x3D;relation1.nested&amp;join[]&#x3D;relation1.nested.deepnested&lt;/strong&gt;&lt;/li&gt;&lt;/ul&gt;&lt;strong&gt;&lt;i&gt;Notice:&lt;/i&gt;&lt;/strong&gt; &lt;code&gt;id&lt;/code&gt; field always persists in relational objects. To use nested relations, the parent level MUST be set before the child level like example above.
     * @param cache &lt;h4&gt;Reset cache (if was enabled) and receive entities from the DB.&lt;/h4&gt;&lt;i&gt;Usage:&lt;/i&gt; &lt;strong&gt;?cache&#x3D;0&lt;/strong&gt;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseIdGet(id: number, fields?: string, join?: string, cache?: number, observe?: 'body', reportProgress?: boolean): Observable<BomManualLicense>;
    public bomManualLicenseIdGet(id: number, fields?: string, join?: string, cache?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BomManualLicense>>;
    public bomManualLicenseIdGet(id: number, fields?: string, join?: string, cache?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BomManualLicense>>;
    public bomManualLicenseIdGet(id: number, fields?: string, join?: string, cache?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling bomManualLicenseIdGet.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (fields !== undefined && fields !== null) {
            queryParameters = queryParameters.set('fields', <any>fields);
        }
        if (join !== undefined && join !== null) {
            queryParameters = queryParameters.set('join[]', <any>join);
        }
        if (cache !== undefined && cache !== null) {
            queryParameters = queryParameters.set('cache', <any>cache);
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<BomManualLicense>(`${this.configuration.basePath}/bom-manual-license/${encodeURIComponent(String(id))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update one BomManualLicense
     * @param id 
     * @param bomManualLicense 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseIdPatch(id: number, bomManualLicense: BomManualLicense, observe?: 'body', reportProgress?: boolean): Observable<BomManualLicense>;
    public bomManualLicenseIdPatch(id: number, bomManualLicense: BomManualLicense, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BomManualLicense>>;
    public bomManualLicenseIdPatch(id: number, bomManualLicense: BomManualLicense, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BomManualLicense>>;
    public bomManualLicenseIdPatch(id: number, bomManualLicense: BomManualLicense, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling bomManualLicenseIdPatch.');
        }
        if (bomManualLicense === null || bomManualLicense === undefined) {
            throw new Error('Required parameter bomManualLicense was null or undefined when calling bomManualLicenseIdPatch.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.patch<BomManualLicense>(`${this.configuration.basePath}/bom-manual-license/${encodeURIComponent(String(id))}`,
            bomManualLicense,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param bomManualLicense 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicensePost(bomManualLicense: BomManualLicense, observe?: 'body', reportProgress?: boolean): Observable<BomManualLicense>;
    public bomManualLicensePost(bomManualLicense: BomManualLicense, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BomManualLicense>>;
    public bomManualLicensePost(bomManualLicense: BomManualLicense, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BomManualLicense>>;
    public bomManualLicensePost(bomManualLicense: BomManualLicense, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (bomManualLicense === null || bomManualLicense === undefined) {
            throw new Error('Required parameter bomManualLicense was null or undefined when calling bomManualLicensePost.');
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<BomManualLicense>(`${this.configuration.basePath}/bom-manual-license`,
            bomManualLicense,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param pageSize 
     * @param page 
     * @param filterText 
     * @param projectId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bomManualLicenseSearchGet(pageSize: number, page: number, filterText: string, projectId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<BomManualLicense>>;
    public bomManualLicenseSearchGet(pageSize: number, page: number, filterText: string, projectId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BomManualLicense>>>;
    public bomManualLicenseSearchGet(pageSize: number, page: number, filterText: string, projectId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BomManualLicense>>>;
    public bomManualLicenseSearchGet(pageSize: number, page: number, filterText: string, projectId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (pageSize === null || pageSize === undefined) {
            throw new Error('Required parameter pageSize was null or undefined when calling bomManualLicenseSearchGet.');
        }
        if (page === null || page === undefined) {
            throw new Error('Required parameter page was null or undefined when calling bomManualLicenseSearchGet.');
        }
        if (filterText === null || filterText === undefined) {
            throw new Error('Required parameter filterText was null or undefined when calling bomManualLicenseSearchGet.');
        }
        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling bomManualLicenseSearchGet.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (filterText !== undefined && filterText !== null) {
            queryParameters = queryParameters.set('filterText', <any>filterText);
        }
        if (projectId !== undefined && projectId !== null) {
            queryParameters = queryParameters.set('projectId', <any>projectId);
        }

        let headers = this.defaultHeaders;

        // authentication (oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<Array<BomManualLicense>>(`${this.configuration.basePath}/bom-manual-license/search`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
