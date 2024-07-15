import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const captureVippsPayment = async (orderId: string, credentials: VippsAppCredentials, body: any) => {
    const client = await createClient({
        ...credentials,
        fetchToken: false,
    });
    const capturedConfirmation = await client.post(`/ecomm/v2/payments/${orderId}/capture`, body, orderId);

    return capturedConfirmation;
};
