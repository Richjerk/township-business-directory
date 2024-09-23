import * as dotenv from 'dotenv';
dotenv.config();

export default {
  contentSources: [
    {
      name: 'contentful',
      projectId: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
      managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    }
  ],
  // other configurations...
};
