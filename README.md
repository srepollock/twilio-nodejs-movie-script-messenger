# movie-script-sms-messenger

A way to send Movie Scripts to your friends 💻

[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install and run:

- [nodejs](https://nodejs.org)
- das it

```bash
# make sure you can run in the console
node --version
npm --version
```

### Installing

Clone the repo to your computer.

Create a `.env` file with the following:

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TO_NUMBER=""
FROM_NUMBER=""
```

Run in the terminal:

```
npm install
npm run bundle
node index.js
```

## Running the tests

Tests are run in the console just to show what would be sent and how many messages it would take. You can review at your leisure.

### And coding style tests

See the [Jest](https://jestjs.io) project.

## Deployment

You can run it right from your console with either:
`npm start`
or
`node index.js`

## Built With

- [NodeJS](http://www.nodejs.com)
- [Twilio](https://twilio.com)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE.md](LICENSE.md) file for details

> Created by Spencer Pollock <spencer at spollock dot ca>
