Meteor.methods({
    getCommentCount: (postId) => {
        return Comments.find({postId}).count();
    },
    getVotesCount: (postId) => {
        return Votes.find({postId}).count();
    },
    vote: (postId) => {
        let vote;
        if(vote = Votes.findOne({postId, author: Meteor.userId()})) {
            Votes.remove(vote._id);
        } else {
            Votes.insert({
                postId
            });
        }
        Posts.update(postId, {
            $set: {
                votesCount: Votes.find({postId}).count()
            }
        });
    }
});