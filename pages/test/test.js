// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        switch1Checked: false,
        switch2Checked: false,
        switch3Checked: false,
        switch4Checked: false,
        switch5Checked: false,
        switch6Checked: false,
        switch7Checked: false,
        switch8Checked: false,
        switch9Checked: false,
        switch10Checked: false,


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    switch1Change: function (event) {
        var myData = new Date();
        this.setData({
            date1: `${myData.getMonth() + 1}.${myData.getDate()} ${myData.getHours()}:${myData.getMinutes()}:${myData.getSeconds()}`,
            switch1Checked: true
        })
        // wx.showToast({
        //     title: '成功',
        //     icon: 'success',
        //     duration: 2000
        // })

        // wx.showModal({
        //     title: '提示',
        //     content: '这是一个模拟弹窗',
        //     success(res){
        //         if(res.confirm){
        //             console.log('用户点击确定')
        //         }else if(res.cancel){
        //             console.log('用户点击取消')
        //         }
        //     }
        // })
    }


})