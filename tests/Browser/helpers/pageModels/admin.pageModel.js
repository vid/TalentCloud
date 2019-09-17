import { Selector } from "testcafe";

class AdminPage {
  constructor() {
    this.dashboardTitle = Selector("h1").withText("Dashboard");
    this.logoutButton = Selector("a").withText("Logout");
    this.usersTab = Selector("a").withText("Users");
    this.usersTitle = Selector("h1").withText("Users");
  }
}

export default new AdminPage();
