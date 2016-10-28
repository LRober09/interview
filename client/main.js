import {Template} from 'meteor/templating';
import {Accounts} from 'meteor/accounts-base';

import './main.html';

Meteor.startup(function () {

    sAlert.config({
        effect: 'slide',
        position: 'top-right',
        timeout: 3000,
        html: false,
        onRouteClose: false,
        stack: true,
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        onClose: _.noop
    });

});

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", '~/images')]
});
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});
Projects = new Meteor.Collection("projects");

Meteor.subscribe('projects');
Meteor.subscribe('images');

Template.projects.helpers({
    projects() {
        return Projects.find();
    },
    images() {
        return Images.find();
    }
});

Template.project.helpers({
    'name'() {
        return Projects.findOne(this._id).name;
    },
    'title'() {
        return Projects.findOne(this._id).title;
    },
    'image'() {
        console.log(Images.find().fetch());
        return Images.findOne(Projects.findOne(this._id).imageUrl);
    }
});

Template.project.events({
    'click #removeProjectButton'(event) {
        Meteor.call('removeProject', this._id, function (err) {
            if (err) {
                sAlert.error(err.reason);
            } else {
                sAlert.success("Removed!");
            }
        });
    }
});

Template.projects.events({
    'submit'(e) {
        e.preventDefault();

        if (!$('#addButton').hasClass('disabled')) {

            var name = $('#nameTextBox').val();
            var title = $('#titleTextBox').val();
            var files = e.target.uploadInput.files;
            var id;

            for (var i = 0, ln = files.length; i < ln; i++) {
                Images.insert(files[i], function (err, fileObj) {
                    id = fileObj._id;
                    console.log(id);
                    Meteor.call('addProject', name, title, id, function (err) {
                        if (err) {
                            sAlert.error(err.reason);
                        } else {
                            sAlert.success("Added project!");
                            $('#nameTextBox').val('');
                            $('#titleTextBox').val('');
                            $('#uploadInput').val('');
                        }
                    });
                });
            }


        }

    },
    'keyup'(e) {
        var valid = $('#nameTextBox').val().length > 0
            && $('#titleTextBox').val().length > 0;

        if (valid) {
            $('#addButton').removeClass('disabled');
        } else {
            $('#addButton').addClass('disabled');
        }
    }
});