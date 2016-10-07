Accounts.onLogin(function () {
    FlowRouter.go('home');
});

Accounts.onLogout(function () {
    FlowRouter.go('home');
});

FlowRouter.triggers.enter([function(context, redirect) {
    let allowedAnonymPaths = [
        '/',
        '/posts/public/best'
    ];
    if(!Meteor.userId() && allowedAnonymPaths.indexOf(context.path) === -1) {
        FlowRouter.go('home');
    }
}]);

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.reset();
        BlazeLayout.render('MainLayout', {
            main: 'PostsList'
        });
    }
});

FlowRouter.route('/posts/public', {
    name: 'postsPublic',
    action() {
        BlazeLayout.reset();
        BlazeLayout.render('MainLayout', {
            main: 'PostsList',
            query: {
                isPublic: true,
                author: Meteor.userId()
            }
        }, {
            force: true
        });
    }
});

FlowRouter.route('/posts/public/best', {
    name: 'postsPublicBest',
    action() {
        BlazeLayout.reset();
        BlazeLayout.render('MainLayout', {
            main: 'PostsList',
            query: {
                isPublic: true,
            },
            proj: {
                sort: {
                    votesCount: -1
                }
            }
        }, {
            force: true
        });
    }
});

FlowRouter.route('/posts/private', {
    name: 'postsPrivate',
    action() {
        BlazeLayout.reset();
        BlazeLayout.render('MainLayout', {
            main: 'PostsList',
            query: {
                isPublic: false,
                author: Meteor.userId()
            }
        }, {
            force: true
        });
    }
});

FlowRouter.route('/profile', {
    name: 'profile',
    action() {
        BlazeLayout.render('MainLayout', {
            main: 'Profile'
        });
    }
});
