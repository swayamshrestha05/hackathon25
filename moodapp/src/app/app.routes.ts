import { Routes } from '@angular/router';
import { RecordComponent } from './components/record/record.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
    { path: 'record', component: RecordComponent},
    { path: 'analyze', component: AnalyzeComponent},
    { path: 'results', component: ResultsComponent},
    { path: '**', redirectTo:'' }
];
