const axios = require('axios');
// (async() => {     const res = await
// axios.post('http://127.0.0.1:1337/adlists', {_limit: 427});     const data =
// res.data;     let flag = 0;     while (flag < data.length) {         const
// map_id = data[flag].map_addetail_id;         const name = data[flag].name;
//   const sex = data[flag].sex;         const age = data[flag].age; const
// ad_status = data[flag].ad_status;         const breed = data[flag].breed;
//     await axios.put(`http://127.0.0.1:1337/addetails/${map_id}`, {name, sex,
// age, ad_status, breed});         flag++;     } })();
axios.post(`http://52.8.245.233/apis/addetails`,{
    _limit:427
}).then((res)=>{
    const data = res.data;
    data.forEach((item)=>{
        let map_id = item.id;
        let big_pic_src = item.big_pic_src.split(',')[0];
        axios.post(`http://52.8.245.233/apis/adlists`,{
            map_addetail_id:map_id
        }).then((res)=>{
            const data = res.data[0];
            let id = data.id;
            axios.put(`http://52.8.245.233/apis/adlists/${id}`,{
                carousel_cover:big_pic_src
            }).then((res)=>{
                console.log(res.data)
            })
        })
    })
})
// axios.post(`http://127.0.0.1:1337/addetails`,{
//     _limit:427
// }).then((res)=>{
//     const data = res.data;
//     data.forEach((item)=>{
//         let big_pic_src = null;
//         let small_pic_src = null;
//         if(item.big_pic_src.split(',').length>1){
//             big_pic_src = item.big_pic_src.split(',').map((item)=>{return item.replace(/http:\/\/(.)*com/,'http://pjy4ebzoy.bkt.clouddn.com');}).join(',');
//         }else{
//             big_pic_src = item.big_pic_src.replace(/http:\/\/(.)*com/,'http://pjy4ebzoy.bkt.clouddn.com');
//         }
//         if(item.small_pic_src.split(',').length>1){
//             small_pic_src = item.small_pic_src.split(',').map((item)=>{return item.replace(/http:\/\/(.)*com/,'http://pjy4ebzoy.bkt.clouddn.com');}).join(',');
//         }else{
//             small_pic_src = item.small_pic_src.replace(/http:\/\/(.)*com/,'http://pjy4ebzoy.bkt.clouddn.com');
//         }
//         axios.put(`http://127.0.0.1:1337/addetails/${item.id}`,{
//             big_pic_src,
//             small_pic_src
//         }).then((res)=>{
//             console.log(res.data)
//         })
//     })
// })