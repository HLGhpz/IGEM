// pages/test_2/test_2.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const value = 'a'
        // var encode = btoa("abc")
        // const arrayBuffer = wx.base64ToArrayBuffer(encode)
        // console.log(arrayBuffer)
        const buffer = this.stringToBytes(value)
        console.log(buffer)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    stringToBytes(str) {
        var array = new Int8Array(str.length)
        for (var i = 0; i < str.length; i++) {
            array[i] = str.charCodeAt(i)
        }
        return array.buffer
    }
})