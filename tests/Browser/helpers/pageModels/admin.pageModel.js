import { Selector } from "testcafe";

class AdminPage {
  constructor() {
    this.dashboardTitle = Selector("h1");
    this.logoutButton =  Selector("a").withText("Logout");
  }
}

export default new AdminPage();
