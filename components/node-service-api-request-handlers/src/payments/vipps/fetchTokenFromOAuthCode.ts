import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const fetchVippsTokenFromOAuthCode = async (
    code: string,
    redirectUri: string,
    credentials: VippsAppCredentials,
) => {
    const client = await createClient({
        ...credentials,
        fetchToken: false,
        oauthConnect: true,
    });
    const result = await client.formEncodedPost<{ access_token: string }>(
        `/access-management-1.0/access/oauth2/token`,
        {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
        },
        '',
    );
    return result.access_token;
};
