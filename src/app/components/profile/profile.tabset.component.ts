import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter, ContentChildren } from '@angular/core';
import { ProfileTabComponent } from "app/components/profile/profile.tab.component";

@Component({
    selector: 'profiletabset',
    templateUrl: 'profile.tabset.component.html'
})
export class ProfileTabSetComponent {
    @Input() vertical;
    @Output() onSelect = new EventEmitter();
    @ContentChildren(ProfileTabComponent) tabs;

    ngAfterContentInit() {
        const tabs = this.tabs.toArray();
        const actives = this.tabs.filter(t => { return t.active });

        if (actives.length > 1) {
            console.error(`Multiple active tabs set 'active'`);
        } else if (!actives.length && tabs.length) {
            tabs[0].active = true;
        }
    }

    tabClicked(tab) {
        const tabs = this.tabs.toArray();

        tabs.forEach(tab => tab.active = false);
        tab.active = true;

        this.onSelect.emit(tab);
    }

}