import { ModuleSearchChildRecordDto } from '@app/models/DTOs/ModuleSearchChildRecordDto';
import { ModuleSearchParentRecordDto } from '@app/models/DTOs/ModuleSearchParentRecordDto';
import { PaginateRawQuery } from '@app/shared/util/paginate-array-result';
import { Injectable } from '@nestjs/common';
import { GetManyDefaultResponse } from '@nestjsx/crud';
import { getManager } from 'typeorm';

@Injectable()
export class GlobalSearchService {
  async searchForModule(
    modulePartialName: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<ModuleSearchParentRecordDto>> {
    const query = `select max(subQ.createdAt) "productCreateAt",
                     count(*)            "entriesCount",
                     p.name              "projectName",
                     p.id                "projectId",
                     p.description,
                     p.git_url,
                     p.owner,
                     p."outputEmail"
              from (
                       select lsri."displayIdentifier" as entityName, p.id, lsri.created_at as createdAt
                       from license_scan_result_item lsri,
                            license_scan_result lsc,
                            scan s,
                            project p
                       where lsri."licenseScanId" = lsc.id
                         and lsc."scanId" = s.id
                         and s."projectId" = p.id
                         and s.id = (select max(id) from scan s2 where s2."projectId" = s."projectId")
                         and lower(lsri."displayIdentifier") like $1
                       union all
                       select bml.product_name as entityName, p.id, bml.created_at as createdAt
                       from bom_manual_license bml,
                            project p
                       where p.id = bml."projectId"
                         and lower(bml.product_name) like $1) subQ,
                   project p
              where p.id = subQ.id
              group by p.id
              order by max(subQ.createdAt) desc`;

    return await PaginateRawQuery<ModuleSearchParentRecordDto>(
      getManager(),
      query,
      ['%' + modulePartialName.toLowerCase() + '%'],
      page,
      pageSize,
      row =>
        ({
          projectId: row.projectId,
          projectDescription: row.description,
          entityCount: +row.entriesCount,
          projectGitUrl: row.git_url,
          projectOwner: row.owner,
          projectEmail: row.outputEmail,
          projectName: row.projectName,
        } as ModuleSearchParentRecordDto),
    );
  }

  async searchForModuleFromProject(
    projectId: number,
    modulePartialName: string,
    page: number,
    pageSize: number,
  ): Promise<GetManyDefaultResponse<ModuleSearchChildRecordDto>> {
    const query = `
      select subQ.entityName as "entityName", subQ.createdAt as "creationDate"
      from (
               select lsri."displayIdentifier" as entityName, p.id, lsri.created_at as createdAt
               from license_scan_result_item lsri,
                    license_scan_result lsc,
                    scan s,
                    project p
               where lsri."licenseScanId" = lsc.id
                 and lsc."scanId" = s.id
                 and s."projectId" = p.id
                 and s.id = (select max(id) from scan s2 where s2."projectId" = s."projectId")
                 and lower(lsri."displayIdentifier") like $2
               union all
               select bml.product_name as entityName, p.id, bml.created_at as createdAt
               from bom_manual_license bml,
                    project p
               where p.id = bml."projectId"
                 and lower(bml.product_name) like $2) subQ,
           project p
      where p.id = subQ.id
        and p.id = $1
      order by subQ.createdAt desc, subQ.createdAt`;

    return await PaginateRawQuery<ModuleSearchChildRecordDto>(
      getManager(),
      query,
      [projectId, '%' + modulePartialName.toLowerCase() + '%'],
      page,
      pageSize,
      row =>
        ({
          projectId: +projectId,
          entityName: row.entityName,
          entityCreationDate: row.creationDate,
        } as ModuleSearchChildRecordDto),
    );
  }
}
