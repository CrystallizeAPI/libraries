import { z } from 'zod';

export enum CartTransition {
    Save = 'save',
    Place = 'place',
    Fulfill = 'fulfill',
    Abandon = 'abandon',
}

export enum CartState {
    Cart = 'cart',
    Placed = 'placed',
    Ordered = 'ordered',
    Abandoned = 'abandoned',
}

export enum CartItemOrigin {
    Crystallize = 'crystallize',
    External = 'external',
}

export const CartStateSchema = z.enum(CartState);
export const CartTransitionSchema = z.enum(CartTransition);
export const CartItemOriginSchema = z.enum(CartItemOrigin);
