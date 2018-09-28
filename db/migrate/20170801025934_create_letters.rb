class CreateLetters < ActiveRecord::Migration[5.1]
    def self.up
        create_table :letters, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :title,        :string,      :limit      => 100,   :null => false
            t.column :content,      :string,      :limit      => 3000,  :null => false
            t.column :icon,         :string,      :limit      => 255,   :null => false
            t.column :background,   :string,      :limit      => 30,    :null => false
            t.column :author,       :string,      :limit      => 50
            t.column :url_video,    :string,      :limit      => 255
            t.column :typ,          :int,         :limit      => 10,    :default => -1
            t.column :show,         :boolean,     :default    => false
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE letters ADD PRIMARY KEY (id,lang);"
        Letter.create :id => 3, :lang => 'vi', :title => 'LỜI CHÀO', :content => '<p>Thân gửi đến tất cả quý khách hàng cùng toàn thể các học viên của BrSE School. Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách hàng đã sử dụng dịch vụ của chúng tôi trong suốt thời gian qua. Nhờ vào sự tin tưởng của khách hàng, đến nay A.N.S đã có lịch sử phát triển gần 30 năm và ngày càng lớn mạnh.</p><p>Lần đầu tiên tôi đặt chân đến Việt Nam là vào tháng 5 năm 2011. Khi đó, tôi đã được tận mắt chứng kiến “nguồn năng lượng” dồi dào của Việt Nam. Nhìn thấy tương lai phát triển tại Việt Nam, thấy được sự cần cù chăm chỉ của người Việt cũng như mối quan hệ hữu hảo giữa Việt Nam và Nhật Bản, tôi có niềm tin chắc chắn là hai bên có thể hợp tác cùng nhau.</p><p>Tôi nghĩ nếu kết hợp được những ưu điểm này của Việt Nam với những ưu điểm của Nhật Bản như trình độ khoa học kỹ thuật, ý thức về chất lượng, dịch vụ thì thật tuyệt vời. Vì thế tôi đã quyết định thành lập công ty A.N.S Asia tại Việt Nam. Sau gần 5 năm hoạt động thì A.N.S Asia đã đúc kết được nhiều bài học kinh nghiệm trong đó có bài toán mà nhiều doanh nghiệp đang gặp phải là thiếu hụt nguồn nhân lực chất lượng. Tuy nhiên chúng tôi đã từng bước tháo gỡ được bài toán nhân lực thông qua đào tạo bài bản.</p><p>Tôi và giám đốc Phúc cùng chung quan điểm “Đào tạo và quản lý nhân lực chất lượng cao hướng đến sự phát triển bền vững là nhiệm vụ tối quan trọng”. Vì thế chúng tôi đã cùng nhau thành lập dự án "TRÍ TUỆ VIỆT NAM - CHINH PHỤC NHẬT BẢN" (còn gọi là BrSE School), với mong muốn chia sẻ và nhân rộng mô hình thành công trong công ty, nhằm đào tạo nguồn nhân lực chất lượng hướng đến phát triển bền vững cho cả Việt Nam và Nhật Bản. Tôi tin tưởng rằng với sự hợp tác giúp đỡ của khách hàng, sự nỗ lực hết mình của tập thể cán bộ, nhân viên A.N.S và A.N.S Asia, BrSE School sẽ mang đến sự hài lòng cho khách hàng và học viên.</p><p>Chúc các bạn sức khỏe, học tập và làm việc hiệu quả.</p>', :icon => '/images/slide/loiChao.png', :background => '#68D3E7', :author => 'HIROFUMI AKAZAWA', :url_video => 'https://www.youtube.com/embed/OLxQeGJlbMQ', :typ => 1, :show => true
        Letter.create :id => 3, :lang => 'ja', :title => 'LỜI CHÀO', :content => '<p>Thân gửi đến tất cả quý khách hàng cùng toàn thể các học viên của BrSE School. Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách hàng đã sử dụng dịch vụ của chúng tôi trong suốt thời gian qua. Nhờ vào sự tin tưởng của khách hàng, đến nay A.N.S đã có lịch sử phát triển gần 30 năm và ngày càng lớn mạnh.</p><p>Lần đầu tiên tôi đặt chân đến Việt Nam là vào tháng 5 năm 2011. Khi đó, tôi đã được tận mắt chứng kiến “nguồn năng lượng” dồi dào của Việt Nam. Nhìn thấy tương lai phát triển tại Việt Nam, thấy được sự cần cù chăm chỉ của người Việt cũng như mối quan hệ hữu hảo giữa Việt Nam và Nhật Bản, tôi có niềm tin chắc chắn là hai bên có thể hợp tác cùng nhau.</p><p>Tôi nghĩ nếu kết hợp được những ưu điểm này của Việt Nam với những ưu điểm của Nhật Bản như trình độ khoa học kỹ thuật, ý thức về chất lượng, dịch vụ thì thật tuyệt vời. Vì thế tôi đã quyết định thành lập công ty A.N.S Asia tại Việt Nam. Sau gần 5 năm hoạt động thì A.N.S Asia đã đúc kết được nhiều bài học kinh nghiệm trong đó có bài toán mà nhiều doanh nghiệp đang gặp phải là thiếu hụt nguồn nhân lực chất lượng. Tuy nhiên chúng tôi đã từng bước tháo gỡ được bài toán nhân lực thông qua đào tạo bài bản.</p><p>Tôi và giám đốc Phúc cùng chung quan điểm “Đào tạo và quản lý nhân lực chất lượng cao hướng đến sự phát triển bền vững là nhiệm vụ tối quan trọng”. Vì thế chúng tôi đã cùng nhau thành lập dự án "TRÍ TUỆ VIỆT NAM - CHINH PHỤC NHẬT BẢN" (còn gọi là BrSE School), với mong muốn chia sẻ và nhân rộng mô hình thành công trong công ty, nhằm đào tạo nguồn nhân lực chất lượng hướng đến phát triển bền vững cho cả Việt Nam và Nhật Bản. Tôi tin tưởng rằng với sự hợp tác giúp đỡ của khách hàng, sự nỗ lực hết mình của tập thể cán bộ, nhân viên A.N.S và A.N.S Asia, BrSE School sẽ mang đến sự hài lòng cho khách hàng và học viên.</p><p>Chúc các bạn sức khỏe, học tập và làm việc hiệu quả.</p>', :icon => '/images/slide/loiChao.png', :background => '#68D3E7', :author => '会長 赤澤博史', :url_video => 'https://www.youtube.com/embed/OLxQeGJlbMQ', :typ => 1, :show => true
        Letter.create :id => 3, :lang => 'en', :title => 'LỜI CHÀO', :content => '<p>Thân gửi đến tất cả quý khách hàng cùng toàn thể các học viên của BrSE School. Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách hàng đã sử dụng dịch vụ của chúng tôi trong suốt thời gian qua. Nhờ vào sự tin tưởng của khách hàng, đến nay A.N.S đã có lịch sử phát triển gần 30 năm và ngày càng lớn mạnh.</p><p>Lần đầu tiên tôi đặt chân đến Việt Nam là vào tháng 5 năm 2011. Khi đó, tôi đã được tận mắt chứng kiến “nguồn năng lượng” dồi dào của Việt Nam. Nhìn thấy tương lai phát triển tại Việt Nam, thấy được sự cần cù chăm chỉ của người Việt cũng như mối quan hệ hữu hảo giữa Việt Nam và Nhật Bản, tôi có niềm tin chắc chắn là hai bên có thể hợp tác cùng nhau.</p><p>Tôi nghĩ nếu kết hợp được những ưu điểm này của Việt Nam với những ưu điểm của Nhật Bản như trình độ khoa học kỹ thuật, ý thức về chất lượng, dịch vụ thì thật tuyệt vời. Vì thế tôi đã quyết định thành lập công ty A.N.S Asia tại Việt Nam. Sau gần 5 năm hoạt động thì A.N.S Asia đã đúc kết được nhiều bài học kinh nghiệm trong đó có bài toán mà nhiều doanh nghiệp đang gặp phải là thiếu hụt nguồn nhân lực chất lượng. Tuy nhiên chúng tôi đã từng bước tháo gỡ được bài toán nhân lực thông qua đào tạo bài bản.</p><p>Tôi và giám đốc Phúc cùng chung quan điểm “Đào tạo và quản lý nhân lực chất lượng cao hướng đến sự phát triển bền vững là nhiệm vụ tối quan trọng”. Vì thế chúng tôi đã cùng nhau thành lập dự án "TRÍ TUỆ VIỆT NAM - CHINH PHỤC NHẬT BẢN" (còn gọi là BrSE School), với mong muốn chia sẻ và nhân rộng mô hình thành công trong công ty, nhằm đào tạo nguồn nhân lực chất lượng hướng đến phát triển bền vững cho cả Việt Nam và Nhật Bản. Tôi tin tưởng rằng với sự hợp tác giúp đỡ của khách hàng, sự nỗ lực hết mình của tập thể cán bộ, nhân viên A.N.S và A.N.S Asia, BrSE School sẽ mang đến sự hài lòng cho khách hàng và học viên.</p><p>Chúc các bạn sức khỏe, học tập và làm việc hiệu quả.</p>', :icon => '/images/slide/loiChao.png', :background => '#68D3E7', :author => 'HIROFUMI AKAZAWA', :url_video => 'https://www.youtube.com/embed/OLxQeGJlbMQ', :typ => 1, :show => true
        Letter.create :id => 2, :lang => 'vi', :title => 'ĐÀO TẠO BrSE', :content => '<p>Với kinh nghiệm 9 năm học tập và làm việc tại Nhật Bản, với vai trò Kỹ sư IT tôi nắm rõ được những gì một Kỹ sư IT người Việt cần trang bị để có thể đáp ứng được yêu cầu công việc tại các công ty Nhật.</p><p>Các sinh viên đã tốt nghiệp ngành công nghệ thông tin, khi tham gia BrSE School, sau 10 tháng đào tạo cơ bản tại Việt Nam, sẽ có cơ hội được đào tạo nâng cao và thực tập 3 tháng tại Nhật Bản.</p><p>BrSE School sẽ trao cho học viên cơ hội thực tập và làm việc thực tế tại công ty Nhật Bản ở Tokyo, được hướng dẫn cách phỏng vấn xin việc đặc thù của văn hóa Nhật Bản, giúp sinh viên có thể được tuyển dụng và đủ năng lực làm việc được ngay sau khi tốt nghiệp. Đây là điểm nổi trội nhất mà các cơ sở đào tạo khác chưa có được.</p><p>Đối với các bạn sinh viên mới tốt nghiệp thì đây là cơ hội tốt để được đào tạo nâng cao và làm việc được ngay trong các công ty Nhật Bản. Điều mà trước đây một kỹ sư cần nhiều năm kinh nghiệm mới làm được.</p><p>Giáo trình đào tạo đã được chọn lọc qua thực tế tại nhiều công ty Nhật Bản, kết hợp hình thức đào tạo OJT (On The Job Training) đã thành công với 2 khóa đào tạo đầu tiên của công ty A.N.S. Tôi hy vọng thành công này sẽ được nhân rộng ra tại BrSE School nhằm đào tạo nguồn nhân lực chất lượng cao đang thiếu và yếu cho thành phố Đà Nẵng nói riêng và trên toàn quốc nói chung.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành BrSE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ ERP)</p><p>- Năng lực quản lý dự án</p><p>- Các kỹ năng mềm về communication giữa offshore phía Việt Nam và khách hàng phía Nhật Bản.</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoBrSE.png', :background => '#A7DBD9', :author => 'NGUYỄN HỒNG PHÚC', :show => true
        Letter.create :id => 2, :lang => 'ja', :title => 'ĐÀO TẠO BrSE', :content => '<p>Với kinh nghiệm 9 năm học tập và làm việc tại Nhật Bản, với vai trò Kỹ sư IT tôi nắm rõ được những gì một Kỹ sư IT người Việt cần trang bị để có thể đáp ứng được yêu cầu công việc tại các công ty Nhật.</p><p>Các sinh viên đã tốt nghiệp ngành công nghệ thông tin, khi tham gia BrSE School, sau 10 tháng đào tạo cơ bản tại Việt Nam, sẽ có cơ hội được đào tạo nâng cao và thực tập 3 tháng tại Nhật Bản.</p><p>BrSE School sẽ trao cho học viên cơ hội thực tập và làm việc thực tế tại công ty Nhật Bản ở Tokyo, được hướng dẫn cách phỏng vấn xin việc đặc thù của văn hóa Nhật Bản, giúp sinh viên có thể được tuyển dụng và đủ năng lực làm việc được ngay sau khi tốt nghiệp. Đây là điểm nổi trội nhất mà các cơ sở đào tạo khác chưa có được.</p><p>Đối với các bạn sinh viên mới tốt nghiệp thì đây là cơ hội tốt để được đào tạo nâng cao và làm việc được ngay trong các công ty Nhật Bản. Điều mà trước đây một kỹ sư cần nhiều năm kinh nghiệm mới làm được.</p><p>Giáo trình đào tạo đã được chọn lọc qua thực tế tại nhiều công ty Nhật Bản, kết hợp hình thức đào tạo OJT (On The Job Training) đã thành công với 2 khóa đào tạo đầu tiên của công ty A.N.S. Tôi hy vọng thành công này sẽ được nhân rộng ra tại BrSE School nhằm đào tạo nguồn nhân lực chất lượng cao đang thiếu và yếu cho thành phố Đà Nẵng nói riêng và trên toàn quốc nói chung.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành BrSE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ ERP)</p><p>- Năng lực quản lý dự án</p><p>- Các kỹ năng mềm về communication giữa offshore phía Việt Nam và khách hàng phía Nhật Bản.</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoBrSE.png', :background => '#A7DBD9', :author => 'グエン・ホン・フク', :show => true
        Letter.create :id => 2, :lang => 'en', :title => 'ĐÀO TẠO BrSE', :content => '<p>Với kinh nghiệm 9 năm học tập và làm việc tại Nhật Bản, với vai trò Kỹ sư IT tôi nắm rõ được những gì một Kỹ sư IT người Việt cần trang bị để có thể đáp ứng được yêu cầu công việc tại các công ty Nhật.</p><p>Các sinh viên đã tốt nghiệp ngành công nghệ thông tin, khi tham gia BrSE School, sau 10 tháng đào tạo cơ bản tại Việt Nam, sẽ có cơ hội được đào tạo nâng cao và thực tập 3 tháng tại Nhật Bản.</p><p>BrSE School sẽ trao cho học viên cơ hội thực tập và làm việc thực tế tại công ty Nhật Bản ở Tokyo, được hướng dẫn cách phỏng vấn xin việc đặc thù của văn hóa Nhật Bản, giúp sinh viên có thể được tuyển dụng và đủ năng lực làm việc được ngay sau khi tốt nghiệp. Đây là điểm nổi trội nhất mà các cơ sở đào tạo khác chưa có được.</p><p>Đối với các bạn sinh viên mới tốt nghiệp thì đây là cơ hội tốt để được đào tạo nâng cao và làm việc được ngay trong các công ty Nhật Bản. Điều mà trước đây một kỹ sư cần nhiều năm kinh nghiệm mới làm được.</p><p>Giáo trình đào tạo đã được chọn lọc qua thực tế tại nhiều công ty Nhật Bản, kết hợp hình thức đào tạo OJT (On The Job Training) đã thành công với 2 khóa đào tạo đầu tiên của công ty A.N.S. Tôi hy vọng thành công này sẽ được nhân rộng ra tại BrSE School nhằm đào tạo nguồn nhân lực chất lượng cao đang thiếu và yếu cho thành phố Đà Nẵng nói riêng và trên toàn quốc nói chung.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành BrSE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ ERP)</p><p>- Năng lực quản lý dự án</p><p>- Các kỹ năng mềm về communication giữa offshore phía Việt Nam và khách hàng phía Nhật Bản.</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoBrSE.png', :background => '#A7DBD9', :author => 'NGUYEN HONG PHUC', :show => true
        Letter.create :id => 1, :lang => 'vi', :title => 'ĐÀO TẠO SE', :content => '<p>Với mục tiêu đào tạo kỹ sư biết tiếng Nhật có thể làm việc trực tiếp với khách hàng Nhật, tham gia phát triển các dự án tại Nhật hoặc Việt Nam.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành SE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ)</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoSE.png', :background => '#DFE3CC', :author => 'NGUYỄN HỒNG PHÚC', :show => true
        Letter.create :id => 1, :lang => 'ja', :title => 'ĐÀO TẠO SE', :content => '<p>Với mục tiêu đào tạo kỹ sư biết tiếng Nhật có thể làm việc trực tiếp với khách hàng Nhật, tham gia phát triển các dự án tại Nhật hoặc Việt Nam.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành SE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ)</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoSE.png', :background => '#DFE3CC', :author => 'グエン・ホン・フク', :show => true
        Letter.create :id => 1, :lang => 'en', :title => 'ĐÀO TẠO SE', :content => '<p>Với mục tiêu đào tạo kỹ sư biết tiếng Nhật có thể làm việc trực tiếp với khách hàng Nhật, tham gia phát triển các dự án tại Nhật hoặc Việt Nam.</p><p>※ Tại BrSE School học viên sẽ được đào tạo toàn diện các kỹ năng cần có để trở thành SE thực thụ :</p><p>- Tiếng Nhật (căn bản, IT, business)</p><p>- Kỹ thuật (ngôn ngữ lập trình .NET, PHP, Java,..., kiến thức nghiệp vụ)</p><p>- Nắm vững văn hóa, phong cách làm việc Nhật Bản</p><p>- Tham gia dự án thực tế</p><p>※ Với hình thức đào tạo OJT sẽ giúp học viên sau khi tốt nghiệp có thể làm việc được ngay trong môi trường thực tế.</p>', :icon => '/images/slide/daoTaoSE.png', :background => '#DFE3CC', :author => 'NGUYEN HONG PHUC', :show => true
    end
    def self.down
        drop_table :letters
    end
end