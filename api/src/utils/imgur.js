require('dotenv').config();
const fetch = require('node-fetch');

module.exports = async (image) => {
    if(!image) return;
    const FormData = require('form-data');
    const data = new FormData();
    data.append('type', 'base64');
    data.append('image', image.buffer.toString('base64'));
    data.append('album', 'gRAvPYX');
    const config = {
        method: 'post',
        body: data,
        headers: {
            'Authorization': process.env.IMGUR_ACCESS_TOKEN,
            ...data.getHeaders()
        },
    };
    const img_url = await fetch('https://api.imgur.com/3/upload', config)
        .then(function (res) {
            return res.json()
        }).then(function (json) {
            if (json.data.error) throw new Error(json.data.error);
            return json.data.link;
        });
    console.log('Image uploaded:', img_url);
    return img_url;
}