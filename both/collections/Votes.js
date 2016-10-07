Votes = new Mongo.Collection('Votes');

Votes.allow({
    insert: (userId, doc) => {
        return !!userId;
    }
});

VotesSchema = new SimpleSchema({
    postId: {
        type: String
    },
    author: {
        type: String,
        autoValue: () => {
            return Meteor.userId();
        }
    }
});

Votes.attachSchema(VotesSchema);