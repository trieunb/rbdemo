class CreateSlides < ActiveRecord::Migration[5.1]
    def self.up
        create_table :slides, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :img,          :string,      :limit      => 255,   :null => false
            t.column :link,         :string,      :limit      => 255
            t.column :show,         :boolean,     :default    => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE slides ADD PRIMARY KEY (id,lang);"
        Slide.create :id => 1, :lang => 'vi', :img => '/images/slide/slide1.png', :link => 'http://brse-school.vn/', :show => true
        Slide.create :id => 1, :lang => 'ja', :img => '/images/slide/slide1.png', :link => 'http://brse-school.vn/', :show => true
        Slide.create :id => 1, :lang => 'en', :img => '/images/slide/slide1.png', :link => 'http://brse-school.vn/', :show => true
    end
    def self.down
        drop_table :slides
    end
end
