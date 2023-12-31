---
---

import { Achievements, Quests, Pets, Collections } from '{{ "assets/js/modules/sections.js" | relative_url }}';
import { SkillsFactory, StoreFactory } from '{{ "assets/js/modules/factories.js" | relative_url }}';

class Handler {
    constructor() {
        this.achievements = null;
        this.storage = null;
        this.skills = null;
        this.quests = null;
        this.pets = null;

        this.sections = Object.freeze({
            skills: 'skills',
            achievements: 'achievements',
            quests: 'quests',
            pets: 'pets',
            collections: 'collections'
        });

        this.selectors = {
            upload: '#button-upload',
            download: '#button-download'
        };
    }

    init() {
        this.storage = StoreFactory();
        this.skills = SkillsFactory(this.onSkillClicked.bind(this), this.storage.obj.complete.skills);
        
        $(this.selectors.download).on('click', this.onDownloadClicked.bind(this));
        $(this.selectors.upload).on('click', this.onUploadClicked.bind(this));

        return this;
    }

    initSection(section, data, selectors) {
        switch(section) {
            case this.sections.achievements:
                this.achievements = new Achievements(data, selectors, this.onAcievementsClicked.bind(this), this.onAchievementsVisibleClicked.bind(this));
                this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
                break;
            case this.sections.quests:
                this.quests = new Quests(data, selectors, this.onQuestsClicked.bind(this), this.onQuestsVisibleClicked.bind(this));
                this.quests.update(this.storage.isUnlocked, this.storage.obj.complete.quests, this.storage.obj.qp, this.storage.obj.visible.quests);
                break;
            case this.sections.pets:
                this.pets = new Pets(data, selectors, this.onPetsClicked.bind(this), this.onPetsVisibleClicked.bind(this));
                this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
                break;
            case this.sections.collections:
                this.collections = new Collections(data, selectors, this.onCollectionsClicked.bind(this), this.onCollectionsVisibleClicked.bind(this));
                this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
                break;
        }
    }

    //----------------------------
    // On upload/download click events
    //----------------------------

    //Reset all sections when uploading file
    onUploadClicked() {
        this.storage.uploadFile(() => {
            this.skills.update(this.storage.obj.complete.skills);
            this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
            this.quests.update(this.storage.isUnlocked, this.storage.obj.complete.quests, this.storage.obj.qp, this.storage.obj.visible.quests);
            this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
            this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
        });
    }

    onDownloadClicked() {
        this.storage.saveFile();
    }

    //----------------------------
    // On item click events
    //----------------------------

    //Skill item click affects: skills, achievements, quests, pets, collections
    onSkillClicked(id) {
        this.storage.toggleComplete(this.sections.skills, id);
        this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
        this.quests.update(this.storage.isUnlocked, this.storage.obj.complete.quests, this.storage.obj.qp, this.storage.obj.visible.quests);
        this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
        this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
    }

    //Quests item click affects: achievements, quests, pets, collections
    onQuestsClicked(id) {
        this.storage.toggleComplete(this.sections.quests, id);
        this.storage.updateQuestPoints(this.quests.getQuestPoints(id));
        this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
        this.quests.update(this.storage.isUnlocked, this.storage.obj.complete.quests, this.storage.obj.qp, this.storage.obj.visible.quests);
        this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
        this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
    }
    
    //Achievement item click affects: achievements
    onAcievementsClicked(id) {
        this.storage.toggleComplete(this.sections.achievements, id);
        this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
    }

    //Pets item click affects: pets
    onPetsClicked(id) {
        this.storage.toggleComplete(this.sections.pets, id);
        this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
    }

    //Collection item click affects: collections
    onCollectionsClicked(id, items) {
        this.storage.updateCollections(id, items);
        this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
    }

    //----------------------------
    // On visible click events
    //----------------------------

    onAchievementsVisibleClicked() {
        this.storage.toggleVisible(this.sections.achievements);
        this.achievements.update(this.storage.isUnlocked, this.storage.obj.complete.achievements, this.storage.obj.visible.achievements);
    }

    onQuestsVisibleClicked() {
        this.storage.toggleVisible(this.sections.quests);
        this.quests.update(this.storage.isUnlocked, this.storage.obj.complete.quests, this.storage.obj.qp, this.storage.obj.visible.quests);
    }

    onPetsVisibleClicked() {
        this.storage.toggleVisible(this.sections.pets);
        this.pets.update(this.storage.isUnlocked, this.storage.obj.complete.pets, this.storage.obj.visible.pets);
    }

    onCollectionsVisibleClicked() {
        this.storage.toggleVisible(this.sections.collections);
        this.collections.update(this.storage.isUnlocked, this.storage.obj.complete.collections, this.storage.obj.visible.collections);
    }
}

export function HandlerFactory() {
    const handler = new Handler();
    return handler.init();
}