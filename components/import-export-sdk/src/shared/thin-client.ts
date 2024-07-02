import { ApiCaller, VariablesType } from '@crystallize/js-api-client';

export interface ThinClient {
    config: {
        tenantId?: string;
        tenantIdentifier: string;
    };
    pimApi: ApiCaller<any>;
    nextPimApi: ApiCaller<any>;
    enqueue: {
        pimApi: (query: string, variables?: VariablesType) => string;
        nextPimApi: (query: string, variables?: VariablesType) => string;
    };
}
