class CreateMedia < ActiveRecord::Migration[5.1]
    def self.up
        create_table :media, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false, :primary_key => true
            t.column :media_typ,    :int,         :limit      => 10,    :null => false
            t.column :icon,         :string,      :limit      => 255,   :null => false
            t.column :logo,         :string,      :limit      => 255,   :null => false
            t.column :url,          :string,      :limit      => 255,   :null => false
            t.column :format,       :int,         :default    => 1
            t.column :background,   :string,      :limit      => 7,     :default => '#47B6E4'
            t.column :node,         :string,      :limit      => 200
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        Media.create :id => 1, :media_typ => 1, :icon => '/images/media/iconNews1.png', :logo => '/images/media/dienDanDoanhNghiep.png', :url => 'http://enternews.vn/co-hoi-moi-cho-nhan-luc-cntt-viet-nam-tiep-can-doanh-nghiep-nhat-ban.html', :format => 1, :background => '#68D3E7', :node => ''
        Media.create :id => 2, :media_typ => 1, :icon => '/images/media/iconNews2.png', :logo => '/images/media/congAn.png', :url => 'http://cadn.com.vn/news/137_162274_da-na-ng-co-n-thie-u-nguo-n-nhan-lu-c-la-m-vie-c-c.aspx', :format => 1, :background => '#A7DBD9', :node => ''
        Media.create :id => 3, :media_typ => 1, :icon => '/images/media/iconNews3.png', :logo => '/images/media/tuoiTre.png', :url => '/images/media/noiDungBaoTuoiTre.jpg', :format => 3, :background => '#DFE3CC', :node => ''
        Media.create :id => 4, :media_typ => 1, :icon => '/images/media/iconNews3.png', :logo => '/images/media/baoMoi.png', :url => 'http://www.baomoi.com/da-nang-con-thieu-nguon-nhan-luc-lam-viec-cho-doanh-nghiep-nhat-ban/c/21626374.epi', :format => 1, :background => '#DFE3CC', :node => ''
        Media.create :id => 5, :media_typ => 2, :icon => '/images/media/iconVideo1.png', :logo => '/images/media/vtv.png', :url => 'http://vtv.vn/video/ban-tin-16h-24-02-2017-205462.htm', :format => 1, :background => '#A7DBD9', :node => ''
        Media.create :id => 6, :media_typ => 2, :icon => '/images/media/iconVideo2.png', :logo => '/images/media/qrt.png', :url => '/videos/media/qrt.mp4', :format => 2, :background => '#68D3E7', :node => 'QRT - Thời sự - (25-2-2017)'
    end
    def self.down
        drop_table :media
    end
end
