<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable('users')){
          Schema::table('users', function (Blueprint $table) {
            !Schema::hasColumn('users','name') ? $table->string('firstname') : $table->renameColumn('name','firstname');
            !Schema::hasColumn('users','lastname') ? $table->string('lastname') : "";
            !Schema::hasColumn('users','user_type') ? $table->string('user_type')->default('user') : "";
            !Schema::hasColumn('users','permission_level') ? $table->integer('permission_level')->default(0) : "";
          });
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
