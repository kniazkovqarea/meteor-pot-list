Comments = new Mongo.Collection('Comments');

Comments.allow({
    insert: (userId, doc) => {
        return !!userId;
    }
});

CommentsSchema = new SimpleSchema({
    body: {
        type: String,
        label: "Message"
    },
    postId: {
        type: String,
        autoform: {
            type: "hidden"
        }
    },
    author: {
        type: String,
        label: "Author",
        autoform: {
            type: "hidden"
        },
        autoValue: () => {
            return Meteor.userId();
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: () => {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
});

Comments.attachSchema(CommentsSchema);