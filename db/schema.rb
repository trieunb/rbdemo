# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170815061109) do

  create_table "albums", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "img", null: false
    t.string "link", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "course_classes", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "beauty_id", limit: 100, null: false
    t.string "lang", limit: 5, null: false
    t.integer "course_id", null: false
    t.string "name", limit: 100, default: "", null: false
    t.string "title", limit: 100, default: "", null: false
    t.string "content", limit: 2000, default: "", null: false
    t.string "target", limit: 200, default: "", null: false
    t.string "time", limit: 100, default: "", null: false
    t.string "admission", limit: 100, default: "", null: false
    t.string "opening", limit: 100, default: "", null: false
    t.string "study_time", limit: 200, default: "", null: false
    t.string "price", limit: 200, default: "", null: false
    t.string "quantity", limit: 100, default: "", null: false
    t.string "benefits", limit: 2000, default: "", null: false
    t.string "curriculum", limit: 2000, default: "", null: false
    t.string "requirements", limit: 2000, default: "", null: false
    t.integer "location", default: 1
    t.integer "rate", default: 0
    t.integer "comment", default: 0
    t.integer "view", default: 0
    t.boolean "show", default: false
    t.string "icon", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "courses", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.integer "level", null: false
    t.integer "location", null: false
    t.string "title", limit: 50, null: false
    t.string "description", limit: 100, null: false
    t.string "image", null: false
    t.string "image_title", null: false
    t.integer "price", default: 0
    t.integer "unit_price"
    t.string "unit", limit: 10
    t.string "icon", null: false
    t.string "note", limit: 100
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "differents", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "title", limit: 50, null: false
    t.string "content", limit: 1000, null: false
    t.string "icon", null: false
    t.boolean "show", default: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "event_details", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "event_id", null: false
    t.string "img", null: false
    t.string "thumb", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "events", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "title", limit: 100, null: false
    t.string "detail", limit: 20000, null: false
    t.datetime "start", null: false
    t.datetime "end", null: false
    t.string "place", limit: 200, null: false
    t.boolean "show", default: false
    t.string "link", null: false
    t.string "image", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "languages", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "language_name", limit: 50, null: false
    t.string "language_code", limit: 5, null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "letters", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "title", limit: 100, null: false
    t.string "content", limit: 3000, null: false
    t.string "icon", null: false
    t.string "background", limit: 30, null: false
    t.string "author", limit: 50
    t.boolean "show", default: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "libraries", primary_key: ["library_id", "number", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "library_id", null: false
    t.integer "number", null: false
    t.string "lang", limit: 5, null: false
    t.string "name", limit: 50, null: false
    t.string "note", limit: 100
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "media", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "media_typ", null: false
    t.string "icon", null: false
    t.string "logo", null: false
    t.string "url", null: false
    t.integer "format", default: 1
    t.string "background", limit: 7, default: "#47B6E4"
    t.string "node", limit: 200
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "messages", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "title", limit: 30, default: "Error", null: false
    t.string "msg", limit: 200, null: false
    t.integer "typ", default: 4
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "questions", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "question", limit: 500, null: false
    t.string "answer", limit: 1000, null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "register_advisories", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", limit: 50, null: false
    t.string "address", limit: 200, null: false
    t.string "email", null: false
    t.string "phone", limit: 20, null: false
    t.string "message", limit: 500
    t.integer "status", null: false
    t.integer "education_level", null: false
    t.integer "course_type", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "register_courses", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "class_id", null: false
    t.string "name", limit: 50, null: false
    t.string "address", limit: 200, null: false
    t.string "email", null: false
    t.string "phone", limit: 20, null: false
    t.string "profile", null: false
    t.string "message", limit: 500
    t.integer "status", null: false
    t.string "token", limit: 200
    t.datetime "timeout"
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "register_events", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "event_id", null: false
    t.string "name", limit: 50, null: false
    t.string "email", null: false
    t.string "phone", limit: 20, null: false
    t.string "test_type"
    t.string "message", limit: 500
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "settings", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "facebook", null: false
    t.string "google_plus", null: false
    t.string "skype", null: false
    t.string "ameblo", null: false
    t.string "different", limit: 500, null: false
    t.string "welcome", limit: 500, null: false
    t.string "description", limit: 500, null: false
    t.string "keyword", limit: 100, null: false
    t.string "address", limit: 100, null: false
    t.string "phone_dn", limit: 20, null: false
    t.string "phone_hn", limit: 20, null: false
    t.string "phone_tokyo", limit: 20, null: false
    t.string "email", null: false
    t.decimal "position_lat", precision: 12, scale: 8
    t.decimal "position_lng", precision: 12, scale: 8
    t.string "intro_video", null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "slides", primary_key: ["id", "lang"], force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer "id", null: false
    t.string "lang", limit: 5, null: false
    t.string "img", null: false
    t.string "link"
    t.boolean "show", default: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "subscribes", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", null: false
    t.integer "status"
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

  create_table "users", id: :integer, default: nil, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "username", null: false
    t.string "password", null: false
    t.string "token", limit: 50, null: false
    t.datetime "timeout"
    t.string "name", limit: 50, null: false
    t.string "address", limit: 200, null: false
    t.string "email", null: false
    t.string "phone", limit: 20, null: false
    t.datetime "created_at", null: false
    t.string "created_by", limit: 10
    t.datetime "updated_at"
    t.string "updated_by", limit: 10
    t.datetime "deleted_at"
    t.string "deleted_by", limit: 10
  end

end
