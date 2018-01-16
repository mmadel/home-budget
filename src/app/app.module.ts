import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfigurationComponent } from './components/configuration/configuration.component'
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/category/addcategory.component'
import { CategoryFilterPipe } from './components/category/category-filert.pipe'
import { BudgetComponent } from './components/budget/budget.component';
import { ReportComponent } from './components/report/report.component';
import { ManageComponent } from './components/manage/manage.component';
import {CategoryService} from './services/category.service'
import { routing } from './app.routing';
import 'rxjs/add/operator/map';
import { BudgetService } from "./services/budget.service";
import { AddBudgetComponent } from "./components/budget/addbudget.component";
import { BudgetFilterPipe } from "./components/budget/budget-filter.pipe";
import { ManageService } from "./services/manage.service";
import { AccountSummaryTypeFilterPipe } from "./components/manage/accountSummaryType-Filter.Pipe";
import { Usage } from "./components/manage/usage.component";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AddTransactionComponent } from './components/manage/add.transaction.dialog.component';
import { ViewTransactionComponent } from "app/components/manage/view.transaction.dialog.component";
import { TransactionService } from "app/services/TransactionService";
import { EditBudgetComponent } from "app/components/manage/edit.budget.dialog.component";
import { ChartsModule } from 'ng2-charts';
import { Config } from "app/app.config";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,CategoryComponent,BudgetComponent,ReportComponent,ManageComponent,
    ConfigurationComponent,AddCategoryComponent,CategoryFilterPipe,AddBudgetComponent,BudgetFilterPipe,AccountSummaryTypeFilterPipe,Usage,
    AddTransactionComponent,ViewTransactionComponent,EditBudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,ToastModule.forRoot(),
    BootstrapModalModule,
    ChartsModule
  ],
  providers: [CategoryService,BudgetService,ManageService,TransactionService,
    {provide: Config, useFactory: () => Config.getInstance('assets/config.json')}],
  entryComponents: [
    AddTransactionComponent,ViewTransactionComponent,EditBudgetComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
