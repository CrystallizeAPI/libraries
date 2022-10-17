import { dto } from '../src'
import test from 'ava'

test('Single depth path', t => {
    const input = { id: 1, title: 'Test' }
    const value = dto<{
        id: number;
        name: string;
    }>({
        id: 'id',
        name: 'title',
    })(input);
    t.is(value.id, input.id);
    t.is(value.name, input.title);
})

test('Deep paths', t => {
    const name = 'Foo'
    const input = {
        catalogue: {
            get: {
                name,
                not: 'Not',
            },
        },
    }
    const value = dto<{ name: string; }>({ name: 'catalogue.get.name' })(input);
    t.is(value.name, name);
})

test('Pass through objects', t => {
    const user = {
        firstName: 'John',
        lastName: 'Doe'
    }
    const input = {
        user: {
            get: {
                user: { ...user },
            },
        },
    }
    const value = dto<{
        user: {
            firstName: string;
            lastName: string;
        },
    }>({ user: 'user.get.user' })(input);
    t.like(value.user, user);
})

test('Iterates array', t => {
    const users = [{
        firstName: 'John',
        lastName: 'Doe'
    }, {
        firstName: 'Jane',
        lastName: 'Doe'
    }]
    const value = dto<{
        users: Array<{
            firstName: string;
            lastName: string;
        }>,
    }>({ users: 'users' })({ users });
    t.is(value.users, users);
})

test('Non existant returns undefined', t => {
    const value = dto<{
        bar: string;
    }>({ bar: 'bar' })({ foo: 'bar' });
    t.is(value.bar, undefined);
})
