Template.PostsList.onCreated(function () {

    var self = this;

    let query = self.data.query? self.data.query() : {};
    let proj = self.data.proj ? self.data.proj() : {
            sort: {
                createAt: -1
            }
        };

    self.limit = new ReactiveVar(5);
    self.isLoading = new ReactiveVar(true);
    self.posts = function() {
        return Posts.find({}, proj);
    }

    self.autorun(function() {

        proj.limit = self.limit.get();

        var subscription = self.subscribe('posts', query, proj);

        if (subscription.ready()) {
            self.isLoading.set(false);
        } else {
            self.isLoading.set(true);
        }
    });
});

Template.PostsList.helpers({
    posts: function() {
        return Template.instance().posts();
    },
    isLoading: function() {
        return Template.instance().isLoading.get();
    },
    hasMorePosts: function () {
        return Template.instance().posts().count() >= Template.instance().limit.get();
    },
    isLogged() {
        return !!Meteor.userId();
    }
});

Template.PostsList.events({
    'click .load-more': function(event, template) {
        event.preventDefault();
        let limit = template.limit.get();
        limit += 5;
        template.limit.set(limit);
        return false;
    }
});
