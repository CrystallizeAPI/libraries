# Crystallize Libraries

Here are managed all the Crystallize Libraries.

In order to simplify their maintenance they are all in this Git Repository.

All contributions will happen here:

- PRs and Issues are therefore open, discuss, contribute in one place
- Many things will be shared accross the `components`: Coding Standards, CI & Automations, Tests, etc.

✅ Nevertheless, all the `components` (here library) will continue to be independant and pushed in their own repository. (through magic mechanisms that we have internally)

## Managed Repositories

| Libraries                                                                   | Licence | Version                       |
| --------------------------------------------------------------------------- | ------- | ----------------------------- |
| [JS Api Client](https://github.com/CrystallizeAPI/js-api-client)            | ![mit]  | ![js-api-client-version]      |
| [React JS Components](https://github.com/CrystallizeAPI/reactjs-components) | ![mit]  | ![reactjs-components-version] |
| [Schema](https://github.com/CrystallizeAPI/schema)                          | ![mit]  | ![schema]                     |

## Contributions

### Conventions

- Pull Requests and Issues should start with `[$COMPONENT_NAME]`
- CI will fail if Coding Standars are not OK
- CI will fail if Tests are not OK

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
[reactjs-components-version]: https://img.shields.io/npm/v/@crystallize/reactjs-components?label=version&style=flat-square
[schema]: https://img.shields.io/npm/v/@crystallize/schema?label=version&style=flat-square
