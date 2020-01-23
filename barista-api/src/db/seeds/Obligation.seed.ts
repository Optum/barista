// tslint:disable:max-line-length

import { Obligation } from '../../models';

export const ObligationSeed: Array<Partial<Obligation>> = [
  {
    name: 'Attribution',
    desc: 'All copyright, patent, trademark and attribution notices from the components must be retained.',
    code: 'attribution',
  },
  {
    name: 'Component Isolation',
    desc:
      'The components must remain separable from any proprietary organization product or solution and merely linked or referenced by name or appropriate interface.',
    code: 'component_isolation',
  },
  {
    name: 'Internal Use Only',
    desc:
      'Component(s) or tool(s) may only be used internally.  Any exceptions must be approved on an individual use case basis.',
    code: 'internal_use_only',
  },
  {
    name: 'No Modifications',
    desc: 'Component(s) may not be modified unless reviewed and approved for a specific use case.',
    code: 'no_modifications',
  },
  {
    name: 'Apache License Distribution',
    desc:
      'The full text of the applicable Apache license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Apache license must be distributed with the components as applicable.',
    code: 'apache_license_distribution',
  },
  {
    name: 'No Promotion',
    desc:
      'Neither the organization nor the names of contributors to the components may be used to endorse or promote products derived from  the components without specific prior written permission.',
    code: 'no_promotion',
  },
  {
    name: 'Notice text file',
    desc: 'If the components include a NOTICE text file, it must be retained and distributed with the components.',
    code: 'notice_text_file',
  },
  {
    name: 'Source Code',
    desc:
      'Component source code and supporting files must be made available in a timely manner to any end user through a reasonable request process.',
    code: 'source_code',
  },
  {
    name: 'Exclusive Licensing Terms',
    desc:
      'Customer agreements which provide for component hosting must clearly reference the applicable GPL or LGPL license as the exclusive terms governing use of covered components.',
    code: 'exclusive_licensing_terms',
  },
  {
    name: 'GPL License Distribution',
    desc:
      'The full text of the applicable GPL or LGPL license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times.',
    code: 'gpl_license_distribution',
  },
  {
    name: 'No Distribution',
    desc:
      'Components may be used internally or as part of an external facing but internally hosted application or service.  Components may not be distributed without specific use case approval.',
    code: 'no_distribution',
  },
  {
    name: 'Jdom License Distribution',
    desc:
      'The full text of the applicable Jdom license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Jdom license must be distributed with the components as applicable.',
    code: 'jdom_license_distribution',
  },
  {
    name: 'PostgreSQL License Distribution',
    desc:
      'The full text of the applicable PostgreSQL license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the PostgreSQL license must be distributed with the components as applicable.',
    code: 'postgresql_license_distribution',
  },
  {
    name: 'BSD License Distribution',
    desc:
      'The full text of the applicable BSD license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the BSD license must be distributed with the components as applicable.',
    code: 'bsd_license_distribution',
  },
  {
    name: 'Ruby License Distribution',
    desc:
      'The full text of the applicable Ruby license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Ruby license must be distributed with the components as applicable.',
    code: 'ruby_license_distribution',
  },
  {
    name: 'CDDL License Distribution',
    desc:
      'The full text of the applicable CDDL license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the CDDL license must be distributed with the components as applicable.',
    code: 'cddl_license_distribution',
  },
  {
    name: 'Common Public License Distribution',
    desc:
      'The full text of the applicable Common Public license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Common Public license must be distributed with the components as applicable.',
    code: 'common_public_license_distribution',
  },
  {
    name: 'Common Public Attribution License Distribution',
    desc:
      'The full text of the applicable CPALlicense including warranty disclaimers and all copyright, patent, trademark, exhibits and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the CPAL license including exhibits must be distributed with the components as applicable.',
    code: 'common_public_attribution_license_distribution',
  },
  {
    name: 'Creative Commons License Distribution',
    desc:
      'The full text of the applicable Creative Commons license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Creative Commons license must be distributed with the components as applicable.',
    code: 'creative_commons_license_distribution',
  },
  {
    name: 'Dom4j License Distribution',
    desc:
      'The full text of the applicable dom4j license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the dom4j license must be distributed with the components as applicable.',
    code: 'dom4j_license_distribution',
  },
  {
    name: 'Eclipse Public License Distribution',
    desc:
      'The full text of the applicable Eclipse Public license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Eclipse Public license must be distributed with the components as applicable.',
    code: 'eclipse_public_license_distribution',
  },
  {
    name: 'Object Code Distribution Only',
    desc: 'Component(s) may only be distributed in object code (binary) form.',
    code: 'object_code_distribution_only',
  },
  {
    name: 'Reverse Engineering',
    desc:
      'Customer agreements which provide for component hosting must allow reverse engineering  for purposes of debugging only.',
    code: 'reverse_engineering',
  },
  {
    name: 'Hypersonic SQL License Distribution',
    desc:
      'The full text of the applicable Hypersonic SQL license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Hypersonic SQL license must be distributed with the components as applicable.',
    code: 'hypersonic_sql_license_distribution',
  },
  {
    name: 'Indiana University Extreme! Lab Software License',
    desc:
      'The full text of the applicable Indiana University Extreme! Lab Software license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Indiana University Extreme! Lab Software license must be distributed with the components as applicable.',
    code: 'indiana_university_extreme!_lab_software_license',
  },
  {
    name: 'Java Transaction API License',
    desc:
      'The full text of the applicable Java Transaction API license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Java Transaction API license must be distributed with the components as applicable.',
    code: 'java_transaction_api_license',
  },
  {
    name: 'JCSH License Distribution',
    desc:
      'The full text of the applicable JSCH license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the JSCH license must be distributed with the components as applicable.',
    code: 'jcsh_license_distribution',
  },
  {
    name: 'Microsoft License Distribution',
    desc:
      'The full text of the applicable Microsoft license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Microsoft license must be distributed with the components as applicable.',
    code: 'microsoft_license_distribution',
  },
  {
    name: 'Microsoft .Net Library License Source',
    desc:
      'Please refer to the URL here for the applicable Microsoft .Net Library License as referenced on the NuGET provisioning website:  http://www.microsoft.com/web/webpi/eula/net_library_eula_enu.htm',
    code: 'microsoft_.net_library_license_source',
  },
  {
    name: 'MSPL License Distribution',
    desc:
      'The full text of the applicable MSPL license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the MSPL license must be distributed with the components as applicable.',
    code: 'mspl_license_distribution',
  },
  {
    name: 'MIT License Distribution',
    desc:
      'The full text of the applicable MIT license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the MIT license must be distributed with the components as applicable.',
    code: 'mit_license_distribution',
  },
  {
    name: 'Mozilla Public License Distribution',
    desc:
      'The full text of the applicable Mozilla Public license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Mozilla Public license must be distributed with the components as applicable.',
    code: 'mozilla_public_license_distribution',
  },
  {
    name: 'Sun JavaBeans Activation Framework License Distribution',
    desc:
      'The full text of the applicable Sun JavaBeans Activation Framework license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Sun JavaBeans Activation Framework  license must be distributed with the components as applicable.',
    code: 'sun_javabeans_activation_framework_license_distribution',
  },
  {
    name: 'Sun Microsystems, Inc. Binary Code License Distribution',
    desc:
      'The full text of the applicable Sun Microsystems, Inc. Binary Code License including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the Sun Microsystems, Inc. Binary Code license must be distributed with the components as applicable.',
    code: 'sun_microsystems,_inc._binary_code_license_distribution',
  },
  {
    name: 'W3C License Distribution',
    desc:
      'The full text of the applicable W3C license including warranty disclaimers and all copyright, patent, trademark and attribution notices from the components must be made available for end user review through an appropriate user interface at all times and or a copy of the W3C license must be distributed with the components as applicable.',
    code: 'w3c_license_distribution',
  },
];

export interface ObligationLicenseRelationship {
  license_id: number;
  obligation_id: number;
}

export const ObligationLicenseRelationships: ObligationLicenseRelationship[] = [
  {
    license_id: 2,
    obligation_id: 1,
  },
  {
    license_id: 1,
    obligation_id: 1,
  },
  {
    license_id: 1,
    obligation_id: 2,
  },
  {
    license_id: 1,
    obligation_id: 3,
  },
  {
    license_id: 1,
    obligation_id: 4,
  },
  {
    license_id: 4,
    obligation_id: 5,
  },
  {
    license_id: 4,
    obligation_id: 1,
  },
  {
    license_id: 4,
    obligation_id: 2,
  },
  {
    license_id: 4,
    obligation_id: 4,
  },
  {
    license_id: 4,
    obligation_id: 6,
  },
  {
    license_id: 4,
    obligation_id: 7,
  },
  {
    license_id: 4,
    obligation_id: 8,
  },
  {
    license_id: 15,
    obligation_id: 1,
  },
  {
    license_id: 15,
    obligation_id: 2,
  },
  {
    license_id: 15,
    obligation_id: 9,
  },
  {
    license_id: 15,
    obligation_id: 10,
  },
  {
    license_id: 15,
    obligation_id: 11,
  },
  {
    license_id: 15,
    obligation_id: 4,
  },
  {
    license_id: 15,
    obligation_id: 8,
  },
  {
    license_id: 22,
    obligation_id: 1,
  },
  {
    license_id: 22,
    obligation_id: 2,
  },
  {
    license_id: 22,
    obligation_id: 9,
  },
  {
    license_id: 22,
    obligation_id: 10,
  },
  {
    license_id: 22,
    obligation_id: 11,
  },
  {
    license_id: 22,
    obligation_id: 4,
  },
  {
    license_id: 22,
    obligation_id: 8,
  },
  {
    license_id: 26,
    obligation_id: 1,
  },
  {
    license_id: 26,
    obligation_id: 12,
  },
  {
    license_id: 26,
    obligation_id: 4,
  },
  {
    license_id: 26,
    obligation_id: 6,
  },
  {
    license_id: 37,
    obligation_id: 1,
  },
  {
    license_id: 37,
    obligation_id: 4,
  },
  {
    license_id: 37,
    obligation_id: 13,
  },
  {
    license_id: 38,
    obligation_id: 1,
  },
  {
    license_id: 38,
    obligation_id: 14,
  },
  {
    license_id: 38,
    obligation_id: 4,
  },
  {
    license_id: 38,
    obligation_id: 15,
  },
  {
    license_id: 42,
    obligation_id: 1,
  },
  {
    license_id: 42,
    obligation_id: 2,
  },
  {
    license_id: 42,
    obligation_id: 9,
  },
  {
    license_id: 42,
    obligation_id: 10,
  },
  {
    license_id: 42,
    obligation_id: 11,
  },
  {
    license_id: 42,
    obligation_id: 4,
  },
  {
    license_id: 42,
    obligation_id: 8,
  },
  {
    license_id: 3,
    obligation_id: 5,
  },
  {
    license_id: 3,
    obligation_id: 1,
  },
  {
    license_id: 3,
    obligation_id: 4,
  },
  {
    license_id: 3,
    obligation_id: 6,
  },
  {
    license_id: 5,
    obligation_id: 1,
  },
  {
    license_id: 5,
    obligation_id: 14,
  },
  {
    license_id: 5,
    obligation_id: 4,
  },
  {
    license_id: 5,
    obligation_id: 6,
  },
  {
    license_id: 6,
    obligation_id: 1,
  },
  {
    license_id: 6,
    obligation_id: 14,
  },
  {
    license_id: 6,
    obligation_id: 4,
  },
  {
    license_id: 7,
    obligation_id: 1,
  },
  {
    license_id: 7,
    obligation_id: 14,
  },
  {
    license_id: 7,
    obligation_id: 4,
  },
  {
    license_id: 7,
    obligation_id: 6,
  },
  {
    license_id: 8,
    obligation_id: 1,
  },
  {
    license_id: 8,
    obligation_id: 16,
  },
  {
    license_id: 8,
    obligation_id: 2,
  },
  {
    license_id: 8,
    obligation_id: 4,
  },
  {
    license_id: 8,
    obligation_id: 8,
  },
  {
    license_id: 9,
    obligation_id: 1,
  },
  {
    license_id: 9,
    obligation_id: 17,
  },
  {
    license_id: 9,
    obligation_id: 2,
  },
  {
    license_id: 9,
    obligation_id: 4,
  },
  {
    license_id: 9,
    obligation_id: 8,
  },
  {
    license_id: 10,
    obligation_id: 1,
  },
  {
    license_id: 10,
    obligation_id: 18,
  },
  {
    license_id: 10,
    obligation_id: 4,
  },
  {
    license_id: 10,
    obligation_id: 6,
  },
  {
    license_id: 10,
    obligation_id: 8,
  },
  {
    license_id: 11,
    obligation_id: 1,
  },
  {
    license_id: 11,
    obligation_id: 19,
  },
  {
    license_id: 11,
    obligation_id: 4,
  },
  {
    license_id: 12,
    obligation_id: 1,
  },
  {
    license_id: 13,
    obligation_id: 1,
  },
  {
    license_id: 13,
    obligation_id: 20,
  },
  {
    license_id: 13,
    obligation_id: 4,
  },
  {
    license_id: 13,
    obligation_id: 6,
  },
  {
    license_id: 14,
    obligation_id: 1,
  },
  {
    license_id: 14,
    obligation_id: 2,
  },
  {
    license_id: 14,
    obligation_id: 21,
  },
  {
    license_id: 14,
    obligation_id: 4,
  },
  {
    license_id: 14,
    obligation_id: 22,
  },
  {
    license_id: 14,
    obligation_id: 8,
  },
  {
    license_id: 16,
    obligation_id: 1,
  },
  {
    license_id: 16,
    obligation_id: 2,
  },
  {
    license_id: 16,
    obligation_id: 3,
  },
  {
    license_id: 16,
    obligation_id: 4,
  },
  {
    license_id: 17,
    obligation_id: 1,
  },
  {
    license_id: 17,
    obligation_id: 2,
  },
  {
    license_id: 17,
    obligation_id: 9,
  },
  {
    license_id: 17,
    obligation_id: 10,
  },
  {
    license_id: 17,
    obligation_id: 11,
  },
  {
    license_id: 17,
    obligation_id: 4,
  },
  {
    license_id: 17,
    obligation_id: 8,
  },
  {
    license_id: 18,
    obligation_id: 1,
  },
  {
    license_id: 18,
    obligation_id: 2,
  },
  {
    license_id: 18,
    obligation_id: 9,
  },
  {
    license_id: 18,
    obligation_id: 10,
  },
  {
    license_id: 18,
    obligation_id: 4,
  },
  {
    license_id: 18,
    obligation_id: 23,
  },
  {
    license_id: 18,
    obligation_id: 8,
  },
  {
    license_id: 19,
    obligation_id: 1,
  },
  {
    license_id: 19,
    obligation_id: 2,
  },
  {
    license_id: 19,
    obligation_id: 9,
  },
  {
    license_id: 19,
    obligation_id: 10,
  },
  {
    license_id: 19,
    obligation_id: 4,
  },
  {
    license_id: 19,
    obligation_id: 23,
  },
  {
    license_id: 19,
    obligation_id: 8,
  },
  {
    license_id: 20,
    obligation_id: 1,
  },
  {
    license_id: 20,
    obligation_id: 2,
  },
  {
    license_id: 20,
    obligation_id: 9,
  },
  {
    license_id: 20,
    obligation_id: 10,
  },
  {
    license_id: 20,
    obligation_id: 11,
  },
  {
    license_id: 20,
    obligation_id: 4,
  },
  {
    license_id: 20,
    obligation_id: 8,
  },
  {
    license_id: 21,
    obligation_id: 1,
  },
  {
    license_id: 21,
    obligation_id: 2,
  },
  {
    license_id: 21,
    obligation_id: 9,
  },
  {
    license_id: 21,
    obligation_id: 10,
  },
  {
    license_id: 21,
    obligation_id: 11,
  },
  {
    license_id: 21,
    obligation_id: 4,
  },
  {
    license_id: 21,
    obligation_id: 8,
  },
  {
    license_id: 23,
    obligation_id: 1,
  },
  {
    license_id: 23,
    obligation_id: 24,
  },
  {
    license_id: 23,
    obligation_id: 4,
  },
  {
    license_id: 23,
    obligation_id: 6,
  },
  {
    license_id: 24,
    obligation_id: 1,
  },
  {
    license_id: 24,
    obligation_id: 25,
  },
  {
    license_id: 24,
    obligation_id: 4,
  },
  {
    license_id: 24,
    obligation_id: 6,
  },
  {
    license_id: 25,
    obligation_id: 1,
  },
  {
    license_id: 25,
    obligation_id: 26,
  },
  {
    license_id: 25,
    obligation_id: 4,
  },
  {
    license_id: 25,
    obligation_id: 22,
  },
  {
    license_id: 27,
    obligation_id: 1,
  },
  {
    license_id: 27,
    obligation_id: 27,
  },
  {
    license_id: 27,
    obligation_id: 4,
  },
  {
    license_id: 27,
    obligation_id: 6,
  },
  {
    license_id: 28,
    obligation_id: 1,
  },
  {
    license_id: 28,
    obligation_id: 2,
  },
  {
    license_id: 28,
    obligation_id: 9,
  },
  {
    license_id: 28,
    obligation_id: 10,
  },
  {
    license_id: 28,
    obligation_id: 4,
  },
  {
    license_id: 28,
    obligation_id: 23,
  },
  {
    license_id: 28,
    obligation_id: 8,
  },
  {
    license_id: 29,
    obligation_id: 1,
  },
  {
    license_id: 29,
    obligation_id: 2,
  },
  {
    license_id: 29,
    obligation_id: 9,
  },
  {
    license_id: 29,
    obligation_id: 10,
  },
  {
    license_id: 29,
    obligation_id: 4,
  },
  {
    license_id: 29,
    obligation_id: 23,
  },
  {
    license_id: 29,
    obligation_id: 8,
  },
  {
    license_id: 30,
    obligation_id: 1,
  },
  {
    license_id: 30,
    obligation_id: 28,
  },
  {
    license_id: 30,
    obligation_id: 4,
  },
  {
    license_id: 30,
    obligation_id: 6,
  },
  {
    license_id: 30,
    obligation_id: 22,
  },
  {
    license_id: 31,
    obligation_id: 1,
  },
  {
    license_id: 31,
    obligation_id: 29,
  },
  {
    license_id: 31,
    obligation_id: 28,
  },
  {
    license_id: 31,
    obligation_id: 4,
  },
  {
    license_id: 31,
    obligation_id: 6,
  },
  {
    license_id: 31,
    obligation_id: 22,
  },
  {
    license_id: 32,
    obligation_id: 1,
  },
  {
    license_id: 32,
    obligation_id: 30,
  },
  {
    license_id: 32,
    obligation_id: 4,
  },
  {
    license_id: 32,
    obligation_id: 6,
  },
  {
    license_id: 32,
    obligation_id: 22,
  },
  {
    license_id: 33,
    obligation_id: 1,
  },
  {
    license_id: 33,
    obligation_id: 31,
  },
  {
    license_id: 33,
    obligation_id: 4,
  },
  {
    license_id: 34,
    obligation_id: 1,
  },
  {
    license_id: 34,
    obligation_id: 2,
  },
  {
    license_id: 34,
    obligation_id: 32,
  },
  {
    license_id: 34,
    obligation_id: 4,
  },
  {
    license_id: 34,
    obligation_id: 22,
  },
  {
    license_id: 34,
    obligation_id: 8,
  },
  {
    license_id: 35,
    obligation_id: 1,
  },
  {
    license_id: 35,
    obligation_id: 2,
  },
  {
    license_id: 35,
    obligation_id: 32,
  },
  {
    license_id: 35,
    obligation_id: 4,
  },
  {
    license_id: 35,
    obligation_id: 22,
  },
  {
    license_id: 35,
    obligation_id: 8,
  },
  {
    license_id: 36,
    obligation_id: 1,
  },
  {
    license_id: 36,
    obligation_id: 2,
  },
  {
    license_id: 36,
    obligation_id: 32,
  },
  {
    license_id: 36,
    obligation_id: 4,
  },
  {
    license_id: 36,
    obligation_id: 22,
  },
  {
    license_id: 36,
    obligation_id: 8,
  },
  {
    license_id: 39,
    obligation_id: 1,
  },
  {
    license_id: 39,
    obligation_id: 16,
  },
  {
    license_id: 39,
    obligation_id: 2,
  },
  {
    license_id: 39,
    obligation_id: 4,
  },
  {
    license_id: 39,
    obligation_id: 8,
  },
  {
    license_id: 40,
    obligation_id: 1,
  },
  {
    license_id: 40,
    obligation_id: 4,
  },
  {
    license_id: 40,
    obligation_id: 22,
  },
  {
    license_id: 40,
    obligation_id: 33,
  },
  {
    license_id: 41,
    obligation_id: 1,
  },
  {
    license_id: 41,
    obligation_id: 4,
  },
  {
    license_id: 41,
    obligation_id: 6,
  },
  {
    license_id: 41,
    obligation_id: 22,
  },
  {
    license_id: 41,
    obligation_id: 34,
  },
  {
    license_id: 43,
    obligation_id: 1,
  },
  {
    license_id: 43,
    obligation_id: 4,
  },
  {
    license_id: 43,
    obligation_id: 22,
  },
  {
    license_id: 43,
    obligation_id: 33,
  },
  {
    license_id: 44,
    obligation_id: 1,
  },
  {
    license_id: 44,
    obligation_id: 2,
  },
  {
    license_id: 44,
    obligation_id: 4,
  },
  {
    license_id: 44,
    obligation_id: 22,
  },
  {
    license_id: 44,
    obligation_id: 34,
  },
  {
    license_id: 45,
    obligation_id: 1,
  },
  {
    license_id: 45,
    obligation_id: 4,
  },
  {
    license_id: 45,
    obligation_id: 6,
  },
  {
    license_id: 45,
    obligation_id: 35,
  },
];
// tslint:enable:max-line-length
