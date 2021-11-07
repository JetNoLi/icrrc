const time = require('./measure');
const {download} = require('../index');
const execute = require('./measure');

const config ={
    header: [
        {id: 'n', title: 'n'},
        {id: 'time', title: 'times [ms]'}
    ],
    path: './csv/download.csv'
}

execute(1000, download, config).then( res => console.log(res))