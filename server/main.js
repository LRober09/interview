import {Meteor} from 'meteor/meteor';

Projects = new Mongo.Collection('projects');

Images = new FS.Collection('images', {
    stores: [new FS.Store.FileSystem('images', '~/images')]
});

Meteor.publish('projects', function () {
    return Projects.find();
});

Meteor.publish('images', function() {
    return Images.find();
});

Images.allow({
    'insert': function () {
        return true;
    },
    'update': function () {
        return true;
    },
    'remove': function () {
        return true;
    },
    'download': function() {
        return true;
    }
});

Meteor.methods({
    'addProject'(name, title, imageUrl) {
        Projects.insert({
            name: name,
            title: title,
            imageUrl: imageUrl
        });
    },
    'removeProject'(id) {
        Projects.remove(id);
    }
});
