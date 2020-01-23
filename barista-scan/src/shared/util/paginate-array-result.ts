import { GetManyDefaultResponse } from '@nestjsx/crud';
import { isEmpty } from 'lodash';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

async function PaginateArrayResult<T>(
  query: SelectQueryBuilder<T>,
  page: number,
  pageSize: number,
): Promise<GetManyDefaultResponse<T>> {
  const total = await query.getCount();
  page = Math.max(0, page - 1);
  const data = await query
    .skip(page * pageSize)
    .take(pageSize)
    .getMany();
  return {
    count: data.length,
    data,
    page: page + 1,
    total,
    pageCount: pageSize && total ? Math.ceil(total / pageSize) : undefined,
  };
}

export function EmptyPaginateResult<T>(): GetManyDefaultResponse<T> {
  return {
    count: 0,
    data: [],
    page: 1,
    total: 0,
    pageCount: 0,
  };
}

export async function PaginateRawQuery<T>(
  manager: EntityManager,
  rawSql: string,
  queryParameters: any[] = [],
  page: number,
  pageSize: number,
  dataTransformer: any = entity => ({}),
): Promise<GetManyDefaultResponse<T>> {
  const totalResult = await manager.query(`SELECT COUNT(*) FROM (${rawSql}) as Count`, queryParameters);
  const total = !isEmpty(totalResult) ? +totalResult[0].count : undefined;
  page = Math.max(0, page - 1);
  const paramsLength = queryParameters.length;
  const data = await manager.query(`${rawSql} OFFSET $${paramsLength + 1} LIMIT $${paramsLength + 2}`, [
    ...queryParameters,
    page * pageSize,
    pageSize,
  ]);

  return {
    count: data.length,
    data: data.map(_ => dataTransformer(_)),
    page: page + 1,
    total,
    pageCount: pageSize && total ? Math.ceil(total / pageSize) : undefined,
  };
}

export default PaginateArrayResult;
