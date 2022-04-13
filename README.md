# Crystallize Libraries

Here are managed all the Crystallize Libraries.

In order to simplify their maintenance they are all in this Git Repository.

All contributions will happen here:

-   PRs and Issues are therefore open, discuss, contribute in one place
-   Many things will be shared accross the `components`: Coding Standards, CI & Automations, Tests, etc.

✅ Nevertheless, all the `compoenents` (here library) will continue to be independant and pushed in their own repository. (through magic mechanisms that we have internally)

## Managed Repositories

| Libraries                                                                                                | Licence | Version                                      |
| -------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| [JS Api Client](https://github.com/CrystallizeAPI/js-api-client)                                         | ![mit]  | ![js-api-client-version]                     |
| [React JS Hooks](https://github.com/CrystallizeAPI/reactjs-hooks)                                        | ![mit]  | ![reactjs-hooks-version]                     |
| [Node Service Api Router](https://github.com/CrystallizeAPI/node-service-api-router)                     | ![mit]  | ![node-service-api-router-version]           |
| [Node Service Api Request Handlers](https://github.com/CrystallizeAPI/node-service-api-request-handlers) | ![mit]  | ![node-service-api-request-handlers-version] |

## Contributions

### Conventions

-   Pull Requests and Issues should start with `[$COMPONENT_NAME]`
-   CI will fail if Coding Standars are not OK
-   CI will fail if Tests are not OK

### Coding Standards

To run them locally:

```bash
make codeclean
```

### Tests

To run them locally:

```bash
make tests
```

> It will run the Mono Repo Tests and the tests in each `components`

### Demo app (Github Page)

You can test on that live demo page here: https://crystallizeapi.github.io/libraries/

This React App is built from this repository as well, to run it:

```bash
make start-demo-app
```

Then you can access it: http://localhost:3000/libraries (it in a subfolder like on Github.io)

> This app is then built in production mode and deployed on Github Pages via Github Actions.

## Adding a new Component (Library)

```bash
make add-component COMPONENT=my-new-component
```

> If not already done, you still need create the Github sub-repository and add an entry in `components/manifest.json`

[mit]: https://img.shields.io/badge/license-MIT-green?style=flat-square&labelColor=black
[js-api-client-version]: https://img.shields.io/npm/v/@crystallize/js-api-client?label=version&style=flat-square
[reactjs-hooks-version]: https://img.shields.io/npm/v/@crystallize/reactjs-hooks?label=version&style=flat-square
[node-service-api-router-version]: https://img.shields.io/npm/v/@crystallize/node-service-api-router?label=version&style=flat-square
[node-service-api-request-handlers-version]: https://img.shields.io/npm/v/@crystallize/node-service-api-request-handlers?label=version&style=flat-square
