Template.PostCard.onCreated(function() {
    this.editMode = new ReactiveVar(false);
});

Template.PostCard.helpers({
    updatePostId: function() {
        AutoForm.addHooks(this._id, {
            onError: function(formType, error) {
                error && checkError(error);
            },
        });
        return this._id;
    },
    editMode: function() {
        return Template.instance().editMode.get();
    },
    postDate: function() {
        return this.createAt.toLocaleDateString();
    },
    isLogged() {
        return !!Meteor.userId();
    }
});

Template.PostCard.events({
    'click .close': function() {
        Posts.remove(this._id, function(err) {
            err && checkError(err);
        });
    },
    'click .edit': function(event, template) {
        template.editMode.set(!template.editMode.get());
    },
    'click .post-edit-form .btn-primary': function(event, template) {
        template.editMode.set(!template.editMode.get());
    }
});

function checkError(err) {
    if(err) {
        alert(err.message);
    }
}


