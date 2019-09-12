import { Selector } from "testcafe";
import { adminUser } from "./helpers/roles";
import AdminPage from "./helpers/pageModels/admin.pageModel";

fixture(`Login to Admin Portal`).page(`talent.test`);
test("Login as Admin #critical #focus", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to Job Poster Builder.
    .navigateTo("/admin")
    .expect(AdminPage.dashboardTitle.visible)
    .ok();
});

fixture(`Logout of Admin Portal`).page(`talent.test/admin`);
test("Logout as Admin #critical", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to Job Poster Builder.
    .navigateTo("/admin")
    //Log out
    .click(AdminPage.logoutButton);
  const location = await t.eval(() => window.location);
  await t.expect(location.pathname).eql("/admin/login");
});
