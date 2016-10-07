Accounts.ui.config({
    extraSignupFields: [{
        fieldName: 'firstname',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your first name");
                return false;
            } else {
                return true;
            }
        }
    }, {
        fieldName: 'lastname',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
            if (!value) {
                errorFunction("Please write your last name");
                return false;
            } else {
                return true;
            }
        }
    }],
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});
