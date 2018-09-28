class CreateCourses < ActiveRecord::Migration[5.1]
    def self.up
        create_table :courses, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :level,        :int,         :limit      => 10,    :null => false
            t.column :location,     :int,         :limit      => 10,    :null => false
            t.column :title,        :string,      :limit      => 50,    :null => false
            t.column :description,  :string,      :limit      => 100,   :null => false
            t.column :image,        :string,      :limit      => 255,   :null => false
            t.column :image_title,  :string,      :limit      => 255,   :null => false
            t.column :price,        :int,         :limit      => 10,    :default => 0
            t.column :unit_price,   :int,         :limit      => 10
            t.column :unit,         :string,      :limit      => 10
            t.column :icon,         :string,      :limit      => 255,   :null => false
            t.column :note,         :string,      :limit      => 100
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE courses ADD PRIMARY KEY (id,lang);"
        Course.create :id => 1, :lang => 'vi', :level => 1, :location => 1, :title => 'KHÓA KỸ SƯ CẦU NỐI', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 1, :lang => 'ja', :level => 1, :location => 1, :title => 'KHÓA KỸ SƯ CẦU NỐI', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 1, :lang => 'en', :level => 1, :location => 1, :title => 'KHÓA KỸ SƯ CẦU NỐI', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 2, :lang => 'vi', :level => 1, :location => 2, :title => 'BRSE ADVANCED', :description => 'KHÓA KỸ SƯ CẦU NỐI NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
        Course.create :id => 2, :lang => 'ja', :level => 1, :location => 2, :title => 'BRSE ADVANCED', :description => 'KHÓA KỸ SƯ CẦU NỐI NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
        Course.create :id => 2, :lang => 'en', :level => 1, :location => 2, :title => 'BRSE ADVANCED', :description => 'KHÓA KỸ SƯ CẦU NỐI NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
        Course.create :id => 3, :lang => 'vi', :level => 2, :location => 1, :title => 'KHÓA ĐÀO TẠO KỸ SƯ', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 3, :lang => 'ja', :level => 2, :location => 1, :title => 'KHÓA ĐÀO TẠO KỸ SƯ', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 3, :lang => 'en', :level => 2, :location => 1, :title => 'KHÓA ĐÀO TẠO KỸ SƯ', :description => '', :image => '/images/courses/note.png', :image_title => '/images/courses/title_in_vi.png', :price => 2500000, :unit_price => 1, :unit => 'Tháng', :icon => '', :note => ''
        Course.create :id => 4, :lang => 'vi', :level => 2, :location => 2, :title => 'SE ADVANCED', :description => 'KHÓA ĐÀO TẠO KỸ SƯ NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
        Course.create :id => 4, :lang => 'ja', :level => 2, :location => 2, :title => 'SE ADVANCED', :description => 'KHÓA ĐÀO TẠO KỸ SƯ NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
        Course.create :id => 4, :lang => 'en', :level => 2, :location => 2, :title => 'SE ADVANCED', :description => 'KHÓA ĐÀO TẠO KỸ SƯ NÂNG CAO TẠI NHẬT BẢN', :image => '/images/courses/jp_bg.png', :image_title => '/images/courses/title_in_jp.png', :price => 0, :unit_price => 0, :unit => '', :icon => '', :note => ''
    end
    def self.down
        drop_table :courses
    end
end
