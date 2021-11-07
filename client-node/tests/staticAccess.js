const time = require('./measure');
const {staticAccess} = require('../index');
const execute = require('./measure');

const config ={
    header: [
        {id: 'n', title: 'n'},
        {id: 'time', title: 'times [ms]'}
    ],
    path: './csv/static.csv'
}

execute(1000, staticAccess, config).then( res => console.log(res))