import { Selector } from "testcafe";

class AdminPage {
  constructor() {
    this.dashboardTitle = Selector("h1").withText("Dashboard");
    this.editUserTitle = Selector("h1").withText("Edit user");
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
    this.userEditButton = i =>
      Selector("a")
        .withText("Edit")
        .nth(i);

    this.managerProfileButton = i =>
      Selector("a")
        .withText("Profile")
        .nth(i);
    this.managerProfileTitle = Selector("h1").withText("My Profile");
    this.managerProfileFieldPositionEN = Selector("#managerProfileTitleEN");
  }
}

export default new AdminPage();
