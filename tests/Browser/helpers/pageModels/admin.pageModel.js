import { Selector } from "testcafe";

class AdminPage {
  constructor() {
    this.dashboardTitle = Selector("h1").withText("Dashboard");
    this.editUserTitle = Selector("h1").withText("Edit user");
    this.firstUserEditButton = Selector("a")
      .withText("Edit")
      .nth(0);
    this.logoutButton = Selector("a").withText("Logout");
    this.managersTab = Selector("a").withText("Managers");
    this.managersTitle = Selector("h1").withText("Managers");
    this.roleOptionBasic = Selector("option").withText("basic");
    this.roleOptionUpgradedManager = Selector("option").withText(
      "upgradedManager",
    );
    this.roleSelect = Selector("[name=user_role_id]");
    this.usersTab = Selector("a").withText("Users");
    this.usersTitle = Selector("h1").withText("Users");
    this.submitButton = Selector("[type=submit]");
    this.profileLinks = Selector("a").withText("Profile");
  }
}

export default new AdminPage();
