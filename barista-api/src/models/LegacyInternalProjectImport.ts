import { Entity } from 'typeorm';
import { LegacyCommunityProjectImport } from './LegacyCommunityProjectImport';

@Entity()
export class LegacyInternalProjectImport extends LegacyCommunityProjectImport {}
