import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const refundVippsPayment = async (orderId: string, credentials: VippsAppCredentials, body: any) => {
    const client = await createClient({
        ...credentials,
        fetchToken: false,
    });
    const refundConfirmation = await client.post(`/ecomm/v2/payments/${orderId}/refund`, body, orderId);

    return refundConfirmation;
};
