=begin
    * ****************************************************************************
    * BRSE-SCHOOL
    * HELPER - LettersHelper
    *
    * 処理概要      :   
    * 作成日        :   2017/08/17
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
require 'fileutils'
module Admin
    module LettersHelper
        class LettersHlp
            include ApplicationHelper #app/helpers/application_helper.rb
            ###
            # get data of table letter
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/17 - create
            # @param       :   null
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.getLetters
                lang = Helper.getLang
                return Letter.where(deleted_at: nil, lang: lang)
                             .select(
                                :id,
                                :icon,
                                :title,
                                :content,
                                :author,
                                :url_video,
                                :show,
                                :background
                             )
            end
            ###
            # get data of table letter by id
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/17 - create
            # @param       :   id - int - id of letter need to get
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.getLetter(id)
                data = Hash.new
                data['letter_vi'] = Letter.find_by(lang: 'vi', id: id, deleted_at: nil)
                data['letter_ja'] = Letter.find_by(lang: 'ja', id: id, deleted_at: nil)
                data['lang'] = Language.where(deleted_at: nil).where.not(language_code: 'vi').select('id, language_name, language_code').order('id')
                return data
            end
            ###
            # create a letter
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/18 - create
            # @param       :   letter - Hash - data of letter need to add
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.saveLetter(letter)
                result = Hash.new
                result['status'] = true
                begin
                    file = Helper.save_file(letter[:icon], '/images/slide/')
                    url_video = letter[:url_video]
                    if letter[:typ].to_s == '2'
                        file2 = Helper.save_file(letter[:image], '/images/slide/')
                        url_video = file2['link']
                    end
                    if file['status'] == true
                        lang = Language.where(deleted_at: nil).select('id, language_name, language_code')
                        id = Helper.getID('letters')
                        lang.each do |item|
                            Letter.create(
                                    id: id,
                                    lang: item[:language_code],
                                    title: letter[:title],
                                    content: letter[:content],
                                    author: letter[:author],
                                    url_video: url_video,
                                    typ: letter[:typ],
                                    icon: file['link'],
                                    background: letter[:background],
                                    show: (letter[:show] == 'on' ? true : false),
                                    created_by: $user_id
                                )
                        end
                        result['id'] = id
                    else
                        result = file
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"
                ensure
                    return result
                end
            end
            ###
            # update a letter
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/18 - create
            # @param       :   letter - Hash - data of letter need to update
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.updateLetter(letter)
                result = Hash.new
                result['status'] = true
                result['id'] = letter[:id]
                begin
                    oldLetter = Letter.find_by(id: letter[:id], lang: 'vi', deleted_at: nil)
                    if oldLetter != nil
                        icon = oldLetter.icon
                        url_video = letter[:url_video]
                        update = true
                        if oldLetter.typ.to_s != letter[:typ].to_s
                            if oldLetter.typ == 2
                                languages = Language.all();
                                languages.each do |item|
                                    let = Letter.find_by(id: letter[:id], lang: item.language_code)
                                    let2 = Letter.where(url_video: let['url_video'], deleted_at: nil).where.not('id=' + letter[:id] + ' AND lang=\'' + item.language_code + '\'').first
                                    if let2 == nil
                                        begin
                                            FileUtils.rm('public' + let['url_video'])
                                        rescue
                                        end
                                    end
                                    Letter.where(id: letter[:id], lang: item.language_code)
                                        .update_all(
                                            url_video: ''
                                        )
                                end
                            end
                        end
                        if letter[:icon] != nil && letter[:icon] != ''
                            letter2 = Letter.where(lang: 'vi', icon: oldLetter.icon, deleted_at: nil).where.not(id: letter[:id]).first
                            if letter2 == nil
                                begin
                                    FileUtils.rm('public' + icon)
                                rescue
                                end
                            end
                            file = Helper.save_file(letter[:icon], '/images/slide/')
                            if !file['status']
                                update = false
                                result = file
                            else
                                icon = file['link']
                            end
                        end
                        if (oldLetter.typ == 2 && letter[:typ].to_s != '2') || (letter[:typ].to_s == '2' && letter[:image] != nil && letter[:image] != '')
                            letter2 = Letter.where(url_video: oldLetter.url_video, deleted_at: nil).where.not('id=' + letter[:id] + ' AND lang=\'vi\'').first
                            if letter2 == nil
                                begin
                                    FileUtils.rm('public' + oldLetter.url_video)
                                rescue
                                end
                            end
                            if letter[:typ].to_s == '2' && letter[:image] != nil && letter[:image] != ''
                                file2 = Helper.save_file(letter[:image], '/images/slide/')
                                if !file2['status']
                                    update = false
                                    result = file2
                                else
                                    url_video = file2['link']
                                end
                            end
                        end
                        if update
                            update1 = Letter.where(id: letter[:id], lang: 'vi')
                                            .update_all(
                                                    title: letter[:title],
                                                    content: letter[:content],
                                                    author: letter[:author],
                                                    url_video: url_video,
                                                )
                            update2 = Letter.where(id: letter[:id])
                                            .update_all(
                                                    icon: icon,
                                                    typ: letter[:typ],
                                                    background: letter[:background],
                                                    show: letter[:show] == 'on' ? true : false,
                                                    updated_at: Time.now,
                                                    updated_by: $user_id
                                                )
                            if oldLetter.typ.to_s != letter[:typ].to_s
                                Letter.where(id: letter[:id])
                                    .update_all(
                                        url_video: url_video
                                    )
                            end
                            result['status'] = update1&&update2
                        end
                    end
                rescue
                    result['status'] = false
                    result['error'] = "#{$!}"
                ensure
                    return result
                end
            end
            ###
            # update data translate of a letter
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/18 - create
            # @param       :   letter - Hash - data translate of letter need to update
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.updateTransLetter(letter)
                begin
                    url_video = letter[:url_video]
                    oldLetter = Letter.find_by(id: letter[:id], lang: letter[:lang], deleted_at: nil)
                    if (oldLetter.typ == 2 && letter[:typ].to_s != '2') || (letter[:typ].to_s == '2' && letter[:image] != nil && letter[:image] != '')
                        letter2 = Letter.where(url_video: oldLetter.url_video, deleted_at: nil).where.not('id=' + letter[:id] + ' AND lang=\'' + letter[:lang] + '\'').first
                        if letter2 == nil
                            begin
                                FileUtils.rm('public' + oldLetter.url_video)
                            rescue
                            end
                        end
                        if letter[:typ].to_s == '2' && letter[:image] != nil && letter[:image] != ''
                            file2 = Helper.save_file(letter[:image], '/images/slide/')
                            if !file2['status']
                                result = file2
                            else
                                url_video = file2['link']
                            end
                        end
                    end
                    update = Letter.where(:id => letter[:id], :lang => letter[:lang])
                                     .update_all(
                                        content:       letter[:content],
                                        title:         letter[:title],
                                        author:        letter[:author],
                                        url_video:     url_video,
                                        updated_by:    $user_id,
                                        updated_at:    Time.now
                                     )
                    return update
                rescue
                    return false
                end
            end
            ###
            # delete a letter
            # -----------------------------------------------
            # @author      :   quypn     - 2017/08/18 - create
            # @param       :   id - int - id of letter need to delete
            # @return      :   null
            # @access      :   public
            # @see         :   remark
            ###
            def self.deleteLetter(id)
                begin
                    letter = Letter.find_by(id: id, lang: 'vi')
                    letter2 = Letter.where(icon: letter['icon'], deleted_at: nil).where.not(id: id).first
                    if letter2 == nil
                        begin
                            FileUtils.rm('public' + letter['icon'])
                        rescue
                        end
                    end
                    languages = Language.all();
                    languages.each do |item|
                        letter = Letter.find_by(id: id, lang: item.language_code)
                        letter2 = Letter.where(url_video: letter['url_video'], deleted_at: nil).where.not('id=' + id + ' AND lang=\'' + item.language_code + '\'').first
                        if letter2 == nil
                            begin
                                FileUtils.rm('public' + letter['url_video'])
                            rescue
                            end
                        end
                    end
                    update = Letter.where(:id => id)
                                    .update_all(
                                        deleted_by:    $user_id,
                                        deleted_at:    Time.now
                                    )
                    return update
                rescue
                    return false
                end
            end
        end
    end
end