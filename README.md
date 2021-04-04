# Octochat
A chat app that uses Node, MongoDB and React with Electron


## Setup
The project requires multiple configurations in order to get working.
The backend API requires the config.env.example file to be changed to `config.env` and set these properties
<table>
    <tr>
        <td>Name</td>
        <td>Reccomended Value</td>
        <td>Use</td>
    <tr> 
        <td>PORT</td>
        <td>3000</td>
        <td>Port to run the Express server on</td>
    </tr>
    <tr>
        <td>MONGO_URI</td>
        <td>mongodb://mongo:27017/chatapp</td>
        <td>mongoDB url, for docker-compose use hostname of mongo</td>
    </tr>
    <tr>
        <td>GOOGLE_CLIENT_ID</td>
        <td>N/A</td>
        <td>Google Application Client ID</td>
    </tr>
    <tr>
        <td>GOOGLE_CLIENT_SECRET</td>
        <td>N/A</td>
        <td>Google Application Client Secret</td>
    </tr>
    <tr>
        <td>SECRET_KEY</td>
        <td>Something random</td>
        <td>Express Session secret key</td>
    </tr>
    <tr>
        <td>BASE_URL</td>
        <td>http://localhost:4200</td>
        <td>URL of whatever site is going to be in front of the API</td>
    </tr>
</table>

## Running

The backend and database have a docker-compose file to run them. You can find how to install docker and docker-compose on the [docker documentation](https://docs.docker.com/compose/install/)
After installing docker-compose you should be able to just run the following command in the project directory

```bash
cd backend
npm install
cd ..
docker-compose up -d
```
