import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ConfigurationComponent } from './components/configuration/configuration.component'
import { CategoryComponent } from './components/category/category.component'
import { AddCategoryComponent } from './components/category/addcategory.component'
import { BudgetComponent } from './components/budget/budget.component'
import { ReportComponent } from './components/report/report.component'
import { ManageComponent } from './components/manage/manage.component'
import { AddBudgetComponent } from "./components/budget/addbudget.component";
const routes: Routes = [
    {
		path: '',
		pathMatch: "full",
		redirectTo: "dashboard"
    },
    {
		path: "dashboard",
		component: DashboardComponent,
	},
	{
		path : "configuration",
		component : ConfigurationComponent,
		children : [
			{
				path : "category",
				component : CategoryComponent
			},
			{
				path : "addcategory",
				component : AddCategoryComponent
			},
			{
				path : "budget",
				component :BudgetComponent
			},
			{
				path : "addbudget",
				component : AddBudgetComponent
			},
			
		]
	},
	{
		path: "report",
		component: ReportComponent
	},
	{
		path: "manage",
		component: ManageComponent
	},
	{
		path: "manage/:period",
		component: ManageComponent
	}	
]
export const routing = RouterModule.forRoot(routes);
