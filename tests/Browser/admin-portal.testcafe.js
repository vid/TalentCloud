import { Selector } from "testcafe";
import { adminUser } from "./helpers/roles";

fixture(`Login to Admin Portal`).page(`talent.test`);

test("Login as Admin #critical", async t => {
    await t
        // Login as manager.
        .useRole(adminUser)
        // Go to Job Poster Builder.
        .navigateTo("/admin")
        .expect(
          Selector("h1").withText("Dashboard").visible,
        )
        .ok()
  });

fixture(`Logout of Admin Portal`).page(`talent.test/admin`);

test("Logout as Admin #critical #focus", async t => {
    await t
        // Login as manager.
        .useRole(adminUser)
        // Go to Job Poster Builder.
        .navigateTo("/admin")
        //Log out
        .click(Selector("a").withText("Logout"))
    const location = await t.eval(() => window.location);
    await t    .expect(location.pathname).eql("/admin/login")
  });
