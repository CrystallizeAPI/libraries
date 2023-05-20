import { TStoreFrontAdapter, TStoreFrontConfig } from '../types';
import fs from 'fs/promises';

export const createFilesystemAdapter = (filename: string): TStoreFrontAdapter => {
    return {
        config: async (withSecrets: boolean): Promise<TStoreFrontConfig> => {
            const data = await fs.readFile(filename, { encoding: 'utf8' });
            const unfilteredSecrets = JSON.parse(data);
            if (withSecrets) {
                return unfilteredSecrets;
            }
            return {
                ...unfilteredSecrets,
                configuration: {
                    ...unfilteredSecrets.configuration,
                    CRYSTALLIZE_ACCESS_TOKEN_ID: '',
                    CRYSTALLIZE_ACCESS_TOKEN_SECRET: '',
                },
            };
        },
    };
};
