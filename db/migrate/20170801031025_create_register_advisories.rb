class CreateRegisterAdvisories < ActiveRecord::Migration[5.1]
    def self.up
        create_table :register_advisories, id: false do |t|
            t.column :id,               :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :name,             :string,      :limit      => 50,    :null => false
            t.column :address,          :string,      :limit      => 200,   :null => false
            t.column :email,            :string,      :limit      => 255,   :null => false
            t.column :phone,            :string,      :limit      => 20,    :null => false
            t.column :message,          :string,      :limit      => 500
            t.column :status,           :int,         :limit      => 10,    :null => false
            t.column :education_level,  :int,         :limit      => 10,    :null => false
            t.column :course_type,      :int,         :limit      => 10,    :null => false
            t.column :created_at,       :datetime,                          :null => false
            t.column :created_by,       :string,      :limit      => 10
            t.column :updated_at,       :datetime
            t.column :updated_by,       :string,      :limit      => 10
            t.column :deleted_at,       :datetime
            t.column :deleted_by,       :string,      :limit      => 10
        end
    end
    def self.down
        drop_table :register_advisories
    end
end
