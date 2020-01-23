import { DefaultScanWorkerService } from '@app/default-scan/default-scan-worker/default-scan-worker.service';
import { MavenService } from '@app/default-scan/dep-clients/maven/maven.service';
import { NpmService } from '@app/default-scan/dep-clients/npm/npm.service';
import { NugetService } from '@app/default-scan/dep-clients/nuget/nuget.service';
import { Python3PipService } from '@app/default-scan/dep-clients/python/python3-pip.service';
import { DependencyCheckService } from '@app/default-scan/scanners/dependency-check/dependency-check.service';
import { LicenseCheckerService } from '@app/default-scan/scanners/license-checker/license-checker.service';
import { LicenseMavenService } from '@app/default-scan/scanners/license-maven/license-maven.service';
import { LicenseNugetService } from '@app/default-scan/scanners/license-nuget/license-nuget.service';
import { NvdCheckService } from '@app/default-scan/scanners/nvd-check/nvd-check.service';
import { Python3PipLicensesService } from '@app/default-scan/scanners/pip-licenses/python3-pip-licenses.service';
import { ScanCodeService } from '@app/default-scan/scanners/scan-code/scan-code.service';
import { ServicesModule } from '@app/services/services.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), ServicesModule],
  exports: [ServicesModule],
  providers: [
    DependencyCheckService,
    DefaultScanWorkerService,
    LicenseMavenService,
    LicenseCheckerService,
    LicenseNugetService,
    MavenService,
    NpmService,
    NugetService,
    NvdCheckService,
    Python3PipService,
    Python3PipLicensesService,
    ScanCodeService,
  ],
})
export class DefaultScanModule {}
