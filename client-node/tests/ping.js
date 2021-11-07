const time = require('./measure');
const {health} = require('../index');
const execute = require('./measure');

const pingConfig ={
    header: [
        {id: 'n', title: 'n'},
        {id: 'time', title: 'times [ms]'}
    ],
    path: './csv/ping.csv'
}

execute(1000, health, pingConfig).then( res => console.log(res))