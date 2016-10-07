Users = new Mongo.Collection('Users');

UsersSchema = new SimpleSchema({
    username: {
        type: String,
        label: "Username"
    },
    email: {
        type: String,
        label: "Email"
    },
    firstName: {
        type: String,
        label: "First name"
    },
    lastName: {
        type: String,
        label: "Last name"
    },
    avatar: {
        type: String,
        autoValue: () => {
            //generate gravatar here
            return "TEST";
        },
        autoform: {
            type: "hidden"
        }
    }
});

Users.attachSchema(UsersSchema);
