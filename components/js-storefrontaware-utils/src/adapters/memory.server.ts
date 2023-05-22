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
                    CRYSTALLIZE_ACCESS_TOKEN_ID: '',
                    CRYSTALLIZE_ACCESS_TOKEN_SECRET: '',
                },
            };
        },
    };
};
