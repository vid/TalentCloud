<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Manager;

class ManagerApiControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->faker = \Faker\Factory::create();
    }

    /**
     * Generate an array with all the data that would be submitted through a completed edit/create form.
     *
     * @return array
     */
    private function generateFrontendManager(): array
    {
        $manager = [
            'department_id' => $this->faker->numberBetween(1, 8),
            'twitter_username' => null,
            'linkedin_url' => null,
            'work_review_frequency_id' => $this->faker->numberBetween(1, 4),
            'stay_late_frequency_id' => $this->faker->numberBetween(1, 4),
            'engage_team_frequency_id' => $this->faker->numberBetween(1, 4),
            'development_opportunity_frequency_id' => $this->faker->numberBetween(1, 4),
            'refuse_low_value_work_frequency_id' => $this->faker->numberBetween(1, 4),
            'years_experience' => $this->faker->numberBetween(1, 15),
            'en' => [
                'about_me' => $this->faker->paragraph(),
                'greatest_accomplishment' => $this->faker->paragraph(),
                'division' => $this->faker->word(),
                'position' => $this->faker->word(),
                'leadership_style' => $this->faker->paragraph(),
                'employee_learning' => $this->faker->paragraph(),
                'expectations' => $this->faker->paragraph(),
                'education' => $this->faker->paragraph(),
                'career_journey' => $this->faker->paragraph(),
                'learning_path' => $this->faker->paragraph(),
            ],
            'fr' => [
                'about_me' => $this->faker->paragraph(),
                'greatest_accomplishment' => $this->faker->paragraph(),
                'division' => $this->faker->word(),
                'position' => $this->faker->word(),
                'leadership_style' => $this->faker->paragraph(),
                'employee_learning' => $this->faker->paragraph(),
                'expectations' => $this->faker->paragraph(),
                'education' => $this->faker->paragraph(),
                'career_journey' => $this->faker->paragraph(),
                'learning_path' => $this->faker->paragraph(),
            ],
        ];
        return $manager;
    }

    public function testGetAsPublic()
    {
        $manager = factory(Manager::class)->create();
        $response = $this->json('get', "api/managers/$manager->id");
        $response->assertForbidden();
    }

    public function testGetAsApplicant()
    {
        $manager = factory(Manager::class)->create();
        $applicantUser = factory(User::class)->state('applicant')->create();
        $response = $this->actingAs($applicantUser)->json('get', "api/managers/$manager->id");
        $response->assertOk();

        $response->assertJsonFragment($manager->toApiArray());
    }

    public function testCurrentManagerAsGuest()
    {
        $response = $this->json('get', 'api/currentuser/manager');
        $response->assertUnauthorized();
    }

    public function testCurrentManagerAsManager()
    {
        $manager = factory(Manager::class)->create();
        $response = $this->actingAs($manager->user)->json('get', 'api/currentuser/manager');
        $response->assertOk();
        $response->assertJsonFragment($manager->fresh()->toApiArray());
    }

    public function testUpdateAsManager()
    {
        $manager = factory(Manager::class)->create();
        $managerUpdate = $this->generateFrontendManager();
        $response = $this->followingRedirects()
            ->actingAs($manager->user)
            ->json('put', "api/managers/$manager->id", $managerUpdate);
        $response->assertOk();
        $expectedDb = array_merge(
            collect($managerUpdate)->except(['en', 'fr'])->toArray(),
            ['id' => $manager->id]
        );
        $this->assertDatabaseHas('managers', $expectedDb);

        $newManager = $manager->fresh();
        $translations = $newManager->getTranslationsArray();
        $this->assertArraySubset($managerUpdate['en'], $translations['en']);
        $this->assertArraySubset($managerUpdate['fr'], $translations['fr']);
    }

    public function testUpdateAsWrongManager()
    {
        $manager = factory(Manager::class)->create();
        $otherManager = factory(User::class)->create();
        $managerUpdate = $this->generateFrontendManager();
        $response = $this->actingAs($otherManager)
            ->json('put', "api/managers/$manager->id", $managerUpdate);
        $response->assertForbidden();
    }

    public function testUpdateInvalidInput()
    {
        $manager = factory(Manager::class)->create();
        $managerUpdate = $this->generateFrontendManager();
        $managerUpdate['department_id'] = 999; // Not a valid department id
        $response = $this->actingAs($manager->user)
            ->json('put', "api/managers/$manager->id", $managerUpdate);
        $response->assertStatus(422);
    }

    public function testGetManagerIncludesUserName()
    {
        $name = 'Test Name 1';
        $manager = factory(Manager::class)->create();
        $user = $manager->user;
        $user->name = $name;
        $user->save();

        $applicantUser = factory(User::class)->state('applicant')->create();
        $response = $this->actingAs($applicantUser)->json('get', "api/managers/$manager->id");
        $response->assertOk();

        $response->assertJsonFragment(['name' => $name]);
    }
}
