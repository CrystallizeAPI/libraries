import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const cancelVippsPayment = async (orderId: string, credentials: VippsAppCredentials, body: any) => {
    const client = await createClient({
        ...credentials,
        fetchToken: false,
    });
    const cancelConfirmation = await client.put(`/ecomm/v2/payments/${orderId}/cancel`, body, orderId);

    return cancelConfirmation;
};
