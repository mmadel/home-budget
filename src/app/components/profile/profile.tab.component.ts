import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';

@Component({
    selector: 'profiletab',
    templateUrl: 'profile.tab.component.html'
})
export class ProfileTabComponent {
    @Input() title = '';
    @Input() active = false;
    @Input() disabled = false;
    constructor() {
        
    }

}