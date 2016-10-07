const defaultCommentsCount = 2;

Template.CommentsList.onCreated(function () {
    var self =this;
    self.limit = new ReactiveVar(defaultCommentsCount);
    self.commentsCount = new ReactiveVar(0);
    self.postId = self.data.postId;
    self.comments = function() {
        return Comments.find({
                postId: self.postId
            }, {
                sort: {
                    createdAt: 1
                }
            });
        };

    self.autorun(function() {

        self.subscribe('comments', self.postId, self.limit.get());

        Meteor.call('getCommentCount',  self.postId, (err, commentsCount) => {
            if(err) {
                console.error("ERROR: ", err);
            } else {
                self.commentsCount.set(commentsCount);
            }
        });
    });
});

Template.CommentsList.helpers({
    newComment: function() {
        return {
            postId: this.postId
        };
    },
    insertCommentFormId: function() {
        return 'insertCommentFrom' + this.postId;
    },
    comments: function() {
        return Template.instance().comments();
    },
    hasMoreComments: function() {
        return Template.instance().commentsCount.get() > Template.instance().limit.get();
    },
    hasCommentsToHide: function() {
        return !!Template.instance().commentsCount.get() > defaultCommentsCount;
    },
    isLogged() {
        return !!Meteor.userId();
    }
});

Template.CommentsList.events({
    'click .show-all-comments': function(event, template) {
        if(template.limit.get() === defaultCommentsCount) {
            template.limit.set(template.commentsCount.get());
        } else {
            template.limit.set(defaultCommentsCount);
        }
    }
});