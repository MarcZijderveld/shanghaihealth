if(Meteor.isClient) {
  Template.nav.rendered = function () {
    $(".button-collapse").sideNav();
  };

  Accounts.ui.config({
    requestPermissions: {
      google: ['email', 'profile'],
    },
    requestOfflineToken: {
      google: true
    },
  });
}


