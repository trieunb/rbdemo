class CreateLanguages < ActiveRecord::Migration[5.1]
    def self.up
        create_table :languages, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :language_name,:string,      :limit      => 50,    :null => false
            t.column :language_code,:string,      :limit      => 5,     :null => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        Language.create :id => 1, :language_name => 'Tiếng Việt', :language_code => 'vi'
        Language.create :id => 2, :language_name => '日本語', :language_code => 'ja'
        Language.create :id => 3, :language_name => 'English', :language_code => 'en'
    end
    def self.down
        drop_table :languages
    end
end
