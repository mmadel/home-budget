
import { Component, Input } from "@angular/core";

@Component({
    selector : 'usage',
    templateUrl :'usage.component.html',
})
export class Usage {
    @Input() income: number;
    @Input() projected: number;
    @Input() actual: number;
    @Input() remaining: number;
}