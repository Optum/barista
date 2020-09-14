import {
  BomLicenseException,
  BomManualLicense,
  BomSecurityException,
  ClearlyDefined,
  DeploymentType,
  LegacyCommunityProjectImport,
  LegacyInternalProjectImport,
  License,
  LicenseScanResult,
  LicenseScanResultItem,
  LicenseStatusDeploymentType,
  Obligation,
  ObligationType,
  OutputFormatType,
  PackageManager,
  Project,
  ProjectAttribution,
  ProjectDevelopmentType,
  ProjectNote,
  ProjectScanStatusType,
  ProjectStatusType,
  Scan,
  SecurityScanResult,
  SecurityScanResultItem,
  SecurityScanResultItemStatusType,
  SystemConfiguration,
  ToolTip,
  User,
  VulnerabilityStatusDeploymentType,
} from '@app/models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const AppOrmModuleDefinition = [
  TypeOrmModule.forFeature([Project]),
  TypeOrmModule.forFeature([ProjectDevelopmentType]),
  TypeOrmModule.forFeature([BomLicenseException]),
  TypeOrmModule.forFeature([BomManualLicense]),
  TypeOrmModule.forFeature([BomSecurityException]),
  TypeOrmModule.forFeature([ClearlyDefined]),
  TypeOrmModule.forFeature([DeploymentType]),
  TypeOrmModule.forFeature([LegacyCommunityProjectImport]),
  TypeOrmModule.forFeature([LegacyInternalProjectImport]),
  TypeOrmModule.forFeature([License]),
  TypeOrmModule.forFeature([LicenseScanResult]),
  TypeOrmModule.forFeature([LicenseScanResultItem]),
  TypeOrmModule.forFeature([LicenseStatusDeploymentType]),
  TypeOrmModule.forFeature([Obligation]),
  TypeOrmModule.forFeature([ObligationType]),
  TypeOrmModule.forFeature([OutputFormatType]),
  TypeOrmModule.forFeature([PackageManager]),
  TypeOrmModule.forFeature([ProjectNote]),
  TypeOrmModule.forFeature([ProjectAttribution]),
  TypeOrmModule.forFeature([ProjectScanStatusType]),
  TypeOrmModule.forFeature([ProjectStatusType]),
  TypeOrmModule.forFeature([Scan]),
  TypeOrmModule.forFeature([SecurityScanResult]),
  TypeOrmModule.forFeature([SecurityScanResultItem]),
  TypeOrmModule.forFeature([SecurityScanResultItemStatusType]),
  TypeOrmModule.forFeature([SystemConfiguration]),
  TypeOrmModule.forFeature([ToolTip]),
  TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([VulnerabilityStatusDeploymentType]),
];

@Module({
  imports: AppOrmModuleDefinition,
  exports: AppOrmModuleDefinition,
})
export class AppOrmModule {}
