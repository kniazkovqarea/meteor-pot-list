Template.Profile.helpers({
    user() {
        let user = Meteor.user();
        return {
            username: user.username,
            firstname: user.profile.firstname,
            lastname: user.profile.lastname,
            email: user.emails[0].address,
        };
    },
    imageUrl() {
        var user = Meteor.user();
        if(user) {
            return Gravatar.imageUrl(user.emails[0].address, {
                size: 134,
                default: 'mm'
            });
        }
    }
});