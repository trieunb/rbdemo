class CreateEvents < ActiveRecord::Migration[5.1]
    def self.up
        create_table :events, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :title,        :string,      :limit      => 100,   :null => false
            t.column :detail,       :string,      :limit      => 20000, :null => false
            t.column :start,        :datetime,    :null       => false
            t.column :end,          :datetime,    :null       => false
            t.column :place,        :string,      :limit      => 200,   :null => false
            t.column :show,         :boolean,     :default    => false
            t.column :link,         :string,      :limit      => 255,   :null => false
            t.column :image,        :string,      :limit      => 255,   :null => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE events ADD PRIMARY KEY (id,lang);"
    end
    def self.down
        drop_table :events
    end
end
