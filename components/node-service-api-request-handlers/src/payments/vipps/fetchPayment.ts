import { createClient } from './client.js';
import { VippsAppCredentials } from './types.js';

export const fetchVippsPayment = async (reference: string, credentials: VippsAppCredentials) => {
    const client = await createClient({
        ...credentials,
        fetchToken: true,
    });
    const payment = await client.get<{ state: 'CREATED' | 'AUTHORIZED' | 'TERMINATED' }>(
        `/epayment/v1/payments/${reference}`,
        reference,
    );
    return payment;
};
