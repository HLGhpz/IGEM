// miniprogram/pages/cam.js

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
        // wx.cloud.callFunction({
        //     name:'getimage',
        // }).then(res=>{
        //     console.log("success",res)
        // }).catch(err=>{
        //     console.log("error",err)
        // })

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

    formSubmit_one: function(event) {
        console.log(event);
        this.setData({
            url_one: `http://${event.detail.value.CAM_ONE}:81/stream`
        })
    },

    formSubmit_two: function (event) {
        console.log(event);
        this.setData({
            url_two: `http://${event.detail.value.CAM_TWO}:81/stream`
        })
    },


})