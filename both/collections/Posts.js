Posts = new Mongo.Collection("Posts");

Posts.allow({
    insert: (userId, doc) => {
        return !!userId;
    },
    update: (userId, doc) => {
        return userId === doc.author;
    },
    remove: function (userId, doc) {
        return userId === doc.author;
    }
});

PostsSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Title"
    },
    isPublic: {
        type: Boolean,
        label: "Is Public",
        defaultValue: false
    },
    createAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            if(this.operator === null) {
                return new Date();
            } else if(this.isSet) {
                return this.value;
            }
        },
        autoform: {
            type: "hidden"
        }
    },
    votesCount: {
        type: Number,
        label: "Votes",
        autoform: {
            type: "hidden"
        },
        defaultValue: 0
    },
    author: {
        type: String,
        label: "Author",
        autoform: {
            type: "hidden"
        },
        autoValue: function() {
            if(this.operator === null) {
                return Meteor.userId();
            } else if(this.isSet) {
                return this.value;
            }
        }
    }
});

Posts.attachSchema(PostsSchema);
