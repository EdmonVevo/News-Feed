import axios from 'axios';


const apiKey = 'f7224cda-042a-4939-b230-615e9b4cc84f';
// const apiKey = 'test';
const params = {
    'api-key': apiKey,
    'show-fields':'all',
    'format':'json',
}

export const getSingleNewsRequest = (id) => {
    const url = `https://content.guardianapis.com/${id}` ;

    return new Promise((res,rej)=> {
        axios.get(url,{params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { content } = response;
            if(content) res(content);
        }).catch(err =>{
            console.log(err);
        })

    })
}

export const getPinnedNewsRequest = (id) => {
    const url = 'https://content.guardianapis.com';
    return new Promise((res,rej)=> {
    axios.get(url+id,{params:params})
    .then(response => response.data )
    .then(data => {
        const { response } = data;
        const { content } = response;
        if(content) res(content);
    }).catch(err =>
        rej(err)
    )
   })
}


export const getNewsRequest = (page)=>{
    const url = 'https://content.guardianapis.com/search';
    params.page = page;
    return new Promise((res,rej)=>{
        axios.get(url,{params:params})
        .then(response => response.data )
        .then(data => {
            const { response } = data;
            const { results } = response;
            if(results)res({response,results})
        }).catch(err =>
            rej(err)
        )
    })
}
