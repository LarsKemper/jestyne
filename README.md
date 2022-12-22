# jestyne

![license](https://img.shields.io/github/license/LarsKemper/jestyne)
![release](https://img.shields.io/github/v/release/LarsKemper/jestyne)
![npm](https://img.shields.io/npm/dm/jestyne?label=npm%20downloads)
![github](https://img.shields.io/github/downloads/LarsKemper/jestyne/total?label=github%20downloads)
![size](https://img.shields.io/bundlephobia/minzip/jestyne?label=bundle%20size)

jestyne is a command-line tool that helps you quickly set up a testing environment for your [React](https://reactjs.org/) components using the [Jest](https://github.com/facebook/jest) testing library. With just a few simple commands, this package will generate a test skeleton for your components, complete with all the necessary imports and boilerplate code. 

Simply point the tool at your component file, and it will create a corresponding test file with a basic test structure in place. This can save you a lot of time and effort when it comes to setting up tests for your React components, and helps ensure that you have a solid foundation for building out your test suite. Whether you're new to testing or an experienced developer, jestyne is a valuable tool that can streamline your testing workflow and help you get up and running with Jest in no time.

## Overview
- [Command list](https://github.com/LarsKemper/jestyne#command-list)
- [Examples](https://github.com/LarsKemper/jestyne#examples)
- [Features](https://github.com/LarsKemper/jestyne#features)
- [Installation](https://github.com/LarsKemper/jestyne#installation)
- [License](https://github.com/LarsKemper/jestyne#license)

## Command list
|         command         | Description                    |
|:-----------------------:| ------------------------------ |
| `npx jestyne --version` | Shows current version of jestyne |
|  `npx jestyne --help`   | Shows usage of jestyne         |
| `npx jestyne generate [path]` | Generates test for given component |

## Examples
### React component
```jsx
import React from 'react';

export default function SimpleComponent() {
  function simpleFunction(number) {
    return number + 1;
  }

  return <div>SimpleComponent: {simpleFunction(2)}</div>;
}
```

### Test
```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleComponent from './SimpleComponent'

describe('/__tests__/fixtureSimpleComponent', () => {
    it('should render SimpleComponent', () => {
        render(<SimpleComponent />);
    })}
);
```

## Features
+ Generating basic test structure boilerplate

## Installation
Using [npm](https://www.npmjs.com/) (with [Node.js](https://nodejs.org/)):

```sh
$ npm install jestyne --global
```

Using [yarn](https://yarnpkg.com/):

```sh
$ yarn global add jestyne
```

Or you can install jestyne manually by following the instructions in the latest release

## License
Copyright (c) 2020 Lars Kemper <larskemper0607@gmail.com>  
`jestyne` is distributed under the terms of the MIT License.  
See the [LICENSE](./LICENSE) file for details.
