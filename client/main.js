import {Template} from 'meteor/templating';
import {Accounts} from 'meteor/accounts-base';

import './main.html';

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});
Projects = new Meteor.Collection("projects");

Meteor.subscribe('projects');

Template.projects.helpers({
    projects() {
        return Projects.find();
    }
});

Template.projects.events({
    'submit'(e) {
        e.preventDefault();

        if (!$('#addButton').hasClass('disabled')) {

            var name = $('#nameTextBox').val();
            var title = $('#titleTextBox').val();
            var files = e.target.uploadInput.files;


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