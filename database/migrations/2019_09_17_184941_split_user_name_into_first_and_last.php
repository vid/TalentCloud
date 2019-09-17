<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SplitUserNameIntoFirstAndLast extends Migration
{

    private function splitName($fullName) {
        $matches = array();
        preg_match_all(
            '/((\S+\s+)*)(\S+)/',
            $fullName,
            $matches
        );
        $firstName = $matches[1][0];
        $lastName = $matches[3][0];
        return [$firstName, $lastName];
    }

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            $fullName = $user->name;
            $nameArray = $this->splitName($fullName);
            $firstName = $nameArray[0];
            $lastName = $nameArray[1];
            DB::table('users')->where('id', $user->id)->update(['first_name' => $firstName, 'last_name' => $lastName]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
