import { createClient } from './client.js';
import { AddReceiptToOrderArgs, VippsAppCredentials } from './types.js';

export const addVippsReceiptOrder = async (
    { orderId, paymentType, receipt }: AddReceiptToOrderArgs,
    credentials: VippsAppCredentials,
) => {
    const client = await createClient({
        ...credentials,
        fetchToken: true,
    });
    const payment = await client.post<{ state: 'CREATED' | 'AUTHORIZED' | 'TERMINATED' }>(
        `/order-management/v2/${paymentType}/receipts/${orderId}`,
        receipt,
        orderId,
    );
    return payment;
};
