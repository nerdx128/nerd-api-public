This is a personal project. To run, you will need to have keys in the .env file and Dockerfile. My set is currently deployed on Google Cloud Platform using Cloud Run and Cloud SQL. Cloud Run builds are triggered by pushes to the Development branch of the Private Repository.

You can see the live version at [https://dev.nerdx128.com/](https://dev.nerdx128.com/). Please be aware that to minimize costs, the server is set to sleep after 15 minutes of inactivity. It may take a few seconds to wake up.

This project is built with:

* [Node.js v20](https://nodejs.org/en/)
* [Express v4](https://expressjs.com/)
* [JavaScript](https://reactjs.org/)
* [TypeScript v5](https://www.typescriptlang.org/docs/)
* [PostgreSQL](https://www.postgresql.org/)
* [TypeORM](https://typeorm.io/)
* [Ethers v6](https://docs.ethers.io/v6/)
* [WalletConnect](https://walletconnect.org/)
* [Wagmi v2](https://wagmi.io/)
* [Magic.link](https://magic.link/)
* [OpenSea](https://opensea.io/)

In the project directory, you can run:

### `npm run start:dev`

