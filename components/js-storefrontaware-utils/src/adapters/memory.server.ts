import { TStoreFrontAdapter, TStoreFrontConfig } from '../types';

export const createMemoryAdapter = (config: TStoreFrontConfig): TStoreFrontAdapter => {
    return {
        config: async (withSecrets: boolean): Promise<TStoreFrontConfig> => {
            if (withSecrets) {
                return config;
            }
            return {
                ...config,
                configuration: {
                    ...config.configuration,
                    ACCESS_TOKEN_ID: '',
                    ACCESS_TOKEN_SECRET: '',
                },
            };
        },
    };
};
