const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// An example of the posts object 
// posts === {
//     '234rfh': {
//         id: '234rfh',
//         title: 'title',
//         comments: [
//             {id: 'hekff', content: 'I am a comment'}
//         ]
//     },
//     '234rfh': {
//         id: '234rfh',
//         title: 'title',
//         comments: [
//             {id: 'hekff', content: 'I am a comment'}
//         ]
//     }
// }

const handleEvent = (type, data) => {
    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === 'CommentCreated'){
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if(type === 'CommentUpdated'){
        const {id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find((comment) => {
            return comment.id === id;
            });
            comment.status = status;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    //console.log(posts);
    handleEvent(type, data);

    res.send({});

});

app.listen('4002', async () => {
    console.log('Listening on 4002');
    const res = await axios.get('http://localhost:4005/events').catch((err) => {
        console.log(err.message);
    });
    for(let event of res.data){
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data);
    }
});