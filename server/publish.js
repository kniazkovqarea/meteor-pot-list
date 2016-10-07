Meteor.publish('posts', (query, proj)=> {
    let defQuery = {
        isPublic: true
    };
    let defProj = {
        sort: {
            createAt: -1
        },
        limit: 5
    };

    query = query || {};
    proj = proj || {};
    check(query, Object);
    check(proj, Object);

    query = _.extend({}, defQuery, query);
    proj = _.extend({}, defProj, proj);

    return Posts.find(
        query,
        proj
    );
});

Meteor.publish('comments', (postId, limit) => {
    check(postId, String);
    check(limit, Number);
    return Comments.find({
            postId: postId
        }, {
            sort: {
                createdAt: -1
            },
            limit: limit
        });
});

Meteor.publish('votes', (postId, userId) => {
    check(postId, String);
    check(userId, String);
    return Votes.find({
        postId: postId,
        author: userId
    });
});