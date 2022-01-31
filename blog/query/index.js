const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === 'CommentCreated'){
        const { id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.send({});

});

app.listen('4002', () => {
    console.log('Listening on 4002');
});