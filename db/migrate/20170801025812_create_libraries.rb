class CreateLibraries < ActiveRecord::Migration[5.1]
    def self.up
        create_table :libraries, id: false do |t|
            t.column :library_id,   :int,         :limit      => 10,  :null => false
            t.column :number,       :int,         :limit      => 10,  :null => false
            t.column :lang,         :string,      :limit      => 5,   :null => false
            t.column :name,         :string,      :limit      => 50,  :null => false
            t.column :note,         :string,      :limit      => 100
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE libraries ADD PRIMARY KEY (library_id,number,lang);"
        Library.create :library_id => 1, :number => 1, :lang => 'vi', :name => 'News', :note => ''
        Library.create :library_id => 1, :number => 1, :lang => 'ja', :name => 'ニュース', :note => ''
        Library.create :library_id => 1, :number => 1, :lang => 'en', :name => 'News', :note => ''
        Library.create :library_id => 1, :number => 2, :lang => 'vi', :name => 'Video', :note => ''
        Library.create :library_id => 1, :number => 2, :lang => 'ja', :name => 'ビデオ', :note => ''
        Library.create :library_id => 1, :number => 2, :lang => 'en', :name => 'Video', :note => ''
        Library.create :library_id => 2, :number => 1, :lang => 'vi', :name => 'Đào tạo BrSE', :note => ''
        Library.create :library_id => 2, :number => 1, :lang => 'ja', :name => 'BrSEトレーニング', :note => ''
        Library.create :library_id => 2, :number => 1, :lang => 'en', :name => 'Training BrSE', :note => ''
        Library.create :library_id => 2, :number => 2, :lang => 'vi', :name => 'Đào tạo SE', :note => ''
        Library.create :library_id => 2, :number => 2, :lang => 'ja', :name => 'SEトレーニング', :note => ''
        Library.create :library_id => 2, :number => 2, :lang => 'en', :name => 'Training SE', :note => ''
        Library.create :library_id => 3, :number => 1, :lang => 'vi', :name => 'Việt Nam', :note => ''
        Library.create :library_id => 3, :number => 1, :lang => 'ja', :name => 'ベトナム', :note => ''
        Library.create :library_id => 3, :number => 1, :lang => 'en', :name => 'Vietnam', :note => ''
        Library.create :library_id => 3, :number => 2, :lang => 'vi', :name => 'Nhật Bản', :note => ''
        Library.create :library_id => 3, :number => 2, :lang => 'ja', :name => '日本', :note => ''
        Library.create :library_id => 3, :number => 2, :lang => 'en', :name => 'Japan', :note => ''
        Library.create :library_id => 4, :number => 1, :lang => 'vi', :name => 'Mới', :note => ''
        Library.create :library_id => 4, :number => 1, :lang => 'ja', :name => '新', :note => ''
        Library.create :library_id => 4, :number => 1, :lang => 'en', :name => 'New', :note => ''
        Library.create :library_id => 4, :number => 2, :lang => 'vi', :name => 'Đã xem', :note => ''
        Library.create :library_id => 4, :number => 2, :lang => 'ja', :name => '読む', :note => ''
        Library.create :library_id => 4, :number => 2, :lang => 'en', :name => 'Read', :note => ''
        Library.create :library_id => 4, :number => 3, :lang => 'vi', :name => 'Đã liên lạc', :note => ''
        Library.create :library_id => 4, :number => 3, :lang => 'ja', :name => '連絡先', :note => ''
        Library.create :library_id => 4, :number => 3, :lang => 'en', :name => 'Contacted', :note => ''
        Library.create :library_id => 5, :number => 1, :lang => 'vi', :name => 'VNĐ', :note => ''
        Library.create :library_id => 5, :number => 1, :lang => 'ja', :name => 'ドン', :note => ''
        Library.create :library_id => 5, :number => 1, :lang => 'en', :name => 'VND', :note => ''
        Library.create :library_id => 5, :number => 2, :lang => 'vi', :name => 'USD', :note => ''
        Library.create :library_id => 5, :number => 2, :lang => 'ja', :name => 'ドル', :note => ''
        Library.create :library_id => 5, :number => 2, :lang => 'en', :name => 'USD', :note => ''
        Library.create :library_id => 5, :number => 3, :lang => 'vi', :name => 'Yên', :note => ''
        Library.create :library_id => 5, :number => 3, :lang => 'ja', :name => '円', :note => ''
        Library.create :library_id => 5, :number => 3, :lang => 'en', :name => 'Yen', :note => ''
        Library.create :library_id => 6, :number => 1, :lang => 'vi', :name => 'Đã tốt nghiệp Đại học', :note => ''
        Library.create :library_id => 6, :number => 1, :lang => 'ja', :name => '大学を卒業した人', :note => ''
        Library.create :library_id => 6, :number => 1, :lang => 'en', :name => 'Graduated from university', :note => ''
        Library.create :library_id => 6, :number => 2, :lang => 'vi', :name => 'Đã tốt nghiệp Cao đẳng', :note => ''
        Library.create :library_id => 6, :number => 2, :lang => 'ja', :name => '短大を卒業した人', :note => ''
        Library.create :library_id => 6, :number => 2, :lang => 'en', :name => 'Graduated from college', :note => ''
        Library.create :library_id => 6, :number => 3, :lang => 'vi', :name => 'Đang là sinh viên', :note => ''
        Library.create :library_id => 6, :number => 3, :lang => 'ja', :name => '大学生', :note => ''
        Library.create :library_id => 6, :number => 3, :lang => 'en', :name => 'Being a student', :note => ''
        Library.create :library_id => 6, :number => 4, :lang => 'vi', :name => 'Đang là sinh viên năm cuối', :note => ''
        Library.create :library_id => 6, :number => 4, :lang => 'ja', :name => 'もうすぐ卒業する人', :note => ''
        Library.create :library_id => 6, :number => 4, :lang => 'en', :name => 'Being a senior year student', :note => ''
        Library.create :library_id => 7, :number => 1, :lang => 'vi', :name => 'Test Tiếng Nhật cơ bản', :note => ''
        Library.create :library_id => 7, :number => 1, :lang => 'ja', :name => 'IT専門の日本語テスト', :note => ''
        Library.create :library_id => 7, :number => 1, :lang => 'en', :name => 'Basic Japanese test', :note => ''
        Library.create :library_id => 7, :number => 2, :lang => 'vi', :name => 'Test Tiếng Nhật chuyên ngành (IT)', :note => ''
        Library.create :library_id => 7, :number => 2, :lang => 'ja', :name => 'IT専門の日本語テスト', :note => ''
        Library.create :library_id => 7, :number => 2, :lang => 'en', :name => 'Japanese specialized test (IT)', :note => ''
        Library.create :library_id => 7, :number => 3, :lang => 'vi', :name => 'Test tính cách chọn nghề nghiệp', :note => ''
        Library.create :library_id => 7, :number => 3, :lang => 'ja', :name => '適性検査', :note => ''
        Library.create :library_id => 7, :number => 3, :lang => 'en', :name => 'Test the personality to choose career', :note => ''
        Library.create :library_id => 8, :number => 1, :lang => 'vi', :name => 'Đà Nẵng', :note => '1905468'
        Library.create :library_id => 8, :number => 1, :lang => 'ja', :name => 'ダナン', :note => '1905468'
        Library.create :library_id => 8, :number => 1, :lang => 'en', :name => 'DaNang', :note => '1905468'
        Library.create :library_id => 8, :number => 2, :lang => 'vi', :name => 'Hà Nội', :note => '1581129'
        Library.create :library_id => 8, :number => 2, :lang => 'ja', :name => 'ハノイ', :note => '1581129'
        Library.create :library_id => 8, :number => 2, :lang => 'en', :name => 'HaNoi', :note => '1581129'
        Library.create :library_id => 8, :number => 3, :lang => 'vi', :name => 'Tokyo', :note => '1850147'
        Library.create :library_id => 8, :number => 3, :lang => 'ja', :name => '東京', :note => '1850147'
        Library.create :library_id => 8, :number => 3, :lang => 'en', :name => 'Tokyo', :note => '1850147'
        Library.create :library_id => 9, :number => 1, :lang => 'vi', :name => 'Web', :note => ''
        Library.create :library_id => 9, :number => 1, :lang => 'ja', :name => 'ウェブサイト', :note => ''
        Library.create :library_id => 9, :number => 1, :lang => 'en', :name => 'Web', :note => ''
        Library.create :library_id => 9, :number => 2, :lang => 'vi', :name => 'Video', :note => ''
        Library.create :library_id => 9, :number => 2, :lang => 'ja', :name => 'ビデオ', :note => ''
        Library.create :library_id => 9, :number => 2, :lang => 'en', :name => 'Video', :note => ''
        Library.create :library_id => 9, :number => 3, :lang => 'vi', :name => 'Image', :note => ''
        Library.create :library_id => 9, :number => 3, :lang => 'ja', :name => 'イメージ', :note => ''
        Library.create :library_id => 9, :number => 3, :lang => 'en', :name => 'Image', :note => ''
        Library.create :library_id => 10, :number => 1, :lang => 'vi', :name => 'Video from YouTube', :note => ''
        Library.create :library_id => 10, :number => 1, :lang => 'ja', :name => 'YouTubeからビデオ', :note => ''
        Library.create :library_id => 10, :number => 1, :lang => 'en', :name => 'Video from YouTube', :note => ''
        Library.create :library_id => 10, :number => 2, :lang => 'vi', :name => 'Image', :note => ''
        Library.create :library_id => 10, :number => 2, :lang => 'ja', :name => 'イメージ', :note => ''
        Library.create :library_id => 10, :number => 2, :lang => 'en', :name => 'Image', :note => ''
    end
    def self.down
        drop_table :libraries
    end
end
