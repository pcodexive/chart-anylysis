import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module.model';
import { ChartComponent } from './chart.component';

const route = [
    {
        path: "",
        component: ChartComponent
    }
];
@NgModule({
    declarations: [
        ChartComponent
    ],
    imports: [
        RouterModule.forChild(route),
        MaterialModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class ChartModule { }