import { adminUser } from "./helpers/roles";
import AdminPage from "./helpers/pageModels/admin.pageModel";

fixture(`Login to Admin Portal #admin`).page(`talent.test`);
test("Login as Admin #critical", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to admin dashboard.
    .navigateTo("/admin")
    .expect(AdminPage.dashboardTitle.visible)
    .ok();
});

fixture(`Admin Portal Interface #admin`).page(`talent.test/admin`);

fixture(`Admin Portal User Management #admin`).page(`talent.test/admin`);
test("Navigate to users tab #critical", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to admin dashboard.
    .navigateTo("/admin")
    .click(AdminPage.usersTab)
    .expect(AdminPage.usersTitle)
    .ok();
});

test("Navigate to edit user #critical", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to admin dashboard.
    .navigateTo("/admin/user")
    .click(AdminPage.firstUserEditButton)
    .expect(AdminPage.editUserTitle)
    .ok();
});

test("Edit a user #critical #focus", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to admin dashboard.
    .navigateTo("/admin/user/3/edit")
    .click(AdminPage.roleSelect)
    .click(AdminPage.roleOptionUpgradedManager)
    .click(AdminPage.submitButton)
    .navigateTo("/admin/user/3/edit")
    .expect(AdminPage.roleSelect.value)
    .eql("2") // 2 == upgradedManager
    .click(AdminPage.roleSelect)
    .click(AdminPage.roleOptionBasic)
    .click(AdminPage.submitButton)
    .navigateTo("/admin/user/3/edit")
    .expect(AdminPage.roleSelect.value)
    .eql("1"); // 1 == basic
});

fixture(`Admin Portal Manager Management #admin`).page(`talent.test/admin`);

fixture(`Admin Portal Job Poster Management #admin`).page(`talent.test/admin`);

// TODO: Figure out why if logout test is first login test fails. *** JUST KEEPING LOGOUT TEST LAST *** for now.

fixture(`Logout of Admin Portal #admin`).page(`talent.test/admin`);
test("Logout as Admin #critical", async t => {
  await t
    // Login as Admin.
    .useRole(adminUser)
    // Go to Job Poster Builder.
    .navigateTo("/admin")
    // Log out
    .click(AdminPage.logoutButton);
  const location = await t.eval(() => window.location);
  await t.expect(location.pathname).eql("/admin/login");
});
