if(Meteor.isServer) {
    // Set up login services
    Meteor.startup(function () {
        // Add Google configuration entry
        ServiceConfiguration.configurations.update(
            {service: "google"},
            {
                $set: {
                    clientId: "311545651253-9f3tarf3l2ic1giohg3uos67i6172csm.apps.googleusercontent.com",
                    secret: "ExahYaLzysxnanQVRVitTn2T"
                }
            },
            {upsert: true}
        );

        Accounts.onCreateUser(function (options, user) {

            var accessToken = user.services.google.accessToken,
                result,
                profile;

            result = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {"User-Agent": "Meteor/1.0"},

                params: {
                    access_token: accessToken
                }
            });

            if (result.error)
                throw result.error;

            profile = _.pick(result.data,
                "name",
                "given_name",
                "family_name",
                "profile",
                "picture",
                "email",
                "email_verified",
                "birthdate",
                "gender",
                "locale",
                "hd");

            // console.log(profile);
            user.profile = profile;

            return user;
        });

    });
}

