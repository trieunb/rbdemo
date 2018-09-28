class CreateSubscribes < ActiveRecord::Migration[5.1]
    def self.up
        create_table :subscribes, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :email,        :string,      :limit      => 255,   :null => false
            t.column :status,       :int,         :limit      => 10
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
    end
    def self.down
        drop_table :subscribes
    end
end
