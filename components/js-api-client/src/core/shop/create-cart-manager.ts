import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { ClientInterface } from '../client/create-client.js';
import {
    CartInput,
    CartInputSchema,
    CartSkuItemInput,
    CartSkuItemInputSchema,
    CustomerInput,
    CustomerInputSchema,
    MetaInput,
} from '@crystallize/schema/shop';
import { transformCartCustomerInput, transformCartInput } from './helpers.js';

type WithId<R> = R & { id: string };

/**
 * Creates a cart manager for hydrating, placing, and managing shopping carts via the Crystallize Shop Cart API.
 * Requires a shop API token or appropriate credentials in the client configuration.
 *
 * @param apiClient - A Crystallize client instance created via `createClient`.
 * @returns An object with methods to `hydrate`, `fetch`, `place`, `fulfill`, `abandon`, `addSkuItem`, `removeItem`, `setMeta`, and `setCustomer`.
 *
 * @example
 * ```ts
 * const cartManager = createCartManager(client);
 * const cart = await cartManager.hydrate({
 *   items: [{ sku: 'SKU-001', quantity: 2 }],
 *   locale: { displayName: 'English', language: 'en' },
 * });
 * const placed = await cartManager.place(cart.id);
 * ```
 */
export const createCartManager = (apiClient: ClientInterface) => {
    const cartQuery = async <OnCart, OC = unknown>(name: string, args: Record<string, unknown>, onCart?: OC) => {
        const query = { [name]: { __args: args, id: true, ...onCart } };
        const response = await apiClient.shopCartApi<Record<string, WithId<OnCart>>>(jsonToGraphQLQuery({ query }));
        return response[name];
    };

    const cartMutation = async <OnCart, OC = unknown>(name: string, args: Record<string, unknown>, onCart?: OC) => {
        const mutation = { [name]: { __args: args, id: true, ...onCart } };
        const response = await apiClient.shopCartApi<Record<string, WithId<OnCart>>>(
            jsonToGraphQLQuery({ mutation }),
        );
        return response[name];
    };

    type MetaIntent = {
        meta: MetaInput;
        merge: boolean;
    };

    return {
        hydrate: async <OnCart, OC = unknown>(intent: CartInput, onCart?: OC) => {
            const input = CartInputSchema.parse(intent);
            return cartMutation<OnCart, OC>('hydrate', { input: transformCartInput(input) }, onCart);
        },
        place: <OnCart, OC = unknown>(id: string, onCart?: OC) => cartMutation<OnCart, OC>('place', { id }, onCart),
        fetch: <OnCart, OC = unknown>(id: string, onCart?: OC) => cartQuery<OnCart, OC>('cart', { id }, onCart),
        fulfill: <OnCart, OC = unknown>(id: string, orderId: string, onCart?: OC) =>
            cartMutation<OnCart, OC>('fulfill', { id, orderId }, onCart),
        abandon: <OnCart, OC = unknown>(id: string, onCart?: OC) => cartMutation<OnCart, OC>('abandon', { id }, onCart),
        addSkuItem: async <OnCart, OC = unknown>(id: string, intent: CartSkuItemInput, onCart?: OC) => {
            const input = CartSkuItemInputSchema.parse(intent);
            return cartMutation<OnCart, OC>('addSkuItem', { id, input }, onCart);
        },
        removeItem: <OnCart, OC = unknown>(
            id: string,
            { sku, quantity }: { sku: string; quantity: number },
            onCart?: OC,
        ) => cartMutation<OnCart, OC>('removeCartItem', { id, sku, quantity }, onCart),
        setMeta: <OnCart, OC = unknown>(id: string, { meta, merge }: MetaIntent, onCart?: OC) =>
            cartMutation<OnCart, OC>('setMeta', { id, merge, meta }, onCart),
        setCustomer: async <OnCart, OC = unknown>(id: string, customerIntent: CustomerInput, onCart?: OC) => {
            const input = CustomerInputSchema.parse(customerIntent);
            return cartMutation<OnCart, OC>('setCustomer', { id, input: transformCartCustomerInput(input) }, onCart);
        },
    };
};
