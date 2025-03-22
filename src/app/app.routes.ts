import { Routes } from '@angular/router';
import { RecordComponent } from './components/record/record.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
    { path: '', component: RecordComponent},
    { path: 'results', component: ResultsComponent},
    { path: '**', redirectTo: ''},
];
