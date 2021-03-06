﻿// SmartJs v0.1.0
// (c) Hugh Anderson - https://github.com/hughanderson4/smartjs
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

// the topicListPageViewModel module binds to the page listing all topics with active member counts
// this module returns a static object

define([
    'topic/topicViewModel',
    'topic/addTopicViewModel',
    'util/storage',
    'server/groupContext',
    'knockout',
    'underscore',
    'util/pubsub',
    'util/logger'
], function (TopicViewModel, AddTopicViewModel, LocalStorage, GroupContext, Ko, Und, Pubsub, Logger) {

    // special group that gets the count of other groups
    var topicSubscriberGroup = 'topicWatchers',
        // list binder
        topics = Ko.observableArray(),
        // feedback
        enteringChatRoom = Ko.observable(false),
        loadingTopics = Ko.observable(true);
    topics.extend({ throttle: 50 });

    // functionality
    function pickTopic(topicViewModel) {
        enteringChatRoom(true);
        var roomName = topicViewModel.topicName(),
            dto = {
                topicName: roomName
            };
        GroupContext.joinGroup(LocalStorage.localMemberName(), roomName);
        // causes router to change page
        Pubsub.publish('topic.select', dto);
        enteringChatRoom(false);
    }

    // private methods
    function localMemberName() {
        return LocalStorage.hasLocalMember() ? LocalStorage.getLocalMember().memberName : null;
    }

    // event handlers    
    function onTopicPageLoad() {
        loadingTopics(true);
        // the name of myself when in topicWatcher group doesn't matter, just needs to be truthy
        GroupContext.joinGroup(1, topicSubscriberGroup);
        GroupContext.listTopics(function () {
            loadingTopics(false);
        });
    }

    // i got a list of topics, display them as vms
    function onUpdateTopicList(topicDtos) {
        Logger.log('topicDtos', topicDtos, true);
        var newTopicVMs = Und.map(topicDtos, function (dto) {
            return new TopicViewModel(dto.topicName, dto.memberCount);
        });
        topics(newTopicVMs);
    }

    function onUpdateTopicCount(dto) {
        var topicVms = topics(),
            topicVm = Und.find(topicVms, function (vm) {
            return vm.topicName() === dto.topicName;
        });
        if (topicVm) {
            topicVm.memberCount(dto.memberCount);
        } else {
            topicVm = new TopicViewModel(dto.topicName, dto.memberCount);
            topics.unshift(topicVm);
        }
    }

    // subscriptions
    Pubsub.subscribe('topic.list', onUpdateTopicList);
    Pubsub.subscribe('topic.count', onUpdateTopicCount);
    Pubsub.subscribe('topic.view', onTopicPageLoad);
    
    return {
        topics: topics,
        // add form with subBinding using "with"s
        addTopicViewModel: AddTopicViewModel,
        enteringChatRoom: enteringChatRoom,
        loadingTopics: loadingTopics,
        pickTopic: pickTopic
    };
});