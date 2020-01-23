import { Scan } from '@app/models';
import { ProjectService } from '@app/services/project/project.service';
import { SystemConfigurationService } from '@app/services/system-configuration/system-configuration.service';

export const scanCompletedEmails = (scan: Scan, projectService: ProjectService) => ({
  text: async () => {
    const config = await SystemConfigurationService.defaultConfiguration();

    return `${scan.project.userId},

Scan activity for project [${scan.project.name}] has completed.

Scan results are here: ${config.productionDeployUrl}/project/${scan.project.id}/scan/${scan.id}.

Thank you,

Barista Team
    `;
  },
  html: async () => {
    const config = await SystemConfigurationService.defaultConfiguration();
    const licenseStatus = await projectService.highestLicenseStatus(scan.project);
    const securityStatus = await projectService.highestSecurityStatus(scan.project);

    const color = code => {
      return code === 'unknown' ? 'gray' : code;
    };

    return `
    <html>
      <head>
      </head>
      <body style="font-family: Tahoma,serif">
       <br/>
       <br/>
       Scan activity for project [${scan.project.name}] has completed.
       <br/>
       <br/>
       <div style="height: 0px; width: 130px">
       License State: <span style="color: ${color(licenseStatus.code)}; font-size: 62px;font-weight: bolder;
       font-family: Arial,serif; line-height: 0px; float: right">&#0149;</span>
       </div>
       <br>
       <br />
      <div style="height: 0px; width: 130px">
       Security State: <span style="color: ${color(securityStatus.code)}; font-size: 62px;font-weight: bolder;
       font-family: Arial,serif; line-height: 0px; float: right">&#0149;</span>
       </div>
       <br />
       <br />
       Scan results are here: <a href="${config.productionDeployUrl}/project/${scan.project.id}/scan/${scan.id}">
       ${config.productionDeployUrl}/project/${scan.project.id}/scan/${scan.id}
       </a>
       <br/>
       <br/>
       Thank you,
       <br/>
       <br/>
       Barista Team
      </body>
      </html>
    `;
  },
});
