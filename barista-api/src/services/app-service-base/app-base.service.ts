import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

// @Injectable()
export class AppServiceBase<T> extends TypeOrmCrudService<T> {
  db: Repository<T>;

  constructor(repo) {
    super(repo);
    this.db = repo;
  }
}
