import { Selector } from "testcafe";
import { adminUser } from "./helpers/roles";

fixture(`Critical - Job Poster Builder`).page(`talent.test`);

// Skip when writing new tests
// fixture.skip(`Critical - Job Poster Builder`);

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
