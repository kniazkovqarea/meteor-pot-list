Template.VoteProduct.onCreated(function() {

    var self = this;
    self.postId = self.data.postId;
    self.votesCount = new ReactiveVar(0);
    self.isVoted = function() {
        return !!Votes.find({postId: self.postId}).count();
    };

    self.autorun(function() {

        if(Meteor.userId()) {
            self.subscribe('votes', self.postId, Meteor.userId());
        }

        Meteor.call('getVotesCount',  self.postId, (err, votesCount) => {
            if(err) {
                console.error("ERROR: ", err);
            } else {
                self.votesCount.set(votesCount);
            }
        });
    });
});

Template.VoteProduct.helpers({

    votesCount() { return Template.instance().votesCount.get() },

    heartClass() {
        if(Meteor.userId()) {
            return Template.instance().isVoted() ? 'voted' : 'not-voted'
        } else {
            return 'vote-disabled';
        }
    }
});

Template.VoteProduct.events({
    'click .glyphicon-heart': function(event, template) {
        event.preventDefault();
        let $targetEl = $(event.target);
        if($targetEl.hasClass('vote-disabled')) {
            alert("Please, loggin to vote");
        } else {
            Meteor.call('vote',  Template.instance().postId);
        }
        return false;
    }
});

