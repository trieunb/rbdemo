class CreateUsers < ActiveRecord::Migration[5.1]
    include ApplicationHelper
    def self.up
        create_table :users, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :username,     :string,      :limit      => 255,   :null => false
            t.column :password,     :string,      :limit      => 255,   :null => false
            t.column :token,        :string,      :limit      => 50,   :null => false
            t.column :timeout,      :datetime
            t.column :name,         :string,      :limit      => 50,    :null => false
            t.column :address,      :string,      :limit      => 200,   :null => false
            t.column :email,        :string,      :limit      => 255,   :null => false
            t.column :phone,        :string,      :limit      => 20,    :null => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        User.create :id => 1,
                    :username => 'ans',
                    :password => Helper.getMD5('Ansasia@2017'),
                    :token => '',
                    :name => 'ANS Asia',
                    :address => 'Tầng 7, Tòa Nhà PVcomBank, Lô A2.1 Đường 30/4, Hải Châu, Đà Nẵng',
                    :email => 'contact@ans-asia.com',
                    :phone => '02363566969'
    end
    def self.down
        drop_table :users
    end
end
