class CreateMessages < ActiveRecord::Migration[5.1]
    def self.up
        create_table :messages, id: false do |t|
            t.column :id,           :int,         :limit      => 10,    :null => false
            t.column :lang,         :string,      :limit      => 5,     :null => false
            t.column :title,        :string,      :limit      => 30,    :null => false, :default => 'Error'
            t.column :msg,          :string,      :limit      => 200,   :null => false
            t.column :typ,          :int,         :default    => 4
            t.column :created_at,   :datetime,    :null       => false
            t.column :created_by,   :string,      :limit      => 10
            t.column :updated_at,   :datetime
            t.column :updated_by,   :string,      :limit      => 10
            t.column :deleted_at,   :datetime
            t.column :deleted_by,   :string,      :limit      => 10
        end
        execute "ALTER TABLE messages ADD PRIMARY KEY (id,lang);"
        Message.create :id => 1, :lang => 'vi', :msg => 'This field is required.'
        Message.create :id => 1, :lang => 'ja', :msg => 'この項目は必須です。'
        Message.create :id => 1, :lang => 'en', :msg => 'This field is required.'
        Message.create :id => 2, :lang => 'vi', :msg => 'Content exceeds the allowed length.'
        Message.create :id => 2, :lang => 'ja', :msg => 'コンテンツが許可された長さを超えています。'
        Message.create :id => 2, :lang => 'en', :msg => 'Content exceeds the allowed length.'
        Message.create :id => 3, :lang => 'vi', :msg => 'The start time must be less than or equal to the end time.'
        Message.create :id => 3, :lang => 'ja', :msg => '開始時間は終了時間以下でなければなりません。'
        Message.create :id => 3, :lang => 'en', :msg => 'The start time must be less than or equal to the end time.'
        Message.create :id => 4, :lang => 'vi', :msg => 'There are errors in the data entered, please check again.'
        Message.create :id => 4, :lang => 'ja', :msg => '入力したデータにエラーが発生しました。もう一度ご確認ください。'
        Message.create :id => 4, :lang => 'en', :msg => 'There are errors in the data entered, please check again.'
        Message.create :id => 5, :lang => 'vi', :title => 'Confirm', :msg => 'Do you really want to save this data?', :typ => 1
        Message.create :id => 5, :lang => 'ja', :title => 'Confirm', :msg => 'このデータを保存してもよろしいでしょうか。', :typ => 1
        Message.create :id => 5, :lang => 'en', :title => 'Confirm', :msg => 'Do you really want to save this data?', :typ => 1
        Message.create :id => 6, :lang => 'vi', :title => 'Success', :msg => 'The data have been saved successfully.', :typ => 2
        Message.create :id => 6, :lang => 'ja', :title => 'Success', :msg => 'データの保存に成功しました。', :typ => 2
        Message.create :id => 6, :lang => 'en', :title => 'Success', :msg => 'The data have been saved successfully.', :typ => 2
        Message.create :id => 7, :lang => 'vi', :msg => 'There was an error saving the data. Please try again.'
        Message.create :id => 7, :lang => 'ja', :msg => 'データの保存にエラーが発生しました。もう一度お願いします。'
        Message.create :id => 7, :lang => 'en', :msg => 'There was an error saving the data. Please try again.'
        Message.create :id => 8, :lang => 'vi', :title => 'Confirm', :msg => 'Do you really want to delete this data?', :typ => 1
        Message.create :id => 8, :lang => 'ja', :title => 'Confirm', :msg => 'データを削除してもよろしいでしょうか。', :typ => 1
        Message.create :id => 8, :lang => 'en', :title => 'Confirm', :msg => 'Do you really want to delete this data?', :typ => 1
        Message.create :id => 9, :lang => 'vi', :title => 'Success', :msg => 'The data have been successfully deleted.', :typ => 2
        Message.create :id => 9, :lang => 'ja', :title => 'Success', :msg => 'データの削除に成功しました。', :typ => 2
        Message.create :id => 9, :lang => 'en', :title => 'Success', :msg => 'The data have been successfully deleted.', :typ => 2
        Message.create :id => 10, :lang => 'vi', :msg => 'There was an error deleting the data. Please try again.'
        Message.create :id => 10, :lang => 'ja', :msg => 'データの削除にエラーが発生しました。もう一度お試しください。'
        Message.create :id => 10, :lang => 'en', :msg => 'There was an error deleting the data. Please try again.'
        Message.create :id => 11, :lang => 'vi', :msg => 'Incorrect email format.'
        Message.create :id => 11, :lang => 'ja', :msg => 'メールのフォーマットが正しくありません。'
        Message.create :id => 11, :lang => 'en', :msg => 'Incorrect email format.'
        Message.create :id => 12, :lang => 'vi', :msg => 'The same data have already existed.'
        Message.create :id => 12, :lang => 'ja', :msg => '同じデータがすでに存在しています。'
        Message.create :id => 12, :lang => 'en', :msg => 'The same data have already existed.'
        Message.create :id => 13, :lang => 'vi', :msg => 'Data is empty.'
        Message.create :id => 13, :lang => 'ja', :msg => 'データは空です。'
        Message.create :id => 13, :lang => 'en', :msg => 'Data is empty.'
        Message.create :id => 14, :lang => 'vi', :msg => 'Content can not exceed {0} characters.'
        Message.create :id => 14, :lang => 'ja', :msg => '内容は{0} 文字を超えてはいけません。'
        Message.create :id => 14, :lang => 'en', :msg => 'Content can not exceed {0} characters.'
        Message.create :id => 15, :lang => 'vi', :msg => 'Incorrect URL format.'
        Message.create :id => 15, :lang => 'ja', :msg => 'URLのフォーマットが正しくありません。'
        Message.create :id => 15, :lang => 'en', :msg => 'Incorrect URL format.'
        Message.create :id => 16, :lang => 'vi', :msg => 'Username has already been used.'
        Message.create :id => 16, :lang => 'ja', :msg => 'ユーザー名はすでに使用されています。'
        Message.create :id => 16, :lang => 'en', :msg => 'Username has already been used.'
        Message.create :id => 17, :lang => 'vi', :msg => '確認パスワードは正しくありません。'
        Message.create :id => 17, :lang => 'ja', :msg => 'Confirm password do not match'
        Message.create :id => 17, :lang => 'en', :msg => 'The confirmation password does not match.'
        Message.create :id => 18, :lang => 'vi', :title => 'Confirm', :msg => 'Do you really want to change your password?', :typ => 1
        Message.create :id => 18, :lang => 'ja', :title => 'Confirm', :msg => 'パスワードを変更してもよろしいでしょうか？', :typ => 1
        Message.create :id => 18, :lang => 'en', :title => 'Confirm', :msg => 'Do you really want to change your password?', :typ => 1
        Message.create :id => 19, :lang => 'vi', :title => 'Success', :msg => 'The password has been successfully changed.', :typ => 2
        Message.create :id => 19, :lang => 'ja', :title => 'Success', :msg => 'パスワードの変更に成功しました。', :typ => 2
        Message.create :id => 19, :lang => 'en', :title => 'Success', :msg => 'The password has been successfully changed.', :typ => 2
        Message.create :id => 20, :lang => 'vi', :msg => 'Incorrect password'
        Message.create :id => 20, :lang => 'ja', :msg => 'パスワードが正しくありません。'
        Message.create :id => 20, :lang => 'en', :msg => 'Incorrect password'
        Message.create :id => 21, :lang => 'vi', :msg => 'The email address has already been used.'
        Message.create :id => 21, :lang => 'ja', :msg => 'メールアドレスがすでに使用されています。'
        Message.create :id => 21, :lang => 'en', :msg => 'The email address has already been used.'
        Message.create :id => 22, :lang => 'vi', :msg => 'You must choose a file.'
        Message.create :id => 22, :lang => 'ja', :msg => 'ファイルを選択する必要があります。'
        Message.create :id => 22, :lang => 'en', :msg => 'You must choose a file.'
        Message.create :id => 23, :lang => 'vi', :msg => 'Size of file can not exceed 10MB.'
        Message.create :id => 23, :lang => 'ja', :msg => 'ファイルのサイズは10MBまでです。'
        Message.create :id => 23, :lang => 'en', :msg => 'Size of file can not exceed 10MB.'
        Message.create :id => 24, :lang => 'vi', :msg => 'The file does not exist.'
        Message.create :id => 24, :lang => 'ja', :msg => 'ファイルは存在しません。'
        Message.create :id => 24, :lang => 'en', :msg => 'The file does not exist.'
        Message.create :id => 25, :lang => 'vi', :msg => 'Password must contain at least eight characters, at least one number and both lower and uppercase letters.'
        Message.create :id => 25, :lang => 'ja', :msg => 'パスワードは最低8文字で、最低1数字と小文字、大文字を含む必要があります。'
        Message.create :id => 25, :lang => 'en', :msg => 'Password must contain at least eight characters, at least one number and both lower and uppercase letters.'
        Message.create :id => 26, :lang => 'vi', :msg => 'Must have at least one class display.'
        Message.create :id => 26, :lang => 'ja', :msg => '最低1つのクラス表示が必要です。'
        Message.create :id => 26, :lang => 'en', :msg => 'Must have at least one class display.'
        Message.create :id => 27, :lang => 'vi', :msg => 'Incorrect image size or dimension.'
        Message.create :id => 27, :lang => 'ja', :msg => 'イメージのディメンションまたはサイズが正しくありません。'
        Message.create :id => 27, :lang => 'en', :msg => 'Incorrect image size or dimension.'
        Message.create :id => 28, :lang => 'vi', :msg => 'Only  .jpg,  .jpeg or .png files are allowed.'
        Message.create :id => 28, :lang => 'ja', :msg => ' .jpg 、 .jpeg 、 .pngファイルのみが許可されます。'
        Message.create :id => 28, :lang => 'en', :msg => 'Only  .jpg,  .jpeg or .png files are allowed.'
        Message.create :id => 29, :lang => 'vi', :msg => 'Only .mp4 files are allowed.'
        Message.create :id => 29, :lang => 'ja', :msg => '.mp4ファイルのみが許可されます。'
        Message.create :id => 29, :lang => 'en', :msg => 'Only .mp4 files are allowed.'
        Message.create :id => 30, :lang => 'vi', :msg => 'Total size of files cannot exceed 10MB.'
        Message.create :id => 30, :lang => 'ja', :msg => 'ファイルの合計サイズは10MBを超えることができません。'
        Message.create :id => 30, :lang => 'en', :msg => 'Total size of files cannot exceed 10MB.'
        Message.create :id => 31, :lang => 'vi', :msg => 'Do not upload more than 12 files at a time.'
        Message.create :id => 31, :lang => 'ja', :msg => '一回に12ファイル以上アップロードしないでください。'
        Message.create :id => 31, :lang => 'en', :msg => 'Do not upload more than 12 files at a time.'
        Message.create :id => 32, :lang => 'vi', :msg => 'Size of file cannot exceed 252MB.'
        Message.create :id => 32, :lang => 'ja', :msg => 'ファイルのサイズは252MBを超えることができません。'
        Message.create :id => 32, :lang => 'en', :msg => 'Size of file cannot exceed 252MB.'
        Message.create :id => 33, :lang => 'vi', :title => 'Confirm', :msg => 'Do you really want to reset the password for this account?', :typ => 1
        Message.create :id => 33, :lang => 'ja', :title => 'Confirm', :msg => 'このアカウントのパスワードをリセットしてもよろしいでしょうか。', :typ => 1
        Message.create :id => 33, :lang => 'en', :title => 'Confirm', :msg => 'Do you really want to reset the password for this account?', :typ => 1
        Message.create :id => 34, :lang => 'vi', :title => 'Success', :msg => 'Password successfully reset.', :typ => 2
        Message.create :id => 34, :lang => 'ja', :title => 'Success', :msg => 'パスワードリセットに成功しました。', :typ => 2
        Message.create :id => 34, :lang => 'en', :title => 'Success', :msg => 'Password successfully reset.', :typ => 2
        Message.create :id => 35, :lang => 'vi', :msg => 'Failed to reset password.'
        Message.create :id => 35, :lang => 'ja', :msg => 'パスワードがリセットに失敗しました。'
        Message.create :id => 35, :lang => 'en', :msg => 'Failed to reset password.'
    end
    def self.down
        drop_table :messages
    end
end
