const axios = require('axios');
// (async() => {     const res = await
// axios.post('http://127.0.0.1:1337/adlists', {_limit: 427});     const data =
// res.data;     let flag = 0;     while (flag < data.length) {         const
// map_id = data[flag].map_addetail_id;         const name = data[flag].name;
//   const sex = data[flag].sex;         const age = data[flag].age; const
// ad_status = data[flag].ad_status;         const breed = data[flag].breed;
//     await axios.put(`http://127.0.0.1:1337/addetails/${map_id}`, {name, sex,
// age, ad_status, breed});         flag++;     } })();

axios.post(`http://127.0.0.1:1337/adnews/5c06a54981ba1561f8585507`).then((res)=>{
    console.log(res.data)
})