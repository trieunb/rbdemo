=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - ApplicationHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/01
    * 作成者        :   quypn – quypn@ans-asia.com
    *
    * 更新日        :
    * 更新者        :
    * 更新内容      :
    *
    * @package     :   HELPER
    * @copyright   :   Copyright (c) ANS-ASIA
    * @version     :   1.0.0
    * ****************************************************************************
=end
module ApplicationHelper
    class Helper
        ###
         # getLibraries
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/01 - create
         # @param       :   library_id - int - id library need to get
         # @param       :   lang - string - language of library need to get
         # @return      :   Hasher - list library had geted
         # @access      :   public
         # @see         :   remark
        ###
        def self.getLibraries(library_id, lang)
            return Library.where(library_id: library_id)
                          .where(lang: lang)
                          .select('library_id, number, lang, name, note')
        end
        ###
         # encode the string to md5 string
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/01 - create
         # @param       :   string - string - string need to endcode
         # @return      :   string - string after endcode
         # @access      :   public
         # @see         :   remark
        ###
        def self.getMD5(string)
            return Digest::MD5.hexdigest 'BrSE' << string << 'School'
        end
        ###
         # generate the token for user
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/01 - create
         # @param       :   [id] - string - id convert to string of user login
         # @return      :   string - token had generated
         # @access      :   public
         # @see         :   remark
        ###
        def self.generateToken(id = '')
            o = [('a'..'z'), ('A'..'Z'), ('0'..'9')].map(&:to_a).flatten << '_-'
            return (0...40).map { o[rand(o.length)] }.join + id.to_s
        end
        ###
         # get the id of record will to insert
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/01 - create
         # @param       :   table - string - name of table will instert
         # @param       :   column - string - column key
         # @return      :   int - id of record will to insert
         # @access      :   public
         # @see         :   remark
        ###
        def self.getID(table, column = 'id')
            DynamicRecord.reset_column_information
            DynamicRecord.table_name = table
            max = DynamicRecord.maximum(column)
            return max == nil ? 1 : max + 1
        end
        ###
         # get curent language
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/01 - create
         # @param       :   null
         # @return      :   string - code of curent language
         # @access      :   public
         # @see         :   remark
        ###
        def self.getLang
            return I18n.locale.to_s
        end
        ###
         # generate message from DB
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/14 - create
         # @param       :   null
         # @return      :   Hasher - objects msg
         # @access      :   public
         # @see         :   remark
        ###
        def self.genMsg
            lang            = Helper.getLang
            data            = Hash.new
            data['msg_content'] = Hash.new
            data['msg_title'] = Hash.new
            data['msg_typ'] = Hash.new
            msg = Message.where(lang: lang, deleted_at: nil)
            msg.each do |item|
                data['msg_content'][item.id] = item.msg
                data['msg_title'][item.id] = item.title
                data['msg_typ'][item.id] = item.typ
            end
            return data
        end
        ###
         # save img to folder upload
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/17 - create
         # @param       :   upload - file upload from client
         # @param       :   link - locale want to save (default: public/uploads/images/)
         # @return      :   Hasher - objects msg
         # @access      :   public
         # @see         :   remark
        ###
        def self.save_file(upload, link = nil, textAfter = '', numberAfter = '')
            checkFile        = Hash.new
            result           = Hash.new
            result['status'] = true
            begin
                file_name               = upload.original_filename  if  (upload !='')
                file                    = upload.read
                file_type               = file_name.split('.').last
                new_name_file           = Time.now.to_i
                new_file_name_with_type = "#{new_name_file}." + file_type

                if link != nil
                    image_root = link
                else
                    image_root = "/uploads/images/"
                end

                # change name file
                if textAfter != ''
                    new_name_file = new_name_file.to_s + "_" + textAfter.to_s
                elsif numberAfter != '' and numberAfter.is_a? Numeric
                    new_name_file = new_name_file + numberAfter
                end

                # new name file when change name file
                new_file_name_with_type = "#{new_name_file}." + file_type

                # create direction
                direction               = "#{Rails.public_path}" + image_root + new_file_name_with_type
                new_name_file           = checkFileExist(image_root,new_name_file,file_type)

                # new name file when check file exist
                new_file_name_with_type = "#{new_name_file}." + file_type

                File.open('public' + image_root + new_file_name_with_type, "wb")  do |f|  
                    f.write(file) 
                end
                result['link'] = image_root + new_file_name_with_type 
            rescue
                result['status'] = false
                result['error']  = "#{$!}"
            ensure
                return result
            end
        end
        ###
         # get list email subscribe to sent email
         # -----------------------------------------------
         # @author      :   quypn     - 2017/08/30 - create
         # @param       :   null
         # @return      :   Hasher - list email
         # @access      :   public
         # @see         :   remark
        ###
        def self.getMailSubscribe
            return Subscribe.where(deleted_at: nil).select(:email)
        end

        def self.checkFileExist(image_root,new_name_file,file_type)
            @direction = "#{Rails.public_path}" + image_root + "#{new_name_file}." + file_type
            @check     = File.exist?(@direction)

            if (@check) 
                new_name_file = new_name_file + 1
                new_name_file = checkFileExist(image_root,new_name_file,file_type)
            end

            return new_name_file
        end
        ###
         # replace sql Escape String
         # -----------------------------------------------
         # @author      :   havv   - 2017/09/20 - create
         # @param       :   strInput - string
         # @return      :   string
         # @access      :   public
         # @see         :   remark
        ###
        def self.sqlEscapeString(strInput)
            strTemp = strInput

            strTemp = strTemp.gsub('[', '[[]')
            strTemp = strTemp.gsub('%', '[%]')
            strTemp = strTemp.gsub('_', '[_]')
            strTemp = strTemp.gsub('\\', '[\\]')
            strTemp = strTemp.gsub('\'', '\'\'')

            return strTemp
        end
        ###
         # convert string/number to boolean
         # -----------------------------------------------
         # @author      :   daonx   - 2017/09/27 - create
         # @param       :   strInput - string
         # @return      :   string
         # @access      :   public
         # @see         :   remark
        ###
        def self.to_b(value)
            return true  if value == true   || value.present?  || value.to_s =~ (/(true|t|yes|y|1|\d)$/i)
            return false if value == false  || value.blank?    || value.to_s =~ (/(false|f|no|n|0)$/i)
            raise ArgumentError.new("invalid value for Boolean: \"#{value}\"")
        end
    end
end
