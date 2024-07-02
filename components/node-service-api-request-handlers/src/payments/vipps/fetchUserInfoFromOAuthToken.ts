import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const fetchVippsUserInfoFromOAuthToken = async <T>(token: string, credentials: VippsAppCredentials) => {
    const client = await createClient({
        ...credentials,
        fetchToken: false,
        oauthToken: token,
    });
    const oauthResponse = await client.get<T>(`/vipps-userinfo-api/userinfo/`, '');
    return oauthResponse;
};
