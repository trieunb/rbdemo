class CreateRegisterEvents < ActiveRecord::Migration[5.1]
    def self.up
        create_table :register_events, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :event_id,     :int,         :limit      => 10,    :null => false
            t.column :name,         :string,      :limit      => 50,    :null => false
            t.column :email,        :string,      :limit      => 255,   :null => false
            t.column :phone,        :string,      :limit      => 20,    :null => false
            t.column :test_type,    :string,      :limit      => 255
            t.column :message,      :string,      :limit      => 500
            t.column :status,       :int,         :limit      => 10,    :null => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
    end
    def self.down
        drop_table :register_events
    end
end
