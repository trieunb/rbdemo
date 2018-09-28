/**
 * ****************************************************************************
 * BRSE-SCHOOL
 * HOME - different
 *
 * 処理概要      :   
 * 作成日        :   2017/08/23
 * 作成者        :   havv – havv@ans-asia.com
 *
 * 更新日        :
 * 更新者        :
 * 更新内容      :
 *
 * @package     :   HOME
 * @copyright   :   Copyright (c) ANS-ASIA
 * @version     :   1.0.0
 * ****************************************************************************
*/
$( document ).ready(function() {
    try{
        initDifferent();
        initEventDifferent();
    } catch (e) {
        alert('readyDifferent: ' + e.message);
    }
});
/**
 * initDifferent
 *
 * @author      :   havv - 2017/08/23 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initDifferent(){
    try{
        calculateHeightTitleDifferent();
    } catch (e) {
        alert('initDifferent: ' + e.message);
    }
}
/**
 * initEventDifferent
 *
 * @author      :   havv - 2017/08/23 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function initEventDifferent(){
    try{
        $(window).resize(function () {
            calculateHeightTitleDifferent();
        })
    } catch (e) {
        alert('initEventDifferent: ' + e.message);
    }
}
/**
 * calculate max height of title and set max height for all title
 *
 * @author      :   havv - 2017/08/23 - create
 * @author      :
 * @return      :   null
 * @access      :   public
 * @see         :
 */
function calculateHeightTitleDifferent() {
    try {
        var maxHeight = 0;

        //get all title
        var arrTitle = $('#different .title');

        //calculate max height of title
        for (var i = 0; i < arrTitle.length; i++) {
            var height = $(arrTitle[i]).height();

            if (maxHeight < height) {
                maxHeight = height;
            }
        }

        //set max height for all title
        for (var i = 0; i < arrTitle.length; i++) {
            $(arrTitle[i]).height(maxHeight);
        }
    } catch (e) {
        alert('calculateHeightTitleDifferent: ' + e.message);
    }
}