import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ConfigurationComponent } from './components/configuration/configuration.component'
import { CategoryComponent } from './components/category/category.component'
import { AddCategoryComponent } from './components/category/addcategory.component'
import { BudgetComponent } from './components/budget/budget.component'
import { ReportComponent } from './components/report/report.component'
import { ManageComponent } from './components/manage/manage.component'
import { AddBudgetComponent } from "./components/budget/addbudget.component";
import { LoginComponent } from "app/components/security/login.component";
import { AuthGuard } from "app/components/security/AuthGuard";
import { HomeLayoutComponent } from "app/home-layout.component";
import { LoginLayoutComponent } from "app/login-layout.component";
import { SignupComponent } from "app/components/security/signup.component";
import { LogoutComponent } from "app/components/security/LogoutComponent";
import { ProfileComponent } from "app/components/profile/profile.component";
const routes: Routes = [
	{
		path: '',
		component: HomeLayoutComponent,
		canActivate: [AuthGuard],
		children: [
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
				path: "configuration",
				component: ConfigurationComponent,
				children: [
					{
						path: "category",
						component: CategoryComponent
					},
					{
						path: "addcategory",
						component: AddCategoryComponent
					},
					{
						path: "budget",
						component: BudgetComponent
					},
					{
						path: "addbudget",
						component: AddBudgetComponent
					},

				]
			},
			{
				path: "report",
				component: ReportComponent,
			},
			{
				path: "manage",
				component: ManageComponent,
			},
			{
				path: "manage/:period",
				component: ManageComponent,
			},
			{
				path: "profile",
				component: ProfileComponent,
			}
		]
	},
	{
		path: '',
		component: LoginLayoutComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'signup',
				component: SignupComponent
			},
			{
				path: 'logout',
				component: LogoutComponent
			}
		]
	},
]
export const routing = RouterModule.forRoot(routes);
