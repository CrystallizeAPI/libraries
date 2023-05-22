import { ClientInterface } from '@crystallize/js-api-client';

export type TStoreFrontConfig = {
    id: string;
    name: string;
    identifier: string;
    tenantIdentifier: string;
    tenantId: string;
    language: string;
    storefront: string;
    logo: {
        url: string;
        key: string;
        variants: {
            url: string;
            key: string;
            width: number;
            height: number;
        }[];
    };
    theme: string;
    configuration: Record<string, string>;
    superfastVersion: string;
    taxIncluded: boolean;
    paymentMethods: string[];
    enabled: boolean;
};

export type TStoreFrontAdapter = {
    config: (withSecrets: boolean) => Promise<TStoreFrontConfig>;
};

export type TStoreFront = {
    config: TStoreFrontConfig;
    apiClient: ClientInterface;
};
