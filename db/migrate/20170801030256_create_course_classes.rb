class CreateCourseClasses < ActiveRecord::Migration[5.1]
    def self.up
        create_table :course_classes, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :beauty_id,    :string,      :limit      => 100,   :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :course_id,    :int,         :limit      => 10,    :null => false
            t.column :name,         :string,      :limit      => 100,   :null => false, :default => ''
            t.column :title,        :string,      :limit      => 100,   :null => false, :default => ''
            t.column :content,      :string,      :limit      => 2000,  :null => false, :default => ''
            t.column :target,       :string,      :limit      => 200,   :null => false, :default => ''
            t.column :time,         :string,      :limit      => 100,   :null => false, :default => ''
            t.column :admission,    :string,      :limit      => 100,   :null => false, :default => ''
            t.column :opening,      :string,      :limit      => 100,   :null => false, :default => ''
            t.column :study_time,   :string,      :limit      => 200,   :null => false, :default => ''
            t.column :price,        :string,      :limit      => 200,   :null => false, :default => ''
            t.column :quantity,     :string,      :limit      => 100,   :null => false, :default => ''
            t.column :benefits,     :string,      :limit      => 2000,  :null => false, :default => ''
            t.column :curriculum,   :string,      :limit      => 2000,  :null => false, :default => ''
            t.column :requirements, :string,      :limit      => 2000,  :null => false, :default => ''
            t.column :location,     :int,         :limit      => 10,    :default  => 1
            t.column :rate,         :int,         :limit      => 10,    :default  => 0
            t.column :comment,      :int,         :limit      => 10,    :default  => 0
            t.column :view,         :int,         :limit      => 10,    :default  => 0
            t.column :show,         :boolean,     :default    => false
            t.column :icon,         :string,      :limit      => 255,   :null => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE course_classes ADD PRIMARY KEY (id,lang);"
        CourseClass.create :id => 1, :beauty_id => 'brse-a', :lang => 'vi', :course_id => 1, :name => 'LỚP BUỐI SÁNG', :title => 'BrSE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 1, :beauty_id => 'brse-a', :lang => 'ja', :course_id => 1, :name => 'LỚP BUỐI SÁNG', :title => 'BrSE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 1, :beauty_id => 'brse-a', :lang => 'en', :course_id => 1, :name => 'LỚP BUỐI SÁNG', :title => 'BrSE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 2, :beauty_id => 'brse-b', :lang => 'vi', :course_id => 1, :name => 'LỚP BUỐI CHIỀU', :title => 'BrSE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 2, :beauty_id => 'brse-b', :lang => 'ja', :course_id => 1, :name => 'LỚP BUỐI CHIỀU', :title => 'BrSE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 2, :beauty_id => 'brse-b', :lang => 'en', :course_id => 1, :name => 'LỚP BUỐI CHIỀU', :title => 'BrSE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 3, :beauty_id => 'brse-c', :lang => 'vi', :course_id => 1, :name => 'LỚP BUỐI TỐI', :title => 'BrSE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 3, :beauty_id => 'brse-c', :lang => 'ja', :course_id => 1, :name => 'LỚP BUỐI TỐI', :title => 'BrSE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 3, :beauty_id => 'brse-c', :lang => 'en', :course_id => 1, :name => 'LỚP BUỐI TỐI', :title => 'BrSE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 4, :beauty_id => 'brse-advanced', :lang => 'vi', :course_id => 2, :name => 'BRSE ADVANCED', :title => 'BRSE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
        CourseClass.create :id => 4, :beauty_id => 'brse-advanced', :lang => 'ja', :course_id => 2, :name => 'BRSE ADVANCED', :title => 'BRSE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
        CourseClass.create :id => 4, :beauty_id => 'brse-advanced', :lang => 'en', :course_id => 2, :name => 'BRSE ADVANCED', :title => 'BRSE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
        CourseClass.create :id => 5, :beauty_id => 'se-a', :lang => 'vi', :course_id => 3, :name => 'LỚP BUỐI SÁNG', :title => 'SE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 5, :beauty_id => 'se-a', :lang => 'ja', :course_id => 3, :name => 'LỚP BUỐI SÁNG', :title => 'SE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 5, :beauty_id => 'se-a', :lang => 'en', :course_id => 3, :name => 'LỚP BUỐI SÁNG', :title => 'SE A', :show => true, :icon => '/images/courses/icon_morning.png'
        CourseClass.create :id => 6, :beauty_id => 'se-b', :lang => 'vi', :course_id => 3, :name => 'LỚP BUỐI CHIỀU', :title => 'SE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 6, :beauty_id => 'se-b', :lang => 'ja', :course_id => 3, :name => 'LỚP BUỐI CHIỀU', :title => 'SE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 6, :beauty_id => 'se-b', :lang => 'en', :course_id => 3, :name => 'LỚP BUỐI CHIỀU', :title => 'SE B', :show => true, :icon => '/images/courses/icon_noon.png'
        CourseClass.create :id => 7, :beauty_id => 'se-c', :lang => 'vi', :course_id => 3, :name => 'LỚP BUỐI TỐI', :title => 'SE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 7, :beauty_id => 'se-c', :lang => 'ja', :course_id => 3, :name => 'LỚP BUỐI TỐI', :title => 'SE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 7, :beauty_id => 'se-c', :lang => 'en', :course_id => 3, :name => 'LỚP BUỐI TỐI', :title => 'SE C', :show => true, :icon => '/images/courses/icon_evening.png'
        CourseClass.create :id => 8, :beauty_id => 'se-advanced', :lang => 'vi', :course_id => 4, :name => 'SE ADVANCED', :title => 'SE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
        CourseClass.create :id => 8, :beauty_id => 'se-advanced', :lang => 'ja', :course_id => 4, :name => 'SE ADVANCED', :title => 'SE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
        CourseClass.create :id => 8, :beauty_id => 'se-advanced', :lang => 'en', :course_id => 4, :name => 'SE ADVANCED', :title => 'SE ADVANCED', :show => true, :icon => '/images/courses/icon_sakura.png', :location => 3
    end
    def self.down
        drop_table :courses_classes
    end
end
