import { Selector } from "testcafe";

class AdminPage {
  constructor() {
    this.dashboardTitle = Selector("h1").withText("Dashboard");
    this.logoutButton = Selector("a").withText("Logout");
    this.usersTab = Selector("a").withText("Users");
    this.usersTitle = Selector("h1").withText("Users");
    this.firstUserEditButton = Selector("a")
      .withText("Edit")
      .nth(0);
    this.editUserTitle = Selector("h1").withText("Edit user");
  }
}

export default new AdminPage();
