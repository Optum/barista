export class LogProjectChangeCommand {
  static Actions = {
    projectCreated: 'project-created',
    projectDetailsUpdated: 'project-details-updated',
    projectScanInitiated: 'project-scan-initiated',
    manualLicenseCreated: 'manual-license-created',
    licenseExceptionCreated: 'license-exception-created',
    licenseExceptionUpdated: 'license-exception-updated',
    licenseExceptionDeleted: 'license-exception-deleted',
    securityVulnerabilityExceptionCreated: 'security-vulnerability-exception-created',
    securityVulnerabilityExceptionUpdated: 'security-vulnerability-exception-updated',
    securityVulnerabilityExceptionDeleted: 'security-vulnerability-exception-deleted',
  };

  constructor(
    public readonly projectId: number,
    public readonly action: string,
    public readonly notes: string,
    public readonly userId: string,
    public readonly notePayload: string = '',
  ) {}
}
