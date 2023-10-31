import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';

const methods = ['get', 'post', 'put', 'delete', 'patch'];
export class SwaggerHelper {
  static setDefaultResponses(doc: OpenAPIObject): void {
    for (const path of Object.keys(doc.paths)) {
      for (const method of methods) {
        const route = doc.paths[path]?.[method];
        if (route) {
          if (method === 'delete') {
            Object.assign(route.responses, {
              204: { description: 'No content' },
            });
            delete route.responses[200];
          }
          if (route.security) {
            Object.assign(route.responses, {
              401: { description: 'Not authenticated' },
              403: { description: 'Access denied' },
            });
          }
          Object.assign(route.responses, {
            400: { description: 'Bad request' },
            404: { description: 'Not found' },
            422: { description: 'Entity not found' },
            500: { description: 'Server error' },
          });
        }
      }
    }
  }
}
