const axios = require('axios');
axios
    .post('http://127.0.0.1:1337/addetails')
    .then((res) => {
        console.log(res);
    })
