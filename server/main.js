import {Meteor} from 'meteor/meteor';

Projects = new Mongo.Collection('projects');

Images = new FS.Collection('images', {
    stores: [new FS.Store.FileSystem('images')]
});

Meteor.publish('projects', function () {
    return Projects.find();
});

Images.allow({
    'insert': function () {
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
    }
});
